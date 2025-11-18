'use client';

import { useState } from 'react';

type Mode = 'crisis' | 'analysis';
type Screen = 'dashboard' | 'alert' | 'drone' | 'threat' | 'coordination' | 'timeline' | 'evidence';

interface SidebarProps {
  mode: Mode;
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  onModeChange: (mode: Mode) => void;
}

export default function Sidebar({ mode, currentScreen, onNavigate, onModeChange }: SidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const crisisNavItems = [
    { id: 'dashboard' as Screen, label: 'Dashboard', icon: '📊' },
    { id: 'alert' as Screen, label: 'Crisis Alert', icon: '🔴' },
    { id: 'drone' as Screen, label: 'Drone Monitoring', icon: '🚁' },
    { id: 'threat' as Screen, label: 'Threat Assessment', icon: '⚠️' },
    { id: 'coordination' as Screen, label: 'Guard Coordination', icon: '👮' },
  ];

  const analysisNavItems = [
    { id: 'dashboard' as Screen, label: 'Dashboard', icon: '📊' },
    { id: 'timeline' as Screen, label: 'Incident Timeline', icon: '📅' },
    { id: 'evidence' as Screen, label: 'Evidence Detail', icon: '📋' },
  ];

  const navItems = mode === 'crisis' ? crisisNavItems : analysisNavItems;

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white/[0.02] border border-white/5 rounded-lg p-2 text-white/80 hover:text-white hover:bg-white/[0.03] transition-all duration-200"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 bottom-0 w-64 bg-white/[0.02] border-r border-white/5 flex flex-col z-40 transition-transform duration-200 ${
        isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
      {/* Logo/Header */}
      <div className="p-6 border-b border-white/5 relative">
        {/* Mobile Close Button */}
        <button
          onClick={() => setIsMobileOpen(false)}
          className="lg:hidden absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
            <span className="text-lg">🛡️</span>
          </div>
          <div>
            <div className="text-sm font-semibold text-white">Security Dashboard</div>
            <div className="text-xs text-white/40">Le Musée d'Art</div>
          </div>
        </div>
      </div>

      {/* Mode Toggle */}
      <div className="p-4 border-b border-white/5">
        <div className="flex gap-1 bg-white/[0.02] border border-white/5 rounded-lg p-1">
          <button
            onClick={() => {
              onModeChange('crisis');
              onNavigate('dashboard');
              setIsMobileOpen(false);
            }}
            className={`flex-1 px-3 py-2 rounded-md font-medium text-xs transition-all duration-200 ${
              mode === 'crisis'
                ? 'bg-red-500 text-white shadow-lg shadow-red-500/20'
                : 'text-white/50 hover:text-white/80'
            }`}
          >
            Crisis
          </button>
          <button
            onClick={() => {
              onModeChange('analysis');
              onNavigate('dashboard');
              setIsMobileOpen(false);
            }}
            className={`flex-1 px-3 py-2 rounded-md font-medium text-xs transition-all duration-200 ${
              mode === 'analysis'
                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                : 'text-white/50 hover:text-white/80'
            }`}
          >
            Analysis
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-1">
          {navItems.map((item) => {
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsMobileOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    : 'text-white/60 hover:text-white/80 hover:bg-white/[0.02]'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/5">
        <div className="text-xs text-white/30">
          <div className="font-medium text-white/50 mb-1">System Status</div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span>All systems operational</span>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

