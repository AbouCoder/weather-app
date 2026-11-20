interface SunProps {
    x?: number;
    y?: number;
    scale?: number;
  }
  
  export function Sun({ x = 0, y = 0, scale = 1 }: SunProps) {
    return (
      <>
        <circle
          cx={192 + x}
          cy={192 + y}
          r={150 * scale}
          fill="url(#yellowGlow)"
          className="animate-pulse"
          // Scales around the glow's own centre; by default an SVG shape
          // transforms around the icon's centre, which the sun is moved off
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        />
        <circle
          cx={192 + x}
          cy={192 + y}
          r={104 * scale}
          fill="url(#sunGradient)"
          filter="url(#whiteInnerShadow)"
        />
      </>
    );
  }