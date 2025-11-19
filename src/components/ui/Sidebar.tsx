'use client';

import { useState } from 'react';
import { cn } from '@/src/lib/utils';
import {
  DashboardIcon,
  AlertIcon,
  DroneIcon,
  ThreatIcon,
  GuardIcon,
  TimelineIcon,
  EvidenceIcon,
  XIcon,
  StatusIcon,
} from './Icons';

type Mode = 'crisis' | 'analysis';
type Screen = 'dashboard' | 'alert' | 'drone' | 'threat' | 'coordination' | 'timeline' | 'evidence';

interface SidebarProps {
  mode: Mode;
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  onModeChange: (mode: Mode) => void;
}

/**
 * Sidebar - Uses CSS variables from unified token system
 * NO hard-coded colors, all from CSS variables
 */
export function Sidebar({ mode, currentScreen, onNavigate, onModeChange }: SidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const crisisNavItems = [
    { id: 'dashboard' as Screen, label: 'Dashboard', icon: DashboardIcon },
    { id: 'alert' as Screen, label: 'Crisis Alert', icon: AlertIcon },
    { id: 'drone' as Screen, label: 'Drone Monitoring', icon: DroneIcon },
    { id: 'threat' as Screen, label: 'Threat Assessment', icon: ThreatIcon },
    { id: 'coordination' as Screen, label: 'Guard Coordination', icon: GuardIcon },
  ];

  const analysisNavItems = [
    { id: 'dashboard' as Screen, label: 'Dashboard', icon: DashboardIcon },
    { id: 'timeline' as Screen, label: 'Incident Timeline', icon: TimelineIcon },
    { id: 'evidence' as Screen, label: 'Evidence Detail', icon: EvidenceIcon },
  ];

  const navItems = mode === 'crisis' ? crisisNavItems : analysisNavItems;

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 border rounded-[var(--radius-button)] p-2.5 shadow-[var(--shadow-xs)] transition-all"
        style={{
          backgroundColor: 'var(--bg-surface1)',
          borderColor: 'var(--border-subtle)',
          color: 'var(--text-secondary)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = 'var(--text-primary)';
          e.currentTarget.style.backgroundColor = 'var(--bg-surface2)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = 'var(--text-secondary)';
          e.currentTarget.style.backgroundColor = 'var(--bg-surface1)';
        }}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 backdrop-blur-sm z-40"
          style={{ backgroundColor: 'var(--bg-overlay)' }}
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'border-r flex flex-col z-40 transition-all shadow-[var(--shadow-md)]',
          'fixed left-0 top-0 bottom-0',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full',
          isCollapsed ? 'w-[64px]' : 'w-[240px]',
          'lg:relative lg:translate-x-0 lg:flex-shrink-0'
        )}
        style={{
          backgroundColor: 'var(--bg-surface1)',
          borderColor: 'var(--border-subtle)',
          transition: 'var(--motion-normal)',
        }}
        aria-label="Main navigation"
      >
        {/* Logo/Header */}
        <div className="py-6 px-5 border-b relative" style={{ borderColor: 'var(--border-subtle)' }}>
          <button
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden absolute top-4 right-4 transition-colors"
            style={{ color: 'var(--text-muted)' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; }}
            aria-label="Close menu"
          >
            <XIcon className="w-4 h-4" />
          </button>
          <div className={cn('flex items-center gap-3', isCollapsed && 'justify-center')}>
            {!isCollapsed && (
              <div 
                className="w-8 h-8 rounded-[var(--radius-button)] flex items-center justify-center flex-shrink-0 border"
                style={{
                  backgroundColor: 'var(--bg-surface2)',
                  borderColor: 'var(--border-subtle)',
                }}
              >
                <div style={{ color: 'var(--text-muted)' }}>
                  <StatusIcon className="w-4 h-4 opacity-60" aria-hidden="true" />
                </div>
              </div>
            )}
            {!isCollapsed && (
              <div>
                <div className="text-[var(--font-h2)] font-[var(--weight-medium)]" style={{ color: 'var(--text-primary)' }}>Security</div>
                <div className="text-[var(--font-meta)]" style={{ color: 'var(--text-muted)' }}>Dashboard</div>
              </div>
            )}
          </div>
          {/* Collapse Toggle (Desktop only) - More Visible */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={cn(
              'hidden lg:flex absolute transition-all rounded-[var(--radius-button)] items-center justify-center',
              isCollapsed ? 'top-4 left-2 right-2' : 'top-4 right-4'
            )}
            style={{ 
              color: 'var(--text-primary)',
              backgroundColor: 'var(--bg-surface2)',
              border: '1px solid var(--border-subtle)',
              padding: isCollapsed ? 'var(--spacing-md)' : 'var(--spacing-sm)',
              width: isCollapsed ? 'auto' : '32px',
              height: '32px',
              boxShadow: 'var(--shadow-xs)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-surface3)';
              e.currentTarget.style.borderColor = 'var(--border-muted)';
              e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-surface2)';
              e.currentTarget.style.borderColor = 'var(--border-subtle)';
              e.currentTarget.style.boxShadow = 'var(--shadow-xs)';
            }}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-expanded={!isCollapsed}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {isCollapsed ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              )}
            </svg>
          </button>
        </div>

        {/* Mode Toggle - Hidden when collapsed - iOS Segmented Control Style */}
        {!isCollapsed && (
          <div className="px-5 py-4 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
            <div 
              className="relative flex rounded-[var(--radius-button)] p-0.5" 
              style={{ 
                backgroundColor: 'var(--bg-surface3)',
              }}
            >
              {/* Sliding Background Pill */}
              <div
                className="absolute top-0.5 bottom-0.5 rounded-[var(--radius-button)] transition-all"
                style={{
                  width: 'calc(50% - 2px)',
                  left: mode === 'crisis' ? '2px' : 'calc(50% + 2px)',
                  backgroundColor: 'var(--bg-surface1)',
                  boxShadow: 'var(--shadow-xs)',
                  transition: 'left var(--motion-normal) cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              />
              {/* Buttons */}
              <button
                onClick={() => {
                  onModeChange('crisis');
                  onNavigate('dashboard');
                  setIsMobileOpen(false);
                }}
                className={cn(
                  'relative z-10 flex-1 px-3 py-1.5 rounded-[var(--radius-button)] font-[var(--weight-medium)] text-[var(--font-body)] transition-colors'
                )}
                style={{
                  color: mode === 'crisis' ? 'var(--text-primary)' : 'var(--text-muted)',
                  transition: 'color var(--motion-fast)',
                  borderRight: mode === 'crisis' ? '1px solid var(--border-subtle)' : 'none',
                }}
                onMouseEnter={(e) => {
                  if (mode !== 'crisis') {
                    e.currentTarget.style.color = 'var(--text-secondary)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (mode !== 'crisis') {
                    e.currentTarget.style.color = 'var(--text-muted)';
                  }
                }}
              >
                Crisis
              </button>
              <button
                onClick={() => {
                  onModeChange('analysis');
                  onNavigate('dashboard');
                  setIsMobileOpen(false);
                }}
                className={cn(
                  'relative z-10 flex-1 px-3 py-1.5 rounded-[var(--radius-button)] font-[var(--weight-medium)] text-[var(--font-body)] transition-colors'
                )}
                style={{
                  color: mode === 'analysis' ? 'var(--text-primary)' : 'var(--text-muted)',
                  transition: 'color var(--motion-fast)',
                  borderRight: mode === 'analysis' ? '1px solid var(--border-subtle)' : 'none',
                }}
                onMouseEnter={(e) => {
                  if (mode !== 'analysis') {
                    e.currentTarget.style.color = 'var(--text-secondary)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (mode !== 'analysis') {
                    e.currentTarget.style.color = 'var(--text-muted)';
                  }
                }}
              >
                Analysis
              </button>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Main navigation">
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = currentScreen === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsMobileOpen(false);
                  }}
                  className={cn(
                    'w-full flex items-center rounded-[var(--radius-button)] font-[var(--weight-medium)] text-[var(--font-body)]',
                    'transition-all relative group',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-light)] focus-visible:ring-offset-2',
                    isActive ? 'shadow-[var(--shadow-xs)]' : '',
                    isCollapsed ? 'justify-center px-2 py-2.5' : 'gap-3 px-3 py-2.5'
                  )}
                  style={{
                    backgroundColor: isActive ? 'var(--accent-light)' : 'transparent',
                    color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                    transition: 'var(--motion-normal)',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'var(--bg-surface2)';
                      e.currentTarget.style.color = 'var(--text-primary)';
                      e.currentTarget.style.boxShadow = 'var(--shadow-xs)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = 'var(--text-secondary)';
                      e.currentTarget.style.boxShadow = 'none';
                    }
                  }}
                  aria-label={isCollapsed ? item.label : undefined}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon 
                    className={cn(
                      'w-6 h-6 transition-opacity flex-shrink-0',
                      isActive ? 'opacity-100' : 'opacity-60 group-hover:opacity-80'
                    )} 
                    aria-hidden="true" 
                  />
                  {!isCollapsed && (
                    <span className="flex-1 text-left">{item.label}</span>
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        {!isCollapsed && (
          <div className="px-5 py-4 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
            <div className="text-[var(--font-meta)]" style={{ color: 'var(--text-muted)' }}>
              <div className="font-[var(--weight-medium)] mb-1.5" style={{ color: 'var(--text-secondary)' }}>System Status</div>
              <div className="flex items-center gap-2" aria-label="System status: Operational">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: 'var(--color-success)' }} aria-hidden="true"></span>
                <span>Operational</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
