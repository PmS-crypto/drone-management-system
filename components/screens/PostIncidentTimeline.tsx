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
          border: 'var(--color-alert)',
          bg: 'var(--bg-alert)',
          dotBg: 'var(--bg-alert)',
          dotBorder: 'var(--color-alert)',
        };
      case 'action':
        return {
          border: 'var(--accent-primary)',
          bg: 'var(--accent-light)',
          dotBg: 'var(--accent-light)',
          dotBorder: 'var(--accent-primary)',
        };
      case 'status':
        return {
          border: 'var(--color-warning)',
          bg: 'var(--bg-warning)',
          dotBg: 'var(--bg-warning)',
          dotBorder: 'var(--color-warning)',
        };
      case 'resolution':
        return {
          border: 'var(--color-success)',
          bg: 'var(--bg-success)',
          dotBg: 'var(--bg-success)',
          dotBorder: 'var(--color-success)',
        };
      case 'complete':
        return {
          border: 'var(--border-subtle)',
          bg: 'var(--bg-surface2)',
          dotBg: 'var(--bg-surface2)',
          dotBorder: 'var(--border-subtle)',
        };
      default:
        return {
          border: 'var(--border-subtle)',
          bg: 'var(--bg-surface2)',
          dotBg: 'var(--bg-surface2)',
          dotBorder: 'var(--border-subtle)',
        };
    }
  };


  const selectedEvent = timeline.find((e: any) => e.id === selectedEventId);

  return (
    <div className="min-h-screen animate-fade-in" style={{ backgroundColor: 'var(--bg-base)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6" style={{ paddingTop: 'var(--section-gap)' }}>
        <Header
          className="mt-0"
          title="Post-Incident Timeline"
          description="Review incident: Gallery 3, 2:37 AM"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" style={{ gap: 'var(--spacing-2xl)' }}>
          {/* Timeline (Left - 40%) */}
          <div className="lg:col-span-5">
            <Card variant="default" padding="md">
              <CardHeader>
                <CardTitle className="text-[var(--font-h2)] font-[var(--weight-medium)]" style={{ color: 'var(--text-primary)' }}>
                  Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  {/* Vertical Line - Centered to pass through dots */}
                  <div className="absolute top-0 bottom-0 w-[1px]" style={{ left: '16px', backgroundColor: 'var(--border-subtle)' }}></div>

                  {/* Timeline Events */}
                  <div className="space-y-6" style={{ gap: 'var(--spacing-2xl)' }}>
                    {timeline.map((event: any, index: number) => {
                      const colors = getEventColor(event.type);
                      const isSelected = selectedEventId === event.id;
                      return (
                        <div
                          key={event.id}
                          className="relative flex items-start gap-4 cursor-pointer group"
                          style={{ gap: 'var(--spacing-lg)' }}
                          onClick={() => {
                            setSelectedEventId(event.id);
                          }}
                        >
                          {/* Timeline Dot - Centered on line */}
                          <div className="relative z-10 flex items-center justify-center" style={{ width: '32px', minWidth: '32px', position: 'relative' }}>
                            <div
                              className="rounded-full transition-all"
                              style={{
                                position: 'absolute',
                                left: '50%',
                                top: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: isSelected ? '10px' : '8px',
                                height: isSelected ? '10px' : '8px',
                                backgroundColor: colors.dotBorder,
                                border: isSelected ? `2px solid ${colors.dotBorder}` : `1px solid ${colors.dotBorder}`,
                                boxShadow: isSelected 
                                  ? `0 0 0 3px ${colors.dotBg}, var(--shadow-xs)` 
                                  : 'none',
                                transition: 'all var(--motion-normal)',
                                opacity: isSelected ? 1 : 0.6,
                              }}
                              onMouseEnter={(e) => {
                                if (!isSelected) {
                                  e.currentTarget.style.width = '10px';
                                  e.currentTarget.style.height = '10px';
                                  e.currentTarget.style.opacity = '1';
                                  e.currentTarget.style.boxShadow = `0 0 0 3px ${colors.dotBg}, var(--shadow-xs)`;
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (!isSelected) {
                                  e.currentTarget.style.width = '8px';
                                  e.currentTarget.style.height = '8px';
                                  e.currentTarget.style.opacity = '0.6';
                                  e.currentTarget.style.boxShadow = 'none';
                                }
                              }}
                            />
                          </div>

                          {/* Event Card */}
                          <div
                            className="flex-1 border rounded-[var(--radius-card)] p-5 transition-all"
                            style={{
                              backgroundColor: colors.bg,
                              borderColor: isSelected ? 'var(--accent-primary)' : colors.border,
                              padding: 'var(--card-padding)',
                              boxShadow: isSelected ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                              transition: 'var(--motion-normal)',
                            }}
                            onMouseEnter={(e) => {
                              if (!isSelected) {
                                e.currentTarget.style.borderColor = 'var(--border-muted)';
                                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!isSelected) {
                                e.currentTarget.style.borderColor = colors.border;
                                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                              }
                            }}
                          >
                            <div className="flex justify-between items-start mb-3" style={{ marginBottom: 'var(--spacing-md)' }}>
                              <div className="tabular-nums text-[var(--font-meta)]" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-family)' }}>{event.time}</div>
                              {event.video && (
                                <span className="text-[var(--font-meta)] rounded-full border px-3 py-1" style={{ backgroundColor: 'var(--bg-surface1)', borderColor: 'var(--border-subtle)', color: 'var(--text-muted)', padding: 'var(--spacing-xs) var(--spacing-md)' }}>
                                  📹 Video
                                </span>
                              )}
                            </div>
                            <div
                              className="mb-2 text-[var(--font-body)]"
                              style={{ 
                                color: 'var(--text-primary)',
                                fontWeight: isSelected ? 'var(--weight-semibold)' : 'var(--weight-medium)',
                                marginBottom: 'var(--spacing-sm)',
                              }}
                            >
                              {event.event}
                            </div>
                            <div className="text-[var(--font-meta)]" style={{ color: 'var(--text-secondary)', lineHeight: '1.45' }}>{event.details}</div>
                            {event.notes && event.notes.length > 0 && (
                              <div className="mt-3 text-[var(--font-meta)]" style={{ marginTop: 'var(--spacing-md)', color: 'var(--text-muted)' }}>
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
            <div className="mt-6" style={{ marginTop: 'var(--spacing-2xl)' }}>
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
            <Card variant="default" padding="md">
              <CardHeader>
                <CardTitle className="text-[var(--font-h2)] font-[var(--weight-medium)]" style={{ color: 'var(--text-primary)' }}>
                  Evidence Panel
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedEvent ? (
                  <div className="space-y-6 animate-fade-in" style={{ gap: 'var(--spacing-2xl)' }}>
                    {/* Video Evidence */}
                    {selectedEvent.video && (
                      <div className="rounded-[var(--radius-card)] overflow-hidden shadow-[var(--shadow-md)] border" style={{ borderColor: 'var(--border-subtle)' }}>
                        <div className="border-b px-6 py-4 flex justify-between items-center" style={{ backgroundColor: 'var(--bg-surface2)', borderColor: 'var(--border-subtle)', padding: 'var(--spacing-lg) var(--spacing-2xl)' }}>
                          <div className="flex items-center gap-3" style={{ gap: 'var(--spacing-md)' }}>
                            <span className="text-[var(--font-label)] font-[var(--weight-semibold)] uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                              Playback
                            </span>
                          </div>
                          <span className="text-[var(--font-meta)] tabular-nums" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-family)' }}>{selectedEvent.time}</span>
                        </div>
                        <div className="aspect-video flex items-center justify-center relative backdrop-blur-sm" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
                          <div className="text-[var(--font-body)]" style={{ color: 'var(--text-muted)' }}>📹 {selectedEvent.event}</div>
                          <div className="absolute bottom-6 right-6 rounded-[var(--radius-button)] px-4 py-2 text-[var(--font-meta)]" style={{ backgroundColor: 'var(--bg-surface1)', color: 'var(--text-primary)', padding: 'var(--spacing-sm) var(--spacing-lg)' }}>
                            {selectedEvent.time}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Sensor Data Snapshot */}
                    {selectedEvent.sensorData && (
                      <Card variant="default" padding="lg">
                        <h3 className="text-[var(--font-h2)] font-[var(--weight-medium)] mb-6" style={{ color: 'var(--text-primary)', marginBottom: 'var(--spacing-2xl)' }}>
                          Sensor Data at {selectedEvent.time}
                        </h3>
                        <div className="grid grid-cols-3 gap-4" style={{ gap: 'var(--spacing-lg)' }}>
                          {Object.entries(selectedEvent.sensorData).map(([key, value]: [string, any]) => (
                            <KPITile key={key} label={key} value={`${value}%`} />
                          ))}
                        </div>
                      </Card>
                    )}

                    {/* Decision Notes Preview */}
                    {selectedEvent.notes && selectedEvent.notes.length > 0 && (
                      <Card variant="default" padding="lg">
                        <h3 className="text-[var(--font-h2)] font-[var(--weight-medium)] mb-6" style={{ color: 'var(--text-primary)', marginBottom: 'var(--spacing-2xl)' }}>
                          Decision Notes
                        </h3>
                        <div className="space-y-4" style={{ gap: 'var(--spacing-lg)' }}>
                          {selectedEvent.notes.slice(0, 2).map((note: any, index: number) => (
                            <div key={index} className="rounded-[var(--radius-card)] p-4 border-l-4 border" style={{ backgroundColor: 'var(--bg-surface2)', borderLeftColor: 'var(--accent-primary)', borderColor: 'var(--border-subtle)', padding: 'var(--spacing-lg)' }}>
                              <div className="font-[var(--weight-medium)] text-[var(--font-meta)] mb-2" style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-sm)' }}>{note.author}</div>
                              <div className="text-[var(--font-meta)]" style={{ color: 'var(--text-secondary)', lineHeight: '1.45' }}>{note.text}</div>
                            </div>
                          ))}
                          {selectedEvent.notes.length > 2 && (
                            <div className="text-[var(--font-meta)]" style={{ color: 'var(--text-muted)' }}>
                              +{selectedEvent.notes.length - 2} more note{selectedEvent.notes.length - 2 !== 1 ? 's' : ''}
                            </div>
                          )}
                        </div>
                      </Card>
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
