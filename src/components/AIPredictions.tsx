import { useState, useEffect } from 'react';
import { AlertTriangle, TrendingUp, Clock, BarChart3, Activity, Shield, Target, Zap, ArrowLeft, MapPin, Eye, Droplet, Vibrate, RotateCcw, Bell, Wifi, WifiOff } from 'lucide-react';
import { TrendingDown } from 'lucide-react';

interface ZoneData {
  zone_id: number;
  risk_probability: number;
  confidence: number;
  time_to_event: string;
  status: 'safe' | 'warning' | 'danger';
  reasons: {
    rainfall_mm: number;
    vibration: number;
    tilt_deg: number;
  };
  trend: number[];
  historical: { week1: number; week2: number; week3: number; week4: number };
  recommendation: string;
}

const mockZones: ZoneData[] = [
  {
    zone_id: 1,
    risk_probability: 15,
    confidence: 88,
    time_to_event: "24h+",
    status: 'safe',
    reasons: { rainfall_mm: 25, vibration: 0.2, tilt_deg: 0.3 },
    trend: [12, 13, 14, 15, 14, 15, 15],
    historical: { week1: 0, week2: 1, week3: 0, week4: 0 },
    recommendation: "Continue normal operations."
  },
  {
    zone_id: 2,
    risk_probability: 45,
    confidence: 85,
    time_to_event: "18-24h",
    status: 'warning',
    reasons: { rainfall_mm: 85, vibration: 0.5, tilt_deg: 1.2 },
    trend: [35, 38, 40, 42, 44, 45, 45],
    historical: { week1: 1, week2: 2, week3: 1, week4: 1 },
    recommendation: "Increase monitoring frequency."
  },
  {
    zone_id: 3,
    risk_probability: 78,
    confidence: 92,
    time_to_event: "6-12h",
    status: 'danger',
    reasons: { rainfall_mm: 120, vibration: 0.8, tilt_deg: 2.1 },
    trend: [45, 52, 60, 68, 72, 75, 78],
    historical: { week1: 2, week2: 1, week3: 0, week4: 3 },
    recommendation: "Evacuate Zone 3 workers. Stop blasting."
  },
  {
    zone_id: 4,
    risk_probability: 22,
    confidence: 79,
    time_to_event: "24h+",
    status: 'safe',
    reasons: { rainfall_mm: 30, vibration: 0.3, tilt_deg: 0.5 },
    trend: [20, 21, 22, 23, 22, 22, 22],
    historical: { week1: 0, week2: 0, week3: 1, week4: 0 },
    recommendation: "Normal operations approved."
  },
  {
    zone_id: 5,
    risk_probability: 18,
    confidence: 82,
    time_to_event: "24h+",
    status: 'safe',
    reasons: { rainfall_mm: 28, vibration: 0.25, tilt_deg: 0.4 },
    trend: [16, 17, 18, 19, 18, 18, 18],
    historical: { week1: 0, week2: 0, week3: 0, week4: 1 },
    recommendation: "Continue operations as planned."
  },
  {
    zone_id: 6,
    risk_probability: 52,
    confidence: 87,
    time_to_event: "12-18h",
    status: 'warning',
    reasons: { rainfall_mm: 95, vibration: 0.6, tilt_deg: 1.5 },
    trend: [42, 45, 48, 50, 51, 52, 52],
    historical: { week1: 1, week2: 1, week3: 2, week4: 1 },
    recommendation: "Enhanced monitoring required."
  },
  {
    zone_id: 7,
    risk_probability: 25,
    confidence: 80,
    time_to_event: "24h+",
    status: 'safe',
    reasons: { rainfall_mm: 35, vibration: 0.3, tilt_deg: 0.6 },
    trend: [23, 24, 25, 26, 25, 25, 25],
    historical: { week1: 0, week2: 1, week3: 0, week4: 0 },
    recommendation: "Standard safety protocols."
  },
  {
    zone_id: 8,
    risk_probability: 20,
    confidence: 83,
    time_to_event: "24h+",
    status: 'safe',
    reasons: { rainfall_mm: 32, vibration: 0.28, tilt_deg: 0.45 },
    trend: [18, 19, 20, 21, 20, 20, 20],
    historical: { week1: 0, week2: 0, week3: 0, week4: 0 },
    recommendation: "All clear for operations."
  },
  {
    zone_id: 9,
    risk_probability: 68,
    confidence: 90,
    time_to_event: "8-14h",
    status: 'danger',
    reasons: { rainfall_mm: 110, vibration: 0.75, tilt_deg: 1.9 },
    trend: [55, 58, 62, 65, 66, 67, 68],
    historical: { week1: 1, week2: 2, week3: 1, week4: 2 },
    recommendation: "Restrict access. Monitor closely."
  },
  {
    zone_id: 10,
    risk_probability: 28,
    confidence: 81,
    time_to_event: "24h+",
    status: 'safe',
    reasons: { rainfall_mm: 40, vibration: 0.35, tilt_deg: 0.7 },
    trend: [25, 26, 27, 28, 28, 28, 28],
    historical: { week1: 0, week2: 1, week3: 0, week4: 1 },
    recommendation: "Routine monitoring sufficient."
  }
];

