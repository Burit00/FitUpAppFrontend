import { cn } from '@/lib/utils';

type LogoProps = {
  className: string;
};

const Logo = (props: LogoProps) => {
  const { className } = props;

  return (
    <svg
      width="81"
      height="24"
      viewBox="0 0 81 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
    >
      <mask
        id="mask0_101_1838"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
      >
        <rect width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_101_1838)">
        <path
          d="M10.55 18.2L15.725 12H11.725L12.45 6.325L7.825 13H11.3L10.55 18.2ZM8 22L9 15H4L13 2H15L14 10H20L10 22H8Z"
          fill="#EFEFEF"
        />
      </g>
      <path
        d="M35.304 3.772V5.548H28.032V11.188H33.936V12.964H28.032V20.5H25.848V3.772H35.304ZM39.0698 5.212C38.6538 5.212 38.3018 5.068 38.0138 4.78C37.7258 4.492 37.5818 4.14 37.5818 3.724C37.5818 3.308 37.7258 2.956 38.0138 2.668C38.3018 2.38 38.6538 2.236 39.0698 2.236C39.4698 2.236 39.8058 2.38 40.0778 2.668C40.3658 2.956 40.5098 3.308 40.5098 3.724C40.5098 4.14 40.3658 4.492 40.0778 4.78C39.8058 5.068 39.4698 5.212 39.0698 5.212ZM40.1258 7.348V20.5H37.9418V7.348H40.1258ZM46.512 9.148V16.9C46.512 17.54 46.648 17.996 46.92 18.268C47.192 18.524 47.664 18.652 48.336 18.652H49.944V20.5H47.976C46.76 20.5 45.848 20.22 45.24 19.66C44.632 19.1 44.328 18.18 44.328 16.9V9.148H42.624V7.348H44.328V4.036H46.512V7.348H49.944V9.148H46.512Z"
        fill="#34BD63"
      />
      <path
        d="M54.7262 3.772V14.356C54.7262 15.844 55.0862 16.948 55.8062 17.668C56.5422 18.388 57.5582 18.748 58.8542 18.748C60.1342 18.748 61.1342 18.388 61.8542 17.668C62.5902 16.948 62.9582 15.844 62.9582 14.356V3.772H65.1422V14.332C65.1422 15.724 64.8622 16.9 64.3022 17.86C63.7422 18.804 62.9822 19.508 62.0222 19.972C61.0782 20.436 60.0142 20.668 58.8302 20.668C57.6462 20.668 56.5742 20.436 55.6142 19.972C54.6702 19.508 53.9182 18.804 53.3582 17.86C52.8142 16.9 52.5422 15.724 52.5422 14.332V3.772H54.7262ZM79.9695 8.668C79.9695 10.06 79.4895 11.22 78.5295 12.148C77.5855 13.06 76.1375 13.516 74.1855 13.516H70.9695V20.5H68.7855V3.772H74.1855C76.0735 3.772 77.5055 4.228 78.4815 5.14C79.4735 6.052 79.9695 7.228 79.9695 8.668ZM74.1855 11.716C75.4015 11.716 76.2975 11.452 76.8735 10.924C77.4495 10.396 77.7375 9.644 77.7375 8.668C77.7375 6.604 76.5535 5.572 74.1855 5.572H70.9695V11.716H74.1855Z"
        fill="#0C2916"
        className={'fill-accent-foreground'}
      />
    </svg>
  );
};

export { Logo };
