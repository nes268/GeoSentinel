import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Minus, Activity, Gauge, Droplets, Zap, Leaf, Battery, Thermometer, Globe } from 'lucide-react';
import { Clock, AlertCircle, CheckCircle } from 'lucide-react';

interface SustainabilityMetric {
  id: string;
  timestamp: Date;
  type: 'water' | 'energy' | 'carbon' | 'waste';
  value: number;
  unit: string;
  location: string;
  status: 'normal' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
}

interface MetricCardProps {
  icon: React.ComponentType<any>;
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  color: string;
  bgGradient: string;
  status: 'normal' | 'warning' | 'critical';
}

function MetricCard({ icon: Icon, title, value, change, trend, color, bgGradient, status }: MetricCardProps) {
  const trendColors = {
    up: 'text-red-400',
    down: 'text-green-400',
    stable: 'text-gray-400'
  };

  const trendIcons = {
    up: <TrendingUp className="w-4 h-4 text-red-400" />,
    down: <TrendingDown className="w-4 h-4 text-green-400" />,
    stable: <Minus className="w-4 h-4 text-gray-400" />
  };

  const statusColors = {
    normal: 'border-green-500/30',
    warning: 'border-yellow-500/30',
    critical: 'border-red-500/30'
  };

  return (
    <div className={`bg-gray-800/50 backdrop-blur-sm border ${statusColors[status]} rounded-xl p-6 hover:border-cyan-500/30 transition-all duration-300 group`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${bgGradient} group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className={`flex items-center space-x-1 text-sm ${trendColors[trend]}`}>
          {trendIcons[trend]}
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

interface SustainabilityChartProps {
  metricType: 'water' | 'energy' | 'carbon' | 'waste';
}

const SustainabilityChart: React.FC<SustainabilityChartProps> = ({ metricType }) => {
  const [data, setData] = useState<number[]>([]);
  const [currentValue, setCurrentValue] = useState(0);
  const [trend, setTrend] = useState<'up' | 'down' | 'stable'>('stable');

  useEffect(() => {
    // Generate initial data
    const initialData = Array.from({ length: 20 }, () => Math.random() * 100);
    setData(initialData);
    setCurrentValue(initialData[initialData.length - 1]);
  }, [metricType]);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => {
        const newValue = Math.max(0, Math.min(100, prevData[prevData.length - 1] + (Math.random() - 0.5) * 10));
        const newData = [...prevData.slice(1), newValue];
        
        // Calculate trend
        const lastThree = newData.slice(-3);
        const avgChange = (lastThree[2] - lastThree[0]) / 2;
        
        if (avgChange > 2) setTrend('up');
        else if (avgChange < -2) setTrend('down');
        else setTrend('stable');
        
        setCurrentValue(newValue);
        return newData;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getMetricConfig = (type: string) => {
    const configs = {
      water: { color: '#06B6D4', label: 'Water Usage', unit: 'm³/h', threshold: 75, icon: Droplets },
      energy: { color: '#F59E0B', label: 'Energy Consumption', unit: 'MW/h', threshold: 80, icon: Battery },
      carbon: { color: '#10B981', label: 'Carbon Footprint', unit: 'tons CO₂/h', threshold: 70, icon: Leaf },
      waste: { color: '#8B5CF6', label: 'Waste Generation', unit: 'tons/h', threshold: 65, icon: Thermometer }
    };
    return configs[type as keyof typeof configs];
  };

  const config = getMetricConfig(metricType);
  const isAboveThreshold = currentValue > config.threshold;
  const Icon = config.icon;

  const getTrendIcon = () => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-red-400" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-green-400" />;
      default: return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  const maxValue = Math.max(...data, config.threshold * 1.2);

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-cyan-500/30 transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-lg bg-gradient-to-r ${metricType === 'water' ? 'from-cyan-500 to-cyan-600' : 
                                                           metricType === 'energy' ? 'from-amber-500 to-amber-600' :
                                                           metricType === 'carbon' ? 'from-green-500 to-green-600' :
                                                           'from-purple-500 to-purple-600'} group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{config.label} Monitor</h3>
            <p className="text-gray-400 text-sm">Live sustainability metrics</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center space-x-2 mb-1">
            <span className={`text-2xl font-bold ${isAboveThreshold ? 'text-red-400' : 'text-white'}`}>
              {currentValue.toFixed(1)}
            </span>
            <span className="text-gray-400">{config.unit}</span>
            {getTrendIcon()}
          </div>
          {isAboveThreshold && (
            <span className="text-red-400 text-xs font-medium">Above Threshold</span>
          )}
        </div>
      </div>

      {/* Chart */}
      <div className="relative h-64 bg-gray-900/50 rounded-lg border border-cyan-500/20 p-4">
        <svg className="w-full h-full" viewBox="0 0 400 200">
          <defs>
            <linearGradient id={`gradient-${metricType}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={config.color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={config.color} stopOpacity="0.05" />
            </linearGradient>
          </defs>
          
          {/* Grid Lines */}
          {Array.from({ length: 5 }, (_, i) => (
            <line
              key={i}
              x1="0"
              y1={i * 40}
              x2="400"
              y2={i * 40}
              stroke="#374151"
              strokeWidth="1"
              opacity="0.5"
            />
          ))}
          
          {/* Threshold Line */}
          <line
            x1="0"
            y1={200 - (config.threshold / maxValue) * 200}
            x2="400"
            y2={200 - (config.threshold / maxValue) * 200}
            stroke="#EF4444"
            strokeWidth="2"
            strokeDasharray="5,5"
            opacity="0.7"
          />
          
          {/* Data Line */}
          <polyline
            fill="none"
            stroke={config.color}
            strokeWidth="3"
            points={data.map((value, index) => 
              `${(index / (data.length - 1)) * 400},${200 - (value / maxValue) * 200}`
            ).join(' ')}
          />
          
          {/* Area Fill */}
          <polygon
            fill={`url(#gradient-${metricType})`}
            points={[
              ...data.map((value, index) => 
                `${(index / (data.length - 1)) * 400},${200 - (value / maxValue) * 200}`
              ),
              `400,200`,
              `0,200`
            ].join(' ')}
          />
          
          {/* Data Points */}
          {data.map((value, index) => (
            <circle
              key={index}
              cx={(index / (data.length - 1)) * 400}
              cy={200 - (value / maxValue) * 200}
              r="3"
              fill={config.color}
              className="animate-pulse"
            />
          ))}
        </svg>

        {/* Live Indicator */}
        <div className="absolute top-4 right-4 flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-green-400 text-sm font-medium">Live</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="bg-gray-700/30 rounded-lg p-3 border border-gray-600/50">
          <p className="text-gray-400 text-xs mb-1">Average</p>
          <p className="text-white font-semibold">
            {(data.reduce((a, b) => a + b, 0) / data.length).toFixed(1)} {config.unit}
          </p>
        </div>
        <div className="bg-gray-700/30 rounded-lg p-3 border border-gray-600/50">
          <p className="text-gray-400 text-xs mb-1">Peak</p>
          <p className="text-white font-semibold">
            {Math.max(...data).toFixed(1)} {config.unit}
          </p>
        </div>
        <div className="bg-gray-700/30 rounded-lg p-3 border border-gray-600/50">
          <p className="text-gray-400 text-xs mb-1">Threshold</p>
          <p className="text-red-400 font-semibold">
            {config.threshold} {config.unit}
          </p>
        </div>
      </div>
    </div>
  );
};

interface SustainabilityTableProps {
  metricType: 'water' | 'energy' | 'carbon' | 'waste';
}

const SustainabilityTable: React.FC<SustainabilityTableProps> = ({ metricType }) => {
  const [readings, setReadings] = useState<SustainabilityMetric[]>([]);

  useEffect(() => {
    // Generate mock sustainability readings
    const generateReadings = () => {
      const locations = ['North Pit A1', 'North Pit A2', 'East Wall B1', 'East Wall B2', 'South Pit C1', 'South Pit C2'];
      const units = {
        water: 'm³/h',
        energy: 'MW/h',
        carbon: 'tons CO₂/h',
        waste: 'tons/h'
      };

      return locations.map((location, index) => ({
        id: `metric-${metricType}-${index}`,
        timestamp: new Date(Date.now() - Math.random() * 60000),
        type: metricType,
        value: Math.random() * 100,
        unit: units[metricType],
        location,
        status: (Math.random() > 0.8 ? 'warning' : Math.random() > 0.95 ? 'critical' : 'normal') as 'normal' | 'warning' | 'critical',
        trend: (Math.random() > 0.6 ? 'up' : Math.random() > 0.3 ? 'down' : 'stable') as 'up' | 'down' | 'stable'
      }));
    };

    setReadings(generateReadings());

    // Update readings periodically
    const interval = setInterval(() => {
      setReadings(prevReadings => 
        prevReadings.map(reading => ({
          ...reading,
          value: Math.max(0, reading.value + (Math.random() - 0.5) * 10),
          timestamp: new Date(),
          status: (Math.random() > 0.8 ? 'warning' : Math.random() > 0.95 ? 'critical' : 'normal') as 'normal' | 'warning' | 'critical',
          trend: (Math.random() > 0.6 ? 'up' : Math.random() > 0.3 ? 'down' : 'stable') as 'up' | 'down' | 'stable'
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [metricType]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'text-red-400 bg-red-500/20';
      case 'warning': return 'text-yellow-400 bg-yellow-500/20';
      case 'normal': return 'text-green-400 bg-green-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'critical': return <AlertCircle className="w-4 h-4 text-red-400" />;
      case 'warning': return <AlertCircle className="w-4 h-4 text-yellow-400" />;
      case 'normal': return <CheckCircle className="w-4 h-4 text-green-400" />;
      default: return <CheckCircle className="w-4 h-4 text-green-400" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-red-400" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-green-400" />;
      default: return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-cyan-500/30 transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-white">
          {metricType.charAt(0).toUpperCase() + metricType.slice(1).replace('_', ' ')} Metrics
        </h3>
        <div className="flex items-center space-x-2 text-cyan-400">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">Live Data</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-600/50">
              <th className="text-left text-gray-400 text-sm font-medium pb-3">Location</th>
              <th className="text-left text-gray-400 text-sm font-medium pb-3">Value</th>
              <th className="text-left text-gray-400 text-sm font-medium pb-3">Status</th>
              <th className="text-left text-gray-400 text-sm font-medium pb-3">Trend</th>
              <th className="text-left text-gray-400 text-sm font-medium pb-3">Last Update</th>
            </tr>
          </thead>
          <tbody className="space-y-2">
            {readings.map((reading) => (
              <tr key={reading.id} className="border-b border-gray-700/30 hover:bg-gray-700/30 transition-colors">
                <td className="py-3">
                  <div className="flex items-center space-x-2">
                    <Globe className="w-4 h-4 text-cyan-400" />
                    <span className="text-white font-medium">{reading.location}</span>
                  </div>
                </td>
                <td className="py-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-semibold">
                      {reading.value.toFixed(2)}
                    </span>
                    <span className="text-gray-400 text-sm">{reading.unit}</span>
                  </div>
                </td>
                <td className="py-3">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(reading.status)}
                    <span className={`text-sm font-medium capitalize ${getStatusColor(reading.status).split(' ')[0]}`}>
                      {reading.status}
                    </span>
                  </div>
                </td>
                <td className="py-3">
                  <div className="flex items-center space-x-2">
                    {getTrendIcon(reading.trend)}
                    <span className={`text-sm font-medium capitalize ${
                      reading.trend === 'up' ? 'text-red-400' : 
                      reading.trend === 'down' ? 'text-green-400' : 'text-gray-400'
                    }`}>
                      {reading.trend}
                    </span>
                  </div>
                </td>
                <td className="py-3">
                  <div className="flex items-center space-x-2 text-gray-400 text-sm">
                    <Clock className="w-3 h-3" />
                    <span>{formatTime(reading.timestamp)}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Stats */}
      <div className="mt-6 grid grid-cols-4 gap-4">
        <div className="text-center bg-gray-700/30 rounded-lg p-3 border border-gray-600/50">
          <p className="text-gray-400 text-xs mb-1">Normal</p>
          <p className="text-green-400 font-bold">{readings.filter(r => r.status === 'normal').length}</p>
        </div>
        <div className="text-center bg-gray-700/30 rounded-lg p-3 border border-gray-600/50">
          <p className="text-gray-400 text-xs mb-1">Warning</p>
          <p className="text-yellow-400 font-bold">{readings.filter(r => r.status === 'warning').length}</p>
        </div>
        <div className="text-center bg-gray-700/30 rounded-lg p-3 border border-gray-600/50">
          <p className="text-gray-400 text-xs mb-1">Critical</p>
          <p className="text-red-400 font-bold">{readings.filter(r => r.status === 'critical').length}</p>
        </div>
        <div className="text-center bg-gray-700/30 rounded-lg p-3 border border-gray-600/50">
          <p className="text-gray-400 text-xs mb-1">Average</p>
          <p className="text-white font-bold">
            {(readings.reduce((sum, r) => sum + r.value, 0) / readings.length).toFixed(1)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function Sustainability() {
  const [activeView, setActiveView] = useState<'water' | 'energy' | 'carbon' | 'waste'>('water');
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const views = [
    { id: 'water', label: 'Water Usage', color: 'from-cyan-500 to-cyan-600', bgColor: 'bg-cyan-500' },
    { id: 'energy', label: 'Energy Consumption', color: 'from-amber-500 to-amber-600', bgColor: 'bg-amber-500' },
    { id: 'carbon', label: 'Carbon Footprint', color: 'from-green-500 to-green-600', bgColor: 'bg-green-500' },
    { id: 'waste', label: 'Waste Generation', color: 'from-purple-500 to-purple-600', bgColor: 'bg-purple-500' }
  ];

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Sustainability Dashboard</h1>
        <p className="text-gray-400">Carbon & Energy Impact Monitoring for ESG Compliance</p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stats Cards */}
        <div className="bg-gray-800/50 rounded-lg p-6 border border-cyan-500/20">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Safety Risk Level</h3>
              <p className="text-2xl font-bold text-cyan-400">65% (High)</p>
            </div>
          </div>
          <div className="text-sm text-gray-400">
            +5% today
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6 border border-cyan-500/20">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center">
              <Battery className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Energy Usage</h3>
              <p className="text-2xl font-bold text-cyan-400">1.8 MW/hr</p>
            </div>
          </div>
          <div className="text-sm text-gray-400">
            +0.2 MW
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6 border border-cyan-500/20">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Carbon Footprint</h3>
              <p className="text-2xl font-bold text-cyan-400">4.2 tons CO₂/day</p>
            </div>
          </div>
          <div className="text-sm text-gray-400">
            -0.3 tons
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-2">
        <div className="flex space-x-1">
          {views.map((view) => (
            <button
              key={view.id}
              onClick={() => setActiveView(view.id as any)}
              className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeView === view.id
                  ? `bg-gradient-to-r ${view.color} text-white shadow-lg`
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              {view.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart Panel */}
        <SustainabilityChart metricType={activeView} />
        
        {/* Table Panel */}
        <SustainabilityTable metricType={activeView} />
      </div>

      {/* ESG Compliance Panel */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-cyan-500/30 transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">ESG Compliance Status</h2>
              <p className="text-gray-400 text-sm">Sustainable Development Goals & ESG Reporting</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-400">Compliance Score</div>
            <div className="text-2xl font-bold text-emerald-400">87%</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* SDG 7: Affordable & Clean Energy */}
          <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 rounded-xl p-4">
            <div className="text-2xl mb-2">⚡</div>
            <div className="text-lg font-bold text-yellow-400 mb-1">SDG 7</div>
            <div className="text-yellow-400/70 text-sm">Clean Energy</div>
            <div className="text-white text-xs mt-2">Energy efficiency: 78%</div>
          </div>

          {/* SDG 6: Clean Water & Sanitation */}
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-xl p-4">
            <div className="text-2xl mb-2">💧</div>
            <div className="text-lg font-bold text-blue-400 mb-1">SDG 6</div>
            <div className="text-blue-400/70 text-sm">Clean Water</div>
            <div className="text-white text-xs mt-2">Water recycling: 85%</div>
          </div>

          {/* SDG 13: Climate Action */}
          <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 rounded-xl p-4">
            <div className="text-2xl mb-2">🌱</div>
            <div className="text-lg font-bold text-green-400 mb-1">SDG 13</div>
            <div className="text-green-400/70 text-sm">Climate Action</div>
            <div className="text-white text-xs mt-2">Carbon reduction: 23%</div>
          </div>
        </div>
      </div>
    </div>
  );
}
