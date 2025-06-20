import React, { useState } from 'react';
import GlassmorphismHeader from './headers/GlassmorphismHeader';
import MinimalistLuxuryHeader from './headers/MinimalistLuxuryHeader';
import DarkPremiumHeader from './headers/DarkPremiumHeader';

const HeaderDemo = () => {
  const [selectedHeader, setSelectedHeader] = useState('glassmorphism');

  const headers = {
    glassmorphism: {
      name: 'Glassmorphism',
      description: 'Frosted glass effects with subtle animations and premium styling',
      component: GlassmorphismHeader
    },
    minimalist: {
      name: 'Minimalist Luxury',
      description: 'Ultra-clean design with premium typography and generous spacing',
      component: MinimalistLuxuryHeader
    },
    darkPremium: {
      name: 'Dark Premium',
      description: 'Deep gradients with gold accents and cinematic styling',
      component: DarkPremiumHeader
    }
  };

  const SelectedHeaderComponent = headers[selectedHeader].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header Selector */}
      <div className="fixed top-4 left-4 right-4 z-50 bg-black/80 backdrop-blur-xl rounded-2xl border border-white/10 p-4">
        <h2 className="text-white text-lg font-semibold mb-4 text-center">Header Design Comparison</h2>
        
        <div className="flex flex-wrap gap-3 justify-center">
          {Object.entries(headers).map(([key, header]) => (
            <button
              key={key}
              onClick={() => setSelectedHeader(key)}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                ${selectedHeader === key
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                  : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                }
              `}
            >
              {header.name}
            </button>
          ))}
        </div>
        
        <p className="text-white/60 text-sm text-center mt-3">
          {headers[selectedHeader].description}
        </p>
      </div>

      {/* Selected Header */}
      <SelectedHeaderComponent />

      {/* Demo Content */}
      <div className="pt-32 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              CineMatch
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Discover your next favorite movie with AI-powered recommendations
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:scale-105 transition-transform duration-300">
                Start Exploring
              </button>
              <button className="px-8 py-3 bg-white/10 text-white font-semibold rounded-lg border border-white/20 hover:bg-white/20 transition-colors duration-300">
                Learn More
              </button>
            </div>
          </div>

          {/* Scroll Demo Content */}
          <div className="space-y-8">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Section {i + 1}
                </h3>
                <p className="text-white/70 leading-relaxed">
                  This is demo content to showcase how the header looks when scrolling. 
                  Each section demonstrates the header's behavior and styling in different scroll positions. 
                  Notice how the header adapts and maintains its premium appearance throughout the user experience.
                </p>
                <div className="mt-6 flex gap-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg border border-cyan-500/30"></div>
                  <div className="w-20 h-20 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-lg border border-amber-500/30"></div>
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-500/30"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Instructions */}
          <div className="mt-16 p-6 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl border border-cyan-500/20">
            <h3 className="text-xl font-bold text-white mb-3">How to Test:</h3>
            <ul className="text-white/80 space-y-2">
              <li>• Scroll down to see how the header adapts</li>
              <li>• Tap the menu button to see the mobile menu</li>
              <li>• Try the different header variants using the selector above</li>
              <li>• Notice the subtle animations and premium styling</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderDemo; 