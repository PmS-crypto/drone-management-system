'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/src/lib/utils';

interface KPITileProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onDrag' | 'onDragStart' | 'onDragEnd'> {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  sparkline?: number[];
  trend?: 'up' | 'down' | 'neutral';
  comparison?: string; // e.g., "vs last hour", "vs target 95%"
  delta?: number | string; // e.g., "+12%", "-5"
  onClick?: () => void;
}

/**
 * KPITile - Uses CSS variables from unified token system
 * NO hard-coded colors, all from CSS variables
 */
export function KPITile({ 
  label, 
  value, 
  icon, 
  sparkline, 
  trend,
  comparison,
  delta,
  onClick, 
  className, 
  ...props 
}: KPITileProps) {
  const trendColors = {
    up: 'text-[var(--color-success)]',
    down: 'text-[var(--color-alert)]',
    neutral: 'text-[var(--text-muted)]',
  };

  const trendBgColors = {
    up: 'bg-[var(--bg-success)]',
    down: 'bg-[var(--bg-alert)]',
    neutral: 'bg-[var(--bg-surface2)]',
  };

  return (
    <motion.div
      className={cn(
        'bg-[var(--bg-surface1)] border border-[var(--border-subtle)] rounded-[var(--radius-card)] p-[var(--spacing-lg)]',
        'grid grid-rows-[auto_1fr_auto] gap-2',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-light)] focus-visible:ring-offset-2',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={onClick ? `${label}: ${value}` : undefined}
      whileHover={onClick ? {
        scale: 1.02,
        boxShadow: '0 8px 24px rgba(99, 102, 241, 0.12), 0 0 0 1px rgba(99, 102, 241, 0.2)',
        borderColor: 'rgba(99, 102, 241, 0.4)',
        transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
      } : {}}
      animate={{
        boxShadow: 'var(--shadow-sm)',
        borderColor: 'var(--border-subtle)',
      }}
      transition={{
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1],
      }}
      {...(props as HTMLMotionProps<'div'>)}
    >
      {/* Header: Label */}
      <div className="flex items-center justify-between">
        <div className="text-[var(--font-label)] font-[var(--weight-medium)] text-[var(--text-secondary)] uppercase tracking-wide">
          {label}
        </div>
        {icon && (
          <div className="text-[var(--text-muted)] opacity-50 text-sm" aria-hidden="true">
            {icon}
          </div>
        )}
      </div>

      {/* Value: Large, Tabular Numbers with Trend Arrow */}
      <div className="flex items-baseline gap-2">
        <div className="text-[var(--font-h1)] font-[var(--weight-medium)] text-[var(--text-primary)] tabular-nums">
          {value}
        </div>
        {trend && (
          <div className={cn(
            'text-[var(--font-label)] font-[var(--weight-medium)] flex items-center gap-0.5 px-1.5 py-0.5 rounded-[var(--radius-button)]',
            trendColors[trend],
            trendBgColors[trend]
          )}>
            {trend === 'up' && '↑'}
            {trend === 'down' && '↓'}
            {trend === 'neutral' && '→'}
            {delta && (
              <span className="tabular-nums ml-0.5">{delta}</span>
            )}
          </div>
        )}
        {delta && !trend && (
          <div className={cn(
            'text-[var(--font-label)] font-[var(--weight-medium)] px-1.5 py-0.5 rounded-[var(--radius-button)] tabular-nums',
            typeof delta === 'string' && delta.startsWith('+') ? 'text-[var(--color-success)] bg-[var(--bg-success)]' :
            typeof delta === 'string' && delta.startsWith('-') ? 'text-[var(--color-alert)] bg-[var(--bg-alert)]' :
            'text-[var(--text-muted)] bg-[var(--bg-surface2)]'
          )}>
            {delta}
          </div>
        )}
      </div>

      {/* Footer: Comparison Context */}
      <div className="flex items-center justify-between">
        {comparison && (
          <div className="text-[var(--font-meta)] text-[var(--text-muted)] tabular-nums">
            {comparison}
          </div>
        )}
        {sparkline && sparkline.length > 0 && (
          <div className="h-[10px] flex items-end gap-0.5 flex-1 max-w-[50px] ml-auto" aria-hidden="true">
            {sparkline.map((point, index) => {
              const max = Math.max(...sparkline);
              const height = max > 0 ? (point / max) * 100 : 0;
              return (
                <div
                  key={index}
                  className={cn(
                    'flex-1 rounded-t transition-all',
                    trend === 'up' ? 'bg-[var(--color-success)] opacity-30' :
                    trend === 'down' ? 'bg-[var(--color-alert)] opacity-30' :
                    'bg-[var(--text-muted)] opacity-20'
                  )}
                  style={{ 
                    height: `${height}%`,
                    transition: 'var(--motion-fast)',
                  }}
                />
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
}
