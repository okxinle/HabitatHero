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
import { simulateLoadProfile, parseLoadedProfile } from '../utils/profileApi';

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
    minLeaseRemaining: 30,
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
      selectedAmenities: [],
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
    if (user && !user.isGuest && user.id) {
      simulateLoadProfile(user.id).then(response => {
        if (response) {
          const { constraints, factors, commuterConfig: config } = parseLoadedProfile(response);
          setStructuralConstraints(constraints);
          setLivabilityFactors(factors);
          setCommuterConfig(config);
        }
      });
    }
  }, [user?.id, user?.isGuest]);

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
        <Navbar
          user={user}
          onSignOut={signOut}
          onNavigateToLogin={() => navigate('/login')}
          onNavigateToSignUp={() => navigate('/signup')}
        />
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
          userId={user?.id || 'guest'}
          isLoggedIn={!!(user && !user.isGuest)}
        />
      </>
    );
  }

  if (pageState === 'loading') {
    return <LoadingState />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Navbar
        user={user}
        onSignOut={signOut}
        onNavigateToLogin={() => navigate('/login')}
        onNavigateToSignUp={() => navigate('/signup')}
      />

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
