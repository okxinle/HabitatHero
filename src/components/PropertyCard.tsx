import { ScoredListing } from '../types';
import { Home, MapPin, Compass, Volume2, ShoppingBag, Clock, TrendingUp } from 'lucide-react';

interface Props {
  listing: ScoredListing;
  isSelected: boolean;
  onClick: () => void;
}

export const PropertyCard = ({ listing, isSelected, onClick }: Props) => {
  const getMatchColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50';
    if (score >= 60) return 'text-blue-600 bg-blue-50';
    if (score >= 40) return 'text-amber-600 bg-amber-50';
    return 'text-red-600 bg-red-50';
  };

  const getFairnessColor = (fairness: number) => {
    if (fairness <= 5) return 'text-green-600 bg-green-50';
    if (fairness <= 10) return 'text-blue-600 bg-blue-50';
    if (fairness <= 15) return 'text-amber-600 bg-amber-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-lg shadow-sm border-2 transition-all cursor-pointer hover:shadow-md ${
        isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
      }`}
    >
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <Home className="w-4 h-4 text-blue-600" />
              {listing.flatType}
            </h3>
            <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
              <MapPin className="w-3 h-3" />
              {listing.address}
            </p>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-gray-900">
              ${(listing.price / 1000).toFixed(0)}k
            </div>
            <div className="text-xs text-gray-500">{listing.town}</div>
          </div>
        </div>

        <div className="flex gap-2">
          <div className={`flex-1 px-3 py-2 rounded-lg ${getMatchColor(listing.matchScore)}`}>
            <div className="flex items-center justify-center gap-1">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-semibold">
                {listing.matchScore.toFixed(0)}%
              </span>
            </div>
            <div className="text-xs text-center mt-0.5 font-medium">Match</div>
          </div>
          <div className={`flex-1 px-3 py-2 rounded-lg ${getFairnessColor(listing.commuteFairness)}`}>
            <div className="flex items-center justify-center gap-1">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-semibold">
                {listing.commuteFairness.toFixed(0)}m
              </span>
            </div>
            <div className="text-xs text-center mt-0.5 font-medium">Fairness</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-100">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-gray-600">
              <Compass className="w-3 h-3" />
              <span className="text-xs">{listing.azimuth}°</span>
            </div>
            <div className="text-xs text-gray-500 mt-0.5">Facing</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-gray-600">
              <Volume2 className="w-3 h-3" />
              <span className="text-xs">{listing.noiseLevel}dB</span>
            </div>
            <div className="text-xs text-gray-500 mt-0.5">Noise</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-gray-600">
              <ShoppingBag className="w-3 h-3" />
              <span className="text-xs">{listing.nearbyAmenities}</span>
            </div>
            <div className="text-xs text-gray-500 mt-0.5">Amenities</div>
          </div>
        </div>

        {listing.commuteTimeA && listing.commuteTimeB && (
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100">
            <div className="text-xs text-gray-600">
              <span className="font-medium">Commuter A:</span> {listing.commuteTimeA}m
            </div>
            <div className="text-xs text-gray-600">
              <span className="font-medium">Commuter B:</span> {listing.commuteTimeB}m
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
