import React from 'react';
import { cn } from '@/src/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'quiet' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

/**
 * Button - Linear style
 * Ghost by default (transparent bg, colored border/text)
 * Solid indigo only for primary actions
 */
export function Button({
  variant = 'ghost',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base disabled:opacity-30 disabled:cursor-not-allowed hover-scale';

  const variants = {
    primary: 'bg-accent-primary text-white hover:bg-accent-hover active:scale-[0.98] shadow-md hover:shadow-lg hover:shadow-glow',
    secondary: 'bg-bg-raised text-text-primary border border-border-default hover:border-border-hover hover:bg-bg-surface',
    ghost: 'bg-transparent text-text-primary border border-border-default hover:border-border-hover hover:bg-bg-raised',
    quiet: 'bg-transparent text-text-secondary hover:text-text-primary hover:bg-bg-raised',
    danger: 'bg-alert text-white hover:bg-alert/90 active:scale-[0.98] shadow-md',
  };

  const sizes = {
    sm: 'text-bodySmall h-9 px-4',
    md: 'text-body h-10 px-5',
    lg: 'text-body h-12 px-6',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
