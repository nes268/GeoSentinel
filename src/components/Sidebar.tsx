import React from 'react';
import { 
  BarChart3, 
  Radio, 
  Brain, 
  Mountain, 
  AlertTriangle, 
  FileText, 
  Gamepad2, 
  Leaf, 
  MessageCircle, 
  Settings 
} from 'lucide-react';

interface SidebarProps {
  activeModule: string;
  onModuleChange: (module: string) => void;
  isCollapsed: boolean;
}

const menuItems = [
  { id: 'dashboard', icon: BarChart3, label: 'Dashboard' },
  { id: 'sensors', icon: Radio, label: 'Sensor Data' },
  { id: 'ai', icon: Brain, label: 'AI Predictions' },
  { id: 'terrain', icon: Mountain, label: '3D Terrain' },
  { id: 'alerts', icon: AlertTriangle, label: 'Alerts' },
  { id: 'gamification', icon: Gamepad2, label: 'Performance' },
  { id: 'sustainability', icon: Leaf, label: 'Sustainability' },
  { id: 'voice', icon: MessageCircle, label: 'Voice AI' },
  { id: 'settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar({ activeModule, onModuleChange, isCollapsed }: SidebarProps) {
  return (
    <div className={`bg-gray-900/95 backdrop-blur-sm border-r border-cyan-500/30 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    } h-screen overflow-hidden flex flex-col`}>
      {/* Header */}
      <div className="p-6 border-b border-cyan-500/20">
        <div className={`flex items-center space-x-3 ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
            <Mountain className="w-6 h-6 text-white" />
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="text-2xl font-bold text-white">GeoSilent</h1>
            </div>
          )}
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeModule === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onModuleChange(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                isActive 
                  ? 'text-cyan-400' 
                  : 'text-gray-400 hover:text-cyan-300'
              }`}
            >
              <Icon className={`w-5 h-5 transition-all duration-300 ${
                isActive ? 'text-cyan-400' : 'text-gray-400'
              } group-hover:text-cyan-300`} />
              
              {!isCollapsed && (
                <div className="flex-1 text-left">
                  <div className={`font-medium transition-colors duration-300 ${
                    isActive ? 'text-cyan-400' : 'text-gray-400'
                  } group-hover:text-cyan-300`}>
                    {item.label}
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Status Indicator */}
      {!isCollapsed && (
        <div className="p-4 border-t border-cyan-500/20">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">System Status</span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400">Online</span>
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            Last sync: 2 minutes ago
          </div>
        </div>
      )}
    </div>
  );
}