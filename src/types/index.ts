export interface HDBListing {
  id: string;
  address: string;
  town: string;
  flatType: string;
  price: number;
  azimuth: number;
  noiseLevel: number;
  nearbyAmenities: number;
  coordinates: { x: number; y: number };
  commuteTimeA?: number;
  commuteTimeB?: number;
}

export interface StructuralConstraints {
  maxBudget: number;
  regions: string[];
  flatTypes: string[];
}

export interface LiveabilityFactor {
  name: string;
  isStrict: boolean;
  weight: number;
  enabled: boolean;
  strictCriteria?: {
    azimuthRange?: [number, number];
    maxNoiseLevel?: number;
    minAmenities?: number;
  };
}

export interface CommuterConfig {
  addressA: string;
  addressB: string;
  fairnessWeight: number;
}

export interface ScoredListing extends HDBListing {
  matchScore: number;
  commuteFairness: number;
  passesFilters: boolean;
}
