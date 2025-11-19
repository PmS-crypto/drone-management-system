import React from 'react';
import { cn } from '@/src/lib/utils';

interface KPITileProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  sparkline?: number[];
  onClick?: () => void;
}

/**
 * KPITile - Linear style
 * Frosted glass, subtle sparkline, generous spacing
 */
export function KPITile({ label, value, icon, sparkline, onClick, className, ...props }: KPITileProps) {
  return (
    <div
      className={cn(
        'glass rounded-xl p-6 transition-all duration-200',
        onClick && 'cursor-pointer hover:border-border-hover hover:shadow-lg hover-scale',
        className
      )}
      onClick={onClick}
      {...props}
    >
      <div className="flex items-start justify-between mb-3">
        {icon && (
          <div className="text-text-tertiary opacity-60 mt-1">
            {icon}
          </div>
        )}
        <div className="text-value font-semibold text-text-primary">{value}</div>
      </div>
      <div className="flex items-center justify-between mb-2">
        <div className="text-label font-medium text-text-tertiary">
          {label}
        </div>
        {sparkline && sparkline.length > 0 && (
          <div className="text-label text-text-tertiary opacity-60">
            {sparkline[sparkline.length - 1] > 0 ? '↑' : '↓'}
          </div>
        )}
      </div>
      {/* Sparkline */}
      {sparkline && sparkline.length > 0 && (
        <div className="mt-3 h-[16px] flex items-end gap-0.5">
          {sparkline.map((point, index) => {
            const max = Math.max(...sparkline);
            const height = max > 0 ? (point / max) * 100 : 0;
            return (
              <div
                key={index}
                className="flex-1 bg-accent-primary opacity-40 rounded-t transition-all duration-200"
                style={{ height: `${height}%` }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
