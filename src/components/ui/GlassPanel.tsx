import React from 'react';
import { cn } from '@/src/lib/utils';

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'strong';
  children: React.ReactNode;
}

/**
 * GlassPanel - Frosted glass effect component (Linear style)
 * Uses backdrop-filter blur with subtle background opacity
 */
export function GlassPanel({ variant = 'default', className, children, ...props }: GlassPanelProps) {
  return (
    <div
      className={cn(
        'rounded-xl transition-all duration-200',
        variant === 'default' ? 'glass' : 'glass-strong',
        'hover:border-border-hover hover:shadow-lg',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

