import { ReactNode, CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface MagicBentoProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function MagicBento({ children, className, style }: MagicBentoProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 auto-rows-fr gap-0",
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
}

interface MagicBentoItemProps {
  children: ReactNode;
  span?: number;
  rowSpan?: number;
  className?: string;
}

export function MagicBentoItem({
  children,
  span = 1,
  rowSpan = 1,
  className,
}: MagicBentoItemProps) {
  const style: CSSProperties = {
    gridColumn: `span ${span}`,
    gridRow: rowSpan > 1 ? `span ${rowSpan}` : 'auto',
  };

  return (
    <div
      className={cn("relative min-h-[200px] sm:min-h-[250px] md:min-h-[300px]", className)}
      style={style}
    >
      {children}
    </div>
  );
}

