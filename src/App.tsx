import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import SensorData from './components/SensorData';
import AIPredictions from './components/AIPredictions';
import Alerts from './components/Alerts';
import VoiceAssistant from './components/VoiceAssistant';
import Settings from './components/Settings';
import Performance from './components/Performance';
import Terrain3D from './components/Terrain3D';
import Sustainability from './components/Sustainability';
import QuarryViewer from './components/QuarryViewer';

function App() {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <Dashboard />;
      case 'sensors':
        return <SensorData />;
      case 'ai':
        return <AIPredictions />;
      case 'terrain':
        return <Terrain3D />;
      case 'quarry':
        return <QuarryViewer />;
      case 'alerts':
        return <Alerts />;
      case 'reports':
        return (
          <div className="text-center py-12 text-gray-400">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Reports & Analytics</h3>
            <p>Comprehensive reporting dashboard coming soon...</p>
          </div>
        );
      case 'gamification':
        return <Performance />;
      case 'sustainability':
        return <Sustainability />;
      case 'voice':
        return <VoiceAssistant />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 bg-gray-800/90 backdrop-blur-sm border border-cyan-500/30 text-cyan-400 rounded-lg"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <div className="flex h-screen">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar 
            activeModule={activeModule} 
            onModuleChange={setActiveModule} 
            isCollapsed={false}
          />
        </div>

        {/* Mobile Sidebar */}
        <div className={`lg:hidden fixed inset-0 z-40 transition-transform duration-300 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative">
            <Sidebar 
              activeModule={activeModule} 
              onModuleChange={(module) => {
                setActiveModule(module);
                setMobileMenuOpen(false);
              }} 
              isCollapsed={false}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <main className="p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
              {renderActiveModule()}
            </div>
          </main>
        </div>
      </div>

      {/* Floating Action Button for Quick Emergency */}
      <div className="fixed bottom-6 right-6 z-30">
        <button className="w-14 h-14 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group animate-pulse hover:animate-none">
          <span className="text-2xl">🚨</span>
          <div className="absolute bottom-16 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Emergency Alert
          </div>
        </button>
      </div>

      {/* Global Styles for Custom Elements */}
      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #06b6d4;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(6, 182, 212, 0.5);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #06b6d4;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 10px rgba(6, 182, 212, 0.5);
        }

        @keyframes glow-pulse {
          0%, 100% {
            box-shadow: 0 0 5px rgba(6, 182, 212, 0.5);
          }
          50% {
            box-shadow: 0 0 20px rgba(6, 182, 212, 0.8), 0 0 30px rgba(6, 182, 212, 0.3);
          }
        }
        
        .animate-glow {
          animation: glow-pulse 2s infinite;
        }
      `}</style>
    </div>
  );
}

export default App;