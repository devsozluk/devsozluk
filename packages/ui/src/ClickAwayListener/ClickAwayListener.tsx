import { useEffect, useRef, useState } from "react";
import classNames from "classnames";

export interface ClickAwayListenerProps {
  onClickAway: () => void;
  children: React.ReactNode;
  className?: string;
}

export const ClickAwayListener = ({
  onClickAway,
  children,
  className,
}: ClickAwayListenerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClickedInside, setIsClickedInside] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        onClickAway();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClickAway]);

  const handleClickInside = () => {
    setIsClickedInside(true);
  };

  return (
    <div
      ref={containerRef}
      onClick={handleClickInside}
      className={classNames(className)}
    >
      {children}
    </div>
  );
};
