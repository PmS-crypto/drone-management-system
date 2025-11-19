'use client';

import { Card, CardHeader, CardTitle, CardContent, Button, StatusPill, Header } from '@/src/components/ui';
import { cn } from '@/src/lib/utils';

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
        border: 'var(--color-alert)',
        text: 'var(--color-alert)',
        progress: 'var(--color-alert)',
        pill: 'high' as const,
        bg: 'var(--bg-alert)',
      };
    } else if (alert.confidence >= 70) {
      return {
        border: 'var(--color-warning)',
        text: 'var(--color-warning)',
        progress: 'var(--color-warning)',
        pill: 'warning' as const,
        bg: 'var(--bg-warning)',
      };
    } else {
      return {
        border: 'var(--color-warning)',
        text: 'var(--color-warning)',
        progress: 'var(--color-warning)',
        pill: 'warning' as const,
        bg: 'var(--bg-warning)',
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
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pb-6 animate-fade-in" style={{ backgroundColor: 'var(--bg-base)', paddingTop: 'var(--section-gap)' }}>
      <div className="w-full max-w-2xl">
        {/* Header with Theme Toggle */}
        <div className="mb-6" style={{ marginBottom: 'var(--spacing-2xl)' }}>
          <Header
            className="mt-0"
            sticky={false}
            title="Security Alert"
            description={`${alert.location} — ${alert.time} AM`}
          />
        </div>
      <Card variant="default" className="w-full animate-scale-in" style={{ borderColor: colors.border }}>
        {/* Main Content Card */}
        <Card variant="default" padding="md" className="mb-6" style={{ marginBottom: 'var(--spacing-2xl)' }}>
          {/* System Confidence */}
          <div className="mb-6" style={{ marginBottom: 'var(--spacing-2xl)' }}>
            <div className="flex justify-between items-center mb-4" style={{ marginBottom: 'var(--spacing-lg)' }}>
              <span className="text-[var(--font-label)] font-[var(--weight-medium)]" style={{ color: 'var(--text-muted)' }}>
                System Confidence
              </span>
              <StatusPill variant={colors.pill} size="md">
                {alert.confidence}%
              </StatusPill>
            </div>
            <div className="w-full rounded-full h-2 overflow-hidden mb-3" style={{ backgroundColor: 'var(--bg-base)', marginBottom: 'var(--spacing-md)' }}>
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${alert.confidence}%`,
                  backgroundColor: colors.progress,
                  transition: 'var(--motion-slow)',
                }}
              />
            </div>
            <div className="text-[var(--font-body)]" style={{ color: 'var(--text-secondary)', lineHeight: '1.45' }}>{confidenceLabel}</div>
          </div>

          <div className="space-y-4 pt-6 border-t" style={{ gap: 'var(--spacing-lg)', paddingTop: 'var(--spacing-2xl)', borderColor: 'var(--border-subtle)' }}>
            {/* Sensor Health */}
            <div className="rounded-[var(--radius-card)] p-4 border" style={{ backgroundColor: 'var(--bg-surface2)', borderColor: 'var(--border-subtle)', padding: 'var(--spacing-lg)' }}>
              <div className="flex justify-between items-center mb-2" style={{ marginBottom: 'var(--spacing-sm)' }}>
                <span className="text-[var(--font-label)] font-[var(--weight-medium)]" style={{ color: 'var(--text-muted)' }}>
                  Sensor Health
                </span>
                <span className="text-[var(--font-h2)] font-[var(--weight-semibold)] tabular-nums" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-family)' }}>
                  {alert.sensorHealth}%
                </span>
              </div>
              <div className="text-[var(--font-meta)]" style={{ color: 'var(--text-secondary)' }}>Reliable today (1 false alarm logged)</div>
            </div>

            {/* Recommended Action */}
            <div className="rounded-[var(--radius-card)] p-4 border" style={{ backgroundColor: 'var(--bg-surface2)', borderColor: 'var(--border-subtle)', padding: 'var(--spacing-lg)' }}>
              <div className="flex justify-between items-center mb-2" style={{ marginBottom: 'var(--spacing-sm)' }}>
                <span className="text-[var(--font-label)] font-[var(--weight-medium)]" style={{ color: 'var(--text-muted)' }}>
                  Recommended Action
                </span>
                <span className="text-[var(--font-body)] font-[var(--weight-medium)]" style={{ color: 'var(--text-primary)' }}>
                  <span className="font-[var(--weight-semibold)]">{alert.recommendedAction}</span>
                </span>
              </div>
              <div className="text-[var(--font-meta)]" style={{ color: 'var(--text-secondary)' }}>(ETA: {alert.eta}s)</div>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4" style={{ gap: 'var(--spacing-lg)' }}>
          <Button variant="primary" className="flex-1" onClick={onDeploy}>
            Deploy Drone
          </Button>
          <Button variant="tertiary" className="flex-1" onClick={onManualReview}>
            Manual Review
          </Button>
        </div>

        {/* Footer Note */}
        <div className="mt-6 text-center text-[var(--font-meta)]" style={{ marginTop: 'var(--spacing-2xl)', color: 'var(--text-muted)' }}>
          Last year's near-miss was in this gallery
        </div>
      </Card>
      </div>
    </div>
  );
}
