import React from 'react';
import { cn } from '@/src/lib/utils';

interface ActivityRowProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  timestamp: string;
  onClick?: () => void;
}

/**
 * ActivityRow - Uses CSS variables from unified token system
 * NO hard-coded colors, all from CSS variables
 */
export function ActivityRow({ icon, title, description, timestamp, onClick, className, ...props }: ActivityRowProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-[var(--radius-card)] transition-all',
        'hover:shadow-[var(--shadow-xs)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-light)] focus-visible:ring-offset-2',
        onClick && 'cursor-pointer',
        className
      )}
      style={{
        paddingTop: 'var(--spacing-md)',
        paddingBottom: 'var(--spacing-md)',
        paddingLeft: 'var(--spacing-md)',
        paddingRight: 'var(--spacing-md)',
        minHeight: 'var(--row-height)',
        transition: 'var(--motion-normal)',
      }}
      onMouseEnter={(e) => {
        if (onClick) {
          e.currentTarget.style.backgroundColor = 'var(--bg-surface2)';
          e.currentTarget.style.boxShadow = 'var(--shadow-xs)';
        }
      }}
      onMouseLeave={(e) => {
        if (onClick) {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.boxShadow = 'none';
        }
      }}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={onClick ? `${title}. ${description || ''} ${timestamp}` : undefined}
      {...props}
    >
      {icon && (
        <div 
          className="w-8 h-8 rounded-[var(--radius-button)] flex items-center justify-center flex-shrink-0 border"
          style={{
            backgroundColor: 'var(--bg-surface2)',
            borderColor: 'var(--border-subtle)',
          }}
        >
          <div className="text-sm opacity-50" style={{ color: 'var(--text-muted)' }}>
            {icon}
          </div>
        </div>
      )}
      <div className="flex-1 min-w-0 grid grid-cols-[1fr_auto] gap-2 items-center">
        <div className="min-w-0">
          <div className="text-[var(--font-body)] font-[var(--weight-medium)] truncate" style={{ color: 'var(--text-primary)' }}>{title}</div>
          {description && (
            <div className="text-[var(--font-body)] truncate mt-0.5" style={{ color: 'var(--text-secondary)' }}>{description}</div>
          )}
        </div>
        <div className="text-[var(--font-meta)] tabular-nums flex-shrink-0 ml-3" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-family)' }}>{timestamp}</div>
      </div>
    </div>
  );
}
