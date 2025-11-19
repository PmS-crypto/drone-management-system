'use client';

import React, { useEffect } from 'react';
import { cn } from '@/src/lib/utils';

interface SlideOverProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  side?: 'left' | 'right';
}

export function SlideOver({ isOpen, onClose, title, children, side = 'right' }: SlideOverProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1050] flex">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-fade-in z-[1040]"
        onClick={onClose}
      />
      <div
        className={cn(
          'relative z-[1050] bg-surface-elevated border-border-default',
          'w-full max-w-md shadow-lg',
          'flex flex-col',
          side === 'right' ? 'ml-auto border-l' : 'mr-auto border-r',
          'animate-slide-in'
        )}
      >
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-border-divider">
            <h2 className="text-xl font-semibold text-text-primary">{title}</h2>
            <button
              onClick={onClose}
              className="text-text-tertiary hover:text-text-primary transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        <div className="flex-1 overflow-y-auto px-6 py-4">{children}</div>
      </div>
    </div>
  );
}

