import React from 'react';
import { cn } from '@/src/lib/utils';

interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function ScrollArea({ className, children, ...props }: ScrollAreaProps) {
  return (
    <div
      className={cn(
        'overflow-y-auto',
        'scrollbar-thin scrollbar-thumb-surface-panel scrollbar-track-transparent',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

