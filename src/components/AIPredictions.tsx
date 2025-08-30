import React from 'react';
import { AlertTriangle, TrendingUp, Clock, BarChart3, Activity, Shield, Target, Zap } from 'lucide-react';

interface RiskGaugeProps {
  value: number;
  label: string;
  color: string;
  size?: 'sm' | 'md' | 'lg';
}

function RiskGauge({ value, label, color, size = 'md' }: RiskGaugeProps) {
  const sizes = {
    sm: { container: 'w-24 h-24', text: 'text-lg', label: 'text-xs' },
    md: { container: 'w-32 h-32', text: 'text-2xl', label: 'text-sm' },
    lg: { container: 'w-40 h-40', text: 'text-3xl', label: 'text-base' }
  };

  const { container, text, label: labelSize } = sizes[size];
  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className={`relative ${container}`}>
      <svg className={`${container} transform -rotate-90`} viewBox="0 0 100 100">
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
        <span className={`font-bold text-white ${text}`}>{value}%</span>
        <span className={`text-gray-400 text-center ${labelSize}`}>{label}</span>
      </div>
    </div>
  );
}

interface MetricCardProps {
  icon: React.ComponentType<any>;
  title: string;
  value: string;
  subtitle: string;
  color: string;
  bgColor: string;
}

function MetricCard({ icon: Icon, title, value, subtitle, color, bgColor }: MetricCardProps) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-cyan-500/30 transition-all duration-300 group">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${bgColor} group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      <div>
        <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
        <p className="text-2xl font-bold text-white mt-1">{value}</p>
        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
      </div>
    </div>
  );
}

function TrendChart() {
  const data = [
    { time: '6h ago', value: 45, color: 'bg-blue-500' },
    { time: '5h ago', value: 52, color: 'bg-blue-500' },
    { time: '4h ago', value: 60, color: 'bg-blue-500' },
    { time: '3h ago', value: 68, color: 'bg-blue-500' },
    { time: '2h ago', value: 72, color: 'bg-blue-500' },
    { time: '1h ago', value: 75, color: 'bg-blue-500' },
    { time: 'Now', value: 78, color: 'bg-red-500' }
  ];

  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Prediction Trends (Last 6 Hours)</h3>
      <div className="flex items-end justify-between h-32 space-x-2">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div className="relative w-full">
              <div 
                className={`${item.color} rounded-t-sm transition-all duration-500 ease-out`}
                style={{ 
                  height: `${(item.value / maxValue) * 100}%`,
                  minHeight: '8px'
                }}
              />
            </div>
            <span className="text-xs text-gray-400 mt-2 text-center">{item.time}</span>
            <span className="text-xs text-white mt-1">{item.value}%</span>
          </div>
        ))}
      </div>
      <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-4 h-4 text-red-400" />
          <span className="text-sm text-red-400 font-medium">Steady increase in risk - conditions worsening</span>
        </div>
      </div>
    </div>
  );
}

function HistoricalComparison() {
  const data = [
    { week: 'Week 1', actual: 3, predicted: 2, color: 'bg-blue-500' },
    { week: 'Week 2', actual: 2, predicted: 2, color: 'bg-purple-500' },
    { week: 'Week 3', actual: 1, predicted: 2, color: 'bg-purple-500' },
    { week: 'Week 4', actual: 2, predicted: 2, color: 'bg-purple-500' }
  ];

  const maxValue = Math.max(...data.map(d => Math.max(d.actual, d.predicted)));

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Historical vs Predicted Events</h3>
      <div className="flex items-end justify-between h-32 space-x-2 mb-4">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-1 space-y-2">
            <div className="flex flex-col items-center w-full space-y-1">
              <div 
                className="w-full bg-blue-500 rounded-t-sm transition-all duration-500 ease-out"
                style={{ 
                  height: `${(item.actual / maxValue) * 100}%`,
                  minHeight: '4px'
                }}
              />
              <div 
                className="w-full bg-purple-500 rounded-t-sm transition-all duration-500 ease-out"
                style={{ 
                  height: `${(item.predicted / maxValue) * 100}%`,
                  minHeight: '4px'
                }}
              />
            </div>
            <span className="text-xs text-gray-400 text-center">{item.week}</span>
          </div>
        ))}
      </div>
      
      <div className="flex items-center justify-center space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded"></div>
          <span className="text-gray-400">Actual Events</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-purple-500 rounded"></div>
          <span className="text-gray-400">Predicted Events</span>
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
        <div className="flex items-center space-x-2">
          <Target className="w-4 h-4 text-blue-400" />
          <span className="text-sm text-blue-400 font-medium">Model accuracy: Fairly accurate, sometimes slightly under- or over-estimating</span>
        </div>
      </div>
    </div>
  );
}

export default function AIPredictions() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">AI Predictions & Analytics</h1>
          <p className="text-gray-400">Advanced machine learning insights for proactive safety management</p>
        </div>
      </div>

      {/* Top Section - Current Prediction Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Rockfall Probability */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Rockfall Probability</h3>
              <p className="text-3xl font-bold text-red-400">78%</p>
            </div>
          </div>
          <p className="text-gray-400 text-sm mb-4">
            The system predicts a 78% chance of rockfall occurring within the next 24 hours.
          </p>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div className="bg-red-500 h-3 rounded-full transition-all duration-1000 ease-out" style={{ width: '78%' }}></div>
          </div>
          <p className="text-xs text-red-400 mt-2 font-medium">High Risk Level</p>
        </div>

        {/* Confidence Level */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Confidence Level</h3>
              <p className="text-3xl font-bold text-green-400">92%</p>
            </div>
          </div>
          <p className="text-gray-400 text-sm mb-4">
            The prediction model is 92% confident about its forecast.
          </p>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div className="bg-green-500 h-3 rounded-full transition-all duration-1000 ease-out" style={{ width: '92%' }}></div>
          </div>
          <p className="text-xs text-green-400 mt-2 font-medium">Highly Reliable</p>
        </div>

        {/* Time to Event */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Time to Event</h3>
              <p className="text-3xl font-bold text-orange-400">6-12h</p>
            </div>
          </div>
          <p className="text-gray-400 text-sm mb-4">
            Rockfall is expected within the next 6 to 12 hours.
          </p>
          <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-red-400" />
              <span className="text-sm text-red-400 font-medium">High Priority Zone - Immediate Action Required</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Prediction Trends */}
        <TrendChart />
        
        {/* Historical Comparison */}
        <HistoricalComparison />
      </div>


    </div>
  );
}