"""Clean cutouts: remove hard black shadow blobs; soft translucent contact shadow."""

from __future__ import annotations

from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

BASE = Path(
    r"C:\Users\Administrator\.cursor\projects\c-Users-Administrator-Desktop-testeclinica-zakstdios\assets"
)
DST = Path(r"C:\Users\Administrator\Desktop\testeclinica\zakstdios\src\assets")


def find(pattern: str) -> Path:
    hits = list(BASE.glob(pattern))
    if not hits:
        raise FileNotFoundError(pattern)
    return hits[0]


def flood_fill_mask(seed_mask: np.ndarray) -> np.ndarray:
    """Return connected component of True pixels reachable from image borders."""
    h, w = seed_mask.shape
    visited = np.zeros((h, w), dtype=bool)
    q: deque[tuple[int, int]] = deque()
    for x in range(w):
        for y in (0, h - 1):
            if seed_mask[y, x]:
                q.append((x, y))
                visited[y, x] = True
    for y in range(h):
        for x in (0, w - 1):
            if seed_mask[y, x] and not visited[y, x]:
                q.append((x, y))
                visited[y, x] = True
    while q:
        x, y = q.popleft()
        for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
            if 0 <= nx < w and 0 <= ny < h and not visited[ny, nx] and seed_mask[ny, nx]:
                visited[ny, nx] = True
                q.append((nx, ny))
    return visited


def largest_component(mask: np.ndarray) -> np.ndarray:
    """Keep only the largest connected True component."""
    h, w = mask.shape
    seen = np.zeros((h, w), dtype=bool)
    best = None
    best_size = 0
    for y in range(h):
        for x in range(w):
            if not mask[y, x] or seen[y, x]:
                continue
            q: deque[tuple[int, int]] = deque([(x, y)])
            seen[y, x] = True
            cells: list[tuple[int, int]] = []
            while q:
                cx, cy = q.popleft()
                cells.append((cx, cy))
                for nx, ny in ((cx - 1, cy), (cx + 1, cy), (cx, cy - 1), (cx, cy + 1)):
                    if 0 <= nx < w and 0 <= ny < h and mask[ny, nx] and not seen[ny, nx]:
                        seen[ny, nx] = True
                        q.append((nx, ny))
            if len(cells) > best_size:
                best_size = len(cells)
                best = cells
    out = np.zeros_like(mask)
    if best:
        for x, y in best:
            out[y, x] = True
    return out


def object_mask_white_bg(rgb: np.ndarray) -> np.ndarray:
    lum = rgb.mean(axis=-1)
    chroma = np.max(rgb, axis=-1) - np.min(rgb, axis=-1)
    bg = flood_fill_mask(lum > 248)

    # Colored objects (terracotta, etc.)
    colored = (chroma > 14) & (lum < 246) & ~bg

    # Dark stone body (immersion): start from very dark core, expand to lit edges
    core = largest_component((lum < 70) & ~bg)
    if core.any():
        core_img = Image.fromarray((core.astype(np.uint8) * 255), "L")
        # Dilate enough to catch rough stone rim, not far drop-shadow
        dilated = np.asarray(core_img.filter(ImageFilter.MaxFilter(21))) > 0
        stone = dilated & (lum < 210) & ~bg
        # Reject hard black shadow lobes far from core: keep only near core
        near = np.asarray(core_img.filter(ImageFilter.MaxFilter(35))) > 0
        stone = stone & near
    else:
        stone = np.zeros_like(lum, dtype=bool)

    raw = colored | stone
    return largest_component(raw)


def object_mask_black_bg(rgb: np.ndarray) -> np.ndarray:
    lum = rgb.mean(axis=-1)
    chroma = np.max(rgb, axis=-1) - np.min(rgb, axis=-1)
    # Colored wax / lit surface — exclude pure black plate AND hard black shadow clones
    raw = (chroma > 12) | ((lum > 35) & (chroma > 6))
    bg = flood_fill_mask(lum < 4)
    raw = raw & ~bg
    return largest_component(raw)


def feather_mask(mask: np.ndarray, radius: int = 2) -> np.ndarray:
    """Binary mask → soft alpha 0..255 with slight edge feather."""
    m = Image.fromarray((mask.astype(np.uint8) * 255), mode="L")
    if radius > 0:
        m = m.filter(ImageFilter.MaxFilter(3))  # close tiny holes on rim
        m = m.filter(ImageFilter.GaussianBlur(radius=radius))
    return np.asarray(m).astype(np.float32)


