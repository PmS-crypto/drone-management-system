'use client';

import { useState, useEffect } from 'react';
import { Header, Card, CardHeader, CardTitle, CardContent, Button, StatusPill } from '@/src/components/ui';
import { cn } from '@/src/lib/utils';

interface DroneResponseMonitoringProps {
  data: any;
  onThreatAssessment: () => void;
}

export default function DroneResponseMonitoring({ data, onThreatAssessment }: DroneResponseMonitoringProps) {
  const { drone, timestamp } = data;
  const [statusMessages, setStatusMessages] = useState<string[]>([
    'No visual threat detected yet. Scanning for heat signatures...',
    'Standby for Luc\'s assessment...',
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
    setStatusMessages((prev) => [
      'Manual control engaged. Operator override active.',
      'Autonomous path temporarily disabled.',
      ...prev,
    ]);
  };

  return (
    <div className="min-h-screen bg-bg-base animate-fade-in">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-6 right-6 glass-strong rounded-xl p-5 shadow-lg z-50 animate-fade-in-up max-w-sm border-warning/30">
          <div className="font-semibold mb-2 text-body">Drone 2 Already Dispatching</div>
          <div className="text-bodySmall text-text-secondary mb-4 leading-relaxed">
            Drone 2 already dispatching autonomously. You can take manual control at any time.
          </div>
          <Button variant="ghost" size="sm" className="w-full bg-bg-raised hover:bg-bg-surface border-border-default" onClick={() => setShowToast(false)}>
            Dismiss
          </Button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-gutter py-10">
        <Header
          title="Drone Response Monitoring"
          description={`Live feed from Drone ${drone.id}`}
        >
          {manualControlActive && (
            <StatusPill variant="info" size="md" className="inline-flex items-center gap-2">
              <span className="w-2 h-2 bg-accent-primary rounded-full animate-pulse" />
              Manual control active — joystick override engaged
            </StatusPill>
          )}
        </Header>

        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
          {/* Primary: Live Camera Feed (70%) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Live Feed */}
            <Card variant="glass" className="overflow-hidden">
              <div className="bg-bg-raised border-b border-border-default px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 bg-alert rounded-full animate-pulse"></span>
                  <span className="text-label font-semibold text-text-tertiary uppercase tracking-wider">Live</span>
                </div>
                <span className="text-meta text-text-tertiary font-mono">{timestamp}</span>
              </div>
              <div className="bg-black/60 aspect-video flex items-center justify-center relative backdrop-blur-sm">
                <div className="text-text-tertiary text-body">📹 Live Drone Camera Feed</div>
                <div className="absolute top-6 left-6 glass rounded-lg px-4 py-2 text-text-primary text-bodySmall font-mono">
                  Drone {drone.id}
                </div>
                <div className="absolute bottom-6 right-6 glass rounded-lg px-4 py-2 text-text-primary text-bodySmall">
                  HD 1080p
                </div>
              </div>
            </Card>

            {/* Real-time Status Updates */}
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="text-sectionHeader font-semibold text-text-primary">
                  Status Updates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-body text-text-secondary space-y-4">
                  {statusMessages.map((msg, index) => (
                    <div key={index} className="flex items-start gap-3 animate-fade-in">
                      <span
                        className={cn(
                          'w-2 h-2 rounded-full mt-2 flex-shrink-0',
                          index === 0 ? 'bg-warning' : 'bg-accent-primary'
                        )}
                      ></span>
                      <span className="text-body leading-relaxed">{msg}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Secondary: Map & Status (30%) */}
          <div className="lg:col-span-3 space-y-6">
            {/* Building Map */}
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="text-sectionHeader font-semibold text-text-primary">
                  Building Map
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="glass rounded-xl aspect-square relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-text-tertiary text-bodySmall">
                    Building Layout
                  </div>
                  <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-alert rounded-full animate-pulse"></div>
                  <div className="absolute top-1/4 left-1/3 -ml-3 -mt-3 w-8 h-8 border-2 border-alert/50 rounded-full"></div>
                  <div className="absolute top-1/4 left-1/3 translate-x-6 translate-y-6">
                    <div className="glass rounded-lg text-accent-primary text-bodySmall px-3 py-1.5 border-accent-border">
                      Drone {drone.id}
                    </div>
                  </div>
                  <div className="absolute bottom-1/4 right-1/4 glass rounded-lg p-3 border-warning/30">
                    <div className="text-bodySmall text-warning font-semibold">Gallery 3</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Status Indicators */}
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="text-sectionHeader font-semibold text-text-primary">
                  Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-label font-medium text-text-tertiary">
                        Battery
                      </span>
                      <span className="text-value font-semibold text-text-primary">
                        {drone.battery.toFixed(0)}%
                      </span>
                    </div>
                    <div className="w-full bg-bg-base rounded-full h-2 overflow-hidden">
                      <div
                        className={cn(
                          'h-full rounded-full transition-all duration-500',
                          drone.battery < 30 ? 'bg-alert animate-glow-pulse' : 'bg-success'
                        )}
                        style={{ width: `${drone.battery}%` }}
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border-default">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-label font-medium text-text-tertiary">
                        Distance to Threat
                      </span>
                      <span className="text-value font-semibold text-text-primary">
                        {drone.distance.toFixed(1)}m
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border-default">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-label font-medium text-text-tertiary">
                        Altitude
                      </span>
                      <span className="text-value font-semibold text-text-primary">{drone.altitude}m</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border-default">
                    <div className="flex justify-between items-center">
                      <span className="text-label font-medium text-text-tertiary">
                        Status
                      </span>
                      <span className="text-bodySmall font-medium text-text-secondary">📹 {drone.status}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                variant="primary"
                className="w-full"
                onClick={handleManualControl}
                disabled={manualControlActive}
              >
                {manualControlActive ? 'Manual Control Active' : 'Engage Manual Control'}
              </Button>
              <Button variant="ghost" className="w-full" onClick={onThreatAssessment}>
                Proceed to Threat Assessment
              </Button>
              <Button variant="ghost" className="w-full">
                Thermal View
              </Button>
              <Button variant="ghost" className="w-full">
                Return to Base
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
