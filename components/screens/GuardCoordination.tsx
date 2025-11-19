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
    <div className="min-h-screen bg-bg-base animate-fade-in">
      <div className="max-w-4xl mx-auto px-gutter py-10">
        <Header
          title="Guard Coordination"
          description="Coordinate field response with security guards"
        />

        {/* Alert Summary */}
        <Card variant="glass" className="mb-section border-warning/30 bg-warning/5">
          <CardHeader>
            <CardTitle className="text-sectionHeader font-semibold text-text-primary">
              Alert Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-body">
              <div className="flex items-center gap-3">
                <span className="text-text-tertiary font-medium">Location:</span>
                <span className="text-text-primary font-medium">{alert.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-text-tertiary font-medium">Response:</span>
                <span className="text-text-primary font-medium">Drone 2 deployed</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-text-tertiary font-medium">Guard Action:</span>
                <span className="text-text-primary font-medium">Clear area</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Message Composition */}
        <Card variant="glass" className="mb-section">
          <CardHeader>
            <CardTitle className="text-sectionHeader font-semibold text-text-primary">
              Message to Guards
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mb-6"
              placeholder="Enter message..."
            />
            <div className="flex justify-between items-center">
              <Button
                variant={messageSent ? 'secondary' : 'primary'}
                onClick={handleSend}
                disabled={messageSent}
                className={cn(messageSent && 'bg-success/10 text-success border-success/30')}
              >
                {messageSent ? '✓ Message Sent' : 'Send to Guards'}
              </Button>
              <span className="text-bodySmall text-text-tertiary">{guards.positions.length} guard positions</span>
            </div>
          </CardContent>
        </Card>

        {/* Guard Positions */}
        <Card variant="glass" className="mb-section">
          <CardHeader>
            <CardTitle className="text-sectionHeader font-semibold text-text-primary">
              Guard Positions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              {guards.positions.map((pos: string) => (
                <div
                  key={pos}
                  className={cn(
                    'glass rounded-xl p-6 text-center transition-all duration-200 hover-scale',
                    messageSent
                      ? 'border-success/30 bg-success/5 shadow-lg'
                      : 'border-border-default hover:border-border-hover hover:shadow-lg'
                  )}
                >
                  <div className="text-value font-semibold text-text-primary mb-2">Guard {pos}</div>
                  <div className="text-bodySmall text-text-secondary">
                    {messageSent ? 'Message received' : 'Awaiting message'}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Real-time Status Ticker */}
        <Card variant="glass" className="mb-section">
          <CardHeader>
            <CardTitle className="text-sectionHeader font-semibold text-text-primary">
              Status Ticker
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="max-h-64">
              {statusTicker.length === 0 ? (
                <div className="text-text-tertiary text-body">Waiting for updates...</div>
              ) : (
                <div className="space-y-4">
                  {statusTicker.map((status, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 text-text-secondary text-body animate-fade-in-up leading-relaxed"
                    >
                      <span className="w-2 h-2 bg-accent-primary rounded-full mt-2 flex-shrink-0"></span>
                      <span>{status}</span>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Complete Button */}
        {messageSent && statusTicker.length > 2 && (
          <Button variant="primary" className="w-full bg-success hover:bg-success/90" onClick={onComplete}>
            Incident Resolved — Return to Alert Screen
          </Button>
        )}
      </div>
    </div>
  );
}
