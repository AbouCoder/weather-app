interface ThunderboltProps {
  x?: number;
  y?: number;
}

export function Thunderbolt({ x = 0, y = 0 }: ThunderboltProps) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <circle cx={198} cy={296} r={90} fill="url(#yellowGlow)" opacity={0.6} />
      <path
        d="M204 216L150 304H190L172 364L246 268H204L222 216Z"
        fill="url(#boltGradient)"
        filter="url(#whiteInnerShadowSmall)"
        strokeLinejoin="round"
      />
    </g>
  );
}
