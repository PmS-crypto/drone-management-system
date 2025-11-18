'use client';

type Mode = 'crisis' | 'analysis';

interface ModeToggleProps {
  mode: Mode;
  onModeChange: (mode: Mode) => void;
}

export default function ModeToggle({ mode, onModeChange }: ModeToggleProps) {
  return (
    <div className="fixed top-6 right-6 z-50">
      <div className="flex gap-1 bg-white/[0.02] backdrop-blur-sm border border-white/5 rounded-lg p-1 shadow-lg">
        <button
          onClick={() => onModeChange('crisis')}
          className={`px-4 py-2 rounded-md font-medium text-xs transition-all duration-200 ${
            mode === 'crisis'
              ? 'bg-red-500 text-white shadow-lg shadow-red-500/20'
              : 'text-white/50 hover:text-white/80'
          }`}
        >
          Crisis Mode
        </button>
        <button
          onClick={() => onModeChange('analysis')}
          className={`px-4 py-2 rounded-md font-medium text-xs transition-all duration-200 ${
            mode === 'analysis'
              ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20'
              : 'text-white/50 hover:text-white/80'
          }`}
        >
          Analysis Mode
        </button>
      </div>
    </div>
  );
}

