'use client';

import { Header, KPITile, Card, CardHeader, CardTitle, CardContent, ActionList, ActivityRow, Button } from '@/src/components/ui';
import { ActionRow } from '@/src/components/ui/ActionRow';
import { AlertIcon, DroneIcon, ThreatIcon, GuardIcon, TimelineIcon, EvidenceIcon, ChevronRightIcon } from '@/src/components/ui/Icons';
import { ActivityIcon } from '@/src/components/ui/Icons';
import { motion } from 'framer-motion';

type Screen = 'dashboard' | 'alert' | 'drone' | 'threat' | 'coordination' | 'timeline' | 'evidence';

interface DashboardProps {
  data: any;
  mode: 'crisis' | 'analysis';
  onNavigate: (screen: Screen) => void;
}

/**
 * Dashboard - Trimmed, Contextual, Glanceable
 * Removed redundancy, added contextual comparisons, tighter spacing
 */
export default function Dashboard({ data, mode, onNavigate }: DashboardProps) {
  // Loading state with skeleton
  if (!data) {
    return (
      <div className="min-h-screen animate-fade-in" style={{ backgroundColor: 'var(--bg-base)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6" style={{ paddingTop: 'var(--section-gap)' }}>
          <div className="mb-6">
            <div className="h-8 w-48 rounded-[var(--radius-button)] mb-4 animate-pulse" style={{ backgroundColor: 'var(--bg-surface2)' }} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div 
                  key={i} 
                  className="border rounded-[var(--radius-card)] p-4 shadow-[var(--shadow-sm)] animate-pulse"
                  style={{ 
                    backgroundColor: 'var(--bg-surface1)', 
                    borderColor: 'var(--border-subtle)' 
                  }}
                >
                  <div className="h-4 w-24 rounded mb-3" style={{ backgroundColor: 'var(--bg-surface2)' }} />
                  <div className="h-8 w-32 rounded mb-2" style={{ backgroundColor: 'var(--bg-surface2)' }} />
                  <div className="h-3 w-20 rounded" style={{ backgroundColor: 'var(--bg-surface2)' }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { alert, drone, timeline } = data || {};
  const recentIncidents = timeline?.slice(-3).reverse() || [];
  const activeAlerts = alert?.confidence >= 70 ? 1 : 0;

  // Generate sparkline data (mock data for visualization)
  const generateSparkline = (trend: 'up' | 'down' | 'neutral', baseValue: number) => {
    const points = 12;
    const data: number[] = [];
    for (let i = 0; i < points; i++) {
      if (trend === 'up') {
        data.push(baseValue - (points - i) * 2 + Math.random() * 5);
      } else if (trend === 'down') {
        data.push(baseValue + (points - i) * 2 - Math.random() * 5);
      } else {
        data.push(baseValue + (Math.random() - 0.5) * 10);
      }
    }
    return data;
  };

  // KPI Stats with contextual comparisons (tabular numbers), deltas, and trends
  const stats = [
    {
      label: 'Active Alerts',
      value: activeAlerts,
      trend: activeAlerts > 0 ? 'up' as const : 'neutral' as const,
      comparison: 'vs last hour',
      delta: activeAlerts > 0 ? '+1' : '0',
      onClick: () => onNavigate('alert'),
      statusDot: activeAlerts > 0 ? 'red' as const : 'green' as const,
      sparkline: activeAlerts > 0 ? generateSparkline('up', 0) : generateSparkline('neutral', 0),
    },
    {
      label: 'Active Drones',
      value: 1,
      trend: 'neutral' as const,
      comparison: '1 of 3',
      delta: undefined,
      onClick: () => onNavigate('drone'),
      statusDot: 'green' as const,
    },
    {
      label: 'System Health',
      value: `${alert?.sensorHealth || 95}%`,
      trend: (alert?.sensorHealth || 95) >= 90 ? 'up' as const : 'down' as const,
      comparison: 'target 95%',
      delta: (alert?.sensorHealth || 95) >= 95 ? undefined : '+1',
      onClick: () => onNavigate('alert'),
      statusDot: (alert?.sensorHealth || 95) >= 90 ? 'green' as const : 'orange' as const,
      sparkline: generateSparkline((alert?.sensorHealth || 95) >= 90 ? 'up' : 'down', alert?.sensorHealth || 95),
    },
    {
      label: 'Recent Incidents',
      value: timeline?.length || 0,
      trend: (timeline?.length || 0) > 5 ? 'up' as const : 'neutral' as const,
      comparison: 'last 24h',
      delta: (timeline?.length || 0) > 5 ? `+${(timeline?.length || 0) - 5}` : undefined,
      onClick: () => onNavigate('timeline'),
      statusDot: (timeline?.length || 0) > 5 ? 'orange' as const : 'green' as const,
    },
  ];

  const quickActions = mode === 'crisis'
    ? [
        { label: 'View Active Alert', screen: 'alert' as Screen, icon: AlertIcon },
        { label: 'Monitor Drone', screen: 'drone' as Screen, icon: DroneIcon },
        { label: 'Assess Threat', screen: 'threat' as Screen, icon: ThreatIcon },
        { label: 'Coordinate Guards', screen: 'coordination' as Screen, icon: GuardIcon },
      ]
    : [
        { label: 'View Timeline', screen: 'timeline' as Screen, icon: TimelineIcon },
        { label: 'Review Evidence', screen: 'evidence' as Screen, icon: EvidenceIcon },
      ];


  return (
    <div className="min-h-screen animate-fade-in relative" style={{ backgroundColor: 'var(--bg-base)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 relative z-10" style={{ paddingTop: 'var(--section-gap)' }}>
        {/* Header - Action-Oriented, Title Case */}
        <Header
          className="mt-0"
          sticky={false}
          title="Dashboard"
          description={
            mode === 'crisis'
              ? 'Monitor Security Status and Respond to Alerts'
              : 'Review Incidents and Analyze Evidence'
          }
        />

        {/* KPI Grid - Editorial/Contra Aesthetic */}
        <section className="mb-6" aria-label="Overview metrics" style={{ marginBottom: 'var(--section-gap)' }}>
          <h2 className="text-[var(--font-h2)] font-[var(--weight-medium)] mb-4" style={{ textTransform: 'capitalize', color: 'var(--text-primary)', marginBottom: 'var(--spacing-lg)' }}>Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3" style={{ gap: 'var(--spacing-md)' }}>
            {stats.map((stat, index) => {
              const statusDotColor = stat.statusDot === 'green' ? 'var(--color-success)' : 
                                    stat.statusDot === 'red' ? 'var(--color-alert)' : 
                                    'var(--color-warning)';
              return (
                <Card 
                  key={index} 
                  padding="md" 
                  interactive={!!stat.onClick} 
                  style={{ 
                    position: 'relative', 
                    overflow: 'hidden',
                  }}
                  onClick={stat.onClick}
                >
                  {/* Status Dot */}
                  <div className="flex items-center gap-2 mb-3" style={{ marginBottom: 'var(--spacing-md)' }}>
                    <span 
                      className="w-2 h-2 rounded-full animate-pulse"
                      style={{ backgroundColor: statusDotColor }}
                      aria-hidden="true"
                    />
                    <div className="text-[var(--font-label)] font-[var(--weight-medium)] uppercase tracking-wide" style={{ color: 'var(--text-secondary)', fontSize: '11px' }}>
                      {stat.label}
                    </div>
                  </div>
                  
                  {/* Big Number - Display Style */}
                  <div className="mb-2" style={{ marginBottom: 'var(--spacing-sm)' }}>
                    <div 
                      className="tabular-nums font-light tracking-tighter"
                      style={{ 
                        fontSize: '48px',
                        lineHeight: '1',
                        color: 'var(--text-primary)',
                        fontFamily: 'var(--font-family)',
                      }}
                    >
                      {stat.value}
                    </div>
                  </div>

                  {/* Sparkline SVG - Expanded throughout card width */}
                  {stat.sparkline && stat.sparkline.length > 0 && (() => {
                    const max = Math.max(...stat.sparkline);
                    const min = Math.min(...stat.sparkline);
                    const range = max - min || 1;
                    const width = 100;
                    const height = 100;
                    const points = stat.sparkline.map((point, i) => {
                      const x = (i / (stat.sparkline.length - 1)) * width;
                      const y = height - ((point - min) / range) * (height * 0.7);
                      return `${x},${y}`;
                    });
                    const pathData = `M ${points[0]} ${points.slice(1).map(p => `L ${p}`).join(' ')} L ${width},${height} L 0,${height} Z`;
                    return (
                      <div className="absolute inset-0 opacity-[0.08] pointer-events-none" style={{ zIndex: 0 }}>
                        <svg width="100%" height="100%" preserveAspectRatio="none" style={{ display: 'block' }}>
                          <defs>
                            <linearGradient id={`sparkline-gradient-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor={statusDotColor} stopOpacity="0.4" />
                              <stop offset="50%" stopColor={statusDotColor} stopOpacity="0.15" />
                              <stop offset="100%" stopColor={statusDotColor} stopOpacity="0" />
                            </linearGradient>
                          </defs>
                          <path
                            d={pathData}
                            fill={`url(#sparkline-gradient-${index})`}
                            stroke={statusDotColor}
                            strokeWidth="2"
                            strokeOpacity="0.2"
                            style={{ transition: 'var(--motion-normal)' }}
                          />
                        </svg>
                      </div>
                    );
                  })()}

                  {/* Footer: Comparison & Delta */}
                  <div className="flex items-center justify-between mt-auto pt-2" style={{ marginTop: 'auto', paddingTop: 'var(--spacing-sm)' }}>
                    {stat.comparison && (
                      <div className="text-[var(--font-meta)] tabular-nums" style={{ color: 'var(--text-muted)', fontSize: '11px' }}>
                        {stat.comparison}
                      </div>
                    )}
                    {stat.delta && (
                      <div 
                        className="text-[var(--font-label)] font-[var(--weight-medium)] px-1.5 py-0.5 rounded-[var(--radius-button)] tabular-nums"
                        style={{
                          fontSize: '10px',
                          color: typeof stat.delta === 'string' && stat.delta.startsWith('+') ? 'var(--color-success)' : 'var(--text-muted)',
                          backgroundColor: typeof stat.delta === 'string' && stat.delta.startsWith('+') ? 'var(--bg-success)' : 'var(--bg-surface2)',
                        }}
                      >
                        {stat.delta}
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Combined Section: Quick Actions + Recent Activity - Modern, Compact Design */}
        <section className="mb-6 grid grid-cols-1 lg:grid-cols-2 gap-4" aria-label="Quick actions and recent activity" style={{ marginBottom: 'var(--section-gap)', gap: 'var(--spacing-lg)' }}>
          {/* Quick Actions - 2x2 Grid Tile Design */}
          <div>
            <h2 className="text-[var(--font-h2)] font-[var(--weight-medium)] mb-4" style={{ textTransform: 'capitalize', color: 'var(--text-primary)', marginBottom: 'var(--spacing-lg)' }}>Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3" style={{ gap: 'var(--spacing-md)' }}>
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <Card 
                      padding="md" 
                      interactive={true}
                      style={{ 
                        padding: 'var(--spacing-lg)',
                        position: 'relative',
                        overflow: 'hidden',
                        minHeight: '130px',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = '0 8px 24px rgba(99, 102, 241, 0.15)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = '';
                      }}
                      onClick={() => onNavigate(action.screen)}
                    >
                      {/* Top-left Icon (Clear) */}
                      <div className="relative z-10 mb-auto" style={{ marginBottom: 'auto' }}>
                        <div 
                          className="w-10 h-10 rounded-[var(--radius-button)] flex items-center justify-center"
                          style={{
                            backgroundColor: 'var(--bg-surface2)',
                            border: '1px solid var(--border-subtle)',
                          }}
                        >
                          <div style={{ color: 'var(--accent-primary)' }}>
                            <Icon className="w-5 h-5" />
                          </div>
                        </div>
                      </div>

                      {/* Action Name at Bottom-left */}
                      <div className="relative z-10 mt-auto" style={{ marginTop: 'auto' }}>
                        <div className="text-[var(--font-body)] font-[var(--weight-medium)]" style={{ color: 'var(--text-primary)' }}>
                          {action.label}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Recent Activity - Visually Exquisite Design */}
          <div>
            <h2 className="text-[var(--font-h2)] font-[var(--weight-medium)] mb-4" style={{ textTransform: 'capitalize', color: 'var(--text-primary)', marginBottom: 'var(--spacing-lg)' }}>Recent Activity</h2>
            {recentIncidents.length > 0 ? (
              <div className="flex flex-col gap-3" style={{ gap: 'var(--spacing-md)' }}>
                {recentIncidents.map((incident: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card 
                      padding="md" 
                      interactive={false} 
                      style={{ 
                        padding: 'var(--spacing-lg)',
                        cursor: 'pointer',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--bg-surface2)';
                        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '';
                        e.currentTarget.style.boxShadow = '';
                      }}
                    >
                      <div className="flex items-start gap-4" style={{ gap: 'var(--spacing-lg)' }}>
                        {/* Icon with subtle border */}
                        <div 
                          className="w-12 h-12 rounded-[var(--radius-card)] flex items-center justify-center flex-shrink-0 border"
                          style={{
                            backgroundColor: 'var(--bg-surface2)',
                            borderColor: 'var(--border-subtle)',
                          }}
                        >
                          <div style={{ color: 'var(--text-muted)', opacity: 0.6 }}>
                            <ActivityIcon className="w-5 h-5" />
                          </div>
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3 mb-1.5" style={{ marginBottom: 'var(--spacing-xs)' }}>
                            <div className="text-[var(--font-body)] font-[var(--weight-semibold)]" style={{ color: 'var(--text-primary)' }}>
                              {incident.event}
                            </div>
                            <div 
                              className="text-[var(--font-meta)] tabular-nums flex-shrink-0 px-2 py-1 rounded-[var(--radius-button)]"
                              style={{ 
                                color: 'var(--text-muted)',
                                fontFamily: 'var(--font-family)',
                                backgroundColor: 'var(--bg-surface3)',
                                fontSize: '11px',
                              }}
                            >
                              {incident.time}
                            </div>
                          </div>
                          {incident.details && (
                            <div className="text-[var(--font-body)] leading-relaxed" style={{ color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                              {incident.details}
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <Card padding="md" interactive={false}>
                <div className="py-12 text-center" role="status" aria-live="polite" aria-label="No recent activity">
                  <div className="mx-auto mb-2" style={{ color: 'var(--text-muted)', opacity: 0.4 }}>
                    <ActivityIcon className="w-8 h-8" aria-hidden="true" />
                  </div>
                  <div className="text-[var(--font-body)] font-[var(--weight-medium)] mb-2" style={{ color: 'var(--text-secondary)' }}>No Recent Activity</div>
                  <p className="text-[var(--font-meta)] mb-4" style={{ color: 'var(--text-muted)' }}>Check back later for new incidents</p>
                  <Button variant="outline" size="sm" onClick={() => onNavigate('timeline')} aria-label="View all events">
                    View All Events
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </section>

        {/* Alert Status & Drone Status - Side by Side */}
        {mode === 'crisis' && (alert || drone) && (
          <section className="mb-6 grid grid-cols-1 lg:grid-cols-2 gap-4" aria-label="Status cards" style={{ marginTop: 'var(--section-gap)', marginBottom: 'var(--section-gap)', paddingTop: 'var(--spacing-2xl)', gap: 'var(--spacing-lg)' }}>
            {/* Alert Status */}
            {alert && (
              <div>
                <h2 className="text-[var(--font-h2)] font-[var(--weight-medium)] mb-3" style={{ textTransform: 'capitalize', color: 'var(--text-primary)', marginBottom: 'var(--spacing-md)' }}>Current Alert Status</h2>
                <Card padding="sm" interactive={false}>
                  {/* Header with Action Button */}
                  <div className="flex items-center justify-between mb-6" style={{ marginBottom: 'var(--spacing-2xl)' }}>
                    <h3 className="text-[var(--font-h2)] font-[var(--weight-medium)]" style={{ color: 'var(--text-primary)' }}>Alert Details</h3>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onNavigate('alert')}
                      className="flex items-center gap-1.5"
                    >
                      View Details
                      <ChevronRightIcon className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                  {/* Tight Data Grid */}
                  <div className="grid grid-cols-3 gap-3" style={{ gap: 'var(--spacing-md)' }}>
                    <div>
                      <div className="text-[var(--font-label)] font-[var(--weight-medium)] mb-1 uppercase tracking-wide" style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-xs)', fontSize: '11px' }}>Location</div>
                      <div className="text-[var(--font-body)] font-[var(--weight-medium)] tabular-nums" style={{ color: 'var(--text-primary)' }}>{alert?.location || 'N/A'}</div>
                    </div>
                    <div>
                      <div className="text-[var(--font-label)] font-[var(--weight-medium)] mb-1 uppercase tracking-wide" style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-xs)', fontSize: '11px' }}>Confidence</div>
                      <div className="text-[var(--font-body)] font-[var(--weight-medium)] tabular-nums" style={{ color: 'var(--text-primary)' }}>{alert?.confidence || 0}%</div>
                      <div className="text-[var(--font-meta)] mt-0.5 tabular-nums" style={{ color: 'var(--text-muted)', marginTop: '2px', fontSize: '10px' }}>threshold 70%</div>
                    </div>
                    <div>
                      <div className="text-[var(--font-label)] font-[var(--weight-medium)] mb-1 uppercase tracking-wide" style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-xs)', fontSize: '11px' }}>Action</div>
                      <div className="text-[var(--font-body)] font-[var(--weight-medium)]" style={{ color: 'var(--text-primary)' }}>{alert?.recommendedAction || 'N/A'}</div>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* Drone Status */}
            {drone && (
              <div>
                <h2 className="text-[var(--font-h2)] font-[var(--weight-medium)] mb-3" style={{ textTransform: 'capitalize', color: 'var(--text-primary)', marginBottom: 'var(--spacing-md)' }}>Active Drone Status</h2>
                <Card padding="sm" interactive={false}>
                  {/* Header with Action Button */}
                  <div className="flex items-center justify-between mb-6" style={{ marginBottom: 'var(--spacing-2xl)' }}>
                    <h3 className="text-[var(--font-h2)] font-[var(--weight-medium)]" style={{ color: 'var(--text-primary)' }}>Drone {drone?.id || 'N/A'}</h3>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onNavigate('drone')}
                      className="flex items-center gap-1.5"
                    >
                      View Feed
                      <ChevronRightIcon className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                  {/* Tight Data Grid */}
                  <div className="grid grid-cols-3 gap-3" style={{ gap: 'var(--spacing-md)' }}>
                    <div>
                      <div className="text-[var(--font-label)] font-[var(--weight-medium)] mb-1 uppercase tracking-wide" style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-xs)', fontSize: '11px' }}>Battery</div>
                      <div className="text-[var(--font-body)] font-[var(--weight-medium)] tabular-nums" style={{ color: 'var(--text-primary)' }}>{drone?.battery?.toFixed(0) || '0'}%</div>
                      <div className="text-[var(--font-meta)] mt-0.5 tabular-nums" style={{ color: 'var(--text-muted)', marginTop: '2px', fontSize: '10px' }}>min 20%</div>
                    </div>
                    <div>
                      <div className="text-[var(--font-label)] font-[var(--weight-medium)] mb-1 uppercase tracking-wide" style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-xs)', fontSize: '11px' }}>Distance</div>
                      <div className="text-[var(--font-body)] font-[var(--weight-medium)] tabular-nums" style={{ color: 'var(--text-primary)' }}>{drone?.distance?.toFixed(1) || '0.0'}m</div>
                    </div>
                    <div>
                      <div className="text-[var(--font-label)] font-[var(--weight-medium)] mb-1 uppercase tracking-wide" style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-xs)', fontSize: '11px' }}>Status</div>
                      <div className="text-[var(--font-body)] font-[var(--weight-medium)]" style={{ color: 'var(--text-primary)' }}>{drone?.status || 'Unknown'}</div>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
