interface SnowflakeProps {
  x?: number;
  y?: number;
  size?: number;
}

export function Snowflake({ x = 0, y = 0, size = 20 }: SnowflakeProps) {
  const cx = 192 + x;
  const cy = 290 + y;

  return (
    <g
      stroke="url(#snowGradient)"
      filter="url(#whiteInnerShadowSmall)"
      strokeWidth={8}
      strokeLinecap="round"
    >
      {[90, 30, -30].map((angle) => {
        const dx = size * Math.cos((angle * Math.PI) / 180);
        const dy = size * Math.sin((angle * Math.PI) / 180);
        return (
          <line
            key={angle}
            x1={cx - dx}
            y1={cy - dy}
            x2={cx + dx}
            y2={cy + dy}
          />
        );
      })}
    </g>
  );
}
