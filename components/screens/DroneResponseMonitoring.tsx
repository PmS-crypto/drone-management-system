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
    <div className="min-h-screen animate-fade-in" style={{ backgroundColor: 'var(--bg-base)' }}>
      {/* Toast Notification */}
      {showToast && (
        <div 
          className="fixed top-6 right-6 rounded-[var(--radius-card)] p-5 shadow-[var(--shadow-lg)] z-50 animate-fade-in-up max-w-sm border"
          style={{
            backgroundColor: 'var(--bg-surface1)',
            borderColor: 'var(--color-warning)',
            padding: 'var(--card-padding)',
          }}
        >
          <div className="font-[var(--weight-semibold)] mb-2 text-[var(--font-body)]" style={{ color: 'var(--text-primary)' }}>Drone 2 Already Dispatching</div>
          <div className="text-[var(--font-meta)] mb-4" style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-lg)' }}>
            Drone 2 already dispatching autonomously. You can take manual control at any time.
          </div>
          <Button variant="secondary" size="sm" className="w-full" onClick={() => setShowToast(false)}>
            Dismiss
          </Button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6" style={{ paddingTop: 'var(--section-gap)' }}>
        <Header
          className="mt-0"
          title="Drone Response Monitoring"
          description={`Live feed from Drone ${drone.id}`}
        >
          {manualControlActive && (
            <StatusPill variant="info" size="md" className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--accent-primary)' }} />
              Manual control active — joystick override engaged
            </StatusPill>
          )}
        </Header>

        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6" style={{ gap: 'var(--spacing-2xl)' }}>
          {/* Primary: Live Camera Feed (70%) */}
          <div className="lg:col-span-7 space-y-6" style={{ gap: 'var(--spacing-2xl)' }}>
            {/* Live Feed */}
            <Card variant="default" className="overflow-hidden" padding="md" style={{ padding: 0 }}>
              <div className="border-b px-6 py-4 flex justify-between items-center" style={{ backgroundColor: 'var(--bg-surface2)', borderColor: 'var(--border-subtle)', padding: 'var(--spacing-lg) var(--spacing-2xl)' }}>
                <div className="flex items-center gap-3" style={{ gap: 'var(--spacing-md)' }}>
                  <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: 'var(--color-alert)' }}></span>
                  <span className="text-[var(--font-label)] font-[var(--weight-semibold)] uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Live</span>
                </div>
                <span className="text-[var(--font-meta)] tabular-nums" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-family)' }}>{timestamp}</span>
              </div>
              <div className="aspect-video flex items-center justify-center relative backdrop-blur-sm" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
                <div className="text-[var(--font-body)]" style={{ color: 'var(--text-muted)' }}>📹 Live Drone Camera Feed</div>
                <div className="absolute top-6 left-6 rounded-[var(--radius-button)] px-4 py-2 text-[var(--font-meta)] tabular-nums" style={{ backgroundColor: 'var(--bg-surface1)', color: 'var(--text-primary)', padding: 'var(--spacing-sm) var(--spacing-lg)' }}>
                  Drone {drone.id}
                </div>
                <div className="absolute bottom-6 right-6 rounded-[var(--radius-button)] px-4 py-2 text-[var(--font-meta)]" style={{ backgroundColor: 'var(--bg-surface1)', color: 'var(--text-primary)', padding: 'var(--spacing-sm) var(--spacing-lg)' }}>
                  HD 1080p
                </div>
              </div>
            </Card>

            {/* Real-time Status Updates */}
            <Card variant="default" padding="md">
              <CardHeader>
                <CardTitle className="text-[var(--font-h2)] font-[var(--weight-medium)]" style={{ color: 'var(--text-primary)' }}>
                  Status Updates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-[var(--font-body)] space-y-4" style={{ color: 'var(--text-secondary)', gap: 'var(--spacing-lg)' }}>
                  {statusMessages.map((msg, index) => (
                    <div key={index} className="flex items-start gap-3 animate-fade-in" style={{ gap: 'var(--spacing-md)' }}>
                      <span
                        className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                        style={{ backgroundColor: index === 0 ? 'var(--color-warning)' : 'var(--accent-primary)' }}
                      ></span>
                      <span className="text-[var(--font-body)]" style={{ lineHeight: '1.45' }}>{msg}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Secondary: Map & Status (30%) */}
          <div className="lg:col-span-3 space-y-6" style={{ gap: 'var(--spacing-2xl)' }}>
            {/* Building Map */}
            <Card variant="default" padding="md">
              <CardHeader>
                <CardTitle className="text-[var(--font-h2)] font-[var(--weight-medium)]" style={{ color: 'var(--text-primary)' }}>
                  Building Map
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-[var(--radius-card)] aspect-square relative overflow-hidden" style={{ backgroundColor: 'var(--bg-surface2)' }}>
                  <div className="absolute inset-0 flex items-center justify-center text-[var(--font-meta)]" style={{ color: 'var(--text-muted)' }}>
                    Building Layout
                  </div>
                  <div className="absolute top-1/4 left-1/3 w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: 'var(--color-alert)' }}></div>
                  <div className="absolute top-1/4 left-1/3 -ml-3 -mt-3 w-8 h-8 border-2 rounded-full" style={{ borderColor: 'var(--color-alert)' }}></div>
                  <div className="absolute top-1/4 left-1/3 translate-x-6 translate-y-6">
                    <div className="rounded-[var(--radius-button)] text-[var(--font-meta)] px-3 py-1.5 border" style={{ backgroundColor: 'var(--bg-surface1)', borderColor: 'var(--accent-primary)', color: 'var(--accent-primary)', padding: 'var(--spacing-xs) var(--spacing-md)' }}>
                      Drone {drone.id}
                    </div>
                  </div>
                  <div className="absolute bottom-1/4 right-1/4 rounded-[var(--radius-button)] p-3 border" style={{ backgroundColor: 'var(--bg-surface1)', borderColor: 'var(--color-warning)' }}>
                    <div className="text-[var(--font-meta)] font-[var(--weight-semibold)]" style={{ color: 'var(--color-warning)' }}>Gallery 3</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Status Indicators */}
            <Card variant="default" padding="md">
              <CardHeader>
                <CardTitle className="text-[var(--font-h2)] font-[var(--weight-medium)]" style={{ color: 'var(--text-primary)' }}>
                  Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6" style={{ gap: 'var(--spacing-2xl)' }}>
                  <div>
                    <div className="flex justify-between items-center mb-3" style={{ marginBottom: 'var(--spacing-md)' }}>
                      <span className="text-[var(--font-label)] font-[var(--weight-medium)]" style={{ color: 'var(--text-muted)' }}>
                        Battery
                      </span>
                      <span className="text-[var(--font-h2)] font-[var(--weight-semibold)] tabular-nums" style={{ color: 'var(--text-primary)' }}>
                        {drone.battery.toFixed(0)}%
                      </span>
                    </div>
                    <div className="w-full rounded-full h-2 overflow-hidden" style={{ backgroundColor: 'var(--bg-base)' }}>
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ 
                          width: `${drone.battery}%`,
                          backgroundColor: drone.battery < 30 ? 'var(--color-alert)' : 'var(--color-success)',
                          transition: 'var(--motion-slow)',
                        }}
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t" style={{ paddingTop: 'var(--spacing-lg)', borderColor: 'var(--border-subtle)' }}>
                    <div className="flex justify-between items-center mb-2" style={{ marginBottom: 'var(--spacing-sm)' }}>
                      <span className="text-[var(--font-label)] font-[var(--weight-medium)]" style={{ color: 'var(--text-muted)' }}>
                        Distance to Threat
                      </span>
                      <span className="text-[var(--font-h2)] font-[var(--weight-semibold)] tabular-nums" style={{ color: 'var(--text-primary)' }}>
                        {drone.distance.toFixed(1)}m
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t" style={{ paddingTop: 'var(--spacing-lg)', borderColor: 'var(--border-subtle)' }}>
                    <div className="flex justify-between items-center mb-2" style={{ marginBottom: 'var(--spacing-sm)' }}>
                      <span className="text-[var(--font-label)] font-[var(--weight-medium)]" style={{ color: 'var(--text-muted)' }}>
                        Altitude
                      </span>
                      <span className="text-[var(--font-h2)] font-[var(--weight-semibold)] tabular-nums" style={{ color: 'var(--text-primary)' }}>{drone.altitude}m</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t" style={{ paddingTop: 'var(--spacing-lg)', borderColor: 'var(--border-subtle)' }}>
                    <div className="flex justify-between items-center">
                      <span className="text-[var(--font-label)] font-[var(--weight-medium)]" style={{ color: 'var(--text-muted)' }}>
                        Status
                      </span>
                      <span className="text-[var(--font-meta)] font-[var(--weight-medium)]" style={{ color: 'var(--text-secondary)' }}>📹 {drone.status}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3" style={{ gap: 'var(--spacing-md)' }}>
              <Button
                variant="primary"
                className="w-full"
                onClick={handleManualControl}
                disabled={manualControlActive}
              >
                {manualControlActive ? 'Manual Control Active' : 'Engage Manual Control'}
              </Button>
              <Button variant="tertiary" className="w-full" onClick={onThreatAssessment}>
                Proceed to Threat Assessment
              </Button>
              <Button variant="tertiary" className="w-full">
                Thermal View
              </Button>
              <Button variant="tertiary" className="w-full">
                Return to Base
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
