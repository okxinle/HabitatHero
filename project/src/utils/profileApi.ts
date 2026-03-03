import { StructuralConstraints, LiveabilityFactor, CommuterConfig } from '../types';

export interface SaveProfilePayload {
  userID: string;
  structuralConstraint: {
    maxBudget: number;
    preferredTowns: string[];
    preferredFlatType: string[];
    minLeaseYears: number;
    selectedAmenities?: string[];
  };
  commuterProfile: {
    isEnabled: boolean;
    destinationA: { lat: number; lng: number } | null;
    destinationB: { lat: number; lng: number } | null;
    fairnessWeight?: number;
  };
  softConstraints: Array<{
    factorName: string;
    priorityWeight: number;
    isStrict: boolean;
    selectedAmenities?: string[];
  }>;
}

export interface LoadProfileResponse {
  status: string;
  data: {
    structuralConstraint: {
      maxBudget: number;
      preferredTowns: string[];
      preferredFlatType: string[];
      minLeaseYears: number;
      selectedAmenities?: string[];
    };
    commuterProfile: {
      isEnabled: boolean;
      destinationA: { lat: number; lng: number } | null;
      destinationB: { lat: number; lng: number } | null;
      fairnessWeight?: number;
    };
    softConstraints: Array<{
      factorName: string;
      priorityWeight: number;
      isStrict: boolean;
      selectedAmenities?: string[];
    }>;
  };
}

export const formatProfileForSave = (
  userId: string,
  constraints: StructuralConstraints,
  factors: LiveabilityFactor[],
  commuterConfig: CommuterConfig
): SaveProfilePayload => {
  return {
    userID: userId,
    structuralConstraint: {
      maxBudget: constraints.maxBudget,
      preferredTowns: constraints.regions,
      preferredFlatType: constraints.flatTypes,
      minLeaseYears: constraints.minLeaseRemaining,
    },
    commuterProfile: {
      isEnabled: !!(commuterConfig.addressA && commuterConfig.addressB),
      destinationA: commuterConfig.addressA
        ? { lat: 1.2830, lng: 103.8513 }
        : null,
      destinationB: commuterConfig.addressB
        ? { lat: 1.3332, lng: 103.7423 }
        : null,
      fairnessWeight: commuterConfig.fairnessWeight,
    },
    softConstraints: factors.map(factor => ({
      factorName: factor.name,
      priorityWeight: factor.weight,
      isStrict: factor.isStrict,
      selectedAmenities: factor.selectedAmenities || [],
    })),
  };
};

export const parseLoadedProfile = (
  response: LoadProfileResponse
): {
  constraints: StructuralConstraints;
  factors: LiveabilityFactor[];
  commuterConfig: CommuterConfig;
} => {
  const { structuralConstraint, commuterProfile, softConstraints } = response.data;

  const constraints: StructuralConstraints = {
    maxBudget: structuralConstraint.maxBudget,
    regions: structuralConstraint.preferredTowns,
    flatTypes: structuralConstraint.preferredFlatType,
    minLeaseRemaining: structuralConstraint.minLeaseYears,
  };

  const factors: LiveabilityFactor[] = softConstraints.map(constraint => ({
    name: constraint.factorName,
    isStrict: constraint.isStrict,
    weight: constraint.priorityWeight,
    enabled: true,
    selectedAmenities: constraint.selectedAmenities || [],
    strictCriteria: {
      azimuthRange: [135, 225],
      maxNoiseLevel: 60,
      minAmenities: 8,
    },
  }));

  const commuterConfig: CommuterConfig = {
    addressA: commuterProfile.destinationA ? 'Address A' : '',
    addressB: commuterProfile.destinationB ? 'Address B' : '',
    fairnessWeight: commuterProfile.fairnessWeight || 0.5,
  };

  return { constraints, factors, commuterConfig };
};

export const simulateSaveProfile = async (payload: SaveProfilePayload): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Profile saved:', payload);
      localStorage.setItem(`profile_${payload.userID}`, JSON.stringify(payload));
      resolve();
    }, 500);
  });
};

export const simulateLoadProfile = async (userId: string): Promise<LoadProfileResponse | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const saved = localStorage.getItem(`profile_${userId}`);
      if (saved) {
        const payload = JSON.parse(saved);
        resolve({
          status: 'success',
          data: {
            structuralConstraint: payload.structuralConstraint,
            commuterProfile: payload.commuterProfile,
            softConstraints: payload.softConstraints,
          },
        });
      } else {
        resolve(null);
      }
    }, 500);
  });
};
