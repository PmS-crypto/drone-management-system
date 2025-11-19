'use client';

import { useState } from 'react';
import { Header, Card, Button, KPITile } from '@/src/components/ui';
import { cn } from '@/src/lib/utils';

interface ThreatAssessmentProps {
  data: any;
  onBroadcast: () => void;
}

export default function ThreatAssessment({ data, onBroadcast }: ThreatAssessmentProps) {
  const { sensors, threatAssessment } = data;
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    threatAssessment.selectedCategory
  );
  const [broadcastSent, setBroadcastSent] = useState(false);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleBroadcast = () => {
    if (selectedCategory && !broadcastSent) {
      setBroadcastSent(true);
      if (onBroadcast) {
        onBroadcast();
      }
    }
  };

  const getConfidence = (category: string) => {
    switch (category) {
      case 'human':
        return threatAssessment.humanIntruder;
      case 'equipment':
        return threatAssessment.equipmentMalfunction;
      case 'environmental':
        return threatAssessment.environmental;
      default:
        return 0;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'human':
        return {
          selectedBorder: 'var(--color-alert)',
          selectedBg: 'var(--bg-alert)',
          text: 'var(--color-alert)',
          progress: 'var(--color-alert)',
        };
      case 'equipment':
        return {
          selectedBorder: 'var(--color-warning)',
          selectedBg: 'var(--bg-warning)',
          text: 'var(--color-warning)',
          progress: 'var(--color-warning)',
        };
      case 'environmental':
        return {
          selectedBorder: 'var(--color-success)',
          selectedBg: 'var(--bg-success)',
          text: 'var(--color-success)',
          progress: 'var(--color-success)',
        };
      default:
        return {
          selectedBorder: 'var(--border-subtle)',
          selectedBg: 'transparent',
          text: 'var(--text-primary)',
          progress: 'var(--bg-base)',
        };
    }
  };

  return (
    <div className="min-h-screen animate-fade-in" style={{ backgroundColor: 'var(--bg-base)' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-6" style={{ paddingTop: 'var(--section-gap)' }}>
        <Header
          className="mt-0"
          title="Threat Assessment"
          description="Categorize and broadcast threat assessment"
        />

        {/* Sensor Data Aggregation */}
        <section className="mb-6" aria-label="Sensor data" style={{ marginBottom: 'var(--section-gap)' }}>
          <h2 className="text-[var(--font-h2)] font-[var(--weight-medium)] mb-3" style={{ textTransform: 'capitalize', color: 'var(--text-primary)', marginBottom: 'var(--spacing-md)' }}>Sensor Data</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3" style={{ gap: 'var(--spacing-md)' }}>
            {[
              { label: 'Motion', value: `${sensors.motion}%` },
              { label: 'Heat', value: `${sensors.heat}%` },
              { label: 'Pressure', value: `${sensors.pressure}%` },
              { label: 'Pattern', value: sensors.pattern },
            ].map((sensor, idx) => (
              <KPITile key={idx} label={sensor.label} value={sensor.value} />
            ))}
          </div>
        </section>

        {/* Guided Decision Tree */}
        <section className="mb-6" aria-label="Guided decision tree" style={{ marginBottom: 'var(--section-gap)' }}>
          <h2 className="text-[var(--font-h2)] font-[var(--weight-medium)] mb-3" style={{ textTransform: 'capitalize', color: 'var(--text-primary)', marginBottom: 'var(--spacing-md)' }}>Guided Decision Tree</h2>
          <p className="text-[var(--font-body)] mb-6" style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-2xl)' }}>
            Based on sensor pattern, this is likely:
          </p>

          <div className="space-y-4" style={{ gap: 'var(--spacing-lg)' }}>
            {/* Option A: Human Intruder */}
            <button
              onClick={() => handleCategorySelect('human')}
              className="w-full text-left rounded-[var(--radius-card)] border-2 transition-all"
              style={{
                padding: 'var(--card-padding)',
                borderColor: selectedCategory === 'human' ? getCategoryColor('human').selectedBorder : 'var(--border-subtle)',
                backgroundColor: selectedCategory === 'human' ? getCategoryColor('human').selectedBg : 'var(--bg-surface1)',
                boxShadow: selectedCategory === 'human' ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                transition: 'var(--motion-normal)',
              }}
              onMouseEnter={(e) => {
                if (selectedCategory !== 'human') {
                  e.currentTarget.style.borderColor = 'var(--border-muted)';
                  e.currentTarget.style.backgroundColor = 'var(--bg-surface2)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCategory !== 'human') {
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  e.currentTarget.style.backgroundColor = 'var(--bg-surface1)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                }
              }}
            >
              <div className="flex justify-between items-start mb-4" style={{ marginBottom: 'var(--spacing-lg)' }}>
                <div>
                  <div className="text-[var(--font-label)] font-[var(--weight-medium)] mb-2" style={{ color: 'var(--text-muted)', marginBottom: 'var(--spacing-sm)' }}>
                    Option A
                  </div>
                  <span className="text-[var(--font-h2)] font-[var(--weight-semibold)]" style={{ color: 'var(--text-primary)' }}>Human Intruder</span>
                </div>
                <span
                  className="text-[var(--font-h2)] font-[var(--weight-semibold)] tabular-nums"
                  style={{ color: selectedCategory === 'human' ? getCategoryColor('human').text : 'var(--text-primary)' }}
                >
                  {threatAssessment.humanIntruder}%
                </span>
              </div>
              <div className="w-full rounded-full h-2.5 overflow-hidden" style={{ backgroundColor: 'var(--bg-base)' }}>
                <div
                  className="h-full rounded-full transition-all"
                  style={{ 
                    width: `${threatAssessment.humanIntruder}%`,
                    backgroundColor: getCategoryColor('human').progress,
                    transition: 'var(--motion-slow)',
                  }}
                />
              </div>
            </button>

            {/* Option B: Equipment Malfunction */}
            <button
              onClick={() => handleCategorySelect('equipment')}
              className="w-full text-left rounded-[var(--radius-card)] border-2 transition-all"
              style={{
                padding: 'var(--card-padding)',
                borderColor: selectedCategory === 'equipment' ? getCategoryColor('equipment').selectedBorder : 'var(--border-subtle)',
                backgroundColor: selectedCategory === 'equipment' ? getCategoryColor('equipment').selectedBg : 'var(--bg-surface1)',
                boxShadow: selectedCategory === 'equipment' ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                transition: 'var(--motion-normal)',
              }}
              onMouseEnter={(e) => {
                if (selectedCategory !== 'equipment') {
                  e.currentTarget.style.borderColor = 'var(--border-muted)';
                  e.currentTarget.style.backgroundColor = 'var(--bg-surface2)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCategory !== 'equipment') {
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  e.currentTarget.style.backgroundColor = 'var(--bg-surface1)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                }
              }}
            >
              <div className="flex justify-between items-start mb-4" style={{ marginBottom: 'var(--spacing-lg)' }}>
                <div>
                  <div className="text-[var(--font-label)] font-[var(--weight-medium)] mb-2" style={{ color: 'var(--text-muted)', marginBottom: 'var(--spacing-sm)' }}>
                    Option B
                  </div>
                  <span className="text-[var(--font-h2)] font-[var(--weight-semibold)]" style={{ color: 'var(--text-primary)' }}>Equipment Malfunction</span>
                </div>
                <span
                  className="text-[var(--font-h2)] font-[var(--weight-semibold)] tabular-nums"
                  style={{ color: selectedCategory === 'equipment' ? getCategoryColor('equipment').text : 'var(--text-primary)' }}
                >
                  {threatAssessment.equipmentMalfunction}%
                </span>
              </div>
              <div className="w-full rounded-full h-2.5 overflow-hidden" style={{ backgroundColor: 'var(--bg-base)' }}>
                <div
                  className="h-full rounded-full transition-all"
                  style={{ 
                    width: `${threatAssessment.equipmentMalfunction}%`,
                    backgroundColor: getCategoryColor('equipment').progress,
                    transition: 'var(--motion-slow)',
                  }}
                />
              </div>
            </button>

            {/* Option C: Environmental */}
            <button
              onClick={() => handleCategorySelect('environmental')}
              className="w-full text-left rounded-[var(--radius-card)] border-2 transition-all"
              style={{
                padding: 'var(--card-padding)',
                borderColor: selectedCategory === 'environmental' ? getCategoryColor('environmental').selectedBorder : 'var(--border-subtle)',
                backgroundColor: selectedCategory === 'environmental' ? getCategoryColor('environmental').selectedBg : 'var(--bg-surface1)',
                boxShadow: selectedCategory === 'environmental' ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                transition: 'var(--motion-normal)',
              }}
              onMouseEnter={(e) => {
                if (selectedCategory !== 'environmental') {
                  e.currentTarget.style.borderColor = 'var(--border-muted)';
                  e.currentTarget.style.backgroundColor = 'var(--bg-surface2)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCategory !== 'environmental') {
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  e.currentTarget.style.backgroundColor = 'var(--bg-surface1)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                }
              }}
            >
              <div className="flex justify-between items-start mb-4" style={{ marginBottom: 'var(--spacing-lg)' }}>
                <div>
                  <div className="text-[var(--font-label)] font-[var(--weight-medium)] mb-2" style={{ color: 'var(--text-muted)', marginBottom: 'var(--spacing-sm)' }}>
                    Option C
                  </div>
                  <span className="text-[var(--font-h2)] font-[var(--weight-semibold)]" style={{ color: 'var(--text-primary)' }}>Environmental</span>
                </div>
                <span
                  className="text-[var(--font-h2)] font-[var(--weight-semibold)] tabular-nums"
                  style={{ color: selectedCategory === 'environmental' ? getCategoryColor('environmental').text : 'var(--text-primary)' }}
                >
                  {threatAssessment.environmental}%
                </span>
              </div>
              <div className="w-full rounded-full h-2.5 overflow-hidden" style={{ backgroundColor: 'var(--bg-base)' }}>
                <div
                  className="h-full rounded-full transition-all"
                  style={{ 
                    width: `${threatAssessment.environmental}%`,
                    backgroundColor: getCategoryColor('environmental').progress,
                    transition: 'var(--motion-slow)',
                  }}
                />
              </div>
            </button>
          </div>
        </section>

        {/* Visual Reference */}
        <section className="mb-6" aria-label="Visual reference" style={{ marginBottom: 'var(--section-gap)' }}>
          <h2 className="text-[var(--font-h2)] font-[var(--weight-medium)] mb-3" style={{ textTransform: 'capitalize', color: 'var(--text-primary)', marginBottom: 'var(--spacing-md)' }}>Visual Reference</h2>
          <Card padding="lg">
            <div className="aspect-video flex items-center justify-center overflow-hidden rounded-[var(--radius-button)]" style={{ backgroundColor: 'var(--bg-surface2)' }}>
              <div className="text-[var(--font-body)]" style={{ color: 'var(--text-muted)' }}>Drone Camera Feed Thumbnail</div>
            </div>
          </Card>
        </section>

        {/* Broadcast Recipients */}
        <section className="mb-6" aria-label="Broadcast recipients" style={{ marginBottom: 'var(--section-gap)' }}>
          <h2 className="text-[var(--font-h2)] font-[var(--weight-medium)] mb-3" style={{ textTransform: 'capitalize', color: 'var(--text-primary)', marginBottom: 'var(--spacing-md)' }}>Broadcast Recipients</h2>
          <Card padding="md">
            <div className="flex items-center gap-4" style={{ gap: 'var(--spacing-lg)' }}>
              <div className="flex -space-x-2">
                {['M', 'I', 'S'].map((initial, idx) => (
                  <div
                    key={idx}
                    className="w-12 h-12 rounded-full border-2 flex items-center justify-center text-[var(--font-body)] font-[var(--weight-semibold)]"
                    style={{
                      backgroundColor: 'var(--bg-surface2)',
                      borderColor: 'var(--bg-base)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {initial}
                  </div>
                ))}
              </div>
              <div className="text-[var(--font-body)]" style={{ color: 'var(--text-secondary)' }}>Marc, Isabelle, Sophie</div>
            </div>
          </Card>
        </section>

        {/* Action Button */}
        <Button
          variant={broadcastSent ? 'secondary' : selectedCategory ? 'primary' : 'outline'}
          className="w-full"
          style={broadcastSent ? {
            backgroundColor: 'var(--bg-success)',
            color: 'var(--color-success)',
            borderColor: 'var(--color-success)',
          } : !selectedCategory ? {
            color: 'var(--text-primary)',
            opacity: 0.6,
          } : selectedCategory ? {
            background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-hover) 100%)',
            color: 'var(--text-inverse)',
            opacity: 1,
            border: 'none',
          } : {}}
          onClick={handleBroadcast}
          disabled={!selectedCategory || broadcastSent}
        >
          {broadcastSent
            ? '✓ Assessment Broadcasted Successfully'
            : selectedCategory
              ? `Confirm & Broadcast Assessment (${getConfidence(selectedCategory)}% confidence)`
              : 'Select a category to broadcast'}
        </Button>
      </div>
    </div>
  );
}
