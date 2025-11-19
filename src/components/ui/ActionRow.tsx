import React from 'react';
import { cn } from '@/src/lib/utils';
import { ChevronRightIcon } from './Icons';

interface ActionRowProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  label: string;
  onClick: () => void;
}

/**
 * ActionRow - Matches ActivityRow height and style
 * Uses CSS variables from unified token system
 */
export function ActionRow({ icon, label, onClick, className, ...props }: ActionRowProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-[var(--radius-card)] transition-all',
        'hover:shadow-[var(--shadow-xs)] cursor-pointer',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-light)] focus-visible:ring-offset-2',
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
        e.currentTarget.style.backgroundColor = 'var(--bg-surface2)';
        e.currentTarget.style.boxShadow = 'var(--shadow-xs)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
        e.currentTarget.style.boxShadow = 'none';
      }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={label}
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
      <div className="flex-1 min-w-0">
        <div className="text-[var(--font-body)] font-[var(--weight-medium)] truncate" style={{ color: 'var(--text-primary)' }}>{label}</div>
      </div>
      <div style={{ color: 'var(--text-muted)' }}>
        <ChevronRightIcon className="w-4 h-4 flex-shrink-0 opacity-40" aria-hidden="true" />
      </div>
    </div>
  );
}

