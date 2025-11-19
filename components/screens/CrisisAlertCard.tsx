'use client';

import { Card, CardHeader, CardTitle, CardContent, Button, StatusPill } from '@/src/components/ui';
import { cn } from '@/src/lib/utils';
import { AlertIcon } from '@/src/components/ui/Icons';

interface CrisisAlertCardProps {
  data: any;
  onDeploy: () => void;
  onManualReview: () => void;
}

export default function CrisisAlertCard({ data, onDeploy, onManualReview }: CrisisAlertCardProps) {
  const { alert } = data;

  const getConfidenceColor = () => {
    if (alert.confidence >= 85) {
      return {
        border: 'border-alert',
        text: 'text-alert',
        progress: 'bg-alert',
        pill: 'high' as const,
      };
    } else if (alert.confidence >= 70) {
      return {
        border: 'border-warning',
        text: 'text-warning',
        progress: 'bg-warning',
        pill: 'warning' as const,
      };
    } else {
      return {
        border: 'border-warning',
        text: 'text-warning',
        progress: 'bg-warning',
        pill: 'warning' as const,
      };
    }
  };

  const colors = getConfidenceColor();
  const confidenceLabel =
    alert.confidence >= 85
      ? 'High confidence — Real threat'
      : alert.confidence >= 70
        ? 'Moderate confidence — Review recommended'
        : 'Low confidence — Manual review required';

  return (
    <div className="min-h-screen bg-bg-base flex items-center justify-center p-gutter animate-fade-in">
      <Card variant="glass" className={cn('w-full max-w-2xl animate-scale-in', colors.border)}>
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-bg-raised border border-border-default mb-4">
            <AlertIcon className="w-6 h-6 text-alert" />
          </div>
          <h1 className="text-h2 font-semibold text-text-primary mb-4 tracking-tight leading-tight">
            Security Alert
          </h1>
          <div className="space-y-2 text-body text-text-secondary">
            <div className="flex items-center justify-center gap-3">
              <span className="text-label font-medium text-text-tertiary">Location</span>
              <span className="font-medium">{alert.location}</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <span className="text-label font-medium text-text-tertiary">Time</span>
              <span className="font-medium">{alert.time} AM</span>
            </div>
          </div>
        </div>

        {/* Main Content Card */}
        <Card variant="glass" className="mb-6">
          {/* System Confidence */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-label font-medium text-text-tertiary">
                System Confidence
              </span>
              <StatusPill variant={colors.pill} size="md">
                {alert.confidence}%
              </StatusPill>
            </div>
            <div className="w-full bg-bg-base rounded-full h-2 overflow-hidden mb-3">
              <div
                className={cn('h-full rounded-full transition-all duration-500', colors.progress)}
                style={{
                  width: `${alert.confidence}%`,
                }}
              />
            </div>
            <div className="text-body text-text-secondary leading-relaxed">{confidenceLabel}</div>
          </div>

          <div className="space-y-4 pt-6 border-t border-border-default">
            {/* Sensor Health */}
            <div className="glass rounded-xl p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-label font-medium text-text-tertiary">
                  Sensor Health
                </span>
                <span className="text-value font-semibold text-text-primary font-mono">
                  {alert.sensorHealth}%
                </span>
              </div>
              <div className="text-bodySmall text-text-secondary">Reliable today (1 false alarm logged)</div>
            </div>

            {/* Recommended Action */}
            <div className="glass rounded-xl p-4 border-l-4 border-warning">
              <div className="text-label font-medium text-text-tertiary mb-2">
                Recommended Action
              </div>
              <div className="text-body font-medium text-text-primary leading-relaxed">
                <span className="font-semibold">{alert.recommendedAction}</span>{' '}
                <span className="text-text-secondary">(ETA: {alert.eta}s)</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button variant="primary" className="flex-1" onClick={onDeploy}>
            Deploy Drone
          </Button>
          <Button variant="ghost" className="flex-1" onClick={onManualReview}>
            Manual Review
          </Button>
        </div>

        {/* Footer Note */}
        <div className="mt-6 text-center text-bodySmall text-text-tertiary">
          Last year's near-miss was in this gallery
        </div>
      </Card>
    </div>
  );
}
