import { ScoredListing } from '../types';
import { PropertyCard } from './PropertyCard';
import { AlertCircle } from 'lucide-react';

interface Props {
  listings: ScoredListing[];
  selectedId?: string;
  onSelectListing: (id: string) => void;
}

export const ResultsGrid = ({ listings, selectedId, onSelectListing }: Props) => {
  if (listings.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No matches found</h3>
        <p className="text-gray-600">
          Try adjusting your filters or converting strict requirements to weighted preferences.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Recommended Properties
        </h2>
        <span className="text-sm text-gray-600 bg-blue-50 px-3 py-1 rounded-full">
          {listings.length} {listings.length === 1 ? 'match' : 'matches'}
        </span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2">
        {listings.map((listing) => (
          <PropertyCard
            key={listing.id}
            listing={listing}
            isSelected={selectedId === listing.id}
            onClick={() => onSelectListing(listing.id)}
          />
        ))}
      </div>
    </div>
  );
};
