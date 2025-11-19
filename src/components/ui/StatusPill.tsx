import React from 'react';
import { cn } from '@/src/lib/utils';

interface StatusPillProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'high';
  size?: 'sm' | 'md';
  children: React.ReactNode;
}

/**
 * StatusPill - Uses CSS variables from unified token system
 * NO hard-coded colors, all from CSS variables
 */
export function StatusPill({ variant = 'default', size = 'sm', className, children, ...props }: StatusPillProps) {
  const variantStyles = {
    default: { backgroundColor: 'var(--accent-light)', color: 'var(--accent-primary)' },
    success: { backgroundColor: 'var(--bg-success)', color: 'var(--color-success)' },
    warning: { backgroundColor: 'var(--bg-warning)', color: 'var(--color-warning)' },
    error: { backgroundColor: 'var(--bg-alert)', color: 'var(--color-alert)' },
    info: { backgroundColor: 'var(--bg-info)', color: 'var(--color-info)' },
    high: { backgroundColor: 'var(--bg-alert)', color: 'var(--color-alert)', fontWeight: 'var(--weight-medium)' },
  };

  const sizes = {
    sm: { padding: 'var(--spacing-xs) var(--spacing-sm)', fontSize: 'var(--font-label)' },
    md: { padding: 'var(--spacing-sm) var(--spacing-md)', fontSize: 'var(--font-body)' },
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-[var(--weight-medium)] rounded-[var(--radius-full)]',
        className
      )}
      style={{
        ...variantStyles[variant],
        ...sizes[size],
      }}
      {...props}
    >
      {children}
    </span>
  );
}
