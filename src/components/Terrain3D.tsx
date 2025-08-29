import React, { useState, useEffect } from 'react';
import { MapPin, AlertTriangle, TrendingUp, Mountain, Camera, Eye, Info, Activity, Gauge, Zap } from 'lucide-react';

interface CrackData {
  total: number;
  averageWidth: number;
  growthRate: number;
  criticalZones: number;
}

interface TerrainPoint {
  x: number;
  y: number;
  elevation: number;
  slope: number;
  type: 'unstable' | 'monitoring' | 'crack';
}

interface MetricCardProps {
  icon: React.ComponentType<any>;
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  color: string;
  bgGradient: string;
}

function MetricCard({ icon: Icon, title, value, change, trend, color, bgGradient }: MetricCardProps) {
  const trendColors = {
    up: 'text-red-400',
    down: 'text-green-400',
    stable: 'text-gray-400'
  };

  const trendIcons = {
    up: <TrendingUp className="w-4 h-4 text-red-400" />,
    down: <TrendingUp className="w-4 h-4 text-green-400 rotate-180" />,
    stable: <div className="w-4 h-4 text-gray-400">—</div>
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-cyan-500/30 transition-all duration-300 group">
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

const Terrain3D: React.FC = () => {
  const [crackData, setCrackData] = useState<CrackData>({
    total: 23,
    averageWidth: 2.3,
    growthRate: 0.5,
    criticalZones: 8
  });

  const [hoveredPoint, setHoveredPoint] = useState<TerrainPoint | null>(null);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
      setCrackData(prev => ({
        ...prev,
        total: prev.total + (Math.random() > 0.7 ? 1 : 0),
        growthRate: prev.growthRate + (Math.random() - 0.5) * 0.1
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const generateTerrainPoints = () => {
    const points: TerrainPoint[] = [];
    
    // Generate unstable areas (red dots)
    for (let i = 0; i < 12; i++) {
      points.push({
        x: Math.random() * 400,
        y: Math.random() * 300,
        elevation: 1200 + Math.random() * 600,
        slope: 15 + Math.random() * 30,
        type: 'unstable'
      });
    }
    
    // Generate monitoring points (yellow dots)
    for (let i = 0; i < 18; i++) {
      points.push({
        x: Math.random() * 400,
        y: Math.random() * 300,
        elevation: 1200 + Math.random() * 600,
        slope: 15 + Math.random() * 30,
        type: 'monitoring'
      });
    }
    
    // Generate crack points
    for (let i = 0; i < 8; i++) {
      points.push({
        x: Math.random() * 400,
        y: Math.random() * 300,
        elevation: 1200 + Math.random() * 600,
        slope: 15 + Math.random() * 30,
        type: 'crack'
      });
    }
    
    return points;
  };

  const terrainPoints = generateTerrainPoints();

  const getPointColor = (type: string) => {
    switch (type) {
      case 'unstable': return '#EF4444';
      case 'monitoring': return '#F59E0B';
      case 'crack': return '#8B5CF6';
      default: return '#6B7280';
    }
  };

  const getPointSize = (type: string) => {
    switch (type) {
      case 'unstable': return 8;
      case 'monitoring': return 6;
      case 'crack': return 5;
      default: return 4;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">3D Terrain Analysis</h1>
        <p className="text-gray-400">Advanced terrain monitoring with drone imagery and digital elevation models</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stats Cards */}
        <div className="bg-gray-800/50 rounded-lg p-6 border border-cyan-500/20">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Total Cracks Detected</h3>
              <p className="text-2xl font-bold text-cyan-400">{crackData.total}</p>
            </div>
          </div>
          <div className="text-sm text-gray-400">
            +2 today
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6 border border-cyan-500/20">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center">
              <Gauge className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Average Crack Width</h3>
              <p className="text-2xl font-bold text-cyan-400">{crackData.averageWidth} cm</p>
            </div>
          </div>
          <div className="text-sm text-gray-400">
            +0.1 cm
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6 border border-cyan-500/20">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Growth Rate</h3>
              <p className="text-2xl font-bold text-cyan-400">+{crackData.growthRate.toFixed(1)} mm/day</p>
            </div>
          </div>
          <div className="text-sm text-gray-400">
            +0.2 mm
          </div>
        </div>
      </div>

      {/* Main Visualization Panel - Updated to match Dashboard style */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Drone Imagery Panel */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-cyan-500/30 transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-lg bg-gradient-to-r from-green-500 to-green-600">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Drone Imagery Analysis</h2>
                <p className="text-gray-400 text-sm">Spatial visualization of critical zones</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-green-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Live Feed</span>
            </div>
          </div>

          {/* Drone Imagery Visualization */}
          <div className="relative h-80 bg-gray-900/50 rounded-lg border border-cyan-500/20 p-4">
            <svg className="w-full h-full" viewBox="0 0 400 300">
              {/* Background Grid */}
              {Array.from({ length: 8 }, (_, i) => (
                <line
                  key={`h-${i}`}
                  x1="0"
                  y1={i * 37.5}
                  x2="400"
                  y2={i * 37.5}
                  stroke="#374151"
                  strokeWidth="1"
                  opacity="0.3"
                />
              ))}
              {Array.from({ length: 10 }, (_, i) => (
                <line
                  key={`v-${i}`}
                  x1={i * 40}
                  y1="0"
                  x2={i * 40}
                  y2="300"
                  stroke="#374151"
                  strokeWidth="1"
                  opacity="0.3"
                />
              ))}

              {/* Terrain Points */}
              {terrainPoints.map((point, index) => (
                <g key={index}>
                  {/* Glowing effect for unstable areas */}
                  {point.type === 'unstable' && (
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r={getPointSize(point.type) + 4}
                      fill={getPointColor(point.type)}
                      opacity="0.3"
                      className="animate-ping"
                    />
                  )}
                  
                  {/* Main point */}
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={getPointSize(point.type)}
                    fill={getPointColor(point.type)}
                    className="cursor-pointer hover:r-2 transition-all duration-300"
                    onMouseEnter={() => setHoveredPoint(point)}
                    onMouseLeave={() => setHoveredPoint(null)}
                  />
                </g>
              ))}
            </svg>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-gray-800/80 backdrop-blur-sm rounded-lg p-3 border border-gray-600/50">
              <div className="space-y-2 text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-white">Unstable Areas</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-white">Monitoring Points</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-white">Crack Detection</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Digital Elevation Model Panel */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-cyan-500/30 transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600">
                <Mountain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Digital Elevation Model</h2>
                <p className="text-gray-400 text-sm">Terrain elevation & slope analysis</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-blue-400">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Processing</span>
            </div>
          </div>

          {/* DEM Visualization */}
          <div className="relative h-80 bg-gray-900/50 rounded-lg border border-cyan-500/20 p-4">
            <svg className="w-full h-full" viewBox="0 0 400 300">
              {/* Contour Lines */}
              {Array.from({ length: 6 }, (_, i) => {
                const elevation = 1200 + i * 100;
                const y = 300 - (elevation - 1200) / 6;
                return (
                  <g key={`contour-${i}`}>
                    <path
                      d={`M 0 ${y} Q 100 ${y - 20} 200 ${y} T 400 ${y}`}
                      fill="none"
                      stroke={i % 2 === 0 ? '#3B82F6' : '#1E40AF'}
                      strokeWidth="2"
                      opacity="0.7"
                    />
                    <text
                      x="10"
                      y={y - 5}
                      fill="#60A5FA"
                      fontSize="10"
                      fontWeight="bold"
                    >
                      {elevation}m
                    </text>
                  </g>
                );
              })}

              {/* Slope Indicators */}
              {Array.from({ length: 8 }, (_, i) => {
                const x = i * 50;
                const slope = 15 + (i * 30) / 7;
                const y = 50 + (slope - 15) * 2;
                return (
                  <g key={`slope-${i}`}>
                    <line
                      x1={x}
                      y1="250"
                      x2={x + 20}
                      y2={250 - y}
                      stroke="#10B981"
                      strokeWidth="2"
                      opacity="0.6"
                    />
                    <text
                      x={x + 25}
                      y={250 - y + 5}
                      fill="#34D399"
                      fontSize="8"
                    >
                      {slope.toFixed(0)}°
                    </text>
                  </g>
                );
              })}

              {/* Overlay Points */}
              {terrainPoints.slice(0, 15).map((point, index) => (
                <circle
                  key={`dem-${index}`}
                  cx={point.x}
                  cy={point.y}
                  r={getPointSize(point.type)}
                  fill={getPointColor(point.type)}
                  className="cursor-pointer hover:r-2 transition-all duration-300"
                  onMouseEnter={() => setHoveredPoint(point)}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
              ))}
            </svg>

            {/* Elevation Scale */}
            <div className="absolute right-4 top-4 bg-gray-800/80 backdrop-blur-sm rounded-lg p-3 border border-gray-600/50">
              <div className="text-center text-xs text-white mb-2">Elevation</div>
              <div className="space-y-1">
                {Array.from({ length: 6 }, (_, i) => {
                  const elevation = 1800 - i * 100;
                  const intensity = 1 - (i * 0.15);
                  return (
                    <div key={elevation} className="flex items-center space-x-2">
                      <div 
                        className="w-4 h-2 rounded"
                        style={{ backgroundColor: `rgba(59, 130, 246, ${intensity})` }}
                      ></div>
                      <span className="text-white text-xs">{elevation}m</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>



      {/* Tooltip */}
      {hoveredPoint && (
        <div 
          className="fixed bg-gray-800/90 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-3 text-white text-sm shadow-xl z-50"
          style={{
            left: hoveredPoint.x + 20,
            top: hoveredPoint.y - 40
          }}
        >
          <div className="flex items-center space-x-2 mb-2">
            <Info className="w-4 h-4 text-cyan-400" />
            <span className="font-medium capitalize">{hoveredPoint.type} Point</span>
          </div>
          <div className="space-y-1 text-xs">
            <div>Elevation: <span className="text-cyan-400">{hoveredPoint.elevation.toFixed(0)}m</span></div>
            <div>Slope: <span className="text-cyan-400">{hoveredPoint.slope.toFixed(1)}°</span></div>
            <div>Coordinates: <span className="text-cyan-400">({hoveredPoint.x.toFixed(0)}, {hoveredPoint.y.toFixed(0)})</span></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Terrain3D;
