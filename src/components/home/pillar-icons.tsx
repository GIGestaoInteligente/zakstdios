type IconProps = { className?: string };

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function HotYogaIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path {...stroke} d="M14 36 L22 22 L28 28 L34 14" />
      <circle {...stroke} cx="34" cy="11" r="2.5" />
      <path {...stroke} d="M30 6 Q32 2 34 6 M34 6 Q36 2 38 6 M38 6 Q40 2 42 6" />
    </svg>
  );
}

export function ColdPlungeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path {...stroke} d="M24 8 C20 14 28 18 24 24 C20 30 28 34 24 40" />
      <ellipse {...stroke} cx="24" cy="34" rx="10" ry="3" />
      <ellipse {...stroke} cx="24" cy="38" rx="14" ry="4" />
    </svg>
  );
}

export function FloatingIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <circle {...stroke} cx="24" cy="16" r="3" />
      <path {...stroke} d="M20 20 Q24 24 28 20" />
      <path {...stroke} d="M8 30 Q16 26 24 30 T40 30" />
      <path {...stroke} d="M6 36 Q16 32 24 36 T42 36" />
    </svg>
  );
}

export function BarIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path {...stroke} d="M14 20 L14 34 C14 38 34 38 34 34 L34 20 Z" />
      <path {...stroke} d="M12 20 L36 20" />
      <path {...stroke} d="M36 24 L40 24 L40 32 L36 32" />
      <path {...stroke} d="M20 12 Q22 8 24 12 M24 12 Q26 8 28 12 M28 12 Q30 8 32 12" />
    </svg>
  );
}

export function ConnectionsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <circle {...stroke} cx="16" cy="18" r="3" />
      <circle {...stroke} cx="32" cy="18" r="3" />
      <path {...stroke} d="M13 22 Q16 28 20 30 Q24 32 28 30 Q32 28 35 22" />
      <path {...stroke} d="M20 30 Q24 34 28 30" />
    </svg>
  );
}

export function MembershipIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path {...stroke} d="M24 6 C14 6 8 14 8 24 C8 34 14 42 24 42 C34 42 40 34 40 24 C40 14 34 6 24 6 Z" />
      <circle fill="currentColor" cx="24" cy="20" r="2" />
      <path {...stroke} d="M18 28 Q24 32 30 28" />
    </svg>
  );
}

export function NatureIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path {...stroke} d="M24 40 L24 18" />
      <path {...stroke} d="M24 28 C18 26 14 20 14 14 C20 16 24 22 24 28 Z" />
      <path {...stroke} d="M24 24 C30 22 34 16 34 10 C28 12 24 18 24 24 Z" />
      <path {...stroke} d="M24 32 C20 30 18 26 18 22" />
      <path {...stroke} d="M24 32 C28 30 30 26 30 22" />
    </svg>
  );
}
