// BigButton.tsx
import * as React from 'react';
import { cn } from '@/lib/utils';

interface BigButtonProps {
  className?: string;
  text: string;
  color?: string;
}

const BigButton = React.forwardRef<HTMLInputElement, BigButtonProps>(
  ({ className, text, color, ...props}, ref) => {
    return (
      <div
        className={cn(
          'font-rajdhani flex h-20 items-center rounded-md border-input bg-background px-10 py-2 text-3xl ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium color:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer',
          className
        )}
        style={{ backgroundColor: color }}
        {...props}
      >
        {text}
      </div>
    );
  }
);

BigButton.displayName = 'BigButton';

export { BigButton };
