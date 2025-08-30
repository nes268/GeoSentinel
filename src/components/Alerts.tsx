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

interface ActionPlan {
  id: string;
  title: string;
  steps: string[];
}

function AlertItem({ alert, onStatusChange }: { alert: Alert; onStatusChange: (id: string, status: string) => void }) {
  const [showActionPlan, setShowActionPlan] = useState(false);
  
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

  const actionPlans: Record<string, ActionPlan> = {
    '1': {
      id: '1',
      title: 'High Vibration Emergency Response',
      steps: [
        '1. Immediately evacuate all personnel from Zone A, Sector 3',
        '2. Contact emergency response team',
        '3. Shut down all equipment in affected area',
        '4. Conduct structural integrity assessment',
        '5. Monitor vibration levels continuously'
      ]
    },
    '2': {
      id: '2',
      title: 'Rainfall Management Protocol',
      steps: [
        '1. Activate drainage systems',
        '2. Monitor water levels in critical areas',
        '3. Prepare sandbags if necessary',
        '4. Alert maintenance team for potential flooding',
        '5. Update weather monitoring frequency'
      ]
    },
    '3': {
      id: '3',
      title: 'Gas Leak Response Protocol',
      steps: [
        '1. Evacuate affected area immediately',
        '2. Shut off gas supply to Zone C',
        '3. Ventilate the area',
        '4. Contact hazmat team',
        '5. Test air quality before re-entry'
      ]
    },
    '4': {
      id: '4',
      title: 'Equipment Overheating Response',
      steps: [
        '1. Reduce equipment load immediately',
        '2. Check cooling system functionality',
        '3. Monitor temperature trends',
        '4. Schedule maintenance inspection',
        '5. Consider temporary shutdown if temperature continues rising'
      ]
    },
    '5': {
      id: '5',
      title: 'Maintenance Schedule Protocol',
      steps: [
        '1. Confirm maintenance team availability',
        '2. Prepare necessary tools and equipment',
        '3. Review safety protocols',
        '4. Schedule equipment downtime',
        '5. Update maintenance log'
      ]
    }
  };

  const handleAcknowledge = () => {
    onStatusChange(alert.id, 'acknowledged');
  };

  const handleDismiss = () => {
    if (confirm(`Are you sure you want to dismiss this ${alert.severity} alert? This action cannot be undone.`)) {
      onStatusChange(alert.id, 'resolved');
    }
  };

  const handleActionPlan = () => {
    setShowActionPlan(!showActionPlan);
  };

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
            {alert.status === 'acknowledged' && (
              <>
                <span className="text-gray-500">•</span>
                <span className="text-green-400 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Acknowledged
                </span>
              </>
            )}
            {alert.status === 'resolved' && (
              <>
                <span className="text-gray-500">•</span>
                <span className="text-blue-400 flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-1" />
                  Resolved
                </span>
              </>
            )}
          </div>
          
          <div className="mb-3">
            <p className="text-white text-lg mb-2">{alert.description}</p>
            <p className="text-gray-400 text-sm">{alert.sensorData}</p>
          </div>

          {showActionPlan && actionPlans[alert.id] && (
            <div className="mt-4 p-4 bg-gray-700/50 rounded-lg border border-gray-600">
              <h4 className="text-cyan-400 font-semibold mb-3">{actionPlans[alert.id].title}</h4>
              <ul className="space-y-2">
                {actionPlans[alert.id].steps.map((step, index) => (
                  <li key={index} className="text-gray-300 text-sm flex items-start">
                    <span className="text-cyan-400 mr-2">▸</span>
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {alert.status === 'active' && (
            <button
              onClick={handleAcknowledge}
              className="flex items-center space-x-2 px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg text-sm font-medium transition-all duration-300"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Acknowledge</span>
            </button>
          )}
          
          <button 
            onClick={handleActionPlan}
            className={`flex items-center space-x-2 px-4 py-2 ${showActionPlan ? 'bg-cyan-500/30 text-cyan-300' : 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-400'} rounded-lg text-sm font-medium transition-all duration-300`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>{showActionPlan ? 'Hide Action Plan' : 'Action Plan'}</span>
          </button>
          
          {alert.status !== 'resolved' && (
            <button 
              onClick={handleDismiss}
              className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-sm font-medium transition-all duration-300"
            >
              <XCircle className="w-4 h-4" />
              <span>Dismiss</span>
            </button>
          )}
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
    const activeAlerts = alerts.filter(alert => alert.status === 'active');
    
    if (activeAlerts.length === 0) {
      alert('No active alerts to acknowledge.');
      return;
    }

    if (confirm(`Are you sure you want to acknowledge all ${activeAlerts.length} active alerts?`)) {
      setAlerts(alerts.map(alert => 
        alert.status === 'active' ? { ...alert, status: 'acknowledged' as Alert['status'] } : alert
      ));
    }
  };

  const alertCounts = {
    active: alerts.filter(a => a.status === 'active').length,
    acknowledged: alerts.filter(a => a.status === 'acknowledged').length,
    resolvedToday: alerts.filter(a => a.status === 'resolved').length + 5 // Including previously resolved
  };

  const filteredAlerts = alerts.filter(alert => {
    if (selectedSeverity === 'all') return true;
    return alert.severity === selectedSeverity;
  });

  const handleSeverityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSeverity(e.target.value);
  };

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
              onChange={handleSeverityChange}
              className="bg-gray-700 border border-gray-600 text-white px-4 py-2 pr-10 rounded-lg focus:border-cyan-500 transition-colors duration-300 appearance-none cursor-pointer"
            >
              <option value="all">All Severities ({alerts.length})</option>
              <option value="critical">Critical ({alerts.filter(a => a.severity === 'critical').length})</option>
              <option value="warning">Warning ({alerts.filter(a => a.severity === 'warning').length})</option>
              <option value="info">Info ({alerts.filter(a => a.severity === 'info').length})</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
          <div className="text-sm text-gray-400">
            Showing {filteredAlerts.length} of {alerts.length} alerts
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-400">
            Active: <span className="text-red-400 font-medium">{alertCounts.active}</span> | 
            Acknowledged: <span className="text-green-400 font-medium">{alertCounts.acknowledged}</span> | 
            Resolved Today: <span className="text-blue-400 font-medium">{alertCounts.resolvedToday}</span>
          </div>
          <button
            onClick={acknowledgeAll}
            disabled={alertCounts.active === 0}
            className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
              alertCounts.active === 0 
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                : 'bg-red-500 hover:bg-red-600 text-white'
            }`}
          >
            Acknowledge All ({alertCounts.active})
          </button>
        </div>
      </div>

      {/* Alert List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white mb-4">Alert List (Detailed Alerts)</h2>
        
        {filteredAlerts.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <AlertTriangle className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>No alerts match your current filters</p>
            {selectedSeverity !== 'all' && (
              <button 
                onClick={() => setSelectedSeverity('all')}
                className="mt-4 px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-lg text-sm transition-all duration-300"
              >
                Show All Alerts
              </button>
            )}
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