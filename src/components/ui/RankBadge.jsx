const TIERS = [
  { name: "Bronze", min: 0, hex: "#A0522D" },
  { name: "Silver", min: 1000, hex: "#8A93A6" },
  { name: "Gold", min: 1250, hex: "#FFB454" },
  { name: "Platinum", min: 1450, hex: "#59D8C9" },
  { name: "Diamond", min: 1650, hex: "#9580FF" },
  { name: "Grandmaster", min: 1850, hex: "#FF5470" },
];
export function tierFor(rating) {
  return (
    TIERS.slice()
      .reverse()
      .find((t) => rating >= t.min) || TIERS[0]
  );
}

export default function RankBadge({
  rating,
  showRating = true,
  variant = "pill",
}) {
  const tier = tierFor(rating);
  if (variant === "shield") {
    return (
      <div className="flex items-center gap-3">
        <div
          className="h-14 w-12 clip-shield flex items-center justify-center border"
          style={{ borderColor: tier.hex, backgroundColor: `${tier.hex}26` }}
        >
          <span
            className="font-display font-bold text-xl"
            style={{ color: tier.hex }}
          >
            {tier.name[0]}
          </span>
        </div>
        {showRating && (
          <span className="font-mono text-sm" style={{ color: tier.hex }}>
            {tier.name} · {rating}
          </span>
        )}
      </div>
    );
  }
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-mono uppercase tracking-wide"
      style={{
        color: tier.hex,
        borderColor: `${tier.hex}4D`,
        backgroundColor: `${tier.hex}1A`,
      }}
    >
      {tier.name}
      {showRating && ` · ${rating}`}
    </span>
  );
}
