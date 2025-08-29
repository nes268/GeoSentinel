import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, XCircle, Clock, Bell, Filter, Search, MessageSquare, Phone, Mail, ChevronDown, CheckCircle } from 'lucide-react';

interface Alert {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  zone: string;
  sector: string;
  timeAgo: string;
  description: string;
  sensorData: string;
  status: 'active' | 'acknowledged' | 'resolved';
}

function AlertItem({ alert, onStatusChange }: { alert: Alert; onStatusChange: (id: string, status: string) => void }) {
  const severityConfig = {
    critical: {
      label: '🔴 Critical',
      color: 'text-red-400',
      bgColor: 'bg-red-500/20',
      borderColor: 'border-red-500/30'
    },
    warning: {
      label: '🟡 Warning',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20',
      borderColor: 'border-yellow-500/30'
    },
    info: {
      label: '🔵 Info',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
      borderColor: 'border-blue-500/30'
    }
  };

  const config = severityConfig[alert.severity];

  return (
    <div className={`bg-gray-800/50 backdrop-blur-sm border ${config.borderColor} rounded-xl p-6 transition-all duration-300 hover:border-cyan-500/30`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-3">
            <span className={`text-lg font-semibold ${config.color}`}>{config.label}</span>
            <span className="text-gray-400">→</span>
            <span className="text-white font-medium">{alert.zone} – Sector {alert.sector}</span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-400">{alert.timeAgo}</span>
          </div>
          
          <div className="mb-3">
            <p className="text-white text-lg mb-2">{alert.description}</p>
            <p className="text-gray-400 text-sm">{alert.sensorData}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onStatusChange(alert.id, 'acknowledged')}
            className="flex items-center space-x-2 px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg text-sm font-medium transition-all duration-300"
          >
            <CheckCircle className="w-4 h-4" />
            <span>Acknowledge</span>
          </button>
          
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg text-sm font-medium transition-all duration-300">
            <MessageSquare className="w-4 h-4" />
            <span>Action Plan</span>
          </button>
          
          <button className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-sm font-medium transition-all duration-300">
            <XCircle className="w-4 h-4" />
            <span>Dismiss</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Alerts() {
  const [selectedSeverity, setSelectedSeverity] = useState('all');

  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      severity: 'critical',
      zone: 'Zone A',
      sector: '3',
      timeAgo: '2 min ago',
      description: 'High vibration detected – Immediate evacuation recommended.',
      sensorData: 'Sensor V003 reports 2.5 Hz sustained vibration (dangerous).',
      status: 'active'
    },
    {
      id: '2',
      severity: 'warning',
      zone: 'Zone B',
      sector: '1',
      timeAgo: '15 min ago',
      description: 'Rainfall threshold exceeded.',
      sensorData: 'Current rate: 15 mm/hr, above threshold of 12 mm/hr.',
      status: 'active'
    },
    {
      id: '3',
      severity: 'critical',
      zone: 'Zone C',
      sector: '2',
      timeAgo: '5 min ago',
      description: 'Gas leak detected in ventilation system.',
      sensorData: 'Methane levels at 2.8% (threshold: 1.5%).',
      status: 'acknowledged'
    },
    {
      id: '4',
      severity: 'warning',
      zone: 'Zone A',
      sector: '1',
      timeAgo: '25 min ago',
      description: 'Equipment temperature rising above normal range.',
      sensorData: 'Current temp: 78°C, normal range: 45-65°C.',
      status: 'active'
    },
    {
      id: '5',
      severity: 'info',
      zone: 'Zone D',
      sector: '4',
      timeAgo: '1 hour ago',
      description: 'Maintenance schedule reminder.',
      sensorData: 'Scheduled inspection due in 2 hours.',
      status: 'acknowledged'
    }
  ]);

  const handleStatusChange = (alertId: string, newStatus: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, status: newStatus as Alert['status'] } : alert
    ));
  };

  const acknowledgeAll = () => {
    setAlerts(alerts.map(alert => ({ ...alert, status: 'acknowledged' as Alert['status'] })));
  };

  const alertCounts = {
    active: alerts.filter(a => a.status === 'active').length,
    acknowledged: alerts.filter(a => a.status === 'acknowledged').length,
    resolvedToday: 5 // Hardcoded as per user specification
  };

  const filteredAlerts = alerts.filter(alert => {
    if (selectedSeverity === 'all') return true;
    return alert.severity === selectedSeverity;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Safety Alert Center</h1>
        <p className="text-gray-400">Real-time safety alerts and incident management</p>
      </div>



      {/* Control Buttons */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="bg-gray-700 border border-gray-600 text-white px-4 py-2 pr-10 rounded-lg focus:border-cyan-500 transition-colors duration-300 appearance-none"
            >
              <option value="all">All Severities</option>
              <option value="critical">Critical</option>
              <option value="warning">Warning</option>
              <option value="info">Info</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
        
        <button
          onClick={acknowledgeAll}
          className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all duration-300"
        >
          Acknowledge All
        </button>
      </div>

      {/* Alert List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white mb-4">Alert List (Detailed Alerts)</h2>
        
        {filteredAlerts.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <AlertTriangle className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>No alerts match your current filters</p>
          </div>
        ) : (
          filteredAlerts.map((alert) => (
            <AlertItem key={alert.id} alert={alert} onStatusChange={handleStatusChange} />
          ))
        )}
      </div>
    </div>
  );
}