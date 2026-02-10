import { StructuralConstraints, LiveabilityFactor, CommuterConfig } from '../types';
import { Edit2, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface Props {
  constraints: StructuralConstraints;
  factors: LiveabilityFactor[];
  commuterConfig: CommuterConfig;
  onEdit: () => void;
}

export const ResultsHeader = ({ constraints, factors, commuterConfig, onEdit }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatPrice = (price: number) => `$${(price / 1000000).toFixed(1)}m`;
  const activeFactors = factors.filter(f => f.enabled).length;
  const strictFactors = factors.filter(f => f.enabled && f.isStrict).length;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-4 flex-1 text-left">
          <div className="text-sm">
            <div className="font-semibold text-gray-900">
              Up to {formatPrice(constraints.maxBudget)}
            </div>
            <div className="text-xs text-gray-600">
              {activeFactors} factors · {strictFactors} strict · {commuterConfig.addressA}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Edit preferences"
          >
            <Edit2 className="w-4 h-4 text-blue-600" />
          </button>
          <ChevronDown
            className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          />
        </div>
      </button>

      {isExpanded && (
        <div className="border-t border-gray-200 px-4 py-4 bg-gray-50 space-y-3">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Maximum Budget</h4>
              <p className="text-gray-600">
                Up to {formatPrice(constraints.maxBudget)}
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Preferred Regions</h4>
              <p className="text-gray-600">
                {constraints.regions.length === 0 ? 'All regions' : constraints.regions.join(', ')}
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Flat Types</h4>
              <p className="text-gray-600">
                {constraints.flatTypes.length === 0 ? 'All types' : constraints.flatTypes.join(', ')}
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Active Factors</h4>
              <div className="flex gap-2 flex-wrap">
                {factors.map(f => (
                  f.enabled && (
                    <span key={f.name} className={`text-xs px-2 py-1 rounded ${
                      f.isStrict
                        ? 'bg-red-100 text-red-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {f.name} {f.isStrict ? '(Strict)' : `(${f.weight.toFixed(1)})`}
                    </span>
                  )
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-300 pt-3">
            <h4 className="font-semibold text-gray-900 mb-1">Commute Settings</h4>
            <p className="text-gray-600 text-sm">
              <span className="font-medium">{commuterConfig.addressA}</span> ↔ <span className="font-medium">{commuterConfig.addressB}</span>
              <br />
              Fairness Priority: {commuterConfig.fairnessWeight.toFixed(1)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
