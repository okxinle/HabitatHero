import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { StructuralConstraints, LiveabilityFactor, CommuterConfig } from '../types';
import { mockListings, availableRegions, availableFlatTypes } from '../data/mockListings';
import { calculateScores } from '../utils/recommendationEngine';
import { PreferenceCenter } from './PreferenceCenter';
import { Map } from './Map';
import { ResultsGrid } from './ResultsGrid';
import { ResultsHeader } from './ResultsHeader';
import { LoadingState } from './LoadingState';
import { Navbar } from './Navbar';
import { Home } from 'lucide-react';

type PageState = 'preferences' | 'loading' | 'results';

export const QuizPage = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading, signOut } = useAuth();
  const [pageState, setPageState] = useState<PageState>('preferences');
  const [selectedListingId, setSelectedListingId] = useState<string | undefined>();

  const [structuralConstraints, setStructuralConstraints] = useState<StructuralConstraints>({
    maxBudget: 600000,
    regions: [],
    flatTypes: [],
  });

  const [livabilityFactors, setLivabilityFactors] = useState<LiveabilityFactor[]>([
    {
      name: 'Solar Orientation',
      isStrict: false,
      weight: 0.8,
      enabled: true,
      strictCriteria: { azimuthRange: [135, 225] },
    },
    {
      name: 'Acoustic Comfort',
      isStrict: false,
      weight: 0.7,
      enabled: true,
      strictCriteria: { maxNoiseLevel: 60 },
    },
    {
      name: 'Convenience',
      isStrict: false,
      weight: 0.6,
      enabled: true,
      strictCriteria: { minAmenities: 8 },
    },
  ]);

  const [commuterConfig, setCommuterConfig] = useState<CommuterConfig>({
    addressA: 'Raffles Place MRT',
    addressB: 'Jurong East MRT',
    fairnessWeight: 0.5,
  });

  const scoredListings = useMemo(() => {
    return calculateScores(mockListings, structuralConstraints, livabilityFactors, commuterConfig);
  }, [structuralConstraints, livabilityFactors, commuterConfig]);

  useEffect(() => {
    if (!user && !authLoading) {
      navigate('/');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (pageState === 'loading') {
      const timer = setTimeout(() => {
        setPageState('results');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [pageState]);

  const handleAnalyze = () => {
    setPageState('loading');
    setSelectedListingId(undefined);
  };

  const handleEditPreferences = () => {
    setPageState('preferences');
  };

  if (authLoading) {
    return <LoadingState />;
  }

  if (pageState === 'preferences') {
    return (
      <>
        <Navbar user={user} onSignOut={signOut} />
        <PreferenceCenter
          constraints={structuralConstraints}
          factors={livabilityFactors}
          commuterConfig={commuterConfig}
          onConstraintsChange={setStructuralConstraints}
          onFactorsChange={setLivabilityFactors}
          onCommuterChange={setCommuterConfig}
          onComplete={handleAnalyze}
          availableRegions={availableRegions}
          availableFlatTypes={availableFlatTypes}
        />
      </>
    );
  }

  if (pageState === 'loading') {
    return <LoadingState />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-full px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Home className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Habitat Hero</h1>
                <p className="text-sm text-gray-600">Your perfect HDB match awaits</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="p-4">
        <ResultsHeader
          constraints={structuralConstraints}
          factors={livabilityFactors}
          commuterConfig={commuterConfig}
          onEdit={handleEditPreferences}
        />
      </div>

      <main className="px-4 pb-4">
        <div className="grid grid-cols-3 gap-4 h-[calc(100vh-200px)]">
          <div className="col-span-2">
            <Map
              listings={scoredListings}
              selectedId={selectedListingId}
              onSelectListing={setSelectedListingId}
            />
          </div>
          <div className="overflow-hidden">
            <ResultsGrid
              listings={scoredListings}
              selectedId={selectedListingId}
              onSelectListing={setSelectedListingId}
            />
          </div>
        </div>
      </main>
    </div>
  );
};
