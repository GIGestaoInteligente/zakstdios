/** Wordmark MANA HOUSE em tipografia vetorial (alta qualidade). */
export function ManaHouseWordmark({
  className = "",
  closer = false,
}: {
  className?: string;
  closer?: boolean;
}) {
  return (
    <p
      className={`mana-house-wordmark ${closer ? "mana-house-wordmark--closer" : ""} ${className}`}
      aria-label="MANA HOUSE"
    >
      <span className="mana-house-wordmark__mana">MANA&nbsp;</span>
      <span className="mana-house-wordmark__house">
        H
        <span className="mana-house-wordmark__ou" aria-hidden="true">
          <span className="mana-house-wordmark__o">O</span>
          <span className="mana-house-wordmark__u">U</span>
        </span>
        SE
      </span>
    </p>
  );
}
