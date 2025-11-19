import React from 'react';
import { cn } from '@/src/lib/utils';

interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md';
  children: React.ReactNode;
}

/**
 * Tag - Uses CSS variables from unified token system
 * NO hard-coded colors, all from CSS variables
 */
export function Tag({ variant = 'default', size = 'md', className, children, ...props }: TagProps) {
  const variantStyles = {
    default: { backgroundColor: 'var(--bg-surface2)', color: 'var(--text-secondary)', borderColor: 'var(--border-subtle)' },
    success: { backgroundColor: 'var(--bg-surface2)', color: 'var(--color-success)', borderColor: 'var(--border-subtle)' },
    warning: { backgroundColor: 'var(--bg-surface2)', color: 'var(--color-warning)', borderColor: 'var(--border-subtle)' },
    error: { backgroundColor: 'var(--bg-surface2)', color: 'var(--color-alert)', borderColor: 'var(--border-subtle)' },
    info: { backgroundColor: 'var(--bg-surface2)', color: 'var(--color-info)', borderColor: 'var(--border-subtle)' },
  };

  const sizes = {
    sm: { padding: 'var(--spacing-xs) var(--spacing-sm)', fontSize: 'var(--font-label)' },
    md: { padding: 'var(--spacing-sm) var(--spacing-md)', fontSize: 'var(--font-body)' },
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-[var(--weight-medium)] rounded-[var(--radius-button)] border',
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
