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
    <div className="min-h-screen bg-bg-base animate-fade-in">
      <div className="max-w-5xl mx-auto px-gutter py-10">
        {/* Header */}
        <div className="mb-10">
          <Button variant="quiet" onClick={onBack} className="mb-6">
            ← Back to Timeline
          </Button>
          <Header
            title="Evidence Detail"
            description={`${event.event} — ${event.time}`}
          />
        </div>

        <div className="space-y-section">
          {/* Video Evidence */}
          {event.video && (
            <Card variant="glass" className="overflow-hidden">
              <div className="bg-bg-raised border-b border-border-default px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="text-label font-semibold text-text-tertiary uppercase tracking-wider">Playback</span>
                </div>
                <span className="text-meta text-text-tertiary font-mono">{event.time}</span>
              </div>
              <div className="bg-black/60 aspect-video flex items-center justify-center relative backdrop-blur-sm">
                <div className="text-text-tertiary text-body">📹 {event.event}</div>
                <div className="absolute bottom-6 right-6 glass rounded-lg px-4 py-2 text-text-primary text-bodySmall">
                  {event.time}
                </div>
              </div>
            </Card>
          )}

          {/* Sensor Data Snapshot */}
          {event.sensorData && (
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="text-sectionHeader font-semibold text-text-primary">
                  Sensor Data Snapshot
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(event.sensorData).map(([key, value]: [string, any]) => (
                    <KPITile key={key} label={key} value={`${value}%`} />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Decision Notes */}
          {event.notes && event.notes.length > 0 && (
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="text-sectionHeader font-semibold text-text-primary">
                  Decision Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {event.notes.map((note: any, index: number) => (
                    <div key={index} className="glass rounded-xl p-5 border-l-4 border-accent-primary">
                      <div className="text-text-secondary font-medium text-bodySmall mb-2">{note.author}</div>
                      <div className="text-text-secondary text-body leading-relaxed">{note.text}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* User Annotations */}
          {annotations.length > 0 && (
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="text-sectionHeader font-semibold text-text-primary">
                  Your Annotations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {annotations.map((note, index) => (
                    <div key={index} className="glass rounded-xl p-5 border-accent-border">
                      <div className="text-text-secondary text-body leading-relaxed">{note}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Add Annotation */}
          <Card variant="glass">
            <CardHeader>
              <CardTitle className="text-sectionHeader font-semibold text-text-primary">
                Add Annotation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={annotation}
                onChange={(e) => setAnnotation(e.target.value)}
                className="mb-6"
                placeholder="Add your notes here..."
              />
              <div className="flex gap-4">
                <Button variant="primary" onClick={handleAddNote}>
                  Add Note
                </Button>
                <Button variant="ghost">Share with Team</Button>
                <Button variant="ghost">Flag for System Improvement</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
