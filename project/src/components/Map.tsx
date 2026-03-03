import { ScoredListing } from '../types';
import { Home } from 'lucide-react';

interface Props {
  listings: ScoredListing[];
  selectedId?: string;
  onSelectListing: (id: string) => void;
}

export const Map = ({ listings, selectedId, onSelectListing }: Props) => {
  const getMarkerColor = (matchScore: number) => {
    if (matchScore >= 80) return '#22c55e';
    if (matchScore >= 60) return '#3b82f6';
    if (matchScore >= 40) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 h-full">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Location Map</h2>
      <div className="relative w-full h-full bg-gradient-to-br from-green-50 to-blue-50 rounded-lg border-2 border-gray-200 overflow-hidden">
        <svg
          viewBox="0 0 800 600"
          className="w-full h-full"
          style={{ minHeight: '400px' }}
        >
          <rect x="0" y="0" width="800" height="600" fill="#f0fdf4" />

          <path
            d="M 100 100 Q 400 80 700 120 L 700 500 Q 400 520 100 480 Z"
            fill="#dcfce7"
            opacity="0.6"
          />

          <text x="200" y="100" fontSize="24" fontWeight="bold" fill="#047857">
            Toa Payoh
          </text>
          <text x="450" y="150" fontSize="24" fontWeight="bold" fill="#047857">
            Bishan
          </text>

          <line x1="150" y1="120" x2="600" y2="180" stroke="#9ca3af" strokeWidth="4" strokeDasharray="10,5" />
          <text x="350" y="145" fontSize="12" fill="#6b7280">MRT Line</text>

          {listings.map((listing) => {
            const isSelected = selectedId === listing.id;
            const color = getMarkerColor(listing.matchScore);

            return (
              <g
                key={listing.id}
                transform={`translate(${listing.coordinates.x}, ${listing.coordinates.y})`}
                onClick={() => onSelectListing(listing.id)}
                style={{ cursor: 'pointer' }}
              >
                <circle
                  r={isSelected ? 16 : 12}
                  fill={color}
                  opacity={isSelected ? 1 : 0.8}
                  stroke="white"
                  strokeWidth={isSelected ? 3 : 2}
                />
                {isSelected && (
                  <circle
                    r="20"
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                    opacity="0.5"
                  >
                    <animate
                      attributeName="r"
                      from="20"
                      to="30"
                      dur="1.5s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      from="0.5"
                      to="0"
                      dur="1.5s"
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
                <text
                  y="35"
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="bold"
                  fill="#1f2937"
                >
                  {listing.matchScore.toFixed(0)}%
                </text>
              </g>
            );
          })}
        </svg>

        <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 rounded-lg p-3 text-xs space-y-1">
          <div className="font-semibold text-gray-900 mb-2">Match Score Legend</div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>80-100% Excellent</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span>60-79% Good</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span>40-59% Fair</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>Below 40% Poor</span>
          </div>
        </div>
      </div>
    </div>
  );
};
