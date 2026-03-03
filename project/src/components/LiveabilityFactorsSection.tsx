import { LiveabilityFactor } from '../types';
import { Sun, Volume2, MapPin, Lock, Scale } from 'lucide-react';

interface Props {
  factors: LiveabilityFactor[];
  onChange: (factors: LiveabilityFactor[]) => void;
}

const factorIcons = {
  'Solar Orientation': Sun,
  'Acoustic Comfort': Volume2,
  'Convenience': MapPin,
};

export const LiveabilityFactorsSection = ({ factors, onChange }: Props) => {
  const updateFactor = (index: number, updates: Partial<LiveabilityFactor>) => {
    const newFactors = [...factors];
    newFactors[index] = { ...newFactors[index], ...updates };
    onChange(newFactors);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Livability Factors</h2>

      {factors.map((factor, index) => {
        const Icon = factorIcons[factor.name as keyof typeof factorIcons];

        return (
          <div key={factor.name} className="border border-gray-200 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-gray-900">{factor.name}</span>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={factor.enabled}
                  onChange={(e) => updateFactor(index, { enabled: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="text-xs text-gray-600">Enable</span>
              </label>
            </div>

            {factor.enabled && (
              <>
                <div className="flex items-center gap-3 bg-gray-50 p-2 rounded">
                  <button
                    onClick={() => updateFactor(index, { isStrict: true })}
                    className={`flex-1 py-2 px-3 rounded text-xs font-medium transition-colors ${
                      factor.isStrict
                        ? 'bg-red-600 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Lock className="w-3 h-3 inline mr-1" />
                    Strict
                  </button>
                  <button
                    onClick={() => updateFactor(index, { isStrict: false })}
                    className={`flex-1 py-2 px-3 rounded text-xs font-medium transition-colors ${
                      !factor.isStrict
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Scale className="w-3 h-3 inline mr-1" />
                    Weighted
                  </button>
                </div>

                {!factor.isStrict && (
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Weight: {factor.weight.toFixed(1)}
                    </label>
                    <input
                      type="range"
                      min="0.1"
                      max="1.0"
                      step="0.1"
                      value={factor.weight}
                      onChange={(e) => updateFactor(index, { weight: Number(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                )}

                {factor.isStrict && (
                  <div className="text-xs text-gray-600 bg-red-50 p-2 rounded">
                    {factor.name === 'Solar Orientation' && 'Only showing units facing SE-SW (135°-225°)'}
                    {factor.name === 'Acoustic Comfort' && 'Only showing units with noise level ≤ 60dB'}
                    {factor.name === 'Convenience' && 'Only showing units with ≥ 8 nearby amenities'}
                  </div>
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};
