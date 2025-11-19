import React from 'react';
import { cn } from '@/src/lib/utils';

interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md';
  children: React.ReactNode;
}

export function Tag({ variant = 'default', size = 'md', className, children, ...props }: TagProps) {
  const variants = {
    default: 'bg-bg-surface text-text-secondary border-border-default',
    success: 'bg-bg-surface text-success border-border-default',
    warning: 'bg-bg-surface text-warning border-border-default',
    error: 'bg-bg-surface text-alert border-border-default',
    info: 'bg-bg-surface text-info border-border-default',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-label',
    md: 'px-2.5 py-1 text-label',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-sm border',
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
