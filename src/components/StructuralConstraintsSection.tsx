import { StructuralConstraints } from '../types';
import { DollarSign } from 'lucide-react';

interface Props {
  constraints: StructuralConstraints;
  onChange: (constraints: StructuralConstraints) => void;
  availableTowns: string[];
  availableFlatTypes: string[];
}

export const StructuralConstraintsSection = ({ constraints, onChange, availableTowns, availableFlatTypes }: Props) => {
  const formatPrice = (price: number) => `$${(price / 1000).toFixed(0)}k`;

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
      <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
        <DollarSign className="w-5 h-5 text-blue-600" />
        Structural Constraints
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Price Range: {formatPrice(constraints.priceRange[0])} - {formatPrice(constraints.priceRange[1])}
        </label>
        <div className="space-y-2">
          <input
            type="range"
            min="300000"
            max="800000"
            step="10000"
            value={constraints.priceRange[0]}
            onChange={(e) => onChange({
              ...constraints,
              priceRange: [Number(e.target.value), constraints.priceRange[1]]
            })}
            className="w-full"
          />
          <input
            type="range"
            min="300000"
            max="800000"
            step="10000"
            value={constraints.priceRange[1]}
            onChange={(e) => onChange({
              ...constraints,
              priceRange: [constraints.priceRange[0], Number(e.target.value)]
            })}
            className="w-full"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Towns</label>
        <div className="space-y-2">
          {availableTowns.map(town => (
            <label key={town} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={constraints.towns.includes(town)}
                onChange={(e) => {
                  const newTowns = e.target.checked
                    ? [...constraints.towns, town]
                    : constraints.towns.filter(t => t !== town);
                  onChange({ ...constraints, towns: newTowns });
                }}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span className="text-sm text-gray-700">{town}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Flat Types</label>
        <div className="space-y-2">
          {availableFlatTypes.map(flatType => (
            <label key={flatType} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={constraints.flatTypes.includes(flatType)}
                onChange={(e) => {
                  const newTypes = e.target.checked
                    ? [...constraints.flatTypes, flatType]
                    : constraints.flatTypes.filter(t => t !== flatType);
                  onChange({ ...constraints, flatTypes: newTypes });
                }}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span className="text-sm text-gray-700">{flatType}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};
