'use client';

import { useState } from 'react';
import { Header, Card, CardHeader, CardTitle, CardContent, Button, EmptyState, KPITile } from '@/src/components/ui';
import { cn } from '@/src/lib/utils';

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
          border: 'border-alert/40',
          bg: 'bg-alert/10',
          dot: 'bg-alert/20 border-alert/40',
        };
      case 'action':
        return {
          border: 'border-accent-border',
          bg: 'bg-accent-soft',
          dot: 'bg-accent-soft border-accent-border',
        };
      case 'status':
        return {
          border: 'border-warning/40',
          bg: 'bg-warning/10',
          dot: 'bg-warning/20 border-warning/40',
        };
      case 'resolution':
        return {
          border: 'border-success/40',
          bg: 'bg-success/10',
          dot: 'bg-success/20 border-success/40',
        };
      case 'complete':
        return {
          border: 'border-border-default',
          bg: 'bg-bg-raised',
          dot: 'bg-bg-raised border-border-default',
        };
      default:
        return {
          border: 'border-border-default',
          bg: 'bg-bg-raised',
          dot: 'bg-bg-raised border-border-default',
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

  const selectedEvent = timeline.find((e: any) => e.id === selectedEventId);

  return (
    <div className="min-h-screen bg-bg-base animate-fade-in">
      <div className="max-w-7xl mx-auto px-gutter py-10">
        <Header
          title="Post-Incident Timeline"
          description="Review incident: Gallery 3, 2:37 AM"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Timeline (Left - 40%) */}
          <div className="lg:col-span-5">
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="text-sectionHeader font-semibold text-text-primary">
                  Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  {/* Vertical Line */}
                  <div className="absolute left-8 top-0 bottom-0 w-[2px] bg-border-default"></div>

                  {/* Timeline Events */}
                  <div className="space-y-6">
                    {timeline.map((event: any, index: number) => {
                      const colors = getEventColor(event.type);
                      const isSelected = selectedEventId === event.id;
                      return (
                        <div
                          key={event.id}
                          className="relative flex items-start gap-4 cursor-pointer group"
                          onClick={() => {
                            setSelectedEventId(event.id);
                          }}
                        >
                          {/* Timeline Dot */}
                          <div
                            className={cn(
                              'relative z-10 w-16 h-16 rounded-full border-2 flex items-center justify-center text-xl transition-all duration-200',
                              colors.dot,
                              isSelected && 'scale-110 ring-2 ring-accent-primary/30 shadow-lg',
                              'group-hover:scale-110'
                            )}
                          >
                            {getEventIcon(event.type)}
                          </div>

                          {/* Event Card */}
                          <div
                            className={cn(
                              'flex-1 border-2 rounded-xl p-5 transition-all duration-200 hover-scale',
                              colors.bg,
                              colors.border,
                              isSelected && 'ring-2 ring-accent-primary/30 border-accent-border shadow-lg',
                              'group-hover:border-border-hover group-hover:shadow-lg',
                              !isSelected && 'shadow-md'
                            )}
                          >
                            <div className="flex justify-between items-start mb-3">
                              <div className="font-mono text-meta text-text-tertiary">{event.time}</div>
                              {event.video && (
                                <span className="text-bodySmall text-text-tertiary glass px-3 py-1 rounded-full border border-border-default">
                                  📹 Video
                                </span>
                              )}
                            </div>
                            <div
                              className={cn(
                                'text-text-primary mb-2 text-body',
                                isSelected ? 'font-semibold' : 'font-medium'
                              )}
                            >
                              {event.event}
                            </div>
                            <div className="text-text-secondary text-bodySmall leading-relaxed">{event.details}</div>
                            {event.notes && event.notes.length > 0 && (
                              <div className="mt-3 text-meta text-text-tertiary">
                                {event.notes.length} note{event.notes.length !== 1 ? 's' : ''}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Generate Report Button */}
            <div className="mt-6">
              <Button
                variant="primary"
                className="w-full"
                onClick={() => {
                  const report = {
                    incident: 'Gallery 3, 2:37 AM',
                    timeline: timeline,
                    summary: 'False alarm - Maintenance worker',
                    generatedAt: new Date().toISOString(),
                  };
                  const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `incident-report-${Date.now()}.json`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
              >
                Generate Incident Report
              </Button>
            </div>
          </div>

          {/* Evidence Panel (Right - 60%) */}
          <div className="lg:col-span-7">
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="text-sectionHeader font-semibold text-text-primary">
                  Evidence Panel
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedEvent ? (
                  <div className="space-y-6 animate-fade-in">
                    {/* Video Evidence */}
                    {selectedEvent.video && (
                      <div className="glass rounded-xl overflow-hidden shadow-lg">
                        <div className="bg-bg-raised border-b border-border-default px-6 py-4 flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <span className="text-label font-semibold text-text-tertiary uppercase tracking-wider">
                              Playback
                            </span>
                          </div>
                          <span className="text-meta text-text-tertiary font-mono">{selectedEvent.time}</span>
                        </div>
                        <div className="bg-black/60 aspect-video flex items-center justify-center relative backdrop-blur-sm">
                          <div className="text-text-tertiary text-body">📹 {selectedEvent.event}</div>
                          <div className="absolute bottom-6 right-6 glass rounded-lg px-4 py-2 text-text-primary text-bodySmall">
                            {selectedEvent.time}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Sensor Data Snapshot */}
                    {selectedEvent.sensorData && (
                      <div className="glass rounded-xl p-6 shadow-md">
                        <h3 className="text-sectionHeader font-semibold text-text-primary mb-6">
                          Sensor Data at {selectedEvent.time}
                        </h3>
                        <div className="grid grid-cols-3 gap-4">
                          {Object.entries(selectedEvent.sensorData).map(([key, value]: [string, any]) => (
                            <KPITile key={key} label={key} value={`${value}%`} />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Decision Notes Preview */}
                    {selectedEvent.notes && selectedEvent.notes.length > 0 && (
                      <div className="glass rounded-xl p-6 shadow-md">
                        <h3 className="text-sectionHeader font-semibold text-text-primary mb-6">
                          Decision Notes
                        </h3>
                        <div className="space-y-4">
                          {selectedEvent.notes.slice(0, 2).map((note: any, index: number) => (
                            <div key={index} className="glass rounded-xl p-4 border-l-4 border-accent-primary">
                              <div className="text-text-secondary font-medium text-bodySmall mb-2">{note.author}</div>
                              <div className="text-text-secondary text-bodySmall leading-relaxed">{note.text}</div>
                            </div>
                          ))}
                          {selectedEvent.notes.length > 2 && (
                            <div className="text-text-tertiary text-bodySmall">
                              +{selectedEvent.notes.length - 2} more note{selectedEvent.notes.length - 2 !== 1 ? 's' : ''}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* View Full Details Button */}
                    <Button variant="primary" className="w-full" onClick={() => onEventClick(selectedEvent.id)}>
                      View Full Details & Annotations
                    </Button>
                  </div>
                ) : (
                  <EmptyState
                    icon="📋"
                    title="Click a timeline event to view detailed evidence"
                    description="Select any event from the timeline to see video, sensor data, and decision notes"
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
