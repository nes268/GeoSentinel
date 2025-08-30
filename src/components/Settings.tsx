import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  User, 
  Shield, 
  Bell, 
  Monitor, 
  Database, 
  Wifi, 
  HardDrive,
  Activity,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Save,
  RefreshCw,
  Lock,
  Eye,
  EyeOff,
  Cog,
  Bell as BellIcon,
  Shield as ShieldIcon,
  Activity as ActivityIcon
} from 'lucide-react';

interface SettingSectionProps {
  title: string;
  children: React.ReactNode;
}

function SettingSection({ title, children }: SettingSectionProps) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
        <SettingsIcon className="w-5 h-5 text-cyan-400" />
        <span>{title}</span>
      </h3>
      {children}
    </div>
  );
}

interface StatusIndicatorProps {
  status: 'online' | 'offline' | 'warning' | 'error';
  label: string;
}

function StatusIndicator({ status, label }: StatusIndicatorProps) {
  const statusConfig = {
    online: { color: 'bg-green-500', icon: CheckCircle, textColor: 'text-green-400' },
    offline: { color: 'bg-red-500', icon: XCircle, textColor: 'text-red-400' },
    warning: { color: 'bg-yellow-500', icon: AlertTriangle, textColor: 'text-yellow-400' },
    error: { color: 'bg-red-500', icon: XCircle, textColor: 'text-red-400' }
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className="flex items-center space-x-3 p-3 bg-gray-700/30 rounded-lg">
      <div className={`w-3 h-3 ${config.color} rounded-full animate-pulse`}></div>
      <Icon className={`w-4 h-4 ${config.textColor}`} />
      <span className="text-gray-300">{label}</span>
    </div>
  );
}

