import React from 'react';
import { cn } from '@/src/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'quiet' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  loading?: boolean;
}

/**
 * Button - Uses CSS variables from unified token system
 * NO hard-coded colors, all from CSS variables
 */
export function Button({
  variant = 'secondary',
  size = 'md',
  className,
  children,
  loading = false,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-[var(--weight-medium)] rounded-[var(--radius-button)] transition-all focus-visible:outline-none disabled:opacity-30 disabled:cursor-not-allowed min-h-[36px] min-w-[44px]';

  const variants = {
    primary: 'text-[var(--text-inverse)] border border-transparent',
    secondary: 'bg-[var(--bg-surface2)] text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-[var(--border-muted)] hover:bg-[var(--bg-surface1)]',
    tertiary: 'bg-transparent text-[var(--text-primary)] hover:text-[var(--accent-primary)] hover:underline underline-offset-4 decoration-2',
    quiet: 'bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
    outline: 'bg-transparent text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-[var(--border-muted)] hover:bg-[var(--bg-surface2)]',
  };

  const sizes = {
    sm: 'text-[var(--font-body)] h-9 px-3',
    md: 'text-[var(--font-body)] h-9 px-4',
    lg: 'text-[var(--font-body)] h-10 px-5',
  };

  // Gradient background for primary buttons
  const getPrimaryGradient = () => {
    return 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-hover) 100%)';
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      style={{
        transition: 'var(--motion-normal)',
        boxShadow: variant === 'primary' ? 'var(--shadow-xs)' : 'none',
        background: variant === 'primary' ? getPrimaryGradient() : undefined,
      }}
      onMouseEnter={(e) => {
        if (!disabled && !loading) {
          if (variant === 'primary') {
            e.currentTarget.style.background = 'linear-gradient(135deg, var(--accent-hover) 0%, var(--accent-primary) 100%)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(99, 102, 241, 0.3), 0 0 0 1px rgba(99, 102, 241, 0.4)';
            e.currentTarget.style.transform = 'translateY(-1px)';
          } else if (variant === 'outline') {
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(99, 102, 241, 0.06) 0%, rgba(139, 141, 255, 0.1) 100%)';
            e.currentTarget.style.borderColor = 'var(--accent-primary)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.12), 0 0 0 1px rgba(99, 102, 241, 0.2)';
          }
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && !loading) {
          e.currentTarget.style.transform = '';
          if (variant === 'primary') {
            e.currentTarget.style.background = getPrimaryGradient();
            e.currentTarget.style.boxShadow = 'var(--shadow-xs)';
          } else if (variant === 'outline') {
            e.currentTarget.style.background = '';
            e.currentTarget.style.borderImage = '';
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.borderColor = '';
          }
        }
      }}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
}
