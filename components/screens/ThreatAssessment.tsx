'use client';

import { useState } from 'react';

interface ThreatAssessmentProps {
  data: any;
  onBroadcast: () => void;
}

export default function ThreatAssessment({ data, onBroadcast }: ThreatAssessmentProps) {
  const { sensors, threatAssessment } = data;
  const [selectedCategory, setSelectedCategory] = useState<string | null>(threatAssessment.selectedCategory);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleBroadcast = () => {
    if (selectedCategory) {
      onBroadcast();
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

  return (
    <div className="min-h-screen bg-neutral">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-2xl font-semibold text-white mb-2 tracking-tight">Threat Assessment</h1>
          <p className="text-sm text-white/50">Categorize and broadcast threat assessment</p>
        </div>

        {/* Sensor Data Aggregation */}
        <div className="mb-8">
          <div className="mb-3">
            <h2 className="text-xs font-medium text-white/40 uppercase tracking-wider">Sensor Data</h2>
            </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Motion', value: `${sensors.motion}%` },
              { label: 'Heat', value: `${sensors.heat}%` },
              { label: 'Pressure', value: `${sensors.pressure}%` },
              { label: 'Pattern', value: sensors.pattern }
            ].map((sensor, idx) => (
              <div 
                key={idx}
                className="bg-white/[0.02] border border-white/5 rounded-lg p-4 hover:bg-white/[0.03] hover:border-white/10 transition-all duration-200"
              >
                <div className="text-xs font-medium text-white/40 mb-2">{sensor.label}</div>
                <div className="text-xl font-semibold text-white tracking-tight">{sensor.value}</div>
            </div>
            ))}
          </div>
        </div>

        {/* Guided Decision Tree */}
        <div className="mb-8">
          <div className="mb-3">
            <h2 className="text-xs font-medium text-white/40 uppercase tracking-wider">Guided Decision Tree</h2>
          </div>
          <p className="text-sm text-white/60 mb-6">
            Based on sensor pattern, this is likely:
          </p>

          <div className="space-y-3">
            {/* Option A: Human Intruder */}
            <button
              onClick={() => handleCategorySelect('human')}
              className={`w-full text-left p-5 rounded-lg border transition-all duration-200 ${
                selectedCategory === 'human'
                  ? 'border-red-500/30 bg-red-500/5 shadow-lg shadow-red-500/5'
                  : 'border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.03]'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="text-xs font-medium text-white/40 mb-1">Option A</div>
                  <span className="text-base font-medium text-white">Human Intruder</span>
                </div>
                <span className={`text-2xl font-semibold ${selectedCategory === 'human' ? 'text-red-400' : 'text-white/80'}`}>
                  {threatAssessment.humanIntruder}%
                </span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="bg-red-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${threatAssessment.humanIntruder}%` }}
                />
              </div>
            </button>

            {/* Option B: Equipment Malfunction */}
            <button
              onClick={() => handleCategorySelect('equipment')}
              className={`w-full text-left p-5 rounded-lg border transition-all duration-200 ${
                selectedCategory === 'equipment'
                  ? 'border-amber-500/30 bg-amber-500/5 shadow-lg shadow-amber-500/5'
                  : 'border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.03]'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="text-xs font-medium text-white/40 mb-1">Option B</div>
                  <span className="text-base font-medium text-white">Equipment Malfunction</span>
                </div>
                <span className={`text-2xl font-semibold ${selectedCategory === 'equipment' ? 'text-amber-400' : 'text-white/80'}`}>
                  {threatAssessment.equipmentMalfunction}%
                </span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="bg-amber-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${threatAssessment.equipmentMalfunction}%` }}
                />
              </div>
            </button>

            {/* Option C: Environmental */}
            <button
              onClick={() => handleCategorySelect('environmental')}
              className={`w-full text-left p-5 rounded-lg border transition-all duration-200 ${
                selectedCategory === 'environmental'
                  ? 'border-green-500/30 bg-green-500/5 shadow-lg shadow-green-500/5'
                  : 'border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.03]'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="text-xs font-medium text-white/40 mb-1">Option C</div>
                  <span className="text-base font-medium text-white">Environmental</span>
                </div>
                <span className={`text-2xl font-semibold ${selectedCategory === 'environmental' ? 'text-green-400' : 'text-white/80'}`}>
                  {threatAssessment.environmental}%
                </span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="bg-green-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${threatAssessment.environmental}%` }}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Visual Reference */}
        <div className="mb-8">
          <div className="mb-3">
            <h2 className="text-xs font-medium text-white/40 uppercase tracking-wider">Visual Reference</h2>
          </div>
          <div className="bg-black/40 border border-white/5 rounded-lg aspect-video flex items-center justify-center overflow-hidden">
            <div className="text-sm text-white/30">Drone Camera Feed Thumbnail</div>
          </div>
        </div>

        {/* Broadcast Recipients */}
        <div className="mb-8">
          <div className="mb-3">
            <h2 className="text-xs font-medium text-white/40 uppercase tracking-wider">Broadcast Recipients</h2>
            </div>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {['M', 'I', 'S'].map((initial, idx) => (
                <div 
                  key={idx}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-sm font-medium text-white/80 backdrop-blur-sm"
                >
                  {initial}
            </div>
              ))}
            </div>
            <div className="text-sm text-white/60">Marc, Isabelle, Sophie</div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleBroadcast}
          disabled={!selectedCategory}
          className={`w-full font-semibold py-3 px-6 rounded-md transition-all duration-150 min-h-[48px] ${
            selectedCategory
              ? 'bg-alert text-white hover:bg-alert-hover active:bg-alert-active shadow-button-hover hover:shadow-button-active focus-visible:outline-2 focus-visible:outline-info focus-visible:outline-offset-2'
              : 'bg-white/5 text-white/30 cursor-not-allowed border border-white/5'
          }`}
        >
          {selectedCategory 
            ? `Confirm & Broadcast Assessment (${getConfidence(selectedCategory)}% confidence)`
            : 'Select a category to broadcast'
          }
        </button>
      </div>
    </div>
  );
}