def soft_contact_shadow(object_alpha: np.ndarray, blur: int = 28, opacity: float = 0.34, offset=(8, 14)) -> np.ndarray:
    """Create soft translucent drop shadow from object alpha."""
    ox, oy = offset
    h, w = object_alpha.shape
    base = Image.fromarray(object_alpha.astype(np.uint8), mode="L")
    # Hard silhouette first, then heavy blur
    sil = base.point(lambda p: 255 if p > 40 else 0)
    shadow = Image.new("L", (w, h), 0)
    shadow.paste(sil, (ox, oy))
    shadow = shadow.filter(ImageFilter.GaussianBlur(radius=blur))
    arr = np.asarray(shadow).astype(np.float32) * opacity
    # Don't darken the object body itself — shadow only outside
    arr = np.where(object_alpha > 200, 0, arr)
    return np.clip(arr, 0, 255)


def defringe(rgb: np.ndarray, alpha: np.ndarray) -> np.ndarray:
    """Remove white/black matte fringe on semi-transparent edges."""
    out = rgb.copy()
    edge = (alpha > 20) & (alpha < 250)
    if not edge.any():
        return out
    # Push fringe pixels toward nearby opaque body color via blur of opaque-only RGB
    opaque = alpha > 240
    body = rgb.copy()
    body[~opaque] = 0
    weight = opaque.astype(np.float32)
    body_img = Image.fromarray(np.clip(body, 0, 255).astype(np.uint8), "RGB")
    w_img = Image.fromarray((weight * 255).astype(np.uint8), "L")
    body_b = np.asarray(body_img.filter(ImageFilter.GaussianBlur(radius=2))).astype(np.float32)
    w_b = np.asarray(w_img.filter(ImageFilter.GaussianBlur(radius=2))).astype(np.float32) / 255.0
    w_b = np.maximum(w_b, 1e-3)
    filled = body_b / w_b[..., None]
    # Only replace fringe that looks contaminated (too bright or too black vs body)
    lum = out.mean(axis=-1)
    body_lum = filled.mean(axis=-1)
    bad = edge & ((lum > body_lum + 25) | ((lum < 18) & (body_lum > 40)))
    out[bad] = filled[bad]
    return out


def build_cutout(im: Image.Image, bg: str) -> Image.Image:
    rgba = np.asarray(im.convert("RGBA")).astype(np.float32)
    rgb = rgba[..., :3]

    mask = object_mask_white_bg(rgb) if bg == "white" else object_mask_black_bg(rgb)
    obj_alpha = feather_mask(mask, radius=2 if bg == "white" else 1)

    out_rgb = defringe(rgb, obj_alpha)
    clear = obj_alpha < 8
    out_rgb[clear] = 0

    sh = soft_contact_shadow(
        obj_alpha,
        blur=36 if bg == "white" else 30,
        opacity=0.22 if bg == "white" else 0.20,
        offset=(6, 12) if bg == "white" else (5, 10),
    )

    final_a = np.clip(obj_alpha + sh * (1.0 - obj_alpha / 255.0), 0, 255)
    only_shadow = (obj_alpha < 20) & (sh > 4)
    out_rgb[only_shadow] = 12
    out = np.dstack([out_rgb, final_a])
    return Image.fromarray(out.astype(np.uint8), "RGBA")


def main() -> None:
    jobs = [
        (find("*ESSENTIAL-8198*"), DST / "mana-house-elemento-essencial.png", "black"),
        (find("*RITUAL-415b0745*"), DST / "mana-house-elemento-ritual.png", "white"),
        (find("*IMMERSION-4460925b*"), DST / "mana-house-elemento-imersao.png", "white"),
    ]
    for src, out_path, bg in jobs:
        result = build_cutout(Image.open(src), bg)
        result.save(out_path, "PNG", optimize=True)
        a = np.asarray(result)[..., 3]
        rgb = np.asarray(result)[..., :3]
        soft = (a > 10) & (a < 200)
        hard = soft & (rgb.mean(axis=-1) < 30) & (a > 140)
        print(
            f"{out_path.name}: transparent={(a < 10).mean()*100:.1f}% "
            f"soft={int(soft.sum())} hard-black-soft={int(hard.sum())} "
            f"soft-alpha-mean={a[soft].mean() if soft.any() else 0:.1f}"
        )


if __name__ == "__main__":
    main()
