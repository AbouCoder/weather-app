interface RainProps {
  x?: number;
  y?: number;
}

// Each drop starts at a different point in the fall so they don't move in step
const DROPS = [
  { x1: 136, y1: 262, x2: 122, y2: 302, delay: "[--animation-delay:0s]" },
  { x1: 196, y1: 278, x2: 182, y2: 318, delay: "[--animation-delay:-0.66s]" },
  { x1: 256, y1: 262, x2: 242, y2: 302, delay: "[--animation-delay:-0.33s]" },
];

export function Rain({ x = 0, y = 0 }: RainProps) {
  return (
    <g
      transform={`translate(${x}, ${y})`}
      stroke="url(#rainGradient)"
      filter="url(#whiteInnerShadowSmall)"
      strokeWidth={16}
      strokeLinecap="round"
    >
      {DROPS.map(({ delay, ...drop }) => (
        <g key={drop.x1} className={`animate-fall ${delay}`}>
          <line {...drop} />
        </g>
      ))}
    </g>
  );
}