interface TabProps {
  icon: React.ComponentType<any>;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function Tab({ icon: Icon, label, isActive, onClick }: TabProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 ${
        isActive 
          ? 'bg-cyan-600 text-white shadow-lg' 
          : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
    </button>
  );
}

export default function Settings() {
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    critical: true
  });

  const [privacy, setPrivacy] = useState({
    dataSharing: false,
    analytics: true,
    location: true
  });

  const [systemSettings, setSystemSettings] = useState({
    autoBackup: true,
    darkMode: true,
    language: 'en',
    timezone: 'UTC'
  });

  const systemStatus: Record<string, 'online' | 'offline' | 'warning' | 'error'> = {
    sensors: 'online',
    database: 'online',
    network: 'warning',
    storage: 'online'
  };

  const performanceMetrics = {
    cpu: 23,
    memory: 67,
    storage: 45,
    network: 89
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: ActivityIcon },
    { id: 'preferences', label: 'Preferences', icon: User },
    { id: 'notifications', label: 'Notifications', icon: BellIcon },
    { id: 'security', label: 'Security', icon: ShieldIcon },
    { id: 'system', label: 'System', icon: Cog }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* System Status Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-800/50 rounded-lg p-6 border border-cyan-500/20">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">System Health</h3>
                    <p className="text-2xl font-bold text-green-400">87%</p>
                  </div>
                </div>
                <div className="text-sm text-gray-400">
                  All critical systems operational
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-6 border border-cyan-500/20">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <Wifi className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Network Status</h3>
                    <p className="text-2xl font-bold text-blue-400">89%</p>
                  </div>
                </div>
                <div className="text-sm text-gray-400">
                  Minor connectivity issues
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-6 border border-cyan-500/20">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <HardDrive className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Storage</h3>
                    <p className="text-2xl font-bold text-purple-400">45%</p>
                  </div>
                </div>
                <div className="text-sm text-gray-400">
                  2.3TB of 5.1TB used
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-6 border border-cyan-500/20">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Security</h3>
                    <p className="text-2xl font-bold text-yellow-400">98%</p>
                  </div>
                </div>
                <div className="text-sm text-gray-400">
                  All security protocols active
                </div>
              </div>
            </div>

            {/* System Status */}
            <SettingSection title="System Status">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-medium mb-4">Component Status</h4>
                  <div className="space-y-3">
                    <StatusIndicator status={systemStatus.sensors} label="Sensor Network" />
                    <StatusIndicator status={systemStatus.database} label="Database System" />
                    <StatusIndicator status={systemStatus.network} label="Network Infrastructure" />
                    <StatusIndicator status={systemStatus.storage} label="Storage System" />
                  </div>
                </div>
                
                <div>
                  <h4 className="text-white font-medium mb-4">Performance Metrics</h4>
                  <div className="space-y-3">
                    {Object.entries(performanceMetrics).map(([key, value]) => (
                      <div key={key} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400 capitalize">{key}</span>
                          <span className="text-white">{value}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-500 ${
                              value > 80 ? 'bg-red-500' : value > 60 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${value}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SettingSection>
          </div>
        );

      case 'preferences':
        return (
          <SettingSection title="User Preferences">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-cyan-400" />
                  <span className="text-gray-300">Display Name</span>
                </div>
                <input 
                  type="text" 
                  defaultValue="Mining Safety Admin"
                  className="bg-gray-700 text-white px-3 py-1 rounded border border-gray-600 focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Monitor className="w-5 h-5 text-cyan-400" />
                  <span className="text-gray-300">Theme</span>
                </div>
                <select className="bg-gray-700 text-white px-3 py-1 rounded border border-gray-600 focus:border-cyan-500 focus:outline-none">
                  <option value="dark">Dark Mode</option>
                  <option value="light">Light Mode</option>
                  <option value="auto">Auto</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Database className="w-5 h-5 text-cyan-400" />
                  <span className="text-gray-300">Language</span>
                </div>
                <select className="bg-gray-700 text-white px-3 py-1 rounded border border-gray-600 focus:border-cyan-500 focus:outline-none">
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Activity className="w-5 h-5 text-cyan-400" />
                  <span className="text-gray-300">Performance Mode</span>
                </div>
                <select className="bg-gray-700 text-white px-3 py-1 rounded border border-gray-600 focus:border-cyan-500 focus:outline-none">
                  <option value="balanced">Balanced</option>
                  <option value="performance">High Performance</option>
                  <option value="power">Power Saving</option>
                </select>
              </div>
            </div>
          </SettingSection>
        );

      case 'notifications':
        return (
          <SettingSection title="Notification Preferences">
            <div className="space-y-4">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Bell className="w-5 h-5 text-cyan-400" />
                    <span className="text-gray-300 capitalize">{key} Notifications</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={value}
                      onChange={(e) => setNotifications(prev => ({ ...prev, [key]: e.target.checked }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </SettingSection>
        );

      case 'security':
        return (
          <SettingSection title="Privacy & Security">
            <div className="space-y-4">
              {Object.entries(privacy).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Lock className="w-5 h-5 text-cyan-400" />
                    <span className="text-gray-300 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={value}
                      onChange={(e) => setPrivacy(prev => ({ ...prev, [key]: e.target.checked }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                  </label>
                </div>
              ))}
              
              <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Eye className="w-5 h-5 text-cyan-400" />
                  <span className="text-gray-300">Two-Factor Authentication</span>
                </div>
                <button className="px-3 py-1 bg-cyan-600 hover:bg-cyan-500 text-white rounded transition-colors duration-200">
                  Enable
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-cyan-400" />
                  <span className="text-gray-300">Security Level</span>
                </div>
                <select className="bg-gray-700 text-white px-3 py-1 rounded border border-gray-600 focus:border-cyan-500 focus:outline-none">
                  <option value="standard">Standard</option>
                  <option value="enhanced">Enhanced</option>
                  <option value="maximum">Maximum</option>
                </select>
              </div>
            </div>
          </SettingSection>
        );

      case 'system':
        return (
          <SettingSection title="System Configuration">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <HardDrive className="w-5 h-5 text-cyan-400" />
                  <span className="text-gray-300">Auto Backup</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={systemSettings.autoBackup}
                    onChange={(e) => setSystemSettings(prev => ({ ...prev, autoBackup: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Database className="w-5 h-5 text-cyan-400" />
                  <span className="text-gray-300">Timezone</span>
                </div>
                <select className="bg-gray-700 text-white px-3 py-1 rounded border border-gray-600 focus:border-cyan-500 focus:outline-none">
                  <option value="UTC">UTC</option>
                  <option value="EST">Eastern Time</option>
                  <option value="PST">Pacific Time</option>
                  <option value="GMT">GMT</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Activity className="w-5 h-5 text-cyan-400" />
                  <span className="text-gray-300">System Updates</span>
                </div>
                <button className="px-3 py-1 bg-cyan-600 hover:bg-cyan-500 text-white rounded transition-colors duration-200">
                  Check for Updates
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <HardDrive className="w-5 h-5 text-cyan-400" />
                  <span className="text-gray-300">Storage Cleanup</span>
                </div>
                <button className="px-3 py-1 bg-cyan-600 hover:bg-cyan-500 text-white rounded transition-colors duration-200">
                  Clean Up
                </button>
              </div>
            </div>
          </SettingSection>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">System Settings</h1>
          <p className="text-gray-400">Configure your mining safety dashboard preferences</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200 flex items-center space-x-2">
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
          <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors duration-200 flex items-center space-x-2">
            <Save className="w-4 h-4" />
            <span>Save All</span>
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              icon={tab.icon}
              label={tab.label}
              isActive={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            />
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-[600px]">
        {renderTabContent()}
      </div>
    </div>
  );
}