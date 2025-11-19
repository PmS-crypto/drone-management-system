'use client';

import { useState, useEffect } from 'react';
import { Header, Card, CardHeader, CardTitle, CardContent, Button, Textarea, StatusPill, ScrollArea } from '@/src/components/ui';
import { cn } from '@/src/lib/utils';

interface GuardCoordinationProps {
  data: any;
  onComplete: () => void;
}

export default function GuardCoordination({ data, onComplete }: GuardCoordinationProps) {
  const { alert, guards } = data;
  const [message, setMessage] = useState(guards.message);
  const [messageSent, setMessageSent] = useState(guards.messageSent);
  const [statusTicker, setStatusTicker] = useState<string[]>([]);

  useEffect(() => {
    const tickerMessages = [
      '2:37:15 Message sent to Guards A, B, C',
      '2:37:30 Luc assessing threat',
      '2:37:40 Threat likely human intruder',
      '2:38:40 All-clear confirmed',
    ];

    let index = 0;
    const interval = setInterval(() => {
      if (index < tickerMessages.length) {
        setStatusTicker((prev) => [...prev, tickerMessages[index]]);
        index++;
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleSend = () => {
    setMessageSent(true);
    setStatusTicker((prev) => ['2:37:15 Message sent to Guards A, B, C', ...prev]);
  };

  return (
    <div className="min-h-screen animate-fade-in" style={{ backgroundColor: 'var(--bg-base)' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-6" style={{ paddingTop: 'var(--section-gap)' }}>
        <Header
          className="mt-0"
          title="Guard Coordination"
          description="Coordinate field response with security guards"
        />

        {/* Alert Summary */}
        <section className="mb-6" aria-label="Alert summary" style={{ marginBottom: 'var(--section-gap)' }}>
          <Card padding="md" variant="default">
            <CardHeader>
              <CardTitle className="text-[var(--font-h2)] font-[var(--weight-medium)]" style={{ color: 'var(--text-primary)' }}>
                Alert Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-[var(--font-body)]" style={{ gap: 'var(--spacing-md)' }}>
                <div className="flex items-center gap-3" style={{ gap: 'var(--spacing-md)' }}>
                  <span className="font-[var(--weight-medium)]" style={{ color: 'var(--text-muted)' }}>Location:</span>
                  <span className="font-[var(--weight-medium)]" style={{ color: 'var(--text-primary)' }}>{alert.location}</span>
                </div>
                <div className="flex items-center gap-3" style={{ gap: 'var(--spacing-md)' }}>
                  <span className="font-[var(--weight-medium)]" style={{ color: 'var(--text-muted)' }}>Response:</span>
                  <span className="font-[var(--weight-medium)]" style={{ color: 'var(--text-primary)' }}>Drone 2 deployed</span>
                </div>
                <div className="flex items-center gap-3" style={{ gap: 'var(--spacing-md)' }}>
                  <span className="font-[var(--weight-medium)]" style={{ color: 'var(--text-muted)' }}>Guard Action:</span>
                  <span className="font-[var(--weight-medium)]" style={{ color: 'var(--text-primary)' }}>Clear area</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Message Composition */}
        <section className="mb-6" aria-label="Message composition" style={{ marginBottom: 'var(--section-gap)' }}>
          <Card padding="md" variant="default">
            <CardHeader>
              <CardTitle className="text-[var(--font-h2)] font-[var(--weight-medium)]" style={{ color: 'var(--text-primary)' }}>
                Message to Guards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mb-6"
                placeholder="Enter message..."
                style={{ marginBottom: 'var(--spacing-2xl)' }}
              />
              <div className="flex justify-between items-center">
                <Button
                  variant={messageSent ? 'secondary' : 'primary'}
                  onClick={handleSend}
                  disabled={messageSent}
                  style={messageSent ? {
                    backgroundColor: 'var(--bg-success)',
                    color: 'var(--color-success)',
                    borderColor: 'var(--color-success)',
                  } : {
                    background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-hover) 100%)',
                    color: 'var(--text-inverse)',
                    opacity: 1,
                    border: 'none',
                  }}
                >
                  {messageSent ? '✓ Message Sent' : 'Send to Guards'}
                </Button>
                <span className="text-[var(--font-meta)]" style={{ color: 'var(--text-muted)' }}>{guards.positions.length} guard positions</span>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Guard Positions */}
        <section className="mb-6" aria-label="Guard positions" style={{ marginBottom: 'var(--section-gap)' }}>
          <Card padding="md" variant="default">
            <CardHeader>
              <CardTitle className="text-[var(--font-h2)] font-[var(--weight-medium)]" style={{ color: 'var(--text-primary)' }}>
                Guard Positions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4" style={{ gap: 'var(--spacing-lg)' }}>
                {guards.positions.map((pos: string) => (
                  <div
                    key={pos}
                    className="rounded-[var(--radius-card)] p-6 text-center transition-all border"
                    style={{
                      padding: 'var(--spacing-2xl)',
                      borderColor: messageSent ? 'var(--color-success)' : 'var(--border-subtle)',
                      backgroundColor: messageSent ? 'var(--bg-success)' : 'var(--bg-surface1)',
                      boxShadow: messageSent ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                      transition: 'var(--motion-normal)',
                    }}
                    onMouseEnter={(e) => {
                      if (!messageSent) {
                        e.currentTarget.style.borderColor = 'var(--border-muted)';
                        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!messageSent) {
                        e.currentTarget.style.borderColor = 'var(--border-subtle)';
                        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                      }
                    }}
                  >
                    <div className="text-[var(--font-h2)] font-[var(--weight-semibold)] mb-2" style={{ color: 'var(--text-primary)', marginBottom: 'var(--spacing-sm)' }}>Guard {pos}</div>
                    <div className="text-[var(--font-meta)]" style={{ color: 'var(--text-secondary)' }}>
                      {messageSent ? 'Message received' : 'Awaiting message'}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Real-time Status Ticker */}
        <section className="mb-6" aria-label="Status ticker" style={{ marginBottom: 'var(--section-gap)' }}>
          <Card padding="md" variant="default">
            <CardHeader>
              <CardTitle className="text-[var(--font-h2)] font-[var(--weight-medium)]" style={{ color: 'var(--text-primary)' }}>
                Status Ticker
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="max-h-64">
                {statusTicker.length === 0 ? (
                  <div className="text-[var(--font-body)]" style={{ color: 'var(--text-muted)' }}>Waiting for updates...</div>
                ) : (
                  <div className="space-y-4" style={{ gap: 'var(--spacing-lg)' }}>
                    {statusTicker.map((status, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 text-[var(--font-body)] animate-fade-in-up"
                        style={{ 
                          color: 'var(--text-secondary)',
                          gap: 'var(--spacing-md)',
                        }}
                      >
                        <span className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: 'var(--accent-primary)' }}></span>
                        <span>{status}</span>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </section>

        {/* Complete Button */}
        {messageSent && (
          <Button 
            variant="primary" 
            className="w-full" 
            style={{
              backgroundColor: 'var(--color-success)',
            }}
            onClick={onComplete}
          >
            Incident Resolved — Return to Alert Screen
          </Button>
        )}
      </div>
    </div>
  );
}
