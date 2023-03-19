import { cva, cx, VariantProps } from "class-variance-authority";

const spinnerStyles = cva(["animate-spin"], {
  variants: {
    variant: {
      light: "text-white",
      primary: "text-primary",
    },
    size: {
      sm: "h-4 w-4",
      md: "h-8 w-8",
      lg: "h-16 w-16",
      xl: "h-24 w-24",
    },
  },
  defaultVariants: {
    size: "sm",
    variant: "primary",
  },
});

type SpinnerBaseProps = VariantProps<typeof spinnerStyles>;

export interface SpinnerProps extends SpinnerBaseProps {
  className?: string;
  isFullScreen?: boolean;
}

export const Spinner = ({
  size,
  variant,
  className,
  isFullScreen,
}: SpinnerProps) => {
  const classes = cx(
    className,
    `${
      isFullScreen ? "h-screen w-screen flex items-center justify-center" : ""
    }`
  );

  console.log(classes);

  return (
    <div className={classes}>
      <svg
        className={spinnerStyles({ size, variant })}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        data-testid="loading"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  );
};
