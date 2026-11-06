// Shared gradients and filters referenced by the weather icons via url(#id).
// Hidden with zero size rather than display: none, which stops some browsers
// from resolving the references.
export function Effects() {
  return (
    <svg
      width={0}
      height={0}
      className="absolute"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="yellowGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-yellow-400)" />
          <stop offset="100%" stopColor="var(--color-amber-600)" />
        </linearGradient>
        <radialGradient id="yellowGlow">
          <stop offset="0%" stopColor="var(--color-yellow-100)" />
          <stop
            offset="100%"
            stopColor="var(--color-yellow-300)"
            stopOpacity={0}
          />
        </radialGradient>
        <filter id="whiteInnerShadow">
          <feGaussianBlur in="SourceAlpha" stdDeviation={12} result="blur" />
          <feOffset in="blur" dy={10} result="offsetBlur" />
          <feComposite
            in="SourceAlpha"
            in2="offsetBlur"
            operator="out"
            result="innerEdge"
          />
          <feFlood floodColor="white" floodOpacity={0.5} result="white" />
          <feComposite
            in="white"
            in2="innerEdge"
            operator="in"
            result="innerShadow"
          />
          <feComposite in="innerShadow" in2="SourceGraphic" operator="over" />
        </filter>

        <linearGradient id="moonGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-yellow-200)" />
          <stop offset="100%" stopColor="var(--color-amber-500)" />
        </linearGradient>

        <linearGradient id="cloudLightGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-white)" />
          <stop offset="100%" stopColor="var(--color-gray-300)" />
        </linearGradient>
        <linearGradient id="cloudMediumGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-gray-200)" />
          <stop offset="100%" stopColor="var(--color-gray-400)" />
        </linearGradient>
        <linearGradient id="cloudDarkGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-gray-400)" />
          <stop offset="100%" stopColor="var(--color-gray-600)" />
        </linearGradient>

        <linearGradient id="boltGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-yellow-300)" />
          <stop offset="100%" stopColor="var(--color-amber-500)" />
        </linearGradient>

        {/* Rain and snow are thin strokes, and a perfectly vertical line has a
            zero-width bounding box, so these use the icon's own coordinates. */}
        <linearGradient
          id="rainGradient"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="262"
          x2="0"
          y2="318"
        >
          <stop offset="0%" stopColor="var(--color-sky-300)" />
          <stop offset="100%" stopColor="var(--color-blue-500)" />
        </linearGradient>
        <linearGradient
          id="snowGradient"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="260"
          x2="0"
          y2="350"
        >
          <stop offset="0%" stopColor="var(--color-white)" />
          <stop offset="100%" stopColor="var(--color-sky-200)" />
        </linearGradient>

        <filter
          id="whiteInnerShadowSmall"
          filterUnits="userSpaceOnUse"
          x="-100"
          y="-100"
          width="584"
          height="584"
        >
          <feGaussianBlur in="SourceAlpha" stdDeviation={2} result="blur" />
          <feOffset in="blur" dy={2} result="offsetBlur" />
          <feComposite
            in="SourceAlpha"
            in2="offsetBlur"
            operator="out"
            result="innerEdge"
          />
          <feFlood floodColor="white" floodOpacity={0.5} result="white" />
          <feComposite
            in="white"
            in2="innerEdge"
            operator="in"
            result="innerShadow"
          />
          <feComposite in="innerShadow" in2="SourceGraphic" operator="over" />
        </filter>
      </defs>
    </svg>
  );
}