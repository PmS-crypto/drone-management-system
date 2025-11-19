'use client';

import { useState } from 'react';

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
      setAnnotations(prev => [...prev, annotation]);
      setAnnotation('');
    }
  };

  return (
    <div className="min-h-screen bg-neutral">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-10">
            <button
              onClick={onBack}
            className="text-white/60 hover:text-white/80 mb-4 flex items-center gap-2 text-sm transition-colors duration-200"
            >
              ← Back to Timeline
            </button>
          <h1 className="text-2xl font-semibold text-white mb-2 tracking-tight">Evidence Detail</h1>
          <p className="text-sm text-white/50">{event.event} — {event.time}</p>
        </div>

        <div className="space-y-6">
          {/* Video Evidence */}
          {event.video && (
            <div className="bg-white/[0.02] border border-white/5 rounded-lg overflow-hidden">
              <div className="bg-white/[0.02] border-b border-white/5 px-4 py-3 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-white/60 uppercase tracking-wider">Playback</span>
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
            <div className="bg-white/[0.02] border border-white/5 rounded-lg p-6">
              <h2 className="text-xs font-medium text-white/40 uppercase tracking-wider mb-4">Sensor Data Snapshot</h2>
              <div className="grid grid-cols-3 gap-3">
                {Object.entries(event.sensorData).map(([key, value]: [string, any]) => (
                  <div key={key} className="bg-white/[0.02] border border-white/5 rounded-lg p-4">
                    <div className="text-white/40 text-xs uppercase mb-2 tracking-wider">{key}</div>
                    <div className="text-white font-semibold text-2xl">{value}%</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Decision Notes */}
          {event.notes && event.notes.length > 0 && (
            <div className="bg-white/[0.02] border border-white/5 rounded-lg p-6">
              <h2 className="text-xs font-medium text-white/40 uppercase tracking-wider mb-4">Decision Notes</h2>
              <div className="space-y-3">
                {event.notes.map((note: any, index: number) => (
                  <div key={index} className="bg-white/[0.02] border-l-2 border-blue-500/30 rounded-lg p-4">
                    <div className="text-white/60 font-medium text-xs mb-2">{note.author}</div>
                    <div className="text-white/70 text-sm">{note.text}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* User Annotations */}
          {annotations.length > 0 && (
            <div className="bg-white/[0.02] border border-white/5 rounded-lg p-6">
              <h2 className="text-xs font-medium text-white/40 uppercase tracking-wider mb-4">Your Annotations</h2>
              <div className="space-y-3">
                {annotations.map((note, index) => (
                  <div key={index} className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-4">
                    <div className="text-white/70 text-sm">{note}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add Annotation */}
          <div className="bg-white/[0.02] border border-white/5 rounded-lg p-6">
            <h2 className="text-xs font-medium text-white/40 uppercase tracking-wider mb-4">Add Annotation</h2>
            <textarea
              value={annotation}
              onChange={(e) => setAnnotation(e.target.value)}
              className="w-full bg-white/[0.02] border border-white/5 rounded-lg p-4 text-white text-sm min-h-[120px] focus:outline-none focus:border-white/20 transition-all duration-200 placeholder:text-white/30 mb-4"
              placeholder="Add your notes here..."
            />
            <div className="flex gap-3">
              <button
                onClick={handleAddNote}
                className="bg-blue-500 text-white font-medium py-3 px-6 rounded-lg hover:bg-blue-600 transition-all duration-200 min-h-[48px] shadow-lg shadow-blue-500/20"
              >
                Add Note
              </button>
              <button className="bg-white/5 text-white font-medium py-3 px-6 rounded-lg hover:bg-white/10 transition-all duration-200 min-h-[48px] border border-white/10">
                Share with Team
              </button>
              <button className="bg-white/5 text-white font-medium py-3 px-6 rounded-lg hover:bg-white/10 transition-all duration-200 min-h-[48px] border border-white/10">
                Flag for System Improvement
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

