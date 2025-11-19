import React from 'react';
import { cn } from '@/src/lib/utils';

interface MetricTileProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  onClick?: () => void;
}

export function MetricTile({ label, value, icon, trend, onClick, className, ...props }: MetricTileProps) {
  return (
    <div
      className={cn(
        'bg-surface-surface border border-border-default rounded-md p-4',
        'transition-all duration-150 relative overflow-hidden',
        onClick && 'cursor-pointer hover:border-border-default hover:bg-surface-raised',
        className
      )}
      onClick={onClick}
      {...props}
    >
      {/* Subtle accent overlay */}
      {icon && (
        <div className="absolute top-0 right-0 w-16 h-16 bg-accent-soft opacity-30 rounded-full -mr-8 -mt-8" />
      )}
      
      <div className="relative">
        <div className="flex items-center justify-between mb-2">
          {icon && <div className="text-text-tertiary opacity-60">{icon}</div>}
          <div className="text-display font-semibold text-text-primary">{value}</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-label font-medium text-text-tertiary">
            {label}
          </div>
          {trend && (
            <div
              className={cn(
                'text-meta font-medium',
                trend.isPositive ? 'text-success/text' : 'text-error/text'
              )}
            >
              {trend.isPositive ? '+' : ''}{trend.value}%
            </div>
          )}
        </div>
        {/* Subtle sparkline */}
        {trend && (
          <div className="mt-2 h-[2px] bg-surface-sunken rounded-full overflow-hidden">
            <div
              className={cn(
                'h-full rounded-full transition-all duration-500',
                trend.isPositive ? 'bg-success/text' : 'bg-error/text'
              )}
              style={{ width: `${Math.min(100, Math.abs(trend.value))}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
