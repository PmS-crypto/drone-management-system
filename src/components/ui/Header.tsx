'use client';

import React from 'react';
import { cn } from '@/src/lib/utils';
import { ThemeSwitcher } from './ThemeSwitcher';

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  sticky?: boolean;
}

/**
 * Header - Uses CSS variables from unified token system
 * Enhanced with sticky positioning and backdrop-blur for smooth content gliding
 * NO hard-coded colors, all from CSS variables
 */
export function Header({ title, description, actions, className, sticky = false, ...props }: HeaderProps) {
  return (
    <div 
      className={cn(
        'mb-[var(--spacing-2xl)] mt-0',
        sticky && 'sticky top-0 z-50 backdrop-blur-xl',
        className
      )}
      style={sticky ? {
        backgroundColor: 'transparent',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        backdropFilter: 'blur(24px) saturate(180%)',
      } : {}}
      {...props}
    >
      <div className="flex items-start justify-between">
        <div>
          <h1 
            className="text-[var(--font-display)] font-[var(--weight-semibold)] text-[var(--text-primary)] mb-2 mt-0 tracking-tight"
            style={{ lineHeight: '1.2', letterSpacing: '-0.3px' }}
          >
            {title}
          </h1>
          {description && (
            <p 
              className="text-[var(--font-body)] text-[var(--text-secondary)] leading-relaxed max-w-3xl"
              style={{ lineHeight: '1.45' }}
            >
              {description}
            </p>
          )}
        </div>
        <div className="flex items-center gap-3">
          {actions}
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
}
