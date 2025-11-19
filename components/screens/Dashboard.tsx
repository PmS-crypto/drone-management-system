'use client';

type Screen = 'dashboard' | 'alert' | 'drone' | 'threat' | 'coordination' | 'timeline' | 'evidence';

interface DashboardProps {
  data: any;
  mode: 'crisis' | 'analysis';
  onNavigate: (screen: Screen) => void;
}

export default function Dashboard({ data, mode, onNavigate }: DashboardProps) {
  if (!data) {
    return (
      <div className="min-h-screen bg-neutral">
        <div className="lg:pl-64">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="text-white">Loading...</div>
          </div>
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
      icon: '🔴',
      color: 'text-red-400',
      bg: 'bg-red-500/5',
      border: 'border-red-500/20',
      onClick: () => onNavigate('alert')
    },
    {
      label: 'Active Drones',
      value: 1,
      icon: '🚁',
      color: 'text-blue-400',
      bg: 'bg-blue-500/5',
      border: 'border-blue-500/20',
      onClick: () => onNavigate('drone')
    },
    {
      label: 'System Health',
      value: `${alert?.sensorHealth || 95}%`,
      icon: '💚',
      color: 'text-green-400',
      bg: 'bg-green-500/5',
      border: 'border-green-500/20'
    },
    {
      label: 'Recent Incidents',
      value: timeline?.length || 0,
      icon: '📋',
      color: 'text-amber-400',
      bg: 'bg-amber-500/5',
      border: 'border-amber-500/20',
      onClick: () => onNavigate('timeline')
    }
  ];

  const quickActions = mode === 'crisis' 
    ? [
        { label: 'View Active Alert', screen: 'alert' as Screen, icon: '🔴' },
        { label: 'Monitor Drone', screen: 'drone' as Screen, icon: '🚁' },
        { label: 'Assess Threat', screen: 'threat' as Screen, icon: '⚠️' },
        { label: 'Coordinate Guards', screen: 'coordination' as Screen, icon: '👮' }
      ]
    : [
        { label: 'View Timeline', screen: 'timeline' as Screen, icon: '📅' },
        { label: 'Review Evidence', screen: 'evidence' as Screen, icon: '📋' }
      ];

  return (
    <div className="min-h-screen bg-neutral">
      <div className="lg:pl-64">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-[24px] font-semibold text-white mb-2 tracking-tight leading-[1.3]">Dashboard</h1>
            <p className="text-sm text-white/50 leading-relaxed">
              {mode === 'crisis' 
                ? 'Real-time security monitoring and crisis response' 
                : 'Post-incident analysis and evidence review'}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                onClick={stat.onClick}
                className={`${stat.bg} ${stat.border} border rounded-lg p-6 hover:border-white/20 transition-all duration-150 shadow-sm hover:shadow-md ${
                  stat.onClick ? 'cursor-pointer' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{stat.icon}</span>
                  <span className={`text-2xl font-semibold ${stat.color}`}>{stat.value}</span>
                </div>
                <div className="text-[11px] font-semibold text-white/40 uppercase tracking-[0.5px]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Actions */}
            <div className="lg:col-span-1">
              <div className="bg-white/[0.02] border border-white/5 rounded-lg p-6 shadow-md">
                <h2 className="text-[11px] font-semibold text-white/40 uppercase tracking-[0.5px] mb-4">
                  Quick Actions
                </h2>
                <div className="space-y-2">
                  {quickActions.map((action, index) => (
                      <button
                      key={index}
                      onClick={() => onNavigate(action.screen)}
                      className="w-full flex items-center gap-3 px-4 py-3 bg-white/[0.02] border border-white/5 rounded-lg hover:bg-white/[0.03] hover:border-white/10 transition-all duration-150 text-left shadow-sm hover:shadow-md"
                    >
                      <span className="text-lg">{action.icon}</span>
                      <span className="text-sm font-medium text-white/80">{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="lg:col-span-2">
              <div className="bg-white/[0.02] border border-white/5 rounded-lg p-6 shadow-md">
                <h2 className="text-[11px] font-semibold text-white/40 uppercase tracking-[0.5px] mb-4">
                  Recent Activity
                </h2>
                <div className="space-y-4">
                  {recentIncidents.length > 0 ? (
                    recentIncidents.map((incident: any, index: number) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 p-4 bg-white/[0.02] border border-white/5 rounded-lg hover:border-white/10 transition-all duration-150 shadow-sm hover:shadow-md"
                      >
                        <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-lg">
                            {incident.type === 'alert' ? '🔴' : 
                             incident.type === 'action' ? '🚁' : 
                             incident.type === 'resolution' ? '✅' : '📋'}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <div className="text-sm font-medium text-white">{incident.event}</div>
                            <div className="text-xs text-white/40 font-mono">{incident.time}</div>
                          </div>
                          <div className="text-xs text-white/60 line-clamp-2">{incident.details}</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12 text-white/30">
                      <div className="text-4xl mb-3 opacity-50">📋</div>
                      <div className="text-sm">No recent activity</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* System Status */}
          {mode === 'crisis' && alert && (
            <div className="mt-6 bg-white/[0.02] border border-white/5 rounded-lg p-6 shadow-md">
              <h2 className="text-[11px] font-semibold text-white/40 uppercase tracking-[0.5px] mb-4">
                Current Alert Status
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className="text-xs text-white/40 mb-1">Location</div>
                  <div className="text-sm font-medium text-white">{alert?.location || 'N/A'}</div>
                </div>
                <div>
                  <div className="text-xs text-white/40 mb-1">Confidence</div>
                  <div className="text-sm font-medium text-white">{alert?.confidence || 0}%</div>
                </div>
                <div>
                  <div className="text-xs text-white/40 mb-1">Recommended Action</div>
                  <div className="text-sm font-medium text-white">{alert?.recommendedAction || 'N/A'}</div>
                </div>
              </div>
              <button
                onClick={() => onNavigate('alert')}
                className="mt-4 w-full bg-alert text-white font-semibold py-3 px-6 rounded-md hover:bg-alert-hover active:bg-alert-active transition-all duration-150 shadow-button-hover hover:shadow-button-active focus-visible:outline-2 focus-visible:outline-info focus-visible:outline-offset-2"
              >
                View Full Alert Details
              </button>
            </div>
          )}

          {/* Drone Status */}
          {mode === 'crisis' && drone && (
            <div className="mt-6 bg-white/[0.02] border border-white/5 rounded-lg p-6 shadow-md">
              <h2 className="text-[11px] font-semibold text-white/40 uppercase tracking-[0.5px] mb-4">
                Active Drone Status
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-xs text-white/40 mb-1">Drone ID</div>
                  <div className="text-sm font-medium text-white">Drone {drone?.id || 'N/A'}</div>
                </div>
                <div>
                  <div className="text-xs text-white/40 mb-1">Battery</div>
                  <div className="text-sm font-medium text-white">{drone?.battery?.toFixed(0) || '0'}%</div>
                </div>
                <div>
                  <div className="text-xs text-white/40 mb-1">Distance</div>
                  <div className="text-sm font-medium text-white">{drone?.distance?.toFixed(1) || '0.0'}m</div>
                </div>
                <div>
                  <div className="text-xs text-white/40 mb-1">Status</div>
                  <div className="text-sm font-medium text-white">{drone?.status || 'Unknown'}</div>
                </div>
              </div>
              <button
                onClick={() => onNavigate('drone')}
                className="mt-4 w-full bg-info text-white font-semibold py-3 px-6 rounded-md hover:bg-info-hover active:bg-info/80 transition-all duration-150 shadow-md hover:shadow-lg focus-visible:outline-2 focus-visible:outline-info focus-visible:outline-offset-2"
              >
                View Live Feed
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

