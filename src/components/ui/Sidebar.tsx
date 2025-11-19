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
 * Sidebar - Linear style
 * Ultra-minimal, icons + text always visible, active item has bold text + thin left indigo line
 */
export function Sidebar({ mode, currentScreen, onNavigate, onModeChange }: SidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

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
        className="lg:hidden fixed top-6 left-6 z-50 glass rounded-xl p-3 text-text-secondary hover:text-text-primary hover:border-border-hover transition-all duration-200"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'fixed left-0 top-0 bottom-0 w-[240px] bg-bg-sunken border-r border-border-default',
          'flex flex-col z-40 transition-transform duration-200',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Logo/Header */}
        <div className="p-6 border-b border-border-default">
          <button
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden absolute top-4 right-4 text-text-tertiary hover:text-text-primary transition-colors"
          >
            <XIcon className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-bg-raised border border-border-default flex items-center justify-center">
              <StatusIcon className="w-4 h-4 text-text-tertiary opacity-60" />
            </div>
            <div>
              <div className="text-cardTitle font-semibold text-text-primary">Security</div>
              <div className="text-bodySmall text-text-tertiary">Dashboard</div>
            </div>
          </div>
        </div>

        {/* Mode Toggle */}
        <div className="p-4 border-b border-border-default">
          <div className="flex gap-1 bg-bg-base border border-border-default rounded-xl p-1">
            <button
              onClick={() => {
                onModeChange('crisis');
                onNavigate('dashboard');
                setIsMobileOpen(false);
              }}
              className={cn(
                'flex-1 px-4 py-2 rounded-md font-medium text-body transition-all duration-200',
                mode === 'crisis'
                  ? 'bg-bg-raised text-text-primary shadow-sm'
                  : 'text-text-tertiary hover:text-text-secondary'
              )}
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
                'flex-1 px-4 py-2 rounded-md font-medium text-body transition-all duration-200',
                mode === 'analysis'
                  ? 'bg-bg-raised text-text-primary shadow-sm'
                  : 'text-text-tertiary hover:text-text-secondary'
              )}
            >
              Analysis
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3">
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
                    'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-body font-medium',
                    'transition-all duration-200 relative',
                    isActive
                      ? 'bg-accent-soft text-text-primary font-semibold'
                      : 'text-text-secondary hover:text-text-primary hover:bg-bg-raised'
                  )}
                >
                  {/* Active left border */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-accent-primary rounded-r-full" />
                  )}
                  <Icon className={cn('w-4 h-4', isActive ? 'opacity-100' : 'opacity-60')} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border-default">
          <div className="text-bodySmall text-text-tertiary">
            <div className="font-semibold text-text-secondary mb-2">System Status</div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-success rounded-full animate-pulse"></span>
              <span>Operational</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
