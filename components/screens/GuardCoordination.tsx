'use client';

import { useState, useEffect } from 'react';

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
        setStatusTicker(prev => [...prev, tickerMessages[index]]);
        index++;
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleSend = () => {
    setMessageSent(true);
    setStatusTicker(prev => ['2:37:15 Message sent to Guards A, B, C', ...prev]);
  };

  return (
    <div className="min-h-screen bg-neutral">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-2xl font-semibold text-white mb-2 tracking-tight">Guard Coordination</h1>
          <p className="text-sm text-white/50">Coordinate field response with security guards</p>
        </div>

        {/* Alert Summary */}
        <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-5 mb-6">
          <h2 className="text-[11px] font-semibold text-white/40 uppercase tracking-[0.5px] mb-4">Alert Summary</h2>
          <div className="space-y-2.5 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-white/40 font-medium">Location:</span>
              <span className="text-white/80">{alert.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white/40 font-medium">Response:</span>
              <span className="text-white/80">Drone 2 deployed</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white/40 font-medium">Guard Action:</span>
              <span className="text-white/80">Clear area</span>
            </div>
          </div>
        </div>

        {/* Message Composition */}
        <div className="bg-white/[0.02] border border-white/5 rounded-lg p-6 mb-6 shadow-md">
          <h2 className="text-[11px] font-semibold text-white/40 uppercase tracking-[0.5px] mb-4">Message to Guards</h2>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-white/[0.02] border border-white/5 rounded-lg p-4 text-white text-sm min-h-[120px] focus:outline-none focus:border-white/20 transition-all duration-200 placeholder:text-white/30"
            placeholder="Enter message..."
          />
          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={handleSend}
              disabled={messageSent}
              className={`font-semibold py-3 px-6 rounded-md transition-all duration-150 min-h-[48px] ${
                messageSent
                  ? 'bg-success/20 text-success border border-success/30 cursor-not-allowed'
                  : 'bg-alert text-white hover:bg-alert-hover active:bg-alert-active shadow-button-hover hover:shadow-button-active focus-visible:outline-2 focus-visible:outline-info focus-visible:outline-offset-2'
              }`}
            >
              {messageSent ? '✓ Message Sent' : 'Send to Guards'}
            </button>
            <span className="text-white/40 text-xs">
              {guards.positions.length} guard positions
            </span>
          </div>
        </div>

        {/* Guard Positions */}
        <div className="bg-white/[0.02] border border-white/5 rounded-lg p-6 mb-6 shadow-md">
          <h2 className="text-[11px] font-semibold text-white/40 uppercase tracking-[0.5px] mb-4">Guard Positions</h2>
          <div className="grid grid-cols-3 gap-3">
            {guards.positions.map((pos: string) => (
              <div
                key={pos}
                className={`bg-white/[0.02] border rounded-lg p-4 text-center transition-all duration-200 ${
                  messageSent 
                    ? 'border-green-500/30 bg-green-500/5' 
                    : 'border-white/5 hover:border-white/10'
                }`}
              >
                <div className="text-base font-semibold text-white mb-1">Guard {pos}</div>
                <div className="text-xs text-white/50">
                  {messageSent ? 'Message received' : 'Awaiting message'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real-time Status Ticker */}
        <div className="bg-white/[0.02] border border-white/5 rounded-lg p-6 mb-6 shadow-md">
          <h2 className="text-[11px] font-semibold text-white/40 uppercase tracking-[0.5px] mb-4">Status Ticker</h2>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {statusTicker.length === 0 ? (
              <div className="text-white/30 text-sm">Waiting for updates...</div>
            ) : (
              statusTicker.map((status, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 text-white/70 text-sm animate-fade-in-up"
                >
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></span>
                  <span>{status}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Complete Button */}
        {messageSent && statusTicker.length > 2 && (
          <button
            onClick={onComplete}
            className="w-full bg-success text-white font-semibold py-3 px-6 rounded-md hover:bg-success/90 active:bg-success/80 transition-all duration-150 min-h-[48px] shadow-md hover:shadow-lg focus-visible:outline-2 focus-visible:outline-info focus-visible:outline-offset-2"
          >
            Incident Resolved — Return to Alert Screen
          </button>
        )}
      </div>
    </div>
  );
}

