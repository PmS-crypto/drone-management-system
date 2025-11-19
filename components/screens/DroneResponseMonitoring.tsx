'use client';

import { useState, useEffect } from 'react';

interface DroneResponseMonitoringProps {
  data: any;
  onThreatAssessment: () => void;
}

export default function DroneResponseMonitoring({ data, onThreatAssessment }: DroneResponseMonitoringProps) {
  const { drone, timestamp } = data;
  const [statusMessages, setStatusMessages] = useState<string[]>([
    'No visual threat detected yet. Scanning for heat signatures...',
    'Standby for Luc\'s assessment...'
  ]);
  const [showToast, setShowToast] = useState(true);
  const [manualControlActive, setManualControlActive] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowToast(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleManualControl = () => {
    if (manualControlActive) return;
    setManualControlActive(true);
    setShowToast(false);
    setStatusMessages(prev => [
      'Manual control engaged. Operator override active.',
      'Autonomous path temporarily disabled.',
      ...prev,
    ]);
  };

  return (
    <div className="min-h-screen bg-neutral">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-6 right-6 bg-amber-500/10 border border-amber-500/30 text-white p-4 rounded-lg shadow-lg shadow-amber-500/10 z-50 animate-slide-in max-w-sm backdrop-blur-sm">
          <div className="font-medium mb-1.5 text-sm">Drone 2 Already Dispatching</div>
          <div className="text-xs text-white/70 mb-3">Drone 2 already dispatching autonomously. You can take manual control at any time.</div>
          <button
            onClick={() => setShowToast(false)}
            className="w-full bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded text-xs font-medium transition-all duration-200 border border-white/10"
          >
            Dismiss
          </button>
        </div>
      )}
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[24px] font-semibold text-white mb-2 tracking-tight leading-[1.3]">Drone Response Monitoring</h1>
          <p className="text-sm text-white/50">Live feed from Drone {drone.id}</p>
          {manualControlActive && (
            <div className="mt-3 inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-medium px-3 py-1.5 rounded-lg">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              Manual control active — joystick override engaged
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
          {/* Primary: Live Camera Feed (70%) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Live Feed */}
            <div className="bg-white/[0.02] border border-white/5 rounded-lg overflow-hidden shadow-md">
              <div className="bg-white/[0.02] border-b border-white/5 px-4 py-3 flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  <span className="text-[11px] font-semibold text-white/60 uppercase tracking-[0.5px]">Live</span>
                </div>
                <span className="text-white/50 text-xs font-mono">{timestamp}</span>
              </div>
              <div className="bg-black/40 aspect-video flex items-center justify-center relative">
                <div className="text-white/30 text-sm">📹 Live Drone Camera Feed</div>
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded text-white text-xs font-mono border border-white/10">
                  Drone {drone.id}
                </div>
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded text-white text-xs border border-white/10">
                  HD 1080p
                </div>
              </div>
            </div>

            {/* Real-time Status Updates */}
            <div className="bg-white/[0.02] border border-white/5 rounded-lg p-4 shadow-md">
              <div className="text-sm text-white/70 space-y-3">
                {statusMessages.map((msg, index) => (
                  <div key={index} className="flex items-start gap-3 animate-fade-in">
                    <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${index === 0 ? 'bg-amber-500' : 'bg-blue-500'}`}></span>
                    <span className="text-sm">{msg}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Secondary: Map & Status (30%) */}
          <div className="lg:col-span-3 space-y-4">
            {/* Building Map */}
            <div className="bg-white/[0.02] border border-white/5 rounded-lg p-4 shadow-md">
              <h3 className="text-[11px] font-semibold text-white/40 uppercase tracking-[0.5px] mb-3">Building Map</h3>
              <div className="bg-black/20 rounded-lg aspect-square relative border border-white/5 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-white/20 text-xs">
                  Building Layout
                </div>
                <div className="absolute top-1/4 left-1/3 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></div>
                <div className="absolute top-1/4 left-1/3 -ml-2 -mt-2 w-6 h-6 border border-red-500/50 rounded-full"></div>
                <div className="absolute top-1/4 left-1/3 translate-x-4 translate-y-4">
                  <div className="bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs px-2 py-1 rounded backdrop-blur-sm">Drone {drone.id}</div>
                </div>
                <div className="absolute bottom-1/4 right-1/4 bg-amber-500/10 border border-amber-500/20 rounded p-2 backdrop-blur-sm">
                  <div className="text-xs text-amber-400 font-medium">Gallery 3</div>
                </div>
              </div>
            </div>

            {/* Status Indicators */}
            <div className="bg-white/[0.02] border border-white/5 rounded-lg p-4 shadow-md">
              <h3 className="text-[11px] font-semibold text-white/40 uppercase tracking-[0.5px] mb-4">Status</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[11px] font-semibold text-white/40 uppercase tracking-[0.5px]">Battery</span>
                    <span className="text-base font-semibold text-white/80">{drone.battery.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className="bg-green-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${drone.battery}%` }}
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-white/5">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[11px] font-semibold text-white/40 uppercase tracking-[0.5px]">Distance to Threat</span>
                    <span className="text-base font-semibold text-white/80">{drone.distance.toFixed(1)}m</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/5">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[11px] font-semibold text-white/40 uppercase tracking-[0.5px]">Altitude</span>
                    <span className="text-base font-semibold text-white/80">{drone.altitude}m</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/5">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-semibold text-white/40 uppercase tracking-[0.5px]">Status</span>
                    <span className="text-sm font-medium text-white/70">📹 {drone.status}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button
                onClick={handleManualControl}
                disabled={manualControlActive}
                className={`w-full font-semibold py-3 px-4 rounded-md transition-all duration-150 min-h-[48px] ${
                  manualControlActive
                    ? 'bg-info/30 text-white/60 cursor-not-allowed border border-white/10'
                    : 'bg-info text-white hover:bg-info-hover active:bg-info/80 shadow-md hover:shadow-lg focus-visible:outline-2 focus-visible:outline-info focus-visible:outline-offset-2'
                }`}
              >
                {manualControlActive ? 'Manual Control Active' : 'Engage Manual Control'}
              </button>
              <button
                onClick={onThreatAssessment}
                className="w-full bg-white/5 text-white font-semibold py-3 px-4 rounded-md hover:bg-white/10 active:bg-white/15 transition-all duration-150 min-h-[48px] border border-white/10 hover:border-white/20 focus-visible:outline-2 focus-visible:outline-info focus-visible:outline-offset-2"
              >
                Proceed to Threat Assessment
              </button>
              <button className="w-full bg-white/5 text-white font-semibold py-3 px-4 rounded-md hover:bg-white/10 active:bg-white/15 transition-all duration-150 min-h-[48px] border border-white/10 hover:border-white/20 focus-visible:outline-2 focus-visible:outline-info focus-visible:outline-offset-2">
                Thermal View
              </button>
              <button className="w-full bg-white/5 text-white font-semibold py-3 px-4 rounded-md hover:bg-white/10 active:bg-white/15 transition-all duration-150 min-h-[48px] border border-white/10 hover:border-white/20 focus-visible:outline-2 focus-visible:outline-info focus-visible:outline-offset-2">
                Return to Base
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

