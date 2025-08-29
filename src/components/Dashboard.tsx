import React from 'react';
import { AlertTriangle, TrendingUp, Zap, Droplets, Thermometer, Wind, Shield, Activity } from 'lucide-react';

interface RiskGaugeProps {
  value: number;
  label: string;
  color: string;
}

function RiskGauge({ value, label, color }: RiskGaugeProps) {
  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="relative w-32 h-32">
      <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          className="text-gray-700"
        />
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke={color}
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out drop-shadow-lg"
          style={{
            filter: `drop-shadow(0 0 8px ${color})`
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-white">{value}%</span>
        <span className="text-xs text-gray-400 text-center">{label}</span>
      </div>
    </div>
  );
}

interface MetricCardProps {
  icon: React.ComponentType<any>;
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  color: string;
}

function MetricCard({ icon: Icon, title, value, change, trend, color }: MetricCardProps) {
  const trendColors = {
    up: 'text-red-400',
    down: 'text-green-400',
    stable: 'text-gray-400'
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-cyan-500/30 transition-all duration-300 group">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color} group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className={`flex items-center space-x-1 text-sm ${trendColors[trend]}`}>
          <TrendingUp className={`w-4 h-4 ${trend === 'down' ? 'rotate-180' : trend === 'stable' ? 'rotate-90' : ''}`} />
          <span>{change}</span>
        </div>
      </div>
      <div>
        <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
        <p className="text-2xl font-bold text-white mt-1">{value}</p>
      </div>
    </div>
  );
}

export default function Dashboard() {


  const weatherData = {
    temperature: '24°C',
    humidity: '78%',
    rainfall: '15mm/hr',
    windSpeed: '12 km/h'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Mining Safety Dashboard</h1>
        <p className="text-gray-400">Real-time monitoring and AI-powered insights</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Stats Cards */}
        <div className="bg-gray-800/50 rounded-lg p-6 border border-cyan-500/20">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Active Sensors</h3>
              <p className="text-2xl font-bold text-cyan-400">127</p>
            </div>
          </div>
          <div className="text-sm text-gray-400">
            +3 from last week
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6 border border-cyan-500/20">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Active Alerts</h3>
              <p className="text-2xl font-bold text-cyan-400">3</p>
            </div>
          </div>
          <div className="text-sm text-gray-400">
            -2 from yesterday
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6 border border-cyan-500/20">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">System Uptime</h3>
              <p className="text-2xl font-bold text-cyan-400">99.7%</p>
            </div>
          </div>
          <div className="text-sm text-gray-400">
            +0.2% improvement
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6 border border-cyan-500/20">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Risk Reduction</h3>
              <p className="text-2xl font-bold text-cyan-400">12%</p>
            </div>
          </div>
          <div className="text-sm text-gray-400">
            +5% improvement
          </div>
        </div>
      </div>

      {/* Risk Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* 3D Mine Model Placeholder */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">3D Mine Visualization</h2>
              <div className="flex space-x-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-400">Safe</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-400">Medium</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-400">High Risk</span>
                </div>
              </div>
            </div>
            <div className="relative h-96 bg-gray-900/50 rounded-lg flex items-center justify-center border border-cyan-500/20 p-6">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
                  <Shield className="w-12 h-12 text-white" />
                </div>
                <p className="text-gray-400 text-xl mb-3 font-medium">Interactive 3D Model Loading...</p>
                <p className="text-gray-500 mb-4">Drag to rotate • Scroll to zoom</p>
                
                {/* Additional content to fill space */}
                <div className="grid grid-cols-3 gap-4 mt-6 max-w-md mx-auto">
                  <div className="text-center">
                    <div className="w-8 h-8 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    </div>
                    <p className="text-xs text-gray-400">Safe Zones</p>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-yellow-500/20 border border-yellow-500/30 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    </div>
                    <p className="text-xs text-gray-400">Warning</p>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    </div>
                    <p className="text-xs text-gray-400">Danger</p>
                  </div>
                </div>
              </div>
              
              {/* Simulated danger zones - better positioned */}
              <div className="absolute top-8 left-8 w-12 h-12 bg-red-500/30 border-2 border-red-500 rounded-full animate-ping"></div>
              <div className="absolute bottom-8 right-8 w-10 h-10 bg-yellow-500/30 border-2 border-yellow-500 rounded-full animate-pulse"></div>
              <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-green-500/30 border-2 border-green-500 rounded-full"></div>
              <div className="absolute top-1/4 right-1/4 w-6 h-6 bg-blue-500/30 border-2 border-blue-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Risk Gauges */}
        <div className="space-y-6">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Global Risk Status</h3>
            <div className="flex justify-center">
              <RiskGauge value={35} label="Overall Risk" color="#06b6d4" />
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Weather Conditions</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Thermometer className="w-4 h-4 text-orange-400" />
                  <span className="text-sm text-gray-400">Temperature</span>
                </div>
                <span className="text-white font-medium">{weatherData.temperature}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Droplets className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-gray-400">Humidity</span>
                </div>
                <span className="text-white font-medium">{weatherData.humidity}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Droplets className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm text-gray-400">Rainfall</span>
                </div>
                <span className="text-white font-medium">{weatherData.rainfall}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Wind className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-400">Wind Speed</span>
                </div>
                <span className="text-white font-medium">{weatherData.windSpeed}</span>
              </div>
            </div>
          </div>
        </div>
      </div>




    </div>
  );
}