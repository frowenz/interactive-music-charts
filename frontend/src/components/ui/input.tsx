import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <>
        <input
          type={type}
          className={cn(
            'font-rajdhani flex h-20 w-screen rounded-md border-input bg-background px-3 py-2 text-3xl ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium color:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed',
            className
          )}
          ref={ref}
          {...props}
        />
      </>
    );
  }
);

Input.displayName = 'Input';

export { Input };
