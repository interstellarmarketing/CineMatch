// Streaming service configurations and redirect URLs
export const STREAMING_SERVICES = {
  // Major streaming services with their base URLs
  'Netflix': {
    baseUrl: 'https://www.netflix.com',
    searchUrl: 'https://www.netflix.com/search?q=',
    icon: '🔴'
  },
  'Amazon Prime Video': {
    baseUrl: 'https://www.primevideo.com',
    searchUrl: 'https://www.primevideo.com/search?q=',
    icon: '🔵'
  },
  'Disney Plus': {
    baseUrl: 'https://www.disneyplus.com',
    searchUrl: 'https://www.disneyplus.com/search?q=',
    icon: '🔵'
  },
  'Hulu': {
    baseUrl: 'https://www.hulu.com',
    searchUrl: 'https://www.hulu.com/search?q=',
    icon: '🟢'
  },
  'HBO Max': {
    baseUrl: 'https://www.max.com',
    searchUrl: 'https://www.max.com/search?q=',
    icon: '🟣'
  },
  'Apple TV Plus': {
    baseUrl: 'https://tv.apple.com',
    searchUrl: 'https://tv.apple.com/search?q=',
    icon: '⚪'
  },
  'Peacock': {
    baseUrl: 'https://www.peacocktv.com',
    searchUrl: 'https://www.peacocktv.com/search?q=',
    icon: '🦚'
  },
  'Paramount Plus': {
    baseUrl: 'https://www.paramountplus.com',
    searchUrl: 'https://www.paramountplus.com/search?q=',
    icon: '🔵'
  },
  'Crunchyroll': {
    baseUrl: 'https://www.crunchyroll.com',
    searchUrl: 'https://www.crunchyroll.com/search?q=',
    icon: '🟠'
  },
  'Funimation': {
    baseUrl: 'https://www.funimation.com',
    searchUrl: 'https://www.funimation.com/search?q=',
    icon: '🟠'
  }
};

// Function to get streaming service info by name
export const getStreamingServiceInfo = (serviceName) => {
  return STREAMING_SERVICES[serviceName] || {
    baseUrl: 'https://www.google.com/search?q=',
    searchUrl: 'https://www.google.com/search?q=',
    icon: '📺'
  };
};

// Function to redirect to streaming service
export const redirectToStreamingService = (serviceName, title) => {
  const serviceInfo = getStreamingServiceInfo(serviceName);
  const searchUrl = serviceInfo.searchUrl + encodeURIComponent(title);
  
  // Open in new tab
  window.open(searchUrl, '_blank', 'noopener,noreferrer');
};

// Function to check if a service is a major streaming platform
export const isMajorStreamingService = (serviceName) => {
  return Object.keys(STREAMING_SERVICES).includes(serviceName);
};

// Function to get service icon
export const getServiceIcon = (serviceName) => {
  const serviceInfo = getStreamingServiceInfo(serviceName);
  return serviceInfo.icon;
};

// Function to format service name for display
export const formatServiceName = (serviceName) => {
  // Handle common variations
  const nameMap = {
    'Netflix': 'Netflix',
    'Amazon Prime Video': 'Prime Video',
    'Disney Plus': 'Disney+',
    'HBO Max': 'Max',
    'Apple TV Plus': 'Apple TV+',
    'Paramount Plus': 'Paramount+'
  };
  
  return nameMap[serviceName] || serviceName;
}; 