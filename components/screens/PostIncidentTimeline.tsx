'use client';

import { useState } from 'react';

interface PostIncidentTimelineProps {
  data: any;
  onEventClick: (eventId: string) => void;
}

export default function PostIncidentTimeline({ data, onEventClick }: PostIncidentTimelineProps) {
  const { timeline } = data;
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const getEventColor = (type: string) => {
    switch (type) {
      case 'alert':
        return {
          border: 'border-red-500/30',
          bg: 'bg-red-500/5',
          dot: 'bg-red-500/20 border-red-500/40'
        };
      case 'action':
        return {
          border: 'border-blue-500/30',
          bg: 'bg-blue-500/5',
          dot: 'bg-blue-500/20 border-blue-500/40'
        };
      case 'status':
        return {
          border: 'border-amber-500/30',
          bg: 'bg-amber-500/5',
          dot: 'bg-amber-500/20 border-amber-500/40'
        };
      case 'resolution':
        return {
          border: 'border-green-500/30',
          bg: 'bg-green-500/5',
          dot: 'bg-green-500/20 border-green-500/40'
        };
      case 'complete':
        return {
          border: 'border-white/10',
          bg: 'bg-white/[0.02]',
          dot: 'bg-white/10 border-white/20'
        };
      default:
        return {
          border: 'border-white/10',
          bg: 'bg-white/[0.02]',
          dot: 'bg-white/10 border-white/20'
        };
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'alert':
        return '🔴';
      case 'action':
        return '🚁';
      case 'status':
        return '📹';
      case 'resolution':
        return '✅';
      case 'complete':
        return '📝';
      default:
        return '•';
    }
  };

  return (
    <div className="min-h-screen bg-neutral">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-[24px] font-semibold text-white mb-2 tracking-tight leading-[1.3]">Post-Incident Timeline</h1>
          <p className="text-sm text-white/50">Review incident: Gallery 3, 2:37 AM</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Timeline (Left - 40%) */}
          <div className="lg:col-span-5">
            <div className="bg-white/[0.02] border border-white/5 rounded-lg p-6 shadow-md">
              <h2 className="text-[11px] font-semibold text-white/40 uppercase tracking-[0.5px] mb-6">Timeline</h2>
              <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-white/10"></div>

                {/* Timeline Events */}
                <div className="space-y-4">
                  {timeline.map((event: any, index: number) => {
                    const colors = getEventColor(event.type);
                    return (
                    <div
                      key={event.id}
                      className="relative flex items-start gap-4 cursor-pointer group"
                      onClick={() => {
                        setSelectedEventId(event.id);
                      }}
                    >
                      {/* Timeline Dot */}
                        <div className={`relative z-10 w-12 h-12 rounded-full border flex items-center justify-center text-lg ${colors.dot} group-hover:scale-110 transition-all duration-200`}>
                        {getEventIcon(event.type)}
                      </div>

                      {/* Event Card */}
                        <div className={`flex-1 border rounded-lg p-4 ${colors.bg} ${colors.border} ${selectedEventId === event.id ? 'ring-2 ring-blue-500/30 border-blue-500/40 shadow-md' : 'shadow-sm'} group-hover:border-white/20 group-hover:shadow-md transition-all duration-150`}>
                        <div className="flex justify-between items-start mb-2">
                            <div className="font-mono text-white/50 text-xs">{event.time}</div>
                          {event.video && (
                              <span className="text-xs text-white/40 bg-white/5 px-2 py-1 rounded border border-white/5">
                              📹 Video
                            </span>
                          )}
                        </div>
                          <div className="text-white font-medium mb-1 text-sm">{event.event}</div>
                          <div className="text-white/60 text-sm">{event.details}</div>
                        {event.notes && event.notes.length > 0 && (
                            <div className="mt-2 text-xs text-white/40">
                            {event.notes.length} note{event.notes.length !== 1 ? 's' : ''}
                          </div>
                        )}
                      </div>
                    </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Generate Report Button */}
            <div className="mt-6">
              <button 
                onClick={() => {
                  const report = {
                    incident: 'Gallery 3, 2:37 AM',
                    timeline: timeline,
                    summary: 'False alarm - Maintenance worker',
                    generatedAt: new Date().toISOString()
                  };
                  const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `incident-report-${Date.now()}.json`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="w-full bg-info text-white font-semibold py-3 px-6 rounded-md hover:bg-info-hover active:bg-info/80 transition-all duration-150 min-h-[48px] shadow-md hover:shadow-lg focus-visible:outline-2 focus-visible:outline-info focus-visible:outline-offset-2"
              >
                Generate Incident Report
              </button>
            </div>
          </div>

          {/* Evidence Panel (Right - 60%) */}
          <div className="lg:col-span-7">
            <div className="bg-white/[0.02] border border-white/5 rounded-lg p-6 shadow-md">
              <h2 className="text-[11px] font-semibold text-white/40 uppercase tracking-[0.5px] mb-6">Evidence Panel</h2>
              {selectedEventId ? (() => {
                const event = timeline.find((e: any) => e.id === selectedEventId);
                if (!event) return null;
                return (
                  <div className="space-y-6 animate-fade-in">
                    {/* Video Evidence */}
                    {event.video && (
                      <div className="bg-white/[0.02] border border-white/5 rounded-lg overflow-hidden shadow-md">
                        <div className="bg-white/[0.02] border-b border-white/5 px-4 py-3 flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-semibold text-white/60 uppercase tracking-[0.5px]">Playback</span>
                          </div>
                          <span className="text-white/50 text-xs font-mono">{event.time}</span>
                        </div>
                        <div className="bg-black/40 aspect-video flex items-center justify-center relative">
                          <div className="text-white/30 text-sm">📹 {event.event}</div>
                          <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded text-white text-xs border border-white/10">
                            {event.time}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Sensor Data Snapshot */}
                    {event.sensorData && (
                      <div className="bg-white/[0.02] border border-white/5 rounded-lg p-4 shadow-sm">
                        <h3 className="text-[11px] font-semibold text-white/40 uppercase tracking-[0.5px] mb-4">Sensor Data at {event.time}</h3>
                        <div className="grid grid-cols-3 gap-3">
                          {Object.entries(event.sensorData).map(([key, value]: [string, any]) => (
                            <div key={key} className="bg-white/[0.02] border border-white/5 rounded-lg p-3">
                              <div className="text-[11px] font-semibold text-white/40 uppercase mb-2 tracking-[0.5px]">{key}</div>
                              <div className="text-white font-semibold text-xl">{value}%</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Decision Notes Preview */}
                    {event.notes && event.notes.length > 0 && (
                      <div className="bg-white/[0.02] border border-white/5 rounded-lg p-4 shadow-sm">
                        <h3 className="text-[11px] font-semibold text-white/40 uppercase tracking-[0.5px] mb-4">Decision Notes</h3>
                        <div className="space-y-3">
                          {event.notes.slice(0, 2).map((note: any, index: number) => (
                            <div key={index} className="bg-white/[0.02] border-l-2 border-blue-500/30 rounded-lg p-3">
                              <div className="text-white/60 font-medium text-xs mb-1">{note.author}</div>
                              <div className="text-white/70 text-xs line-clamp-2">{note.text}</div>
                            </div>
                          ))}
                          {event.notes.length > 2 && (
                            <div className="text-white/40 text-xs">
                              +{event.notes.length - 2} more note{event.notes.length - 2 !== 1 ? 's' : ''}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* View Full Details Button */}
                    <button
                      onClick={() => onEventClick(event.id)}
                      className="w-full bg-info text-white font-semibold py-3 px-6 rounded-md hover:bg-info-hover active:bg-info/80 transition-all duration-150 min-h-[48px] shadow-md hover:shadow-lg focus-visible:outline-2 focus-visible:outline-info focus-visible:outline-offset-2"
                    >
                      View Full Details & Annotations
                    </button>
                  </div>
                );
              })() : (
                <div className="text-center py-16 text-white/30">
                  <div className="text-5xl mb-4 opacity-50">📋</div>
                  <div className="text-sm mb-2 text-white/50">Click a timeline event to view detailed evidence</div>
                  <div className="text-xs text-white/30 mt-4">
                    Select any event from the timeline to see video, sensor data, and decision notes
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

