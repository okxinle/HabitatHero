import { useState } from 'react';
import { StructuralConstraints, LiveabilityFactor, CommuterConfig } from '../types';
import { ChevronRight, ChevronLeft, MapPin, Sun, Volume2, Home, Users } from 'lucide-react';

interface Props {
  constraints: StructuralConstraints;
  factors: LiveabilityFactor[];
  commuterConfig: CommuterConfig;
  onConstraintsChange: (constraints: StructuralConstraints) => void;
  onFactorsChange: (factors: LiveabilityFactor[]) => void;
  onCommuterChange: (config: CommuterConfig) => void;
  onComplete: () => void;
  availableRegions: string[];
  availableFlatTypes: string[];
}

const steps = ['Preferences', 'Livability', 'Commute', 'Review'];

export const PreferenceCenter = ({
  constraints,
  factors,
  commuterConfig,
  onConstraintsChange,
  onFactorsChange,
  onCommuterChange,
  onComplete,
  availableRegions,
  availableFlatTypes,
}: Props) => {
  const [currentStep, setCurrentStep] = useState(0);

  const formatPrice = (price: number) => `$${(price / 1000000).toFixed(1)}m`;

  const updateFactor = (index: number, updates: Partial<LiveabilityFactor>) => {
    const newFactors = [...factors];
    newFactors[index] = { ...newFactors[index], ...updates };
    onFactorsChange(newFactors);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Maximum Budget</h3>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    Up to {formatPrice(constraints.maxBudget)}
                  </div>
                  <p className="text-sm text-gray-500">
                    We'll show properties up to this price point
                  </p>
                </div>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="1500000"
                    step="10000"
                    value={constraints.maxBudget}
                    onChange={(e) => onConstraintsChange({
                      ...constraints,
                      maxBudget: Number(e.target.value)
                    })}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>$0</span>
                    <span>$1.5m</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferred Region</h3>
              <div className="grid grid-cols-2 gap-3">
                {availableRegions.map(region => (
                  <button
                    key={region}
                    onClick={() => {
                      const newRegions = constraints.regions.includes(region)
                        ? constraints.regions.filter(r => r !== region)
                        : [...constraints.regions, region];
                      onConstraintsChange({ ...constraints, regions: newRegions });
                    }}
                    className={`py-3 px-4 rounded-lg font-medium transition-all ${
                      constraints.regions.includes(region)
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-3">
                Select one or multiple regions to narrow down your search
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Flat Types</h3>
              <div className="grid grid-cols-3 gap-3">
                {availableFlatTypes.map(flatType => (
                  <button
                    key={flatType}
                    onClick={() => {
                      const newTypes = constraints.flatTypes.includes(flatType)
                        ? constraints.flatTypes.filter(t => t !== flatType)
                        : [...constraints.flatTypes, flatType];
                      onConstraintsChange({ ...constraints, flatTypes: newTypes });
                    }}
                    className={`py-3 px-4 rounded-lg font-medium transition-all ${
                      constraints.flatTypes.includes(flatType)
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {flatType}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Livability Preferences</h3>
            {factors.map((factor, index) => (
              <div key={factor.name} className="border border-gray-200 rounded-lg p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {factor.name === 'Solar Orientation' && <Sun className="w-5 h-5 text-blue-600" />}
                    {factor.name === 'Acoustic Comfort' && <Volume2 className="w-5 h-5 text-blue-600" />}
                    {factor.name === 'Convenience' && <MapPin className="w-5 h-5 text-blue-600" />}
                    <span className="font-semibold text-gray-900">{factor.name}</span>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={factor.enabled}
                      onChange={(e) => updateFactor(index, { enabled: e.target.checked })}
                      className="w-5 h-5 text-blue-600 rounded"
                    />
                  </label>
                </div>

                {factor.enabled && (
                  <>
                    <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
                      <button
                        onClick={() => updateFactor(index, { isStrict: true })}
                        className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
                          factor.isStrict
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        Strict Requirement
                      </button>
                      <button
                        onClick={() => updateFactor(index, { isStrict: false })}
                        className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
                          !factor.isStrict
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        Weighted Preference
                      </button>
                    </div>

                    {!factor.isStrict && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Weight: {factor.weight.toFixed(1)}
                        </label>
                        <input
                          type="range"
                          min="0.1"
                          max="1.0"
                          step="0.1"
                          value={factor.weight}
                          onChange={(e) => updateFactor(index, { weight: Number(e.target.value) })}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Dual-Commuter Analysis</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Commuter A Workplace
                </label>
                <input
                  type="text"
                  value={commuterConfig.addressA}
                  onChange={(e) => onCommuterChange({ ...commuterConfig, addressA: e.target.value })}
                  placeholder="e.g., Raffles Place MRT"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Commuter B Workplace
                </label>
                <input
                  type="text"
                  value={commuterConfig.addressB}
                  onChange={(e) => onCommuterChange({ ...commuterConfig, addressB: e.target.value })}
                  placeholder="e.g., Jurong East MRT"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  Commute Fairness Priority: {commuterConfig.fairnessWeight.toFixed(1)}
                </label>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  value={commuterConfig.fairnessWeight}
                  onChange={(e) => onCommuterChange({ ...commuterConfig, fairnessWeight: Number(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>Low Priority</span>
                  <span>High Priority</span>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                Fairness is measured as |T_A - T_B|. Lower values indicate more balanced commute times for both partners.
              </p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Review Your Preferences</h3>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  Your Budget & Preferences
                </h4>
                <ul className="text-sm text-gray-700 space-y-1 ml-6">
                  <li>Maximum Budget: {formatPrice(constraints.maxBudget)}</li>
                  <li>Preferred Regions: {constraints.regions.length === 0 ? 'All' : constraints.regions.join(', ')}</li>
                  <li>Flat Types: {constraints.flatTypes.length === 0 ? 'All' : constraints.flatTypes.join(', ')}</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Sun className="w-4 h-4" />
                  Livability Factors
                </h4>
                <ul className="text-sm text-gray-700 space-y-1 ml-6">
                  {factors.map(f => (
                    <li key={f.name}>
                      {f.name}: {f.enabled ? (f.isStrict ? 'Strict' : `Weighted (${f.weight.toFixed(1)})`) : 'Disabled'}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Commute Settings
                </h4>
                <ul className="text-sm text-gray-700 space-y-1 ml-6">
                  <li>A: {commuterConfig.addressA}</li>
                  <li>B: {commuterConfig.addressB}</li>
                  <li>Fairness Priority: {commuterConfig.fairnessWeight.toFixed(1)}</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-gray-600 text-center">
              Click "Analyze Properties" to find your best matches based on these preferences.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Let's Find Your Home</h1>
          <p className="text-gray-600">Answer a few questions to get personalized recommendations</p>
        </div>

        <div className="flex justify-between items-center mb-8">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center flex-1">
              <button
                onClick={() => setCurrentStep(index)}
                className={`w-10 h-10 rounded-full font-semibold transition-all ${
                  index === currentStep
                    ? 'bg-blue-600 text-white scale-110'
                    : index < currentStep
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-300 text-gray-600'
                }`}
              >
                {index < currentStep ? '✓' : index + 1}
              </button>
              <div className="flex-1 h-1 mx-2 rounded-full bg-gray-200">
                <div
                  className={`h-full rounded-full transition-all ${
                    index < currentStep ? 'w-full bg-green-600' : 'w-0'
                  }`}
                ></div>
              </div>
            </div>
          ))}
          <div className="w-10 h-10 rounded-full font-semibold bg-gray-300 text-gray-600 flex items-center justify-center">
            {steps.length}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          {renderStep()}
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              currentStep === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-900 hover:bg-gray-100'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>

          <div className="text-sm text-gray-600">
            Step {currentStep + 1} of {steps.length}
          </div>

          {currentStep === steps.length - 1 ? (
            <button
              onClick={onComplete}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
            >
              Analyze Properties
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
