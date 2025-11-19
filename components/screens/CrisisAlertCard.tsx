'use client';

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
        bg: 'bg-red-500/10',
        border: 'border-red-500/30',
        shadow: 'shadow-lg shadow-red-500/10',
        text: 'text-red-400',
        progress: 'bg-red-500'
      };
    } else if (alert.confidence >= 70) {
      return {
        bg: 'bg-amber-500/10',
        border: 'border-amber-500/30',
        shadow: 'shadow-lg shadow-amber-500/10',
        text: 'text-amber-400',
        progress: 'bg-amber-500'
      };
    } else {
      return {
        bg: 'bg-amber-500/5',
        border: 'border-amber-500/20',
        shadow: 'shadow-lg shadow-amber-500/5',
        text: 'text-amber-400/80',
        progress: 'bg-amber-500/80'
      };
    }
  };

  const colors = getConfidenceColor();
  const confidenceLabel = alert.confidence >= 85 
    ? 'High confidence — Real threat' 
    : alert.confidence >= 70 
    ? 'Moderate confidence — Review recommended' 
    : 'Low confidence — Manual review required';

  return (
    <div className="min-h-screen bg-neutral flex items-center justify-center p-6 py-12">
      <div className={`w-full max-w-2xl ${colors.bg} ${colors.border} border rounded-lg p-8 ${colors.shadow} animate-slide-in`}>
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-red-500/20 mb-4">
            <span className="text-3.5xl">🔴</span>
          </div>
          <h1 className="text-[32px] font-bold text-red-500 mb-3 tracking-tight leading-tight">Security Alert</h1>
          <div className="space-y-2 text-sm text-white/60">
            <div className="flex items-center justify-center gap-2">
              <span className="text-[11px] font-semibold text-white/40 uppercase tracking-[0.5px]">Location</span>
              <span>{alert.location}</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-[11px] font-semibold text-white/40 uppercase tracking-[0.5px]">Time</span>
              <span>{alert.time} AM</span>
            </div>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white/[0.02] border border-white/5 rounded-lg p-8 mb-6 backdrop-blur-sm shadow-md">
          {/* System Confidence */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[11px] font-semibold text-white/40 uppercase tracking-[0.5px]">System Confidence</span>
              <span className={`text-2xl font-semibold ${colors.text}`}>{alert.confidence}%</span>
            </div>
            <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden mb-3 shadow-sm">
              <div 
                className="h-full rounded-full transition-all duration-500"
                style={{ 
                  width: `${alert.confidence}%`,
                  background: alert.confidence >= 85 
                    ? 'linear-gradient(90deg, #F59E0B 0%, #DC2626 100%)'
                    : 'linear-gradient(90deg, #F59E0B 0%, #F59E0B 100%)'
                }}
              />
            </div>
            <div className="text-xs text-white/50">
              {confidenceLabel}
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-white/5">
            {/* Sensor Health */}
            <div className="bg-white/[0.02] border border-white/5 rounded-md p-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[11px] font-semibold text-white/40 uppercase tracking-[0.5px]">Sensor Health</span>
                <span className="text-base font-semibold text-white/80 font-mono">{alert.sensorHealth}%</span>
              </div>
              <div className="text-xs text-white/50">
                Reliable today (1 false alarm logged)
              </div>
            </div>

            {/* Recommended Action */}
            <div className="bg-amber-500/10 border-l-[3px] border-amber-500 rounded-md p-4">
              <div className="text-[11px] font-semibold text-white/40 uppercase tracking-[0.5px] mb-2">Recommended Action</div>
              <div className="text-sm font-normal text-white leading-relaxed">
                <span className="font-semibold">{alert.recommendedAction}</span> <span className="text-white/50">(ETA: {alert.eta}s)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={onDeploy}
            className="flex-1 bg-alert text-white font-semibold py-3 px-6 rounded-md hover:bg-alert-hover active:bg-alert-active transition-all duration-150 min-h-[48px] shadow-button-hover hover:shadow-button-active focus-visible:outline-2 focus-visible:outline-info focus-visible:outline-offset-2"
          >
            Deploy Drone
          </button>
          <button
            onClick={onManualReview}
            className="flex-1 bg-white/5 text-white font-semibold py-3 px-6 rounded-md hover:bg-white/10 active:bg-white/15 transition-all duration-150 min-h-[48px] border border-white/10 hover:border-white/20 focus-visible:outline-2 focus-visible:outline-info focus-visible:outline-offset-2"
          >
            Manual Review
          </button>
        </div>

        {/* Footer Note */}
        <div className="mt-6 text-center text-xs text-white/30">
          Last year's near-miss was in this gallery
        </div>
      </div>
    </div>
  );
}

