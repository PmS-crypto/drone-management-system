'use client';

import { useState, useEffect } from 'react';
import { Sidebar } from '@/src/components/ui';
import Dashboard from '@/components/screens/Dashboard';
import CrisisAlertCard from '@/components/screens/CrisisAlertCard';
import DroneResponseMonitoring from '@/components/screens/DroneResponseMonitoring';
import ThreatAssessment from '@/components/screens/ThreatAssessment';
import GuardCoordination from '@/components/screens/GuardCoordination';
import PostIncidentTimeline from '@/components/screens/PostIncidentTimeline';
import EvidenceDetail from '@/components/screens/EvidenceDetail';
import { mockData } from '@/data/mockData';

type Mode = 'crisis' | 'analysis';
type Screen = 'dashboard' | 'alert' | 'drone' | 'threat' | 'coordination' | 'timeline' | 'evidence';

export default function Home() {
  const [mode, setMode] = useState<Mode>('crisis');
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');
  const [data, setData] = useState(mockData);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => ({
        ...prev,
        drone: {
          ...prev.drone,
          battery: Math.max(85, prev.drone.battery - 0.1),
          distance: prev.drone.distance > 0 ? prev.drone.distance - 0.5 : 0,
        },
        timestamp: new Date().toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleScreenChange = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode);
    setCurrentScreen('dashboard');
  };

  const renderScreen = () => {
    if (currentScreen === 'dashboard') {
      return <Dashboard data={data} mode={mode} onNavigate={handleScreenChange} onModeChange={handleModeChange} />;
    }

    if (mode === 'crisis') {
      switch (currentScreen) {
        case 'alert':
          return (
            <CrisisAlertCard
              data={data}
              onDeploy={() => handleScreenChange('drone')}
              onManualReview={() => handleScreenChange('threat')}
            />
          );
        case 'drone':
          return (
            <DroneResponseMonitoring
              data={data}
              onThreatAssessment={() => handleScreenChange('threat')}
            />
          );
        case 'threat':
          return <ThreatAssessment data={data} onBroadcast={() => {}} />;
        case 'coordination':
          return <GuardCoordination data={data} onComplete={() => handleScreenChange('dashboard')} />;
        default:
          return null;
      }
    } else {
      switch (currentScreen) {
        case 'timeline':
          return (
            <PostIncidentTimeline
              data={data}
              onEventClick={(eventId) => {
                handleScreenChange('evidence');
                setTimeout(() => {
                  setData((prev: any) => ({ ...prev, selectedEventId: eventId }));
                }, 0);
              }}
            />
          );
        case 'evidence':
          return <EvidenceDetail data={data} onBack={() => handleScreenChange('timeline')} />;
        default:
          return null;
      }
    }
  };

  return (
    <main className="min-h-screen flex" style={{ backgroundColor: 'var(--bg-base)', color: 'var(--text-primary)' }}>
      <Sidebar
        mode={mode}
        currentScreen={currentScreen}
        onNavigate={handleScreenChange}
        onModeChange={handleModeChange}
      />
      <div className="flex-1">
        {renderScreen()}
      </div>
    </main>
  );
}
