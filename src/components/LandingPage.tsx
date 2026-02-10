import { useNavigate } from 'react-router-dom';
import { Compass, TrendingUp, Eye, Star, Repeat2 } from 'lucide-react';

export const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Compass,
      title: 'Lifestyle First',
      description: 'We focus on how you live, not just where you live.',
    },
    {
      icon: TrendingUp,
      title: 'Smart Scoring',
      description: 'We calculate a 0-100% match score for every block.',
    },
    {
      icon: Eye,
      title: 'Future Vision',
      description: 'We warn you about future construction risks.',
    },
    {
      icon: Star,
      title: 'Transparent Ranking',
      description: 'We explain why blocks rank higher or lower.',
    },
    {
      icon: Repeat2,
      title: 'Fair Commutes',
      description: 'We balance travel times for one or two daily commuters.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="min-h-screen flex items-center">
        <div className="max-w-full mx-auto px-6 py-12 lg:py-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Don't just find a house.
                  <br />
                  <span className="text-teal-600">Find a habitat.</span>
                </h1>
                <p className="text-xl text-gray-600">
                  We translate your lifestyle needs into a personalized HDB compatibility score.
                </p>
              </div>

              <div className="flex gap-8">
                <div className="text-center">
                  <div className="flex justify-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm font-medium text-gray-700">Usefulness</p>
                </div>
                <div className="text-center">
                  <div className="flex justify-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm font-medium text-gray-700">Reliability</p>
                </div>
                <div className="text-center">
                  <div className="flex justify-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm font-medium text-gray-700">Accuracy</p>
                </div>
              </div>

              <button
                onClick={() => navigate('/login')}
                className="inline-block px-8 py-4 bg-teal-600 text-white text-lg font-semibold rounded-lg hover:bg-teal-700 transition-colors shadow-lg hover:shadow-xl"
              >
                Start Lifestyle Quiz
              </button>
            </div>

            <div className="relative hidden lg:block">
              <div className="w-full h-96 bg-gradient-to-br from-amber-50 to-red-100 rounded-2xl overflow-hidden shadow-2xl">
                <svg
                  viewBox="0 0 400 500"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                >
                  <rect width="400" height="500" fill="#F7EBE0" />

                  <g id="building-left">
                    <rect x="20" y="150" width="80" height="300" fill="#D4A574" stroke="#8B5A3C" strokeWidth="2" />
                    <rect x="30" y="170" width="15" height="20" fill="#FFE5B4" stroke="#8B5A3C" strokeWidth="1" />
                    <rect x="50" y="170" width="15" height="20" fill="#FFE5B4" stroke="#8B5A3C" strokeWidth="1" />
                    <rect x="70" y="170" width="15" height="20" fill="#D4A5A5" stroke="#8B5A3C" strokeWidth="1" />
                    <rect x="30" y="210" width="15" height="20" fill="#FFE5B4" stroke="#8B5A3C" strokeWidth="1" />
                    <rect x="50" y="210" width="15" height="20" fill="#D4A5A5" stroke="#8B5A3C" strokeWidth="1" />
                    <rect x="70" y="210" width="15" height="20" fill="#FFE5B4" stroke="#8B5A3C" strokeWidth="1" />
                    <rect x="30" y="250" width="15" height="20" fill="#D4A5A5" stroke="#8B5A3C" strokeWidth="1" />
                    <rect x="50" y="250" width="15" height="20" fill="#FFE5B4" stroke="#8B5A3C" strokeWidth="1" />
                    <rect x="70" y="250" width="15" height="20" fill="#FFE5B4" stroke="#8B5A3C" strokeWidth="1" />
                    <rect x="30" y="290" width="15" height="20" fill="#FFE5B4" stroke="#8B5A3C" strokeWidth="1" />
                    <rect x="50" y="290" width="15" height="20" fill="#FFE5B4" stroke="#8B5A3C" strokeWidth="1" />
                    <rect x="70" y="290" width="15" height="20" fill="#D4A5A5" stroke="#8B5A3C" strokeWidth="1" />
                    <polygon points="20,150 60,80 100,150" fill="#8B5A3C" />
                  </g>

                  <g id="building-center">
                    <rect x="130" y="100" width="140" height="350" fill="#CD5C5C" stroke="#8B3A3A" strokeWidth="2" />
                    <rect x="145" y="130" width="18" height="25" fill="#FFE5B4" stroke="#8B3A3A" strokeWidth="1" />
                    <rect x="175" y="130" width="18" height="25" fill="#FFE5B4" stroke="#8B3A3A" strokeWidth="1" />
                    <rect x="205" y="130" width="18" height="25" fill="#8B5A3C" stroke="#8B3A3A" strokeWidth="1" />
                    <rect x="235" y="130" width="18" height="25" fill="#FFE5B4" stroke="#8B3A3A" strokeWidth="1" />
                    <rect x="145" y="175" width="18" height="25" fill="#FFE5B4" stroke="#8B3A3A" strokeWidth="1" />
                    <rect x="175" y="175" width="18" height="25" fill="#8B5A3C" stroke="#8B3A3A" strokeWidth="1" />
                    <rect x="205" y="175" width="18" height="25" fill="#FFE5B4" stroke="#8B3A3A" strokeWidth="1" />
                    <rect x="235" y="175" width="18" height="25" fill="#FFE5B4" stroke="#8B3A3A" strokeWidth="1" />
                    <rect x="145" y="220" width="18" height="25" fill="#8B5A3C" stroke="#8B3A3A" strokeWidth="1" />
                    <rect x="175" y="220" width="18" height="25" fill="#FFE5B4" stroke="#8B3A3A" strokeWidth="1" />
                    <rect x="205" y="220" width="18" height="25" fill="#FFE5B4" stroke="#8B3A3A" strokeWidth="1" />
                    <rect x="235" y="220" width="18" height="25" fill="#8B5A3C" stroke="#8B3A3A" strokeWidth="1" />
                    <rect x="145" y="265" width="18" height="25" fill="#FFE5B4" stroke="#8B3A3A" strokeWidth="1" />
                    <rect x="175" y="265" width="18" height="25" fill="#FFE5B4" stroke="#8B3A3A" strokeWidth="1" />
                    <rect x="205" y="265" width="18" height="25" fill="#8B5A3C" stroke="#8B3A3A" strokeWidth="1" />
                    <rect x="235" y="265" width="18" height="25" fill="#FFE5B4" stroke="#8B3A3A" strokeWidth="1" />
                    <polygon points="130,100 200,30 270,100" fill="#8B3A3A" />
                  </g>

                  <g id="building-right">
                    <rect x="300" y="120" width="80" height="330" fill="#D4A574" stroke="#8B5A3C" strokeWidth="2" />
                    <rect x="310" y="155" width="15" height="22" fill="#FFE5B4" stroke="#8B5A3C" strokeWidth="1" />
                    <rect x="335" y="155" width="15" height="22" fill="#D4A5A5" stroke="#8B5A3C" strokeWidth="1" />
                    <rect x="360" y="155" width="15" height="22" fill="#FFE5B4" stroke="#8B5A3C" strokeWidth="1" />
                    <rect x="310" y="200" width="15" height="22" fill="#FFE5B4" stroke="#8B5A3C" strokeWidth="1" />
                    <rect x="335" y="200" width="15" height="22" fill="#FFE5B4" stroke="#8B5A3C" strokeWidth="1" />
                    <rect x="360" y="200" width="15" height="22" fill="#D4A5A5" stroke="#8B5A3C" strokeWidth="1" />
                    <rect x="310" y="245" width="15" height="22" fill="#D4A5A5" stroke="#8B5A3C" strokeWidth="1" />
                    <rect x="335" y="245" width="15" height="22" fill="#FFE5B4" stroke="#8B5A3C" strokeWidth="1" />
                    <rect x="360" y="245" width="15" height="22" fill="#FFE5B4" stroke="#8B5A3C" strokeWidth="1" />
                    <rect x="310" y="290" width="15" height="22" fill="#FFE5B4" stroke="#8B5A3C" strokeWidth="1" />
                    <rect x="335" y="290" width="15" height="22" fill="#D4A5A5" stroke="#8B5A3C" strokeWidth="1" />
                    <rect x="360" y="290" width="15" height="22" fill="#FFE5B4" stroke="#8B5A3C" strokeWidth="1" />
                    <polygon points="300,120 340,40 380,120" fill="#8B5A3C" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-full mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="space-y-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-teal-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