function getStatusColor(status: string) {
  switch (status) {
    case 'safe': return { bg: 'bg-green-500', text: 'text-green-400', border: 'border-green-500/30', emoji: '🟢' };
    case 'warning': return { bg: 'bg-yellow-500', text: 'text-yellow-400', border: 'border-yellow-500/30', emoji: '🟡' };
    case 'danger': return { bg: 'bg-red-500', text: 'text-red-400', border: 'border-red-500/30', emoji: '🔴' };
    default: return { bg: 'bg-gray-500', text: 'text-gray-400', border: 'border-gray-500/30', emoji: '⚪' };
  }
}

function ZoneCard({ zone, onClick }: { zone: ZoneData; onClick: () => void }) {
  const colors = getStatusColor(zone.status);
  
  return (
    <div 
      onClick={onClick}
      className={`bg-gray-800/50 backdrop-blur-sm border ${colors.border} rounded-xl p-6 hover:border-opacity-60 transition-all duration-300 cursor-pointer group hover:scale-105 hover:shadow-lg`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Zone {zone.zone_id}</h3>
        <span className="text-2xl">{colors.emoji}</span>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Risk</span>
          <span className={`text-lg font-bold ${colors.text}`}>{zone.risk_probability}%</span>
        </div>
        
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className={`${colors.bg} h-2 rounded-full transition-all duration-500`}
            style={{ width: `${zone.risk_probability}%` }}
          />
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-400 capitalize">{zone.status}</span>
          <span className="text-xs text-gray-500">{zone.time_to_event}</span>
        </div>
      </div>
    </div>
  );
}

interface TrendGraphProps {
  trend: number[];
}

function TrendGraph({ trend }: TrendGraphProps) {
  const [animationProgress, setAnimationProgress] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const maxValue = Math.max(...trend);
  const minValue = Math.min(...trend);
  const times = ['6h ago', '5h ago', '4h ago', '3h ago', '2h ago', '1h ago', 'Now'];
  const chartHeight = 240;
  const padding = { top: 40, right: 40, bottom: 60, left: 60 };
  
  const yAxisLabels = [
    maxValue,
    Math.round(maxValue * 0.75),
    Math.round(maxValue * 0.5),
    Math.round(maxValue * 0.25),
    0
  ];

  // Animation effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationProgress(100);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Calculate point positions - using percentage-based width
  const getPointPosition = (index: number, value: number, chartWidth: number) => {
    const x = padding.left + (index / (trend.length - 1)) * (chartWidth - padding.left - padding.right);
    const y = padding.top + (1 - (value - minValue) / (maxValue - minValue || 1)) * (chartHeight - padding.top - padding.bottom);
    return { x, y };
  };

  // Generate smooth curve path
  const generatePath = (chartWidth: number) => {
    if (trend.length === 0) return '';
    
    let path = '';
    const points = trend.map((value, index) => getPointPosition(index, value, chartWidth));
    
    // Start path
    path += `M ${points[0].x} ${points[0].y}`;
    
    // Create smooth curves between points
    for (let i = 1; i < points.length; i++) {
      const prevPoint = points[i - 1];
      const currentPoint = points[i];
      const controlPointDistance = (currentPoint.x - prevPoint.x) * 0.4;
      
      const cp1x = prevPoint.x + controlPointDistance;
      const cp1y = prevPoint.y;
      const cp2x = currentPoint.x - controlPointDistance;
      const cp2y = currentPoint.y;
      
      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${currentPoint.x} ${currentPoint.y}`;
    }
    
    return path;
  };

  // Generate area path (filled area under the curve)
  const generateAreaPath = (chartWidth: number) => {
    const linePath = generatePath(chartWidth);
    if (!linePath) return '';
    
    const lastPoint = getPointPosition(trend.length - 1, trend[trend.length - 1], chartWidth);
    const firstPoint = getPointPosition(0, trend[0], chartWidth);
    
    return `${linePath} L ${lastPoint.x} ${chartHeight - padding.bottom} L ${firstPoint.x} ${chartHeight - padding.bottom} Z`;
  };

  const currentRisk = trend[trend.length - 1];
  const previousRisk = trend[trend.length - 2];
  const trendDirection = currentRisk > previousRisk ? 'up' : currentRisk < previousRisk ? 'down' : 'stable';
  const trendPercentage = previousRisk ? Math.abs(((currentRisk - previousRisk) / previousRisk) * 100).toFixed(1) : 0;

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700/50 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-xl border border-cyan-500/30">
            <Activity className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Risk Trend Analysis</h3>
            <p className="text-sm text-slate-400">Last 6 hours monitoring</p>
          </div>
        </div>
        
        {/* Trend indicator */}
        <div className="flex items-center space-x-2">
          {trendDirection === 'up' ? (
            <TrendingUp className="w-5 h-5 text-red-400" />
          ) : trendDirection === 'down' ? (
            <TrendingDown className="w-5 h-5 text-green-400" />
          ) : (
            <Activity className="w-5 h-5 text-slate-400" />
          )}
          <span className={`text-sm font-medium ${
            trendDirection === 'up' ? 'text-red-400' : 
            trendDirection === 'down' ? 'text-green-400' : 'text-slate-400'
          }`}>
            {trendDirection === 'stable' ? 'Stable' : `${trendPercentage}%`}
          </span>
        </div>
      </div>

      {/* Chart Container - Now properly contained */}
      <div className="relative mb-6 w-full overflow-hidden">
        <div className="w-full" style={{ height: `${chartHeight}px` }}>
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 600 ${chartHeight}`}
            preserveAspectRatio="none"
            className="w-full h-full"
            style={{ filter: 'drop-shadow(0 4px 20px rgba(6, 182, 212, 0.1))' }}
          >
            {/* Gradient definitions */}
            <defs>
              <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(6, 182, 212, 0.3)" />
                <stop offset="50%" stopColor="rgba(59, 130, 246, 0.2)" />
                <stop offset="100%" stopColor="rgba(147, 51, 234, 0.1)" />
              </linearGradient>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Grid lines */}
            {yAxisLabels.map((_, index) => {
              const y = padding.top + (index / (yAxisLabels.length - 1)) * (chartHeight - padding.top - padding.bottom);
              return (
                <line
                  key={index}
                  x1={padding.left}
                  y1={y}
                  x2={600 - padding.right}
                  y2={y}
                  stroke="rgba(148, 163, 184, 0.1)"
                  strokeWidth="1"
                  strokeDasharray="2,4"
                />
              );
            })}

            {/* Vertical grid lines */}
            {times.map((_, index) => {
              const x = padding.left + (index / (times.length - 1)) * (600 - padding.left - padding.right);
              return (
                <line
                  key={index}
                  x1={x}
                  y1={padding.top}
                  x2={x}
                  y2={chartHeight - padding.bottom}
                  stroke="rgba(148, 163, 184, 0.05)"
                  strokeWidth="1"
                />
              );
            })}

            {/* Area under curve */}
            <path
              d={generateAreaPath(600)}
              fill="url(#areaGradient)"
              opacity={animationProgress / 100}
              style={{
                transition: 'opacity 1.5s ease-out',
              }}
            />

            {/* Main trend line */}
            <path
              d={generatePath(600)}
              fill="none"
              stroke="url(#lineGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#glow)"
              style={{
                strokeDasharray: '1000',
                strokeDashoffset: `${1000 * (1 - animationProgress / 100)}`,
                transition: 'stroke-dashoffset 2s ease-out',
              }}
            />

            {/* Data points */}
            {trend.map((value, index) => {
              const { x, y } = getPointPosition(index, value, 600);
              const isHovered = hoveredIndex === index;
              const isLast = index === trend.length - 1;
              
              return (
                <g key={index}>
                  {/* Outer glow circle */}
                  <circle
                    cx={x}
                    cy={y}
                    r={isLast ? "8" : "6"}
                    fill="rgba(6, 182, 212, 0.2)"
                    opacity={animationProgress / 100}
                    style={{
                      transition: 'opacity 1.5s ease-out',
                      transitionDelay: `${index * 0.1}s`,
                    }}
                  />
                  
                  {/* Main data point */}
                  <circle
                    cx={x}
                    cy={y}
                    r={isLast ? "5" : isHovered ? "4" : "3"}
                    fill={isLast ? "#06b6d4" : "#3b82f6"}
                    stroke={isLast ? "#0891b2" : "#2563eb"}
                    strokeWidth="2"
                    className="cursor-pointer transition-all duration-300"
                    opacity={animationProgress / 100}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    style={{
                      filter: isLast ? 'drop-shadow(0 0 8px rgba(6, 182, 212, 0.8))' : 'none',
                      transition: 'opacity 1.5s ease-out, r 0.3s ease',
                      transitionDelay: `${index * 0.1}s`,
                    }}
                  />
                  
                  {/* Hover tooltip */}
                  {isHovered && (
                    <g>
                      <rect
                        x={x - 30}
                        y={y - 45}
                        width="60"
                        height="28"
                        rx="8"
                        fill="rgba(15, 23, 42, 0.95)"
                        stroke="rgba(148, 163, 184, 0.3)"
                        strokeWidth="1"
                        className="animate-in fade-in duration-200"
                      />
                      <text
                        x={x}
                        y={y - 25}
                        textAnchor="middle"
                        className="fill-white text-sm font-semibold"
                      >
                        {value}%
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 flex flex-col justify-between text-xs text-slate-400 font-medium" style={{ height: `${chartHeight - padding.bottom}px`, paddingTop: `${padding.top}px` }}>
            {yAxisLabels.map((label, index) => (
              <div key={index} className="flex items-center justify-end pr-4" style={{ transform: 'translateY(-50%)' }}>
                <span className="bg-slate-800/80 px-2 py-1 rounded border border-slate-700/50">{label}%</span>
              </div>
            ))}
          </div>

          {/* X-axis labels */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-slate-400 font-medium px-16">
            {times.map((time, index) => (
              <div key={index} className="flex items-center justify-center">
                <span className="bg-slate-800/60 px-2 py-1 rounded border border-slate-700/30 whitespace-nowrap">
                  {time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Statistics panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/30 border border-slate-600/30 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-cyan-500/20 rounded-lg">
              <Activity className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Current Level</p>
              <p className="text-xl font-bold text-cyan-400">{currentRisk}%</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/30 border border-slate-600/30 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <TrendingUp className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Peak Value</p>
              <p className="text-xl font-bold text-blue-400">{maxValue}%</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/30 border border-slate-600/30 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${
              trendDirection === 'up' ? 'bg-red-500/20' : 
              trendDirection === 'down' ? 'bg-green-500/20' : 'bg-slate-500/20'
            }`}>
              {trendDirection === 'up' ? (
                <TrendingUp className="w-4 h-4 text-red-400" />
              ) : trendDirection === 'down' ? (
                <TrendingDown className="w-4 h-4 text-green-400" />
              ) : (
                <Activity className="w-4 h-4 text-slate-400" />
              )}
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Trend Status</p>
              <p className={`text-xl font-bold ${
                trendDirection === 'up' ? 'text-red-400' : 
                trendDirection === 'down' ? 'text-green-400' : 'text-slate-400'
              }`}>
                {trendDirection === 'up' ? 'Rising' : 
                 trendDirection === 'down' ? 'Falling' : 'Stable'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniMap({ activeZone }: { activeZone: number }) {
  const zones = [
    { id: 1, x: 25, y: 35, status: 'safe' },
    { id: 2, x: 45, y: 25, status: 'warning' },
    { id: 3, x: 65, y: 40, status: 'danger' },
    { id: 4, x: 80, y: 30, status: 'safe' },
    { id: 5, x: 35, y: 65, status: 'safe' },
    { id: 6, x: 55, y: 75, status: 'warning' },
    { id: 7, x: 75, y: 65, status: 'safe' },
    { id: 8, x: 20, y: 80, status: 'safe' },
    { id: 9, x: 85, y: 80, status: 'danger' },
    { id: 10, x: 50, y: 50, status: 'safe' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe':
        return { bg: 'bg-green-500', border: 'border-green-400' };
      case 'warning':
        return { bg: 'bg-yellow-500', border: 'border-yellow-400' };
      case 'danger':
        return { bg: 'bg-red-500', border: 'border-red-400' };
      default:
        return { bg: 'bg-gray-500', border: 'border-gray-400' };
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-6 flex items-center space-x-2">
        <MapPin className="w-5 h-5 text-cyan-400" />
        <span>Mine Map Overview</span>
      </h3>
      
      {/* Map Container with proper padding for zones */}
      <div className="relative w-full h-48 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg overflow-hidden border border-gray-700">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5"></div>
        
        {/* Zones Container - with padding to prevent overflow */}
        <div className="absolute inset-4">
          {zones.map((zone) => {
            const colors = getStatusColor(zone.status);
            const isActive = zone.id === activeZone;
            return (
              <div
                key={zone.id}
                className={`absolute w-6 h-6 rounded-full ${colors.bg} ${
                  isActive 
                    ? 'ring-4 ring-white animate-pulse shadow-lg scale-110' 
                    : 'hover:scale-110 shadow-md'
                } transition-all duration-300 cursor-pointer flex items-center justify-center border-2 ${colors.border}`}
                style={{
                  left: `${zone.x}%`,
                  top: `${zone.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                title={`Zone ${zone.id} - ${zone.status.charAt(0).toUpperCase() + zone.status.slice(1)}`}
              >
                <span className="text-xs font-bold text-white drop-shadow-sm">
                  {zone.id}
                </span>
              </div>
            );
          })}
        </div>
        
        {/* Grid lines for better visual reference */}
        <div className="absolute inset-0 opacity-10">
          {/* Vertical lines */}
          <div className="absolute left-1/4 top-0 bottom-0 w-px bg-gray-400"></div>
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-400"></div>
          <div className="absolute left-3/4 top-0 bottom-0 w-px bg-gray-400"></div>
          {/* Horizontal lines */}
          <div className="absolute top-1/4 left-0 right-0 h-px bg-gray-400"></div>
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-400"></div>
          <div className="absolute top-3/4 left-0 right-0 h-px bg-gray-400"></div>
        </div>
        
        <div className="absolute bottom-2 right-2 text-xs text-gray-400">
          Live Mine Layout
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex items-center justify-center space-x-6 mt-4 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full border border-green-400"></div>
          <span className="text-gray-300">Safe</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-yellow-500 rounded-full border border-yellow-400"></div>
          <span className="text-gray-300">Warning</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full border border-red-400"></div>
          <span className="text-gray-300">Danger</span>
        </div>
      </div>
    </div>
  );
}

function ExplainableAI({ reasons, riskProbability }: { reasons: ZoneData['reasons']; riskProbability: number }) {
  const factors = [
    { 
      label: 'Rainfall', 
      value: `${reasons.rainfall_mm}mm`, 
      impact: Math.round((reasons.rainfall_mm / 150) * 40),
      icon: Droplet,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10'
    },
    { 
      label: 'Vibration', 
      value: `${reasons.vibration}g`, 
      impact: Math.round(reasons.vibration * 25),
      icon: Vibrate,
      color: 'text-orange-400',
      bg: 'bg-orange-500/10'
    },
    { 
      label: 'Tilt Change', 
      value: `${reasons.tilt_deg}°`, 
      impact: Math.round(reasons.tilt_deg * 6),
      icon: RotateCcw,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10'
    }
  ];
  
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-6 flex items-center space-x-2">
        <BarChart3 className="w-5 h-5 text-purple-400" />
        <span>Why This Prediction?</span>
      </h3>
      
      <div className="space-y-4">
        {factors.map((factor, index) => {
          const Icon = factor.icon;
          const impactLevel = factor.impact > 20 ? 'high' : factor.impact > 10 ? 'medium' : 'low';
          const impactColor = impactLevel === 'high' ? 'text-red-400' : 
                             impactLevel === 'medium' ? 'text-yellow-400' : 'text-green-400';
          
          return (
            <div key={index} className={`p-4 ${factor.bg} rounded-lg border border-gray-600/30`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Icon className={`w-5 h-5 ${factor.color}`} />
                  <span className="text-sm text-gray-300 font-medium">{factor.label}</span>
                </div>
                <span className={`text-sm font-bold ${impactColor}`}>
                  +{factor.impact}% risk
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-lg text-white font-bold">{factor.value}</span>
                <div className="flex items-center space-x-1">
                  <div className="w-16 bg-gray-700 rounded-full h-1">
                    <div 
                      className={`${factor.color.replace('text-', 'bg-')} h-1 rounded-full transition-all duration-500`}
                      style={{ width: `${Math.min(factor.impact * 2, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 p-3 bg-gray-700/30 rounded-lg border border-gray-600/20">
        <p className="text-xs text-gray-400">
          AI model confidence: Combined factors indicate {riskProbability}% probability
        </p>
      </div>
    </div>
  );
}

const mockHistoricalData = {
  week1: 12,
  week2: 8, 
  week3: 15,
  week4: 4
};

interface HistoricalData {
  week1: number;
  week2: number;
  week3: number;
  week4: number;
}

interface HistoricalComparisonProps {
  historical?: HistoricalData;
}

function HistoricalComparison({ historical = mockHistoricalData }: HistoricalComparisonProps) {
  const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
  const values = [historical.week1, historical.week2, historical.week3, historical.week4];
  const predicted = [2, 2, 1, 2]; // Mock predicted values
  
  const maxValue = Math.max(...values, ...predicted, 1);
  
  // Calculate accuracy (mock calculation)
  const accuracy = 85;
  
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-6 flex items-center space-x-2">
        <Target className="w-5 h-5 text-green-400" />
        <span>Historical Events</span>
      </h3>
      
      {/* Bar Chart Container */}
      <div className="relative h-64 mb-6">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-400 pr-3 py-2">
          <span>{maxValue}</span>
          <span>{Math.floor(maxValue * 0.75)}</span>
          <span>{Math.floor(maxValue * 0.5)}</span>
          <span>{Math.floor(maxValue * 0.25)}</span>
          <span>0</span>
        </div>
        
        {/* Grid lines */}
        <div className="absolute left-10 top-2 right-0 h-60">
          {[0, 0.25, 0.5, 0.75, 1].map((position, index) => (
            <div
              key={index}
              className="absolute w-full border-t border-gray-700/30"
              style={{ top: `${position * 100}%` }}
            />
          ))}
        </div>
        
        {/* Bars Container - Fixed positioning and spacing */}
        <div className="absolute left-10 top-2 right-0 h-60 flex items-end justify-center">
          <div className="flex items-end justify-center space-x-8 w-full max-w-md">
            {weeks.map((week, index) => {
              const actualValue = values[index];
              const predictedValue = predicted[index];
              
              // Calculate heights as pixels (out of 240px total height)
              const actualHeight = actualValue === 0 ? 0 : Math.max((actualValue / maxValue) * 220, 4);
              const predictedHeight = predictedValue === 0 ? 0 : Math.max((predictedValue / maxValue) * 220, 4);
              
              return (
                <div key={index} className="flex flex-col items-center">
                  {/* Bar Group Container */}
                  <div className="flex items-end justify-center space-x-1 mb-2">
                    {/* Actual Events Bar */}
                    <div
                      className="w-6 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t transition-all duration-500 ease-out shadow-sm"
                      style={{
                        height: `${actualHeight}px`
                      }}
                      title={`Actual: ${actualValue} events`}
                    />
                    
                    {/* Predicted Events Bar */}
                    <div
                      className="w-6 bg-gradient-to-t from-purple-600 to-purple-400 rounded-t transition-all duration-500 ease-out shadow-sm"
                      style={{
                        height: `${predictedHeight}px`
                      }}
                      title={`Predicted: ${predictedValue} events`}
                    />
                  </div>
                  
                  {/* Values below bars */}
                  <div className="text-xs text-center mb-2">
                    <span className="text-blue-400 font-medium">{actualValue}</span>
                    <span className="text-gray-500 mx-1">/</span>
                    <span className="text-purple-400 font-medium">{predictedValue}</span>
                  </div>
                  
                  {/* Week label */}
                  <span className="text-xs text-gray-400 text-center font-medium">{week}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex items-center justify-center space-x-6 text-sm mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-gradient-to-t from-blue-600 to-blue-400 rounded shadow-sm"></div>
          <span className="text-gray-400">Actual Events</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-gradient-to-t from-purple-600 to-purple-400 rounded shadow-sm"></div>
          <span className="text-gray-400">Predicted Events</span>
        </div>
      </div>
      
      {/* Accuracy indicator */}
      <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
        <div className="flex items-center space-x-2">
          <Target className="w-4 h-4 text-green-400" />
          <span className="text-sm text-green-400 font-medium">
            Model accuracy: {accuracy}% - Good predictive performance
          </span>
        </div>
      </div>
    </div>
  );
}

function ActionRecommendation({ recommendation, status, zoneId }: { recommendation: string; status: string; zoneId: number }) {
  const colors = getStatusColor(status);
  const getActionIcon = () => {
    if (status === 'danger') return AlertTriangle;
    if (status === 'warning') return Eye;
    return Shield;
  };
  
  const ActionIcon = getActionIcon();
  
  const urgencyLevel = status === 'danger' ? 'CRITICAL' : status === 'warning' ? 'MODERATE' : 'LOW';
  const actionItems = recommendation.split('.').filter(item => item.trim());
  
  return (
    <div className={`bg-gray-800/50 backdrop-blur-sm border ${colors.border} rounded-xl p-6`}>
      <h3 className="text-lg font-semibold text-white mb-6 flex items-center space-x-2">
        <ActionIcon className={`w-5 h-5 ${colors.text}`} />
        <span>Recommended Actions</span>
      </h3>
      
      <div className={`p-4 ${colors.bg}/10 border ${colors.border} rounded-lg mb-6`}>
        <div className="flex items-start space-x-3">
          <ActionIcon className={`w-6 h-6 ${colors.text} mt-1 flex-shrink-0`} />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-3">
              <span className={`text-sm font-bold ${colors.text}`}>
                {urgencyLevel} PRIORITY
              </span>
              <span className="text-xs text-gray-400">Zone {zoneId}</span>
            </div>
            
            <div className="space-y-2">
              {actionItems.map((item, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className={`w-1.5 h-1.5 ${colors.bg} rounded-full mt-2 flex-shrink-0`}></div>
                  <p className="text-sm text-gray-300">{item.trim()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {status === 'danger' && (
        <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-red-400" />
            <span className="text-sm text-red-400 font-medium">
              Immediate evacuation protocol activated
            </span>
          </div>
        </div>
      )}

      {status === 'warning' && (
        <div className="p-3 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
          <div className="flex items-center space-x-2">
            <Eye className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-yellow-400 font-medium">
              Enhanced monitoring in progress
            </span>
          </div>
        </div>
      )}

      {status === 'safe' && (
        <div className="p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-green-400" />
            <span className="text-sm text-green-400 font-medium">
              All safety systems operational
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function GeoSentinelDashboard() {
  const [selectedZone, setSelectedZone] = useState<number | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [isConnected, setIsConnected] = useState<boolean>(true);

  useEffect(() => {
    const updateTime = () => {
      setLastUpdated(new Date().toLocaleTimeString());
    };
    
    updateTime();
    const interval = setInterval(() => {
      updateTime();
      // Simulate occasional disconnections
      setIsConnected(Math.random() > 0.05);
    }, 10000); // Update every 10 seconds
    
    return () => clearInterval(interval);
  }, []);


  const selectedZoneData = selectedZone ? mockZones.find(z => z.zone_id === selectedZone) : null;
  
  // Calculate summary stats
  const dangerZones = mockZones.filter(z => z.status === 'danger').length;
  const warningZones = mockZones.filter(z => z.status === 'warning').length;
  const safeZones = mockZones.filter(z => z.status === 'safe').length;

  if (selectedZoneData) {
    return (
      <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSelectedZone(null)}
                className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-200 hover:bg-cyan-500/10 px-3 py-2 rounded-lg"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Global View</span>
              </button>
              
              <div className="w-px h-8 bg-gray-600"></div>
              
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Zone {selectedZoneData.zone_id} - Risk Dashboard
                </h1>
                <p className="text-gray-400">Detailed zone analysis and predictions</p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="flex items-center space-x-2 text-cyan-400 mb-1">
                {isConnected ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
                <span className="text-sm font-medium">Last updated: {lastUpdated}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 ${isConnected ? 'bg-green-500' : 'bg-red-500'} rounded-full ${isConnected ? 'animate-pulse' : ''}`}></div>
                <span className="text-xs text-gray-400">
                  {isConnected ? 'Connected' : 'Connection Lost'}
                </span>
              </div>
            </div>
          </div>

          {/* Top Row - Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Rockfall Probability */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-gray-600/50 transition-all duration-300">
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-12 h-12 ${getStatusColor(selectedZoneData.status).bg} rounded-lg flex items-center justify-center shadow-lg`}>
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Rockfall Probability</h3>
                  <p className={`text-3xl font-bold ${getStatusColor(selectedZoneData.status).text}`}>
                    {selectedZoneData.risk_probability}%
                  </p>
                </div>
              </div>
              
              <div className="w-full bg-gray-700 rounded-full h-4 mb-2">
                <div 
                  className={`${getStatusColor(selectedZoneData.status).bg} h-4 rounded-full transition-all duration-1000 ease-out shadow-lg`}
                  style={{ width: `${selectedZoneData.risk_probability}%` }}
                />
              </div>
              
              <p className={`text-sm ${getStatusColor(selectedZoneData.status).text} font-medium uppercase tracking-wide`}>
                {selectedZoneData.status} Level
              </p>
            </div>

            {/* Confidence Level */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-gray-600/50 transition-all duration-300">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center shadow-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Confidence Level</h3>
                  <p className="text-3xl font-bold text-green-400">{selectedZoneData.confidence}%</p>
                </div>
              </div>
              
              <div className="w-full bg-gray-700 rounded-full h-4 mb-2">
                <div 
                  className="bg-green-500 h-4 rounded-full transition-all duration-1000 ease-out shadow-lg shadow-green-500/20"
                  style={{ width: `${selectedZoneData.confidence}%` }}
                />
              </div>
              
              <p className="text-sm text-green-400 font-medium uppercase tracking-wide">Highly Reliable</p>
            </div>

            {/* Time to Event */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-gray-600/50 transition-all duration-300">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center shadow-lg">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Time to Event</h3>
                  <p className="text-3xl font-bold text-orange-400">{selectedZoneData.time_to_event}</p>
                </div>
              </div>
              
              <div className={`p-3 ${getStatusColor(selectedZoneData.status).bg}/20 border ${getStatusColor(selectedZoneData.status).border} rounded-lg`}>
                <div className="flex items-center space-x-2">
                  <Zap className={`w-4 h-4 ${getStatusColor(selectedZoneData.status).text}`} />
                  <span className={`text-sm ${getStatusColor(selectedZoneData.status).text} font-medium`}>
                    {selectedZoneData.status === 'danger' ? 'Immediate Action Required' : 
                     selectedZoneData.status === 'warning' ? 'Enhanced Monitoring' : 'Normal Operations'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TrendGraph trend={selectedZoneData.trend} />
            <MiniMap activeZone={selectedZoneData.zone_id} />
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ExplainableAI reasons={selectedZoneData.reasons} riskProbability={selectedZoneData.risk_probability} />
            <HistoricalComparison historical={selectedZoneData.historical} />
            <ActionRecommendation 
              recommendation={selectedZoneData.recommendation} 
              status={selectedZoneData.status} 
              zoneId={selectedZoneData.zone_id}
            />
          </div>
        </div>
    );
  }

  return (
    <div className="space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">AI Predictions</h1>
          <p className="text-gray-400">Advanced predictive monitoring system</p>
        </div>

        {/* Zone Status Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-8">
          {mockZones.map((zone) => (
            <ZoneCard
              key={zone.zone_id}
              zone={zone}
              onClick={() => setSelectedZone(zone.zone_id)}
            />
          ))}
        </div>

        {/* Summary */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 mb-8 hover:border-gray-600/50 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center space-x-2">
                <BarChart3 className="w-6 h-6 text-cyan-400" />
                <span>System Overview</span>
              </h2>
              
              <div className="flex items-center space-x-8 text-lg">
                <div className="flex items-center space-x-2">
                  <span className="text-red-400 font-bold text-2xl">{dangerZones}</span>
                  <span className="text-gray-400">High Risk Zones</span>
                </div>
                
                <div className="w-px h-6 bg-gray-600"></div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-400 font-bold text-2xl">{warningZones}</span>
                  <span className="text-gray-400">Warning Zones</span>
                </div>
                
                <div className="w-px h-6 bg-gray-600"></div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-green-400 font-bold text-2xl">{safeZones}</span>
                  <span className="text-gray-400">Safe Zones</span>
                </div>
              </div>
            </div>
            
            {dangerZones > 0 && (
              <div className="flex items-center space-x-3">
                <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl shadow-lg">
                  <div className="flex items-center space-x-3">
                    <Bell className="w-6 h-6 text-red-400 animate-bounce" />
                    <div>
                      <p className="text-red-400 font-bold">CRITICAL ALERT</p>
                      <p className="text-sm text-red-300">Immediate action required</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Alerts Panel */}
        {(dangerZones > 0 || warningZones > 0) && (
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center space-x-2">
              <AlertTriangle className="w-6 h-6 text-yellow-400" />
              <span>Active Alerts</span>
              <div className="ml-auto text-sm text-gray-400">
                {mockZones.filter(z => z.status !== 'safe').length} active alerts
              </div>
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {mockZones
                .filter(zone => zone.status === 'danger' || zone.status === 'warning')
                .map(zone => {
                  const colors = getStatusColor(zone.status);
                  return (
                    <div
                      key={zone.zone_id}
                      className={`p-4 ${colors.bg}/10 border ${colors.border} rounded-lg cursor-pointer hover:bg-opacity-20 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group`}
                      onClick={() => setSelectedZone(zone.zone_id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-3xl">{colors.emoji}</span>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className={`font-bold ${colors.text} text-lg`}>
                                Zone {zone.zone_id}
                              </span>
                              <span className={`text-sm px-2 py-1 ${colors.bg}/20 rounded-full ${colors.text} font-medium uppercase tracking-wide`}>
                                {zone.status === 'danger' ? 'Critical' : 'Warning'}
                              </span>
                            </div>
                            <p className="text-gray-400 text-sm mt-1">
                              Risk: {zone.risk_probability}% • Time: {zone.time_to_event} • Confidence: {zone.confidence}%
                            </p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-sm text-gray-300 max-w-xs">{zone.recommendation}</p>
                          <p className="text-xs text-gray-500 mt-1 group-hover:text-cyan-400 transition-colors">
                            Click for details →
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

    </div>
  );
}