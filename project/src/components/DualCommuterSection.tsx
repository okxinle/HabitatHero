import { CommuterConfig } from '../types';
import { Users } from 'lucide-react';

interface Props {
  config: CommuterConfig;
  onChange: (config: CommuterConfig) => void;
}

export const DualCommuterSection = ({ config, onChange }: Props) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
      <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
        <Users className="w-5 h-5 text-blue-600" />
        Dual-Commuter Analysis
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Commuter A Workplace
        </label>
        <input
          type="text"
          value={config.addressA}
          onChange={(e) => onChange({ ...config, addressA: e.target.value })}
          placeholder="e.g., Raffles Place MRT"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Commuter B Workplace
        </label>
        <input
          type="text"
          value={config.addressB}
          onChange={(e) => onChange({ ...config, addressB: e.target.value })}
          placeholder="e.g., Jurong East MRT"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Commute Fairness Weight: {config.fairnessWeight.toFixed(1)}
        </label>
        <input
          type="range"
          min="0"
          max="2"
          step="0.1"
          value={config.fairnessWeight}
          onChange={(e) => onChange({ ...config, fairnessWeight: Number(e.target.value) })}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Low Priority</span>
          <span>High Priority</span>
        </div>
      </div>

      <div className="bg-blue-50 p-3 rounded-lg text-xs text-gray-700">
        Fairness is measured as |T_A - T_B|. Lower values indicate more balanced commute times.
      </div>
    </div>
  );
};
