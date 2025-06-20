import { useState, useEffect } from 'react';
import { API_OPTIONS } from '../utils/constants';
import { redirectToStreamingService, isMajorStreamingService, formatServiceName } from '../utils/streamingServices';

const WhereToWatch = ({ mediaType, mediaId, title }) => {
  const [watchProviders, setWatchProviders] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRegion, setUserRegion] = useState('US');

  useEffect(() => {
    // Try to detect user's region
    const detectRegion = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        if (data.country_code) {
          setUserRegion(data.country_code);
        }
      } catch (err) {
        console.log('Could not detect region, using US as default');
      }
    };

    detectRegion();
  }, []);

  useEffect(() => {
    const fetchWatchProviders = async () => {
      if (!mediaId || !mediaType) return;

      try {
        setLoading(true);
        const url = `https://api.themoviedb.org/3/${mediaType}/${mediaId}/watch/providers`;
        const response = await fetch(url, API_OPTIONS);
        
        if (!response.ok) {
          throw new Error('Failed to fetch watch providers');
        }
        
        const data = await response.json();
        setWatchProviders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchProviders();
  }, [mediaId, mediaType]);

  const handleProviderClick = (provider) => {
    if (isMajorStreamingService(provider.provider_name)) {
      redirectToStreamingService(provider.provider_name, title);
    } else {
      // For other services, open a Google search
      window.open(`https://www.google.com/search?q=${encodeURIComponent(title + ' ' + provider.provider_name)}`, '_blank', 'noopener,noreferrer');
    }
  };

  const totalProviders = (arr) => arr.reduce((acc, curr) => acc + curr.length, 0);

  // Helper to get price/quality (mocked, as TMDB API does not provide price info directly)
  const getProviderPrice = (provider, type) => {
    // If TMDB API ever provides price/quality, use it here. For now, just show type-based placeholder.
    if (type === 'cinema') return 'Ticket';
    if (type === 'rent') return '$19.99 4K';
    if (type === 'buy') return '$24.99 4K';
    return '';
  };

  if (loading) {
    return (
      <div className="max-md:mx-3 mt-8">
        <div className="font-bold text-yellow-400 text-lg mb-2">WATCH NOW</div>
        <div className="rounded-xl border-2 border-yellow-400 p-6 animate-pulse space-y-3">
          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2"></div>
          <div className="h-4 bg-gray-700 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-md:mx-3 mt-8">
        <div className="font-bold text-yellow-400 text-lg mb-2">WATCH NOW</div>
        <div className="rounded-xl border-2 border-yellow-400 p-6">
          <p className="text-gray-400">Unable to load streaming information</p>
        </div>
      </div>
    );
  }

  if (!watchProviders || !watchProviders.results) {
    return (
      <div className="max-md:mx-3 mt-8">
        <div className="font-bold text-yellow-400 text-lg mb-2">WATCH NOW</div>
        <div className="rounded-xl border-2 border-yellow-400 p-6">
          <p className="text-gray-400">No streaming information available</p>
        </div>
      </div>
    );
  }

  // Get providers for user's region, fallback to US
  const regionProviders = watchProviders.results[userRegion] || watchProviders.results.US;
  
  if (!regionProviders) {
    return (
      <div className="max-md:mx-3 mt-8">
        <div className="font-bold text-yellow-400 text-lg mb-2">WATCH NOW</div>
        <div className="rounded-xl border-2 border-yellow-400 p-6">
          <p className="text-gray-400">No streaming information available for your region</p>
        </div>
      </div>
    );
  }

  // Destructure provider arrays AFTER regionProviders is defined
  const { flatrate = [], rent = [], buy = [], free = [], ads = [] } = regionProviders;

  // Combine flatrate and ads into a single streamProviders array with type info
  const streamProviders = [
    ...(flatrate?.map(p => ({ ...p, _streamType: 'subs' })) || []),
    ...(ads?.map(p => ({ ...p, _streamType: 'ads' })) || []),
  ];

  // Map TMDB types to display order and labels (now safe to use)
  const providerRows = [
    { key: 'stream', label: 'STREAM', icon: '📺', providers: streamProviders },
    { key: 'rent', label: 'RENT', icon: '💰', providers: rent },
    { key: 'buy', label: 'BUY', icon: '🛒', providers: buy },
    { key: 'free', label: 'FREE', icon: '🎬', providers: free },
    // { key: 'cinema', label: 'CINEMA', icon: '🎟️', providers: [] },
  ];

  const renderProviderRow = ({ key, label, icon, providers }) => {
    if (!providers || providers.length === 0) return null;
    return (
      <div key={key} className="flex items-center py-2 border-b border-gray-800 last:border-b-0">
        {/* Vertical label as a chip/tab, rotated */}
        <div className="w-10 flex flex-col items-center justify-center mr-1">
          <span
            className="px-2 py-1 rounded-lg bg-gray-800 text-xs font-bold text-gray-200 tracking-widest whitespace-nowrap shadow-sm"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(-180deg)', textAlign: 'center', letterSpacing: '0.1em' }}
          >
            {label}
          </span>
        </div>
        {/* Providers row - horizontal scroll, no scrollbar */}
        <div className="flex-1 overflow-x-auto scrollbar-none" style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className="flex gap-3 flex-nowrap">
            {providers.map((provider) => (
              <div
                key={provider.provider_id + (provider._streamType || '')}
                className="flex flex-col items-center justify-center cursor-pointer group min-w-[56px] min-h-[56px] w-14 h-14"
                style={{ width: 56, height: 56 }}
                onClick={() => handleProviderClick(provider)}
                title={`Click to search for "${title}" on ${provider.provider_name}`}
              >
                <img
                  src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                  alt={provider.provider_name}
                  className="w-10 h-10 object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                {/* Subtitle for STREAM row */}
                {key === 'stream' && (
                  <span className="text-[10px] text-gray-400 font-semibold mt-0.5">
                    {provider._streamType === 'ads' ? 'Ads' : 'Subs'}
                  </span>
                )}
                {/* Price/quality or Ticket for other rows */}
                {key !== 'stream' && (
                  <span className="text-[10px] text-yellow-400 font-semibold mt-0.5">
                    {getProviderPrice(provider, key)}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const providerGroups = [streamProviders, rent, buy, free];
  const hasProviders = totalProviders(providerGroups) > 0;

  return (
    <div className="max-md:mx-0 mt-6 w-full">
      <div className="font-bold text-yellow-400 text-base mb-1 ml-2">WATCH NOW</div>
      <div className="bg-transparent px-0">
        {providerRows.every(row => !row.providers || row.providers.length === 0) ? (
          <div className="text-center py-6">
            <div className="text-5xl mb-2">🎭</div>
            <p className="text-gray-400 mb-1">This title is not currently available on major streaming platforms</p>
            <p className="text-xs text-gray-500">Check back later for updates</p>
          </div>
        ) : (
          <div>
            {providerRows.map(renderProviderRow)}
          </div>
        )}
        <div className="mt-4 pt-2 border-t border-gray-700">
          <div className="text-[11px] text-gray-500 space-y-1">
            <p>Streaming availability may vary by region and change over time.</p>
            <p>Data provided by JustWatch via TMDB • Region: {userRegion}</p>
            <p>Click on a service to search for this title.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhereToWatch; 