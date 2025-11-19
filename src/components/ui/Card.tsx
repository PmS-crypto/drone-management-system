'use client';

import React, { useState } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/src/lib/utils';

interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onDrag' | 'onDragStart' | 'onDragEnd'> {
  variant?: 'default' | 'surface2' | 'surface3';
  padding?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
}

/**
 * Card - Uses CSS variables from unified token system
 * Enhanced with framer-motion hover animations (scale 1.02x + glowing border)
 * NO hard-coded colors, all from CSS variables
 */
export function Card({ 
  variant = 'default', 
  padding = 'md',
  interactive = false,
  className, 
  children, 
  ...props 
}: CardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const variantStyles = {
    default: 'bg-[var(--bg-surface1)] border-[var(--border-subtle)]',
    surface2: 'bg-[var(--bg-surface2)] border-[var(--border-muted)]',
    surface3: 'bg-[var(--bg-surface3)] border-[var(--border-muted)]',
  };

  const paddingStyles = {
    sm: 'p-[var(--spacing-md)]',
    md: 'p-[var(--card-padding)]',
    lg: 'p-[var(--spacing-3xl)]',
  };

  return (
    <motion.div
      className={cn(
        'border rounded-[var(--radius-card)]',
        variantStyles[variant],
        paddingStyles[padding],
        interactive && 'cursor-pointer',
        className
      )}
      style={{
        boxShadow: variant === 'default' ? 'var(--shadow-sm)' : 
                   variant === 'surface2' ? 'var(--shadow-xs)' : 
                   'var(--shadow-xs)',
      }}
      onHoverStart={() => interactive && setIsHovered(true)}
      onHoverEnd={() => interactive && setIsHovered(false)}
      whileHover={interactive ? {
        scale: 1.02,
        transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
      } : {}}
      animate={{
        boxShadow: variant === 'default' ? 'var(--shadow-sm)' : 
                   variant === 'surface2' ? 'var(--shadow-xs)' : 
                   'var(--shadow-xs)',
        borderColor: variant === 'default' ? 'var(--border-subtle)' :
                     variant === 'surface2' ? 'var(--border-muted)' :
                     'var(--border-muted)',
      }}
      transition={{
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1],
      }}
      {...(props as HTMLMotionProps<'div'>)}
    >
      {children}
    </motion.div>
  );
}

export function CardHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('mb-[var(--spacing-lg)]', className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 
      className={cn('text-[var(--font-h2)] font-[var(--weight-medium)] text-[var(--text-primary)]', className)} 
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p 
      className={cn('text-[var(--font-body)] text-[var(--text-secondary)] mt-1.5', className)} 
      style={{ lineHeight: 'var(--font-body)' }}
      {...props}
    >
      {children}
    </p>
  );
}

export function CardContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('space-y-1 rounded-[var(--radius-button)]', className)} {...props}>
      {children}
    </div>
  );
}

export function CardDivider() {
  return <div className="h-px bg-[var(--border-subtle)] my-[var(--spacing-lg)]" />;
}
