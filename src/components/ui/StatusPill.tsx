import React from 'react';
import { cn } from '@/src/lib/utils';

interface StatusPillProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'high';
  size?: 'sm' | 'md';
  children: React.ReactNode;
}

/**
 * StatusPill - Linear-style issue priority/tags
 * Small, pill-shaped, medium weight text, subtle background opacity
 */
export function StatusPill({ variant = 'default', size = 'sm', className, children, ...props }: StatusPillProps) {
  const variants = {
    default: 'bg-accent-soft text-accent-primary',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    error: 'bg-alert/10 text-alert',
    info: 'bg-info/10 text-info',
    high: 'bg-alert/15 text-alert font-semibold',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-label',
    md: 'px-2.5 py-1 text-bodySmall',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

