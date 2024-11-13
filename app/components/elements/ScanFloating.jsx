export default function element(props) {
  return (
    <svg
      width={112}
      height={120}
      viewBox="0 0 112 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#filter0_d_121_1469)">
        <circle cx={57.5} cy={57.5} r={26.5} fill="#86A948" />
        <path
          d="M69 47.917V52.5a.917.917 0 01-1.833 0v-3.667H63.5a.916.916 0 110-1.833h4.583a.917.917 0 01.917.917zm-16.5 19.25h-3.667V63.5a.916.916 0 10-1.833 0v4.583a.917.917 0 00.917.917H52.5a.917.917 0 000-1.833zm15.583-4.584a.917.917 0 00-.916.917v3.667H63.5a.916.916 0 100 1.833h4.583a.917.917 0 00.917-.917V63.5a.917.917 0 00-.917-.917zm-20.166-9.166a.917.917 0 00.916-.917v-3.667H52.5a.916.916 0 100-1.833h-4.583a.917.917 0 00-.917.917V52.5a.917.917 0 00.917.917zM63.571 52.775h-11.2a.51.51 0 100 1.018h.509v9.164a1.018 1.018 0 001.018 1.018h8.146a1.018 1.018 0 001.018-1.018v-9.164h.509a.51.51 0 000-1.018zm-1.527 10.182h-8.146v-9.164h8.146v9.164zm-7.128-11.71a.509.509 0 01.51-.508h5.09a.51.51 0 110 1.018h-5.09a.51.51 0 01-.51-.51z"
          fill="#FEFEFE"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_121_1469"
          x={0.525001}
          y={0.525001}
          width={119.25}
          height={119.25}
        filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx={2.65} dy={2.65} />
          <feGaussianBlur stdDeviation={16.5625} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_121_1469"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_121_1469"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
