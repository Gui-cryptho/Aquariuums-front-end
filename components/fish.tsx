interface FishProps {
  type: "goldfish" | "bluefish" | "greenfish" | "orangefish"
  direction: "left" | "right"
}

export function Fish({ type, direction }: FishProps) {
  const scaleX = direction === "left" ? -1 : 1

  const fishColors = {
    goldfish: { body: "#FFB90F", fin: "#FF8C00", eye: "#FFFFFF" },
    bluefish: { body: "#1E90FF", fin: "#4169E1", eye: "#FFFFFF" },
    greenfish: { body: "#32CD32", fin: "#228B22", eye: "#FFFFFF" },
    orangefish: { body: "#FF6347", fin: "#FF4500", eye: "#FFFFFF" },
  }

  const colors = fishColors[type]

  return (
    <svg
      width="60"
      height="40"
      viewBox="0 0 60 40"
      style={{ transform: `scaleX(${scaleX})`, filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" }}
    >
      {/* Tail */}
      <polygon points="5,15 5,25 -10,20" fill={colors.fin} opacity="0.8" />

      {/* Body */}
      <ellipse cx="30" cy="20" rx="20" ry="12" fill={colors.body} />

      {/* Fin */}
      <ellipse cx="25" cy="10" rx="6" ry="8" fill={colors.fin} opacity="0.7" />

      {/* Eye */}
      <circle cx="42" cy="16" r="3" fill={colors.eye} />
      <circle cx="42" cy="16" r="1.5" fill="#000000" />

      {/* Scales detail */}
      <circle cx="35" cy="20" r="2" fill="rgba(255,255,255,0.3)" />
      <circle cx="28" cy="18" r="1.5" fill="rgba(255,255,255,0.2)" />
    </svg>
  )
}
