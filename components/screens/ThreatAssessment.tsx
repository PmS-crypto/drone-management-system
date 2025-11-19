'use client';

import { useState } from 'react';
import { Header, Card, CardHeader, CardTitle, CardContent, Button, KPITile } from '@/src/components/ui';
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
          selected: 'border-alert/40 bg-alert/10',
          text: 'text-alert',
          progress: 'bg-alert',
        };
      case 'equipment':
        return {
          selected: 'border-warning/40 bg-warning/10',
          text: 'text-warning',
          progress: 'bg-warning',
        };
      case 'environmental':
        return {
          selected: 'border-success/40 bg-success/10',
          text: 'text-success',
          progress: 'bg-success',
        };
      default:
        return {
          selected: '',
          text: 'text-text-primary',
          progress: 'bg-bg-base',
        };
    }
  };

  return (
    <div className="min-h-screen bg-bg-base animate-fade-in">
      <div className="max-w-4xl mx-auto px-gutter py-10">
        <Header
          title="Threat Assessment"
          description="Categorize and broadcast threat assessment"
        />

        {/* Sensor Data Aggregation */}
        <div className="mb-section">
          <div className="mb-4">
            <h2 className="text-sectionHeader font-semibold text-text-primary">Sensor Data</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Motion', value: `${sensors.motion}%` },
              { label: 'Heat', value: `${sensors.heat}%` },
              { label: 'Pressure', value: `${sensors.pressure}%` },
              { label: 'Pattern', value: sensors.pattern },
            ].map((sensor, idx) => (
              <KPITile key={idx} label={sensor.label} value={sensor.value} />
            ))}
          </div>
        </div>

        {/* Guided Decision Tree */}
        <div className="mb-section">
          <div className="mb-4">
            <h2 className="text-sectionHeader font-semibold text-text-primary">
              Guided Decision Tree
            </h2>
          </div>
          <p className="text-body text-text-secondary mb-6 leading-relaxed">
            Based on sensor pattern, this is likely:
          </p>

          <div className="space-y-4">
            {/* Option A: Human Intruder */}
            <button
              onClick={() => handleCategorySelect('human')}
              className={cn(
                'w-full text-left p-6 rounded-xl border-2 transition-all duration-200 hover-scale',
                selectedCategory === 'human'
                  ? getCategoryColor('human').selected + ' shadow-lg'
                  : 'border-border-default bg-bg-surface hover:border-border-hover hover:bg-bg-raised shadow-md hover:shadow-lg'
              )}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-label font-medium text-text-tertiary mb-2">
                    Option A
                  </div>
                  <span className="text-cardTitle font-semibold text-text-primary">Human Intruder</span>
                </div>
                <span
                  className={cn(
                    'text-value font-semibold',
                    selectedCategory === 'human' ? getCategoryColor('human').text : 'text-text-primary'
                  )}
                >
                  {threatAssessment.humanIntruder}%
                </span>
              </div>
              <div className="w-full bg-bg-base rounded-full h-2.5 overflow-hidden">
                <div
                  className={cn('h-full rounded-full transition-all duration-500', getCategoryColor('human').progress)}
                  style={{ width: `${threatAssessment.humanIntruder}%` }}
                />
              </div>
            </button>

            {/* Option B: Equipment Malfunction */}
            <button
              onClick={() => handleCategorySelect('equipment')}
              className={cn(
                'w-full text-left p-6 rounded-xl border-2 transition-all duration-200 hover-scale',
                selectedCategory === 'equipment'
                  ? getCategoryColor('equipment').selected + ' shadow-lg'
                  : 'border-border-default bg-bg-surface hover:border-border-hover hover:bg-bg-raised shadow-md hover:shadow-lg'
              )}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-label font-medium text-text-tertiary mb-2">
                    Option B
                  </div>
                  <span className="text-cardTitle font-semibold text-text-primary">Equipment Malfunction</span>
                </div>
                <span
                  className={cn(
                    'text-value font-semibold',
                    selectedCategory === 'equipment'
                      ? getCategoryColor('equipment').text
                      : 'text-text-primary'
                  )}
                >
                  {threatAssessment.equipmentMalfunction}%
                </span>
              </div>
              <div className="w-full bg-bg-base rounded-full h-2.5 overflow-hidden">
                <div
                  className={cn(
                    'h-full rounded-full transition-all duration-500',
                    getCategoryColor('equipment').progress
                  )}
                  style={{ width: `${threatAssessment.equipmentMalfunction}%` }}
                />
              </div>
            </button>

            {/* Option C: Environmental */}
            <button
              onClick={() => handleCategorySelect('environmental')}
              className={cn(
                'w-full text-left p-6 rounded-xl border-2 transition-all duration-200 hover-scale',
                selectedCategory === 'environmental'
                  ? getCategoryColor('environmental').selected + ' shadow-lg'
                  : 'border-border-default bg-bg-surface hover:border-border-hover hover:bg-bg-raised shadow-md hover:shadow-lg'
              )}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-label font-medium text-text-tertiary mb-2">
                    Option C
                  </div>
                  <span className="text-cardTitle font-semibold text-text-primary">Environmental</span>
                </div>
                <span
                  className={cn(
                    'text-value font-semibold',
                    selectedCategory === 'environmental'
                      ? getCategoryColor('environmental').text
                      : 'text-text-primary'
                  )}
                >
                  {threatAssessment.environmental}%
                </span>
              </div>
              <div className="w-full bg-bg-base rounded-full h-2.5 overflow-hidden">
                <div
                  className={cn(
                    'h-full rounded-full transition-all duration-500',
                    getCategoryColor('environmental').progress
                  )}
                  style={{ width: `${threatAssessment.environmental}%` }}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Visual Reference */}
        <div className="mb-section">
          <div className="mb-4">
            <h2 className="text-sectionHeader font-semibold text-text-primary">
              Visual Reference
            </h2>
          </div>
          <div className="glass rounded-xl aspect-video flex items-center justify-center overflow-hidden shadow-lg">
            <div className="text-body text-text-tertiary">Drone Camera Feed Thumbnail</div>
          </div>
        </div>

        {/* Broadcast Recipients */}
        <div className="mb-section">
          <div className="mb-4">
            <h2 className="text-sectionHeader font-semibold text-text-primary">
              Broadcast Recipients
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {['M', 'I', 'S'].map((initial, idx) => (
                <div
                  key={idx}
                  className="w-12 h-12 rounded-full glass border-2 border-bg-base flex items-center justify-center text-body font-semibold text-text-primary"
                >
                  {initial}
                </div>
              ))}
            </div>
            <div className="text-body text-text-secondary">Marc, Isabelle, Sophie</div>
          </div>
        </div>

        {/* Action Button */}
        <Button
          variant={broadcastSent ? 'secondary' : selectedCategory ? 'primary' : 'ghost'}
          className={cn(
            'w-full',
            broadcastSent && 'bg-success/10 text-success border-success/30'
          )}
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
