import React from 'react';
import { cn } from '@/src/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'glass';
  children: React.ReactNode;
}

/**
 * Card - Linear style
 * 12-16px border-radius, frosted glass option, subtle borders
 * Hover: scale(1.02) + brighter border + soft glow
 */
export function Card({ variant = 'default', className, children, ...props }: CardProps) {
  const variants = {
    default: 'bg-bg-surface border border-border-default shadow-md hover:border-border-hover hover:shadow-lg',
    elevated: 'bg-bg-raised border border-border-default shadow-lg hover:border-border-hover hover:shadow-xl',
    glass: 'glass hover:border-border-hover hover:shadow-lg',
  };

  return (
    <div
      className={cn(
        'rounded-xl p-6 transition-all duration-200 hover-scale',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('mb-4', className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn('text-cardTitle font-semibold text-text-primary', className)} {...props}>
      {children}
    </h3>
  );
}

export function CardDescription({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('text-body text-text-secondary mt-2 leading-relaxed', className)} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('space-y-4', className)} {...props}>
      {children}
    </div>
  );
}

export function CardDivider() {
  return <div className="h-px bg-border-default my-4" />;
}
