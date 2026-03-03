import { HDBListing, StructuralConstraints, LiveabilityFactor, CommuterConfig, ScoredListing } from '../types';
import { townToRegion } from '../data/mockListings';

const simulateCommuteTime = (listing: HDBListing, destinationAddress: string): number => {
  if (!destinationAddress) return 0;

  const hash = (listing.id + destinationAddress).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return 15 + (hash % 30);
};

const normalizeToScore = (value: number, min: number, max: number, invert = false): number => {
  const normalized = (value - min) / (max - min);
  return invert ? 1 - normalized : normalized;
};

const calculateSolarScore = (azimuth: number): number => {
  const optimalRange = [135, 225];
  if (azimuth >= optimalRange[0] && azimuth <= optimalRange[1]) {
    return 1.0;
  }
  const distanceFromOptimal = Math.min(
    Math.abs(azimuth - optimalRange[0]),
    Math.abs(azimuth - optimalRange[1])
  );
  return Math.max(0, 1 - distanceFromOptimal / 180);
};

const calculateAcousticScore = (noiseLevel: number): number => {
  return normalizeToScore(noiseLevel, 40, 75, true);
};

const calculateConvenienceScore = (amenities: number): number => {
  return normalizeToScore(amenities, 5, 10, false);
};

export const calculateScores = (
  listings: HDBListing[],
  structuralConstraints: StructuralConstraints,
  livabilityFactors: LiveabilityFactor[],
  commuterConfig: CommuterConfig
): ScoredListing[] => {
  const { maxBudget, regions, flatTypes } = structuralConstraints;

  const solarFactor = livabilityFactors.find(f => f.name === 'Solar Orientation');
  const acousticFactor = livabilityFactors.find(f => f.name === 'Acoustic Comfort');
  const convenienceFactor = livabilityFactors.find(f => f.name === 'Convenience');

  const scored = listings.map(listing => {
    const commuteTimeA = simulateCommuteTime(listing, commuterConfig.addressA);
    const commuteTimeB = simulateCommuteTime(listing, commuterConfig.addressB);
    const commuteFairness = Math.abs(commuteTimeA - commuteTimeB);

    let passesFilters = true;

    if (listing.price > maxBudget) {
      passesFilters = false;
    }
    if (regions.length > 0) {
      const listingRegion = townToRegion[listing.town];
      if (!listingRegion || !regions.includes(listingRegion)) {
        passesFilters = false;
      }
    }
    if (flatTypes.length > 0 && !flatTypes.includes(listing.flatType)) {
      passesFilters = false;
    }

    if (solarFactor?.isStrict && solarFactor.enabled && solarFactor.strictCriteria?.azimuthRange) {
      const [minAz, maxAz] = solarFactor.strictCriteria.azimuthRange;
      if (listing.azimuth < minAz || listing.azimuth > maxAz) {
        passesFilters = false;
      }
    }

    if (acousticFactor?.isStrict && acousticFactor.enabled && acousticFactor.strictCriteria?.maxNoiseLevel) {
      if (listing.noiseLevel > acousticFactor.strictCriteria.maxNoiseLevel) {
        passesFilters = false;
      }
    }

    if (convenienceFactor?.isStrict && convenienceFactor.enabled && convenienceFactor.strictCriteria?.minAmenities) {
      if (listing.nearbyAmenities < convenienceFactor.strictCriteria.minAmenities) {
        passesFilters = false;
      }
    }

    let matchScore = 0;
    let totalWeight = 0;

    if (solarFactor?.enabled && !solarFactor.isStrict) {
      const score = calculateSolarScore(listing.azimuth);
      matchScore += score * solarFactor.weight;
      totalWeight += solarFactor.weight;
    }

    if (acousticFactor?.enabled && !acousticFactor.isStrict) {
      const score = calculateAcousticScore(listing.noiseLevel);
      matchScore += score * acousticFactor.weight;
      totalWeight += acousticFactor.weight;
    }

    if (convenienceFactor?.enabled && !convenienceFactor.isStrict) {
      const score = calculateConvenienceScore(listing.nearbyAmenities);
      matchScore += score * convenienceFactor.weight;
      totalWeight += convenienceFactor.weight;
    }

    if (totalWeight > 0) {
      matchScore = (matchScore / totalWeight) * 100;
    } else {
      matchScore = passesFilters ? 100 : 0;
    }

    return {
      ...listing,
      commuteTimeA,
      commuteTimeB,
      matchScore: passesFilters ? matchScore : 0,
      commuteFairness,
      passesFilters,
    };
  });

  return scored
    .filter(listing => listing.passesFilters)
    .sort((a, b) => {
      const scoreA = a.matchScore - (a.commuteFairness * commuterConfig.fairnessWeight);
      const scoreB = b.matchScore - (b.commuteFairness * commuterConfig.fairnessWeight);
      return scoreB - scoreA;
    });
};
