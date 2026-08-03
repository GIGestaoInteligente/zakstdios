"""Build hero title: clean Mix Light line + distressed Breathe wordmark."""

from __future__ import annotations

from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont

BASE = Path(
    r"C:\Users\Administrator\.cursor\projects\c-Users-Administrator-Desktop-testeclinica-zakstdios\assets"
)
DST = Path(r"C:\Users\Administrator\Desktop\testeclinica\zakstdios\src\assets")
FONTS = Path(r"C:\Users\Administrator\Desktop\testeclinica\zakstdios\public\fonts")


def find(pattern: str) -> Path:
    hits = list(BASE.glob(pattern))
    if not hits:
        raise FileNotFoundError(pattern)
    return hits[0]


def knock_breathe(src: Path) -> Image.Image:
    rgb = np.asarray(Image.open(src).convert("RGB")).astype(np.float32)
    lum = rgb.mean(axis=-1)
    alpha = np.clip((lum - 8.0) / 210.0 * 255.0, 0, 255)
    mask = lum > 60
    cream = (
        rgb[mask].mean(axis=0) * 0.35 + np.array([242.0, 234.0, 223.0]) * 0.65
        if mask.any()
        else np.array([242.0, 234.0, 223.0])
    )
    out = np.zeros((*rgb.shape[:2], 4), dtype=np.float32)
    out[..., 0] = cream[0]
    out[..., 1] = cream[1]
    out[..., 2] = cream[2]
    out[..., 3] = alpha
    ys, xs = np.where(alpha > 12)
    pad = 16
    y0, y1 = max(0, int(ys.min()) - pad), min(out.shape[0], int(ys.max()) + pad + 1)
    x0, x1 = max(0, int(xs.min()) - pad), min(out.shape[1], int(xs.max()) + pad + 1)
    return Image.fromarray(out[y0:y1, x0:x1].astype(np.uint8), "RGBA")


def load_mix_light(size: int) -> ImageFont.FreeTypeFont:
    path = FONTS / "Season" / "Season Mix" / "SeasonMix-TRIAL-Light.ttf"
    return ImageFont.truetype(str(path), size=size)


def render_line(text: str, target_height: int) -> Image.Image:
    lo, hi = 40, 360
    best_font = load_mix_light(120)
    best_bbox = (0, 0, 100, 40)
    for _ in range(18):
        mid = (lo + hi) // 2
        font = load_mix_light(mid)
        bbox = ImageDraw.Draw(Image.new("RGBA", (8, 8))).textbbox((0, 0), text, font=font)
        th = bbox[3] - bbox[1]
        best_font, best_bbox = font, bbox
        if th < target_height:
            lo = mid + 1
        else:
            hi = mid - 1
    tw = best_bbox[2] - best_bbox[0]
    th = best_bbox[3] - best_bbox[1]
    pad = int(th * 0.18)
    img = Image.new("RGBA", (tw + pad * 2, th + pad * 2), (0, 0, 0, 0))
    ImageDraw.Draw(img).text(
        (pad - best_bbox[0], pad - best_bbox[1]),
        text,
        font=best_font,
        fill=(242, 234, 223, 255),
    )
    return img


def content_box(im: Image.Image) -> tuple[int, int, int, int]:
    a = np.asarray(im)[..., 3]
    ys, xs = np.where(a > 20)
    return int(xs.min()), int(ys.min()), int(xs.max()), int(ys.max())


def compose(arrived: Image.Image, breathe: Image.Image, gap_ratio: float = 0.2) -> Image.Image:
    # Match visual letter heights more closely (Breathe has fewer glyphs)
    scale = (arrived.width * 0.72) / breathe.width
    breathe_r = breathe.resize(
        (max(1, int(breathe.width * scale)), max(1, int(breathe.height * scale))),
        Image.Resampling.LANCZOS,
    )
    gap = max(10, int(arrived.height * gap_ratio))
    w = max(arrived.width, breathe_r.width)
    h = arrived.height + gap + breathe_r.height
    canvas = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    canvas.paste(arrived, ((w - arrived.width) // 2, 0), arrived)
    canvas.paste(breathe_r, ((w - breathe_r.width) // 2, arrived.height + gap), breathe_r)
    return canvas


def main() -> None:
    try:
        src = find("*Breathe-9edddb44*")
    except FileNotFoundError:
        src = find("*120510-f882e450*")

    breathe = knock_breathe(src)
    breathe_path = DST / "mana-house-breathe-wordmark.png"
    breathe.save(breathe_path, "PNG", optimize=True)
    print("breathe", breathe.size)

    _, by0, _, by1 = content_box(breathe)
    letter_h = by1 - by0 + 1
    arrived_h = max(40, int(letter_h * 0.5))

    arrived_en = render_line("You've arrived.", arrived_h)
    title_en = compose(arrived_en, breathe)
    title_en.save(DST / "mana-house-voce-chegou-respira.png", "PNG", optimize=True)
    print("title EN", title_en.size)

    arrived_pt = render_line("Você chegou.", arrived_h)
    title_pt = compose(arrived_pt, breathe)
    title_pt.save(DST / "mana-house-voce-chegou-respira-pt.png", "PNG", optimize=True)
    print("title PT", title_pt.size)

    # Also copy Mix Light woff2 to public/fonts root for easy @font-face
    src_font = FONTS / "Season" / "Season Mix" / "SeasonMix-TRIAL-Light.woff2"
    if src_font.exists():
        (FONTS / "SeasonMix-TRIAL-Light.woff2").write_bytes(src_font.read_bytes())
        print("copied SeasonMix-TRIAL-Light.woff2")


if __name__ == "__main__":
    main()
