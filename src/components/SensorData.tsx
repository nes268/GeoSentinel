import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Minus, Activity, Gauge, Droplets, Zap } from 'lucide-react';
import { MapPin, Clock, AlertCircle, CheckCircle } from 'lucide-react';

interface SensorReading {
  id: string;
  timestamp: Date;
  type: string;
  value: number;
  unit: string;
  location: string;
  status: 'normal' | 'warning' | 'critical';
}

interface SensorChartProps {
  sensorType: 'tilt' | 'vibration' | 'rainfall' | 'pore_pressure';
}

const SensorChart: React.FC<SensorChartProps> = ({ sensorType }) => {
  const [data, setData] = useState<number[]>([]);
  const [currentValue, setCurrentValue] = useState(0);
  const [trend, setTrend] = useState<'up' | 'down' | 'stable'>('stable');

  useEffect(() => {
    // Generate initial data
    const initialData = Array.from({ length: 20 }, () => Math.random() * 100);
    setData(initialData);
    setCurrentValue(initialData[initialData.length - 1]);
  }, [sensorType]);

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

  const getSensorConfig = (type: string) => {
    const configs = {
      tilt: { color: '#3B82F6', label: 'Tilt Angle', unit: '°', threshold: 5, icon: Gauge },
      vibration: { color: '#F59E0B', label: 'Vibration', unit: 'mm/s', threshold: 50, icon: Activity },
      rainfall: { color: '#06B6D4', label: 'Rainfall Rate', unit: 'mm/h', threshold: 10, icon: Droplets },
      pore_pressure: { color: '#8B5CF6', label: 'Pore Pressure', unit: 'kPa', threshold: 75, icon: Zap }
    };
    return configs[type as keyof typeof configs];
  };

  const config = getSensorConfig(sensorType);
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
          <div className={`p-3 rounded-lg bg-gradient-to-r ${sensorType === 'tilt' ? 'from-blue-500 to-blue-600' : 
                                                           sensorType === 'vibration' ? 'from-amber-500 to-amber-600' :
                                                           sensorType === 'rainfall' ? 'from-cyan-500 to-cyan-600' :
                                                           'from-purple-500 to-purple-600'} group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{config.label} Monitor</h3>
            <p className="text-gray-400 text-sm">Live readings from field sensors</p>
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
            <linearGradient id={`gradient-${sensorType}`} x1="0%" y1="0%" x2="0%" y2="100%">
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
            fill={`url(#gradient-${sensorType})`}
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

interface SensorTableProps {
  sensorType: 'tilt' | 'vibration' | 'rainfall' | 'pore_pressure';
}

const SensorTable: React.FC<SensorTableProps> = ({ sensorType }) => {
  const [readings, setReadings] = useState<SensorReading[]>([]);

  useEffect(() => {
    // Generate mock sensor readings
    const generateReadings = () => {
      const locations = ['North Slope A1', 'North Slope A2', 'East Wall B1', 'East Wall B2', 'South Pit C1', 'South Pit C2'];
      const units = {
        tilt: '°',
        vibration: 'mm/s',
        rainfall: 'mm/h',
        pore_pressure: 'kPa'
      };

      return locations.map((location, index) => ({
        id: `sensor-${sensorType}-${index}`,
        timestamp: new Date(Date.now() - Math.random() * 60000),
        type: sensorType,
        value: Math.random() * 100,
        unit: units[sensorType],
        location,
        status: (Math.random() > 0.8 ? 'warning' : Math.random() > 0.95 ? 'critical' : 'normal') as 'normal' | 'warning' | 'critical'
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
          status: (Math.random() > 0.8 ? 'warning' : Math.random() > 0.95 ? 'critical' : 'normal') as 'normal' | 'warning' | 'critical'
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [sensorType]);

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
      default: return <CheckCircle className="w-4 h-4 text-gray-400" />;
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
          {sensorType.charAt(0).toUpperCase() + sensorType.slice(1).replace('_', ' ')} Sensors
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
              <th className="text-left text-gray-400 text-sm font-medium pb-3">Sensor</th>
              <th className="text-left text-gray-400 text-sm font-medium pb-3">Value</th>
              <th className="text-left text-gray-400 text-sm font-medium pb-3">Status</th>
              <th className="text-left text-gray-400 text-sm font-medium pb-3">Last Update</th>
            </tr>
          </thead>
          <tbody className="space-y-2">
            {readings.map((reading) => (
              <tr key={reading.id} className="border-b border-gray-700/30 hover:bg-gray-700/30 transition-colors">
                <td className="py-3">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-cyan-400" />
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
          <p className="text-gray-400 text-xs mb-1">Active</p>
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

export default function SensorData() {
  const [activeView, setActiveView] = useState<'tilt' | 'vibration' | 'rainfall' | 'pore_pressure'>('tilt');

  const views = [
    { id: 'tilt', label: 'Tilt Monitoring', color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-500' },
    { id: 'vibration', label: 'Vibration Monitoring', color: 'from-amber-500 to-amber-600', bgColor: 'bg-amber-500' },
    { id: 'rainfall', label: 'Rainfall Monitoring', color: 'from-cyan-500 to-cyan-600', bgColor: 'bg-cyan-500' },
    { id: 'pore_pressure', label: 'Pore Pressure Monitoring', color: 'from-purple-500 to-purple-600', bgColor: 'bg-purple-500' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Sensor Monitoring</h1>
        <p className="text-gray-400">Real-time data from field sensors across the mining site</p>
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

      {/* Active View Content */}
      <div className="space-y-6">
        {activeView === 'tilt' && (
          <>
            <SensorChart sensorType="tilt" />
            <SensorTable sensorType="tilt" />
          </>
        )}
        
        {activeView === 'vibration' && (
          <>
            <SensorChart sensorType="vibration" />
            <SensorTable sensorType="vibration" />
          </>
        )}
        
        {activeView === 'rainfall' && (
          <>
            <SensorChart sensorType="rainfall" />
            <SensorTable sensorType="rainfall" />
          </>
        )}
        
        {activeView === 'pore_pressure' && (
          <>
            <SensorChart sensorType="pore_pressure" />
            <SensorTable sensorType="pore_pressure" />
          </>
        )}
      </div>
    </div>
  );
}