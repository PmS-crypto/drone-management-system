'use client';

import { Header, KPITile, Card, CardHeader, CardTitle, CardContent, ActionList, ActivityRow, Button } from '@/src/components/ui';
import { ActivityIcon } from '@/src/components/ui/Icons';

type Screen = 'dashboard' | 'alert' | 'drone' | 'threat' | 'coordination' | 'timeline' | 'evidence';

interface DashboardProps {
  data: any;
  mode: 'crisis' | 'analysis';
  onNavigate: (screen: Screen) => void;
}

export default function Dashboard({ data, mode, onNavigate }: DashboardProps) {
  if (!data) {
    return (
      <div className="min-h-screen bg-bg-base">
        <div className="max-w-7xl mx-auto px-gutter py-10">
          <div className="text-text-primary">Loading...</div>
        </div>
      </div>
    );
  }

  const { alert, drone, timeline } = data || {};
  const recentIncidents = timeline?.slice(-3).reverse() || [];
  const activeAlerts = alert?.confidence >= 70 ? 1 : 0;

  const stats = [
    {
      label: 'Active Alerts',
      value: activeAlerts,
      onClick: () => onNavigate('alert'),
    },
    {
      label: 'Active Drones',
      value: 1,
      onClick: () => onNavigate('drone'),
    },
    {
      label: 'System Health',
      value: `${alert?.sensorHealth || 95}%`,
    },
    {
      label: 'Recent Incidents',
      value: timeline?.length || 0,
      onClick: () => onNavigate('timeline'),
    },
  ];

  const quickActions = mode === 'crisis'
    ? [
        { label: 'View Active Alert', screen: 'alert' as Screen },
        { label: 'Monitor Drone', screen: 'drone' as Screen },
        { label: 'Assess Threat', screen: 'threat' as Screen },
        { label: 'Coordinate Guards', screen: 'coordination' as Screen },
      ]
    : [
        { label: 'View Timeline', screen: 'timeline' as Screen },
        { label: 'Review Evidence', screen: 'evidence' as Screen },
      ];

  return (
    <div className="min-h-screen bg-bg-base animate-fade-in">
      <div className="max-w-7xl mx-auto px-gutter py-10">
          <Header
            title="Dashboard"
            description={
              mode === 'crisis'
                ? 'Real-time security monitoring and crisis response'
                : 'Post-incident analysis and evidence review'
            }
          />

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-section">
            {stats.map((stat, index) => (
              <KPITile
                key={index}
                label={stat.label}
                value={stat.value}
                onClick={stat.onClick}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              />
            ))}
          </div>

          {/* 2-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-section">
            {/* Quick Actions */}
            <Card variant="glass" className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <CardHeader>
                <CardTitle className="text-sectionHeader font-semibold text-text-primary">
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ActionList
                  items={quickActions.map((action) => ({
                    label: action.label,
                    onClick: () => onNavigate(action.screen),
                  }))}
                />
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card variant="glass" className="animate-fade-in-up" style={{ animationDelay: '250ms' }}>
              <CardHeader>
                <CardTitle className="text-sectionHeader font-semibold text-text-primary">
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recentIncidents.length > 0 ? (
                  <div className="space-y-3">
                    {recentIncidents.map((incident: any, index: number) => (
                      <ActivityRow
                        key={index}
                        icon={<ActivityIcon className="w-4 h-4" />}
                        title={incident.event}
                        description={incident.details}
                        timestamp={incident.time}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="py-16 text-center">
                    <ActivityIcon className="w-10 h-10 text-text-tertiary opacity-40 mx-auto mb-4" />
                    <div className="text-body text-text-secondary">No recent activity</div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Alert Status */}
          {mode === 'crisis' && alert && (
            <Card variant="glass" className="mb-section animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <CardHeader>
                <CardTitle className="text-sectionHeader font-semibold text-text-primary">
                  Current Alert Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <div className="text-label font-medium text-text-tertiary mb-2">Location</div>
                    <div className="text-value font-semibold text-text-primary">{alert?.location || 'N/A'}</div>
                  </div>
                  <div>
                    <div className="text-label font-medium text-text-tertiary mb-2">Confidence</div>
                    <div className="text-value font-semibold text-text-primary">{alert?.confidence || 0}%</div>
                  </div>
                  <div>
                    <div className="text-label font-medium text-text-tertiary mb-2">Recommended Action</div>
                    <div className="text-value font-semibold text-text-primary">{alert?.recommendedAction || 'N/A'}</div>
                  </div>
                </div>
                <Button variant="ghost" className="w-full" onClick={() => onNavigate('alert')}>
                  View Full Alert Details
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Drone Status */}
          {mode === 'crisis' && drone && (
            <Card variant="glass" className="animate-fade-in-up" style={{ animationDelay: '350ms' }}>
              <CardHeader>
                <CardTitle className="text-sectionHeader font-semibold text-text-primary">
                  Active Drone Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                  <div>
                    <div className="text-label font-medium text-text-tertiary mb-2">Drone ID</div>
                    <div className="text-value font-semibold text-text-primary">Drone {drone?.id || 'N/A'}</div>
                  </div>
                  <div>
                    <div className="text-label font-medium text-text-tertiary mb-2">Battery</div>
                    <div className="text-value font-semibold text-text-primary">{drone?.battery?.toFixed(0) || '0'}%</div>
                  </div>
                  <div>
                    <div className="text-label font-medium text-text-tertiary mb-2">Distance</div>
                    <div className="text-value font-semibold text-text-primary">{drone?.distance?.toFixed(1) || '0.0'}m</div>
                  </div>
                  <div>
                    <div className="text-label font-medium text-text-tertiary mb-2">Status</div>
                    <div className="text-value font-semibold text-text-primary">{drone?.status || 'Unknown'}</div>
                  </div>
                </div>
                <Button variant="ghost" className="w-full" onClick={() => onNavigate('drone')}>
                  View Live Feed
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
    </div>
  );
}
