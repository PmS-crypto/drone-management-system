'use client';

import { useState } from 'react';
import { Header, Card, CardHeader, CardTitle, CardContent, Button, Textarea, KPITile } from '@/src/components/ui';

interface EvidenceDetailProps {
  data: any;
  onBack: () => void;
}

export default function EvidenceDetail({ data, onBack }: EvidenceDetailProps) {
  const { timeline, selectedEventId } = data;
  const [annotation, setAnnotation] = useState('');
  const [annotations, setAnnotations] = useState<string[]>([]);

  const event = timeline.find((e: any) => e.id === selectedEventId) || timeline[3];

  const handleAddNote = () => {
    if (annotation.trim()) {
      setAnnotations((prev) => [...prev, annotation]);
      setAnnotation('');
    }
  };

  return (
    <div className="min-h-screen animate-fade-in" style={{ backgroundColor: 'var(--bg-base)' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-6" style={{ paddingTop: 'var(--section-gap)' }}>
        {/* Header */}
        <div className="mb-10" style={{ marginBottom: 'var(--section-gap)' }}>
          <Button variant="tertiary" onClick={onBack} className="mb-6" style={{ marginBottom: 'var(--spacing-2xl)' }}>
            ← Back to Timeline
          </Button>
          <Header
            className="mt-0"
            title="Evidence Detail"
            description={`${event.event} — ${event.time}`}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--section-gap)' }}>
          {/* Video Evidence */}
          {event.video && (
            <section aria-label="Video evidence">
              <Card variant="default" className="overflow-hidden" padding="md" style={{ padding: 0 }}>
                <div className="border-b px-6 py-4 flex justify-between items-center" style={{ backgroundColor: 'var(--bg-surface2)', borderColor: 'var(--border-subtle)', padding: 'var(--spacing-lg) var(--spacing-2xl)' }}>
                  <div className="flex items-center gap-3" style={{ gap: 'var(--spacing-md)' }}>
                    <span className="text-[var(--font-label)] font-[var(--weight-semibold)] uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Playback</span>
                  </div>
                  <span className="text-[var(--font-meta)] tabular-nums" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-family)' }}>{event.time}</span>
                </div>
                <div className="aspect-video flex items-center justify-center relative backdrop-blur-sm" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
                  <div className="text-[var(--font-body)]" style={{ color: 'var(--text-muted)' }}>📹 {event.event}</div>
                  <div className="absolute bottom-6 right-6 rounded-[var(--radius-button)] px-4 py-2 text-[var(--font-meta)]" style={{ backgroundColor: 'var(--bg-surface1)', color: 'var(--text-primary)', padding: 'var(--spacing-sm) var(--spacing-lg)' }}>
                    {event.time}
                  </div>
                </div>
              </Card>
            </section>
          )}

          {/* Sensor Data Snapshot */}
          {event.sensorData && (
            <section aria-label="Sensor data snapshot">
              <Card variant="default" padding="md">
                <CardHeader>
                  <CardTitle className="text-[var(--font-h2)] font-[var(--weight-medium)]" style={{ color: 'var(--text-primary)' }}>
                    Sensor Data Snapshot
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4" style={{ gap: 'var(--spacing-lg)' }}>
                    {Object.entries(event.sensorData).map(([key, value]: [string, any]) => (
                      <KPITile key={key} label={key} value={`${value}%`} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>
          )}

          {/* Decision Notes */}
          {event.notes && event.notes.length > 0 && (
            <section aria-label="Decision notes">
              <Card variant="default" padding="md">
                <CardHeader>
                  <CardTitle className="text-[var(--font-h2)] font-[var(--weight-medium)]" style={{ color: 'var(--text-primary)' }}>
                    Decision Notes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4" style={{ gap: 'var(--spacing-lg)' }}>
                    {event.notes.map((note: any, index: number) => (
                      <div key={index} className="rounded-[var(--radius-card)] p-5 border-l-4 border" style={{ backgroundColor: 'var(--bg-surface2)', borderLeftColor: 'var(--accent-primary)', borderColor: 'var(--border-subtle)', padding: 'var(--card-padding)' }}>
                        <div className="font-[var(--weight-medium)] text-[var(--font-meta)] mb-2" style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-sm)' }}>{note.author}</div>
                        <div className="text-[var(--font-body)]" style={{ color: 'var(--text-secondary)', lineHeight: '1.45' }}>{note.text}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>
          )}

          {/* User Annotations */}
          {annotations.length > 0 && (
            <section aria-label="User annotations">
              <Card variant="default" padding="md">
                <CardHeader>
                  <CardTitle className="text-[var(--font-h2)] font-[var(--weight-medium)]" style={{ color: 'var(--text-primary)' }}>
                    Your Annotations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4" style={{ gap: 'var(--spacing-lg)' }}>
                    {annotations.map((note, index) => (
                      <div key={index} className="rounded-[var(--radius-card)] p-5 border" style={{ backgroundColor: 'var(--bg-surface2)', borderColor: 'var(--accent-primary)', padding: 'var(--card-padding)' }}>
                        <div className="text-[var(--font-body)]" style={{ color: 'var(--text-secondary)', lineHeight: '1.45' }}>{note}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>
          )}

          {/* Add Annotation */}
          <section aria-label="Add annotation">
            <Card variant="default" padding="md">
              <CardHeader>
                <CardTitle className="text-[var(--font-h2)] font-[var(--weight-medium)]" style={{ color: 'var(--text-primary)' }}>
                  Add Annotation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={annotation}
                  onChange={(e) => setAnnotation(e.target.value)}
                  className="mb-6"
                  placeholder="Add your notes here..."
                  style={{ marginBottom: 'var(--spacing-2xl)' }}
                />
                <div className="flex gap-4" style={{ gap: 'var(--spacing-lg)' }}>
                  <Button variant="primary" onClick={handleAddNote}>
                    Add Note
                  </Button>
                  <Button variant="tertiary">Share with Team</Button>
                  <Button variant="tertiary">Flag for System Improvement</Button>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}
