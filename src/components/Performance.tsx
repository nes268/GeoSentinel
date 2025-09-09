import { useState } from 'react';
import { 
  Trophy, 
  Award, 
  Target, 
  TrendingUp, 
  Shield, 
  CheckCircle, 
  Star,
  Users,
  Zap,
  Calendar,
  BarChart3,
  Plus,
  Loader2,
  ArrowUp,
  ArrowDown,
  Wallet,
  AlertTriangle,
  X
} from 'lucide-react';
import { usePerformance } from '../hooks/usePerformance';

interface RewardRequest {
  id: string;
  workerName: string;
  workerAvatar: string;
  reward: string;
  points: number;
  status: 'pending' | 'approved' | 'rejected';
  requestedAt: Date;
}

export default function Performance() {
  const {
    stats,
    selectedWorker,
    activeTab,
    setActiveTab,
    selectWorker,
    isLoading,
    error
  } = usePerformance();

  const [leaderboardTab, setLeaderboardTab] = useState('individual');
  const [showCreateChallengeModal, setShowCreateChallengeModal] = useState(false);
  const [rewardRequests, setRewardRequests] = useState<RewardRequest[]>([
    {
      id: '1',
      workerName: 'Rajesh',
      workerAvatar: '👨‍💼',
      reward: '₹500 Paytm',
      points: 500,
      status: 'pending',
      requestedAt: new Date('2024-01-15')
    },
    {
      id: '2',
      workerName: 'Anil',
      workerAvatar: '👨‍🔬',
      reward: 'PPE Kit',
      points: 300,
      status: 'pending',
      requestedAt: new Date('2024-01-14')
    },
    {
      id: '3',
      workerName: 'Sneha',
      workerAvatar: '👩‍💼',
      reward: 'Grocery Card',
      points: 400,
      status: 'pending',
      requestedAt: new Date('2024-01-13')
    },
    {
      id: '4',
      workerName: 'Meera',
      workerAvatar: '👩‍🔬',
      reward: 'Bonus ₹1000',
      points: 1000,
      status: 'pending',
      requestedAt: new Date('2024-01-12')
    },
    {
      id: '5',
      workerName: 'Worker X',
      workerAvatar: '👨‍🏭',
      reward: 'Helmet Kit',
      points: 200,
      status: 'pending',
      requestedAt: new Date('2024-01-11')
    },
    {
      id: '6',
      workerName: 'Worker Y',
      workerAvatar: '👩‍🏭',
      reward: '₹300 Amazon Gift Card',
      points: 300,
      status: 'pending',
      requestedAt: new Date('2024-01-10')
    },
    {
      id: '7',
      workerName: 'Worker Z',
      workerAvatar: '👨‍💼',
      reward: 'Safety Boots',
      points: 250,
      status: 'pending',
      requestedAt: new Date('2024-01-09')
    },
    {
      id: '8',
      workerName: 'Worker A',
      workerAvatar: '👩‍💼',
      reward: '₹200 Mobile Recharge',
      points: 200,
      status: 'pending',
      requestedAt: new Date('2024-01-08')
    },
    {
      id: '9',
      workerName: 'Worker B',
      workerAvatar: '👨‍🔬',
      reward: 'First Aid Kit',
      points: 150,
      status: 'pending',
      requestedAt: new Date('2024-01-07')
    }
  ]);

  // Available rewards state
  const [availableRewards, setAvailableRewards] = useState([
    { id: '1', name: 'Paytm ₹500', points: 500, category: 'Digital' },
    { id: '2', name: 'Grocery Card', points: 400, category: 'Gift Card' },
    { id: '3', name: 'PPE Kit', points: 300, category: 'Safety' },
    { id: '4', name: 'Bonus ₹1000', points: 1000, category: 'Cash' },
    { id: '5', name: 'Helmet Kit', points: 200, category: 'Safety' },
    { id: '6', name: 'Safety Boots', points: 250, category: 'Safety' },
    { id: '7', name: 'First Aid Kit', points: 150, category: 'Safety' },
    { id: '8', name: 'Amazon Gift Card', points: 300, category: 'Gift Card' }
  ]);

  // New reward form state
  const [showAddRewardModal, setShowAddRewardModal] = useState(false);
  const [newReward, setNewReward] = useState({
    name: '',
    points: '',
    category: 'Other'
  });

  // Leaderboard search state
  const [individualSearchTerm, setIndividualSearchTerm] = useState('');
  const [teamSearchTerm, setTeamSearchTerm] = useState('');

  // Individual leaderboard data
  const individualLeaderboard = [
    {
      id: 1,
      name: 'Rajesh K.',
      department: 'Mining Ops',
      zone: 'Zone A',
      points: 3820,
      status: 'Flagged',
      streak: '30d',
      badges: '🛡️⚡⭐',
      penalties: '-50 pts',
      lastAction: 'Evacuated Zone 4',
      avatar: '👨‍💼',
      rank: 1
    },
    {
      id: 2,
      name: 'Anil P.',
      department: 'Safety Team',
      zone: 'Zone B',
      points: 3540,
      status: 'Normal',
      streak: '20d',
      badges: '🛡️⭐',
      penalties: 'No penalties',
      lastAction: 'Quiz Completed +30 pts',
      avatar: '👨‍🔬',
      rank: 2
    },
    {
      id: 3,
      name: 'Sneha R.',
      department: 'Zone B',
      zone: 'Zone B',
      points: 3420,
      status: 'Repeated Offender',
      streak: '15d',
      badges: '🛡️',
      penalties: '-100 pts',
      lastAction: 'Safety Check',
      avatar: '👩‍💼',
      rank: 3
    },
    {
      id: 4,
      name: 'Meera S.',
      department: 'Engineering',
      zone: 'Zone C',
      points: 3280,
      status: 'Normal',
      streak: '25d',
      badges: '🛡️⚡',
      penalties: 'No penalties',
      lastAction: 'Equipment Check',
      avatar: '👩‍🔬',
      rank: 4
    },
    {
      id: 5,
      name: 'Vikram M.',
      department: 'Maintenance',
      zone: 'Zone A',
      points: 3100,
      status: 'Normal',
      streak: '18d',
      badges: '⭐',
      penalties: 'No penalties',
      lastAction: 'Tool Inspection',
      avatar: '👨‍🏭',
      rank: 5
    },
    {
      id: 6,
      name: 'Priya L.',
      department: 'Quality Control',
      zone: 'Zone C',
      points: 2950,
      status: 'Normal',
      streak: '12d',
      badges: '🛡️',
      penalties: 'No penalties',
      lastAction: 'Quality Audit',
      avatar: '👩‍🏭',
      rank: 6
    }
  ];

  // Team leaderboard data
  const teamLeaderboard = [
    {
      id: 1,
      name: 'Crew A',
      type: 'Safe Crew',
      zone: 'Zone A',
      points: 3250,
      streak: '25d avg streak',
      badges: '🛡️⚡⭐',
      penalties: 'No penalties',
      lastAction: 'Safety Drill Complete',
      avatar: '👥',
      rank: 1
    },
    {
      id: 2,
      name: 'Crew B',
      type: 'Mining Crew',
      zone: 'Zone C',
      points: 3100,
      streak: '20d avg streak',
      badges: '🛡️⚡',
      penalties: 'No penalties',
      lastAction: 'Equipment Maintenance',
      avatar: '👥',
      rank: 2
    },
    {
      id: 3,
      name: 'Crew C',
      type: 'Safety Team',
      zone: 'Zone B',
      points: 2950,
      streak: '18d avg streak',
      badges: '🛡️⭐',
      penalties: 'No penalties',
      lastAction: 'Safety Training',
      avatar: '👥',
      rank: 3
    },
    {
      id: 4,
      name: 'Crew D',
      type: 'Tech Crew',
      zone: 'Engineering',
      points: 2800,
      streak: '15d avg streak',
      badges: '⚡⭐',
      penalties: 'No penalties',
      lastAction: 'System Update',
      avatar: '👥',
      rank: 4
    },
    {
      id: 5,
      name: 'Crew E',
      type: 'Maintenance Crew',
      zone: 'Zone A',
      points: 2650,
      streak: '12d avg streak',
      badges: '🛡️',
      penalties: 'No penalties',
      lastAction: 'Preventive Maintenance',
      avatar: '👥',
      rank: 5
    },
    {
      id: 6,
      name: 'Crew F',
      type: 'Support Crew',
      zone: 'Zone C',
      points: 2500,
      streak: '10d avg streak',
      badges: '⭐',
      penalties: 'No penalties',
      lastAction: 'Logistics Support',
      avatar: '👥',
      rank: 6
    }
  ];
  
  // Confirmation dialog state
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingAction, setPendingAction] = useState<{
    type: 'approve' | 'reject';
    requestId: string;
    workerName: string;
    reward: string;
  } | null>(null);

  // Handler functions for reward requests
  const handleApproveReward = (requestId: string) => {
    const request = rewardRequests.find(r => r.id === requestId);
    if (request) {
      setPendingAction({
        type: 'approve',
        requestId,
        workerName: request.workerName,
        reward: request.reward
      });
      setShowConfirmDialog(true);
    }
  };

  const handleRejectReward = (requestId: string) => {
    const request = rewardRequests.find(r => r.id === requestId);
    if (request) {
      setPendingAction({
        type: 'reject',
        requestId,
        workerName: request.workerName,
        reward: request.reward
      });
      setShowConfirmDialog(true);
    }
  };

  // Handler functions for available rewards
  const handleAddReward = () => {
    if (newReward.name.trim() && newReward.points && parseInt(newReward.points) > 0) {
      const reward = {
        id: Date.now().toString(),
        name: newReward.name.trim(),
        points: parseInt(newReward.points),
        category: newReward.category
      };
      setAvailableRewards(prev => [...prev, reward]);
      setNewReward({ name: '', points: '', category: 'Other' });
      setShowAddRewardModal(false);
    }
  };

  const handleRemoveReward = (rewardId: string) => {
    setAvailableRewards(prev => prev.filter(reward => reward.id !== rewardId));
  };

  const handleNewRewardChange = (field: string, value: string) => {
    setNewReward(prev => ({ ...prev, [field]: value }));
  };

  // Search/filter functions for leaderboard
  const filterIndividualLeaderboard = (searchTerm: string) => {
    if (!searchTerm.trim()) return individualLeaderboard;
    
    const term = searchTerm.toLowerCase();
    return individualLeaderboard.filter(entry => 
      entry.name.toLowerCase().includes(term) ||
      entry.department.toLowerCase().includes(term) ||
      entry.zone.toLowerCase().includes(term) ||
      entry.status.toLowerCase().includes(term)
    );
  };

  const filterTeamLeaderboard = (searchTerm: string) => {
    if (!searchTerm.trim()) return teamLeaderboard;
    
    const term = searchTerm.toLowerCase();
    return teamLeaderboard.filter(entry => 
      entry.name.toLowerCase().includes(term) ||
      entry.type.toLowerCase().includes(term) ||
      entry.zone.toLowerCase().includes(term)
    );
  };

  // Get filtered results
  const filteredIndividualLeaderboard = filterIndividualLeaderboard(individualSearchTerm);
  const filteredTeamLeaderboard = filterTeamLeaderboard(teamSearchTerm);

  const confirmAction = () => {
    if (pendingAction) {
      setRewardRequests(prev => 
        prev.map(request => 
          request.id === pendingAction.requestId 
            ? { ...request, status: pendingAction.type === 'approve' ? 'approved' as const : 'rejected' as const }
            : request
        )
      );
    }
    setShowConfirmDialog(false);
    setPendingAction(null);
  };

  const cancelAction = () => {
    setShowConfirmDialog(false);
    setPendingAction(null);
  };

  const [challenges, setChallenges] = useState([
    {
      id: 1,
      title: 'Daily Safety Check',
      description: 'Complete all assigned safety inspections',
      icon: 'Shield',
      color: 'blue',
      progress: 182,
      total: 200,
      deadline: 'Ongoing',
      status: 'active'
    },
    {
      id: 2,
      title: 'Emergency Response Training',
      description: 'Complete quarterly emergency response certification',
      icon: 'AlertTriangle',
      color: 'red',
      progress: 200,
      total: 200,
      deadline: 'Done',
      status: 'completed'
    },
    {
      id: 3,
      title: 'Weekly Protocol Review',
      description: 'Review and update 3 safety protocols',
      icon: 'BarChart3',
      color: 'purple',
      progress: 145,
      total: 200,
      deadline: '3d left',
      status: 'active'
    },
    {
      id: 4,
      title: 'Safety Gear Compliance',
      description: 'Ensure all safety equipment is properly maintained',
      icon: 'Shield',
      color: 'cyan',
      progress: 98,
      total: 200,
      deadline: '5d left',
      status: 'active'
    },
    {
      id: 5,
      title: 'Micro Quiz #5',
      description: 'Complete safety knowledge assessment',
      icon: 'Target',
      color: 'yellow',
      progress: 120,
      total: 200,
      deadline: '2d left',
      status: 'active'
    },
    {
      id: 6,
      title: 'AR Drill: Rockfall',
      description: 'Augmented reality safety drill simulation',
      icon: 'AlertTriangle',
      color: 'red',
      progress: 32,
      total: 200,
      deadline: '3d left',
      status: 'active'
    },
    {
      id: 7,
      title: 'Fire Evacuation Drill',
      description: 'Practice emergency evacuation procedures',
      icon: 'Zap',
      color: 'orange',
      progress: 134,
      total: 200,
      deadline: '1d left',
      status: 'active'
    }
  ]);
  const [newChallenge, setNewChallenge] = useState({
    title: '',
    description: '',
    icon: 'Target',
    color: 'cyan',
    total: 100,
    deadline: ''
  });


  const getTrendIcon = (trend: number) => {
    if (trend > 0) return <ArrowUp className="w-4 h-4 text-green-400" />;
    if (trend < 0) return <ArrowDown className="w-4 h-4 text-red-400" />;
    return <div className="w-4 h-4" />;
  };


  const formatTrend = (trend: number) => {
    const sign = trend > 0 ? '+' : '';
    return `${sign}${trend}%`;
  };

  const handleCreateChallenge = () => {
    if (newChallenge.title.trim() && newChallenge.description.trim()) {
      const challenge = {
        id: challenges.length + 1,
        title: newChallenge.title,
        description: newChallenge.description,
        icon: newChallenge.icon,
        color: newChallenge.color,
        progress: 0,
        total: newChallenge.total,
        deadline: newChallenge.deadline || 'No deadline',
        status: 'active'
      };
      setChallenges([...challenges, challenge]);
      setNewChallenge({
        title: '',
        description: '',
        icon: 'Target',
        color: 'cyan',
        total: 100,
        deadline: ''
      });
      setShowCreateChallengeModal(false);
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setNewChallenge(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
      Shield,
      AlertTriangle,
      BarChart3,
      Target,
      Trophy,
      Award,
      CheckCircle,
      Star,
      Users,
      Zap,
      Calendar
    };
    return iconMap[iconName] || Target;
  };

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: string } = {
      blue: 'bg-blue-500/20 text-blue-400',
      red: 'bg-red-500/20 text-red-400',
      purple: 'bg-purple-500/20 text-purple-400',
      cyan: 'bg-cyan-500/20 text-cyan-400',
      green: 'bg-green-500/20 text-green-400',
      yellow: 'bg-yellow-500/20 text-yellow-400',
      orange: 'bg-orange-500/20 text-orange-400'
    };
    return colorMap[color] || 'bg-cyan-500/20 text-cyan-400';
  };

  // Simple pie chart component for wallet budget
  const PieChartComponent = ({ total, redeemed, remaining }: { total: number; redeemed: number; remaining: number }) => {
    const redeemedPercentage = (redeemed / total) * 100;
    const remainingPercentage = (remaining / total) * 100;
    
    return (
      <div className="relative w-24 h-24 mx-auto">
        <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-gray-700"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="#06b6d4"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={`${redeemedPercentage * 2.51} 251`}
            strokeDashoffset="0"
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="#10b981"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={`${remainingPercentage * 2.51} 251`}
            strokeDashoffset={`-${redeemedPercentage * 2.51}`}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-white">{redeemedPercentage.toFixed(0)}%</span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Gamification</h1>
        <p className="text-gray-400">Engage workers through challenges, rewards, and friendly competition</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-800/50 rounded-lg p-1">
        {['overview', 'challenges', 'leaderboard', 'analytics', 'rewards'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
              activeTab === tab
                ? 'bg-cyan-500 text-white shadow-lg'
                : 'text-gray-400 hover:text-cyan-300 hover:bg-cyan-500/10'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
              <span className="ml-2 text-gray-400">Loading performance data...</span>
            </div>
          ) : error ? (
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 text-red-400">
              Error: {error}
            </div>
          ) : stats ? (
            <div className="space-y-8">
              {/* Main Stats Grid - Standard Size Cards with Trend Indicators */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Total Points Card */}
              <div className="bg-gray-800/50 rounded-lg p-6 border border-cyan-500/20">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Total Points</h3>
                    <p className="text-2xl font-bold text-cyan-400">{stats.totalPoints.toLocaleString()}</p>
                  </div>
                </div>
                  <div className="flex items-center justify-between">
                <div className="text-sm text-gray-400">
                      ↑ {formatTrend(stats.pointsTrend)} from last week
                    </div>
                    <div className="flex items-center space-x-1">
                      {getTrendIcon(stats.pointsTrend)}
                    </div>
                </div>
              </div>

                {/* Active Workers Card */}
              <div className="bg-gray-800/50 rounded-lg p-6 border border-cyan-500/20">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Active Workers</h3>
                      <p className="text-2xl font-bold text-cyan-400">{stats.activeWorkers}/{stats.totalWorkers}</p>
                  </div>
                </div>
                  <div className="flex items-center justify-between">
                <div className="text-sm text-gray-400">
                      ↑ {formatTrend(stats.activeWorkersTrend)} from last week
                    </div>
                    <div className="flex items-center space-x-1">
                      {getTrendIcon(stats.activeWorkersTrend)}
                    </div>
                </div>
              </div>

                {/* Engagement Card */}
              <div className="bg-gray-800/50 rounded-lg p-6 border border-cyan-500/20">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Engagement</h3>
                      <p className="text-2xl font-bold text-cyan-400">{stats.engagementRate}%</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-400">
                      +3% overall participation
                    </div>
                    <div className="flex items-center space-x-1">
                      <ArrowUp className="w-4 h-4 text-green-400" />
                    </div>
                  </div>
                </div>

                {/* Safety Score Card */}
                <div className="bg-gray-800/50 rounded-lg p-6 border border-cyan-500/20">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Safety Score</h3>
                    <p className="text-2xl font-bold text-cyan-400">{stats.averageSafetyScore.toFixed(1)}%</p>
                  </div>
                </div>
                  <div className="flex items-center justify-between">
                <div className="text-sm text-gray-400">
                      {formatTrend(stats.safetyScoreTrend)} from last week
                    </div>
                    <div className="flex items-center space-x-1">
                      {getTrendIcon(stats.safetyScoreTrend)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Detailed Metrics Section - All Three Components in One Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Streak Breakdown */}
                <div className="bg-gray-800/50 rounded-xl p-4 border border-cyan-500/20 flex flex-col h-full">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Streak Report</h3>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                      <span className="text-gray-300 text-sm">7+ day streaks</span>
                      <span className="text-xl font-bold text-cyan-400">{stats.streakBreakdown.sevenDays}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                      <span className="text-gray-300 text-sm">30+ day streaks</span>
                      <span className="text-xl font-bold text-cyan-400">{stats.streakBreakdown.thirtyDays}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                      <span className="text-gray-300 text-sm">60+ day streaks</span>
                      <span className="text-xl font-bold text-cyan-400">{stats.streakBreakdown.sixtyDays}</span>
                    </div>
                  </div>
                </div>

                {/* Wallet Budget */}
                <div className="bg-gray-800/50 rounded-xl p-4 border border-cyan-500/20 flex flex-col h-full">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                      <Wallet className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Reward Budget</h3>
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="text-center mb-4">
                      <div className="text-2xl font-bold text-white mb-1">₹{stats.walletBudget.total.toLocaleString()}</div>
                      <div className="text-xs text-gray-400">Total Budget</div>
                    </div>
                    <div className="flex justify-center mb-4">
                      <PieChartComponent 
                        total={stats.walletBudget.total}
                        redeemed={stats.walletBudget.redeemed}
                        remaining={stats.walletBudget.remaining}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400">Redeemed: ₹{stats.walletBudget.redeemed.toLocaleString()}</span>
                        <span className="text-cyan-400">{((stats.walletBudget.redeemed / stats.walletBudget.total) * 100).toFixed(0)}%</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400">Remaining: ₹{stats.walletBudget.remaining.toLocaleString()}</span>
                        <span className="text-green-400">{((stats.walletBudget.remaining / stats.walletBudget.total) * 100).toFixed(0)}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Top Badges Earned Section */}
                <div className="bg-gray-800/50 rounded-xl p-4 border border-cyan-500/20 flex flex-col h-full">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-lg flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Top Badges Earned</h3>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">🛡️</div>
                        <span className="text-gray-300 text-sm">Safe Hero</span>
                      </div>
                      <span className="text-xl font-bold text-cyan-400">48</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">⚡</div>
                        <span className="text-gray-300 text-sm">Fast Responder</span>
                      </div>
                      <span className="text-xl font-bold text-cyan-400">33</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">⭐</div>
                        <span className="text-gray-300 text-sm">Unstoppable</span>
                      </div>
                      <span className="text-xl font-bold text-cyan-400">20</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      )}

      {/* Challenges Tab */}
      {activeTab === 'challenges' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Challenges Management</h2>
            <button 
              onClick={() => setShowCreateChallengeModal(true)}
              className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors duration-300 flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Create Challenge</span>
            </button>
          </div>
          
          <div className="space-y-6">
            {/* Challenges Table */}
            <div className="bg-gray-800/50 rounded-lg border border-cyan-500/20 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-700/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Challenge</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Progress</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Deadline</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700/50">
                    {challenges.map((challenge) => {
                      const IconComponent = getIconComponent(challenge.icon);
                      const progressPercentage = (challenge.progress / challenge.total) * 100;
                      const isCompleted = challenge.status === 'completed';
                      
                      return (
                        <tr key={challenge.id} className="hover:bg-gray-700/30 transition-colors duration-200">
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-3">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getColorClasses(challenge.color)}`}>
                                <IconComponent className="w-5 h-5" />
                              </div>
                              <div>
                                <div className="text-white font-medium">{challenge.title}</div>
                                <div className="text-sm text-gray-400">{challenge.description}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-32 bg-gray-700 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full transition-all duration-300 ${
                                    isCompleted ? 'bg-green-500' : 
                                    progressPercentage > 80 ? 'bg-green-500' :
                                    progressPercentage > 50 ? 'bg-yellow-500' : 'bg-red-500'
                                  }`}
                                  style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                                />
                              </div>
                              <span className="text-sm text-gray-300">{challenge.progress}/{challenge.total}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${
                              isCompleted ? 'bg-green-500/20 text-green-400' :
                              challenge.deadline === 'Ongoing' ? 'bg-green-500/20 text-green-400' :
                              'bg-yellow-500/20 text-yellow-400'
                            }`}>
                              {isCompleted && <CheckCircle className="w-4 h-4" />}
                              <span>{challenge.deadline}</span>
                            </span>
                          </td>
                        </tr>
                      );
                    })}





                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard Tab */}
      {activeTab === 'leaderboard' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Safety Leaderboard</h2>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-300">
                This Week
              </button>
              <button className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors duration-300">
                This Month
              </button>
            </div>
          </div>
          
          {/* Individual vs Team Tabs */}
          <div className="flex space-x-1 bg-gray-800/50 rounded-lg p-1">
            <button 
              onClick={() => setLeaderboardTab('individual')}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                leaderboardTab === 'individual'
                  ? 'bg-cyan-500 text-white shadow-lg'
                  : 'text-gray-400 hover:text-cyan-300 hover:bg-cyan-500/10'
              }`}
            >
              Individual
            </button>
            <button 
              onClick={() => setLeaderboardTab('team')}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                leaderboardTab === 'team'
                  ? 'bg-cyan-500 text-white shadow-lg'
                  : 'text-gray-400 hover:text-cyan-300 hover:bg-cyan-500/10'
              }`}
            >
              Team
            </button>
          </div>

          {/* Individual Leaderboard */}
          {leaderboardTab === 'individual' && (
            <div className="space-y-4">
              {/* Search/Filter Bar */}
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search / Filter: Dept/Zone"
                    value={individualSearchTerm}
                    onChange={(e) => setIndividualSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Individual Leaderboard List */}
              <div className="bg-gray-800/50 rounded-lg border border-cyan-500/20 overflow-hidden max-h-96 overflow-y-auto">
              {filteredIndividualLeaderboard.length === 0 ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="text-gray-400 text-lg mb-2">No results found</div>
                    <div className="text-gray-500 text-sm">Try adjusting your search terms</div>
                  </div>
                </div>
              ) : (
                filteredIndividualLeaderboard.map((entry) => {
                  const getRankIcon = (rank: number) => {
                    if (rank === 1) return <Trophy className="w-8 h-8 text-yellow-400" />;
                    if (rank === 2) return <Award className="w-8 h-8 text-gray-400" />;
                    if (rank === 3) return <Star className="w-8 h-8 text-amber-600" />;
                    return <span className="text-2xl font-bold text-gray-500">{rank}</span>;
                  };

                  const getStatusBadge = (status: string) => {
                    if (status === 'Flagged') {
                      return <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-full">Flagged</span>;
                    }
                    if (status === 'Repeated Offender') {
                      return <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-full">(Repeated Offender)</span>;
                    }
                    return null;
                  };

                  return (
                    <div key={entry.id} className="flex items-center p-6 border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors duration-300">
                      <div className="w-12 h-12 flex items-center justify-center mr-4">
                        {getRankIcon(entry.rank)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{entry.avatar}</span>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="text-lg font-semibold text-white">{entry.name}</h3>
                              {getStatusBadge(entry.status)}
                            </div>
                            <p className="text-sm text-gray-400">{entry.department}</p>
                            <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                              <span>🔥 {entry.streak}</span>
                              <span>Badges: {entry.badges}</span>
                              <span className={entry.penalties.includes('No penalties') ? 'text-green-400' : 'text-red-400'}>
                                {entry.penalties}
                              </span>
                              <span>Last Action: {entry.lastAction}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-cyan-400">{entry.points.toLocaleString()} pts</div>
                      </div>
                    </div>
                  );
                })
              )}
              </div>
            </div>
          )}

          {/* Team Leaderboard */}
          {leaderboardTab === 'team' && (
            <div className="space-y-4">
              {/* Search/Filter Bar */}
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search / Filter: Crew/Zone"
                    value={teamSearchTerm}
                    onChange={(e) => setTeamSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Team Leaderboard List */}
              <div className="bg-gray-800/50 rounded-lg border border-cyan-500/20 overflow-hidden max-h-96 overflow-y-auto">
                {filteredTeamLeaderboard.length === 0 ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                      <div className="text-gray-400 text-lg mb-2">No results found</div>
                      <div className="text-gray-500 text-sm">Try adjusting your search terms</div>
                    </div>
                  </div>
                ) : (
                  filteredTeamLeaderboard.map((entry) => {
                    const getRankIcon = (rank: number) => {
                      if (rank === 1) return <Trophy className="w-8 h-8 text-yellow-400" />;
                      if (rank === 2) return <Award className="w-8 h-8 text-gray-400" />;
                      if (rank === 3) return <Star className="w-8 h-8 text-amber-600" />;
                      return <span className="text-2xl font-bold text-gray-500">{rank}</span>;
                    };

                    return (
                      <div key={entry.id} className="flex items-center p-6 border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors duration-300">
                        <div className="w-12 h-12 flex items-center justify-center mr-4">
                          {getRankIcon(entry.rank)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{entry.avatar}</span>
                            <div>
                              <h3 className="text-lg font-semibold text-white">{entry.name}</h3>
                              <p className="text-sm text-gray-400">{entry.type}</p>
                              <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                                <span>🔥 {entry.streak}</span>
                                <span>Badges: {entry.badges}</span>
                                <span className={entry.penalties.includes('No penalties') ? 'text-green-400' : 'text-yellow-400'}>
                                  {entry.penalties}
                                </span>
                                <span>Last Action: {entry.lastAction}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-cyan-400">{entry.points.toLocaleString()} pts</div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>
      )}


      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Analytics & Insights</h2>
          
          {/* Safety Score Trend (8 weeks) - Line Chart */}
          <div className="bg-gray-800/50 rounded-lg p-6 border border-cyan-500/20">
            <h3 className="text-lg font-semibold text-white mb-4">Safety Score Trend</h3>
            <div className="h-64 relative">
              {/* Chart Container */}
              <div className="w-full h-full relative">
                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-400 pr-2">
                  <span>100%</span>
                  <span>90%</span>
                  <span>80%</span>
                  <span>70%</span>
                  <span>60%</span>
                  <span>50%</span>
                </div>
                
                {/* Chart Area */}
                <div className="ml-8 mr-4 h-full relative">
                  {/* Grid lines */}
                  <div className="absolute inset-0">
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="absolute w-full border-t border-gray-600/30"
                        style={{ top: `${i * 20}%` }}
                      />
                    ))}
                  </div>
                  
                  {/* Data points and line */}
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {/* Safety score data points (8 weeks) */}
                    <polyline
                      fill="none"
                      stroke="#06b6d4"
                      strokeWidth="0.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points="5,35 20,30 35,25 50,20 65,15 80,18 95,12 100,10"
                    />
                    
                    {/* Data point circles */}
                    {[
                      { x: 5, y: 35, score: 85 },
                      { x: 20, y: 30, score: 90 },
                      { x: 35, y: 25, score: 95 },
                      { x: 50, y: 20, score: 100 },
                      { x: 65, y: 15, score: 95 },
                      { x: 80, y: 18, score: 92 },
                      { x: 95, y: 12, score: 88 },
                      { x: 100, y: 10, score: 90 }
                    ].map((point, index) => (
                      <g key={index}>
                        <circle
                          cx={point.x}
                          cy={point.y}
                          r="1.5"
                          fill="#06b6d4"
                          stroke="#1e293b"
                          strokeWidth="0.3"
                        />
                        <circle
                          cx={point.x}
                          cy={point.y}
                          r="0.8"
                          fill="#ffffff"
                        />
                      </g>
                    ))}
                  </svg>
                  
                  {/* X-axis labels */}
                  <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-400 mt-2">
                    <span>Week 1</span>
                    <span>Week 2</span>
                    <span>Week 3</span>
                    <span>Week 4</span>
                    <span>Week 5</span>
                    <span>Week 6</span>
                    <span>Week 7</span>
                    <span>Week 8</span>
                  </div>
                </div>
              </div>
              
              {/* Chart Legend */}
              <div className="absolute top-2 right-2 flex items-center space-x-2 text-xs">
                <div className="w-3 h-0.5 bg-cyan-400"></div>
                <span className="text-gray-400">Safety Score %</span>
              </div>
            </div>
          </div>

          {/* Challenge Completion Chart */}
          <div className="bg-gray-800/50 rounded-lg p-6 border border-cyan-500/20">
            <h3 className="text-lg font-semibold text-white mb-4">Challenge Completion</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">91%</div>
                <div className="text-sm text-gray-400">Daily</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">82%</div>
                <div className="text-sm text-gray-400">Weekly</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-400">16%</div>
                <div className="text-sm text-gray-400">AR</div>
              </div>
            </div>
          </div>

          {/* Penalty Breakdown */}
          <div className="bg-gray-800/50 rounded-lg p-6 border border-cyan-500/20">
            <h3 className="text-lg font-semibold text-white mb-4">Penalty Breakdown</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  <span className="text-white">5 Ignored Alerts</span>
                </div>
                <span className="text-red-400 font-bold">-250 pts</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="w-5 h-5 text-orange-400" />
                  <span className="text-white">2 Late Responses</span>
                </div>
                <span className="text-orange-400 font-bold">-100 pts</span>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="text-md font-semibold text-white mb-3">Top Offenders:</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-gray-700/30 rounded">
                  <span className="text-white">Sneha R</span>
                  <span className="text-red-400 font-bold">-100 pts</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-700/30 rounded">
                  <span className="text-white">Worker X</span>
                  <span className="text-red-400 font-bold">-80 pts</span>
                </div>
              </div>
            </div>
          </div>

          {/* Rewards Spend */}
          <div className="bg-gray-800/50 rounded-lg p-6 border border-cyan-500/20">
            <h3 className="text-lg font-semibold text-white mb-4">Rewards Spend</h3>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400">₹20,000</div>
                <div className="text-sm text-gray-400">Allocated</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">₹7,550</div>
                <div className="text-sm text-gray-400">Redeemed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">₹12,450</div>
                <div className="text-sm text-gray-400">Remaining</div>
              </div>
            </div>
            
            {/* Line Chart for Spend over months */}
            <div className="h-32 relative">
              <div className="w-full h-full relative">
                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-400 pr-2">
                  <span>₹20k</span>
                  <span>₹15k</span>
                  <span>₹10k</span>
                  <span>₹5k</span>
                  <span>₹0</span>
                </div>
                
                {/* Chart Area */}
                <div className="ml-8 mr-4 h-full relative">
                  {/* Grid lines */}
                  <div className="absolute inset-0">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="absolute w-full border-t border-gray-600/30"
                        style={{ top: `${i * 25}%` }}
                      />
                    ))}
                  </div>
                  
                  {/* Data points and line */}
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {/* Spend data points (6 months) */}
                    <polyline
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="0.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points="5,80 25,70 45,60 65,50 85,40 100,35"
                    />
                    
                    {/* Data point circles */}
                    {[
                      { x: 5, y: 80, amount: 2000 },
                      { x: 25, y: 70, amount: 3500 },
                      { x: 45, y: 60, amount: 5000 },
                      { x: 65, y: 50, amount: 6500 },
                      { x: 85, y: 40, amount: 7200 },
                      { x: 100, y: 35, amount: 7550 }
                    ].map((point, index) => (
                      <g key={index}>
                        <circle
                          cx={point.x}
                          cy={point.y}
                          r="1.2"
                          fill="#10b981"
                          stroke="#1e293b"
                          strokeWidth="0.3"
                        />
                        <circle
                          cx={point.x}
                          cy={point.y}
                          r="0.6"
                          fill="#ffffff"
                        />
                      </g>
                    ))}
                  </svg>
                  
                  {/* X-axis labels */}
                  <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-400 mt-2">
                    <span>Jan</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>May</span>
                    <span>Jun</span>
                  </div>
                </div>
              </div>
              
              {/* Chart Legend */}
              <div className="absolute top-2 right-2 flex items-center space-x-2 text-xs">
                <div className="w-3 h-0.5 bg-green-400"></div>
                <span className="text-gray-400">Spend (₹)</span>
              </div>
            </div>
          </div>

          {/* Crew Comparison */}
          <div className="bg-gray-800/50 rounded-lg p-6 border border-cyan-500/20">
            <h3 className="text-lg font-semibold text-white mb-4">Crew Comparison</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-gray-700/30 rounded-lg">
                <div className="text-lg font-bold text-cyan-400">3,250</div>
                <div className="text-sm text-gray-400">Crew A</div>
              </div>
              <div className="text-center p-3 bg-gray-700/30 rounded-lg">
                <div className="text-lg font-bold text-cyan-400">3,180</div>
                <div className="text-sm text-gray-400">Crew B</div>
              </div>
              <div className="text-center p-3 bg-gray-700/30 rounded-lg">
                <div className="text-lg font-bold text-cyan-400">2,950</div>
                <div className="text-sm text-gray-400">Crew C</div>
              </div>
              <div className="text-center p-3 bg-gray-700/30 rounded-lg">
                <div className="text-lg font-bold text-cyan-400">2,600</div>
                <div className="text-sm text-gray-400">Crew D</div>
              </div>
              <div className="text-center p-3 bg-gray-700/30 rounded-lg">
                <div className="text-lg font-bold text-cyan-400">2,450</div>
                <div className="text-sm text-gray-400">Crew E</div>
              </div>
              <div className="text-center p-3 bg-gray-700/30 rounded-lg">
                <div className="text-lg font-bold text-cyan-400">2,300</div>
                <div className="text-sm text-gray-400">Crew F</div>
              </div>
              <div className="text-center p-3 bg-gray-700/30 rounded-lg">
                <div className="text-lg font-bold text-cyan-400">2,150</div>
                <div className="text-sm text-gray-400">Crew G</div>
              </div>
              <div className="text-center p-3 bg-gray-700/30 rounded-lg">
                <div className="text-lg font-bold text-cyan-400">2,000</div>
                <div className="text-sm text-gray-400">Crew H</div>
              </div>
            </div>
          </div>

          {/* Top Hazard Reporters */}
          <div className="bg-gray-800/50 rounded-lg p-6 border border-cyan-500/20">
            <h3 className="text-lg font-semibold text-white mb-4">Top Hazard Reporters</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  <span className="text-white font-medium">1. Rajesh</span>
                </div>
                <span className="text-yellow-400 font-bold">120 pts</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-500/10 border border-gray-500/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Award className="w-5 h-5 text-gray-400" />
                  <span className="text-white font-medium">2. Arjun</span>
                </div>
                <span className="text-gray-400 font-bold">90 pts</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-amber-600/10 border border-amber-600/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-amber-600" />
                  <span className="text-white font-medium">3. Meera</span>
                </div>
                <span className="text-amber-400 font-bold">85 pts</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-gray-500 font-bold">4.</span>
                  <span className="text-white font-medium">Priya</span>
                </div>
                <span className="text-gray-400 font-bold">70 pts</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-gray-500 font-bold">5.</span>
                  <span className="text-white font-medium">Crew B</span>
                </div>
                <span className="text-gray-400 font-bold">65 pts</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rewards & Wallet Tab */}
      {activeTab === 'rewards' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Rewards & Wallet</h2>
          
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
              <span className="ml-2 text-gray-400">Loading rewards data...</span>
            </div>
          ) : error ? (
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 text-red-400">
              Error: {error}
            </div>
          ) : (
            <div className="space-y-8">
              {/* Budget Overview with Charts */}
              <div className="bg-gray-800/50 rounded-lg p-6 border border-cyan-500/20">
                <h3 className="text-lg font-semibold text-white mb-4">Reward Budget Overview</h3>
                <div className="grid grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cyan-400">₹20,000</div>
                    <div className="text-sm text-gray-400">Allocated</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400">₹7,550</div>
                    <div className="text-sm text-gray-400">Spent</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-400">₹12,450</div>
                    <div className="text-sm text-gray-400">Remaining</div>
                  </div>
                </div>
                
                {/* Pie Chart: Allocated vs Spent */}
                <div className="flex justify-center">
                  <div className="relative w-32 h-32">
                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-gray-700"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#10b981"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray="95 251"
                        strokeDashoffset="0"
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#06b6d4"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray="156 251"
                        strokeDashoffset="-95"
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-bold text-white">37.8%</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center space-x-6 mt-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-400">Spent (37.8%)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                    <span className="text-sm text-gray-400">Remaining (62.2%)</span>
                  </div>
                </div>
              </div>

              {/* Redeem Requests (Approval Queue) */}
              <div className="bg-gray-800/50 rounded-lg p-6 border border-cyan-500/20">
                <h3 className="text-lg font-semibold text-white mb-4">Redeem Requests</h3>
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {rewardRequests
                    .filter(request => request.status === 'pending')
                    .map((request) => (
                      <div key={request.id} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{request.workerAvatar}</span>
                          <div>
                            <div className="text-white font-medium">{request.workerName}</div>
                            <div className="text-sm text-gray-400">{request.reward}</div>
                            <div className="text-xs text-gray-500">{request.points} points</div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleApproveReward(request.id)}
                            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-300 text-sm"
                          >
                            Approve
                          </button>
                          <button 
                            onClick={() => handleRejectReward(request.id)}
                            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-300 text-sm"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    ))}

                </div>
              </div>

              {/* Processed Requests (Approved/Rejected) */}
              <div className="bg-gray-800/50 rounded-lg p-6 border border-cyan-500/20">
                <h3 className="text-lg font-semibold text-white mb-4">Processed Requests</h3>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {rewardRequests
                    .filter(request => request.status !== 'pending')
                    .map((request) => (
                      <div key={request.id} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{request.workerAvatar}</span>
                          <div>
                            <div className="text-white font-medium">{request.workerName}</div>
                            <div className="text-sm text-gray-400">{request.reward}</div>
                            <div className="text-xs text-gray-500">{request.points} points</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            request.status === 'approved' 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-red-500/20 text-red-400'
                          }`}>
                            {request.status === 'approved' ? 'Approved' : 'Rejected'}
                          </span>
                          <span className="text-xs text-gray-500">
                            {request.requestedAt.toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  {rewardRequests.filter(request => request.status !== 'pending').length === 0 && (
                    <div className="text-center py-8 text-gray-400">
                      No processed requests yet
                    </div>
                  )}
                </div>
              </div>

              {/* Reward Options (Admin Configurable) */}
              <div className="bg-gray-800/50 rounded-lg p-6 border border-cyan-500/20">
                <h3 className="text-lg font-semibold text-white mb-4">Reward Options</h3>
                <div className="mb-4">
                  <p className="text-gray-400 mb-3">Current Rewards:</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {availableRewards.map((reward) => (
                      <div key={reward.id} className="flex items-center space-x-2 bg-cyan-500/20 text-cyan-400 rounded-full px-3 py-1 text-sm">
                        <span>{reward.name} ({reward.points} pts)</span>
                        <button
                          onClick={() => handleRemoveReward(reward.id)}
                          className="hover:bg-red-500/20 hover:text-red-400 rounded-full p-1 transition-colors duration-200"
                          title="Remove reward"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button 
                    onClick={() => setShowAddRewardModal(true)}
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-300 flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Reward</span>
                  </button>
                </div>
              </div>

              {/* Redeem History (Scrollable Table) */}
              <div className="bg-gray-800/50 rounded-lg p-6 border border-cyan-500/20">
                <h3 className="text-lg font-semibold text-white mb-4">Redeem History</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-700/50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Worker</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Reward</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Status</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700/50 max-h-96 overflow-y-auto">
                      <tr className="hover:bg-gray-700/30 transition-colors duration-200">
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">👨‍💼</span>
                            <span className="text-white">Rajesh</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-300">₹500 Paytm</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">Done</span>
                        </td>
                        <td className="px-4 py-3 text-gray-400">09 Sep</td>
                      </tr>
                      <tr className="hover:bg-gray-700/30 transition-colors duration-200">
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">👩‍💼</span>
                            <span className="text-white">Emma</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-300">Helmet Kit</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs">Pending</span>
                        </td>
                        <td className="px-4 py-3 text-gray-400">07 Sep</td>
                      </tr>
                      <tr className="hover:bg-gray-700/30 transition-colors duration-200">
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">👥</span>
                            <span className="text-white">Crew B</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-300">₹1000 Bonus</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">Done</span>
                        </td>
                        <td className="px-4 py-3 text-gray-400">01 Sep</td>
                      </tr>
                      <tr className="hover:bg-gray-700/30 transition-colors duration-200">
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">👨‍🏭</span>
                            <span className="text-white">Worker X</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-300">Grocery Card</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">Done</span>
                        </td>
                        <td className="px-4 py-3 text-gray-400">28 Aug</td>
                      </tr>
                      <tr className="hover:bg-gray-700/30 transition-colors duration-200">
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">👩‍🔬</span>
                            <span className="text-white">Meera</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-300">PPE Kit</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">Done</span>
                        </td>
                        <td className="px-4 py-3 text-gray-400">25 Aug</td>
                      </tr>
                      <tr className="hover:bg-gray-700/30 transition-colors duration-200">
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">👨‍🔬</span>
                            <span className="text-white">Anil</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-300">Safety Boots</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">Done</span>
                        </td>
                        <td className="px-4 py-3 text-gray-400">22 Aug</td>
                      </tr>
                      <tr className="hover:bg-gray-700/30 transition-colors duration-200">
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">👩‍🏭</span>
                            <span className="text-white">Priya</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-300">₹300 Amazon Gift Card</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">Done</span>
                        </td>
                        <td className="px-4 py-3 text-gray-400">20 Aug</td>
                      </tr>
                      <tr className="hover:bg-gray-700/30 transition-colors duration-200">
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">👨‍💼</span>
                            <span className="text-white">Worker Y</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-300">First Aid Kit</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">Done</span>
                        </td>
                        <td className="px-4 py-3 text-gray-400">18 Aug</td>
                      </tr>
                      <tr className="hover:bg-gray-700/30 transition-colors duration-200">
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">👩‍💼</span>
                            <span className="text-white">Sneha</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-300">₹200 Mobile Recharge</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded-full text-xs">Rejected</span>
                        </td>
                        <td className="px-4 py-3 text-gray-400">15 Aug</td>
                      </tr>
                      <tr className="hover:bg-gray-700/30 transition-colors duration-200">
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">👨‍🏭</span>
                            <span className="text-white">Worker Z</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-300">PPE Kit</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">Done</span>
                        </td>
                        <td className="px-4 py-3 text-gray-400">12 Aug</td>
                      </tr>
                      <tr className="hover:bg-gray-700/30 transition-colors duration-200">
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">👩‍🔬</span>
                            <span className="text-white">Worker A</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-300">Grocery Card</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">Done</span>
                        </td>
                        <td className="px-4 py-3 text-gray-400">10 Aug</td>
                      </tr>
                      <tr className="hover:bg-gray-700/30 transition-colors duration-200">
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">👨‍💼</span>
                            <span className="text-white">Worker B</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-300">₹500 Paytm</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">Done</span>
                        </td>
                        <td className="px-4 py-3 text-gray-400">08 Aug</td>
                      </tr>
                      <tr className="hover:bg-gray-700/30 transition-colors duration-200">
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">👩‍🏭</span>
                            <span className="text-white">Worker C</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-300">Helmet Kit</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">Done</span>
                        </td>
                        <td className="px-4 py-3 text-gray-400">05 Aug</td>
                      </tr>
                      <tr className="hover:bg-gray-700/30 transition-colors duration-200">
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">👨‍🔬</span>
                            <span className="text-white">Worker D</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-300">Safety Boots</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">Done</span>
                        </td>
                        <td className="px-4 py-3 text-gray-400">02 Aug</td>
                      </tr>
                      <tr className="hover:bg-gray-700/30 transition-colors duration-200">
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">👩‍💼</span>
                            <span className="text-white">Worker E</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-300">₹1000 Bonus</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">Done</span>
                        </td>
                        <td className="px-4 py-3 text-gray-400">30 Jul</td>
                      </tr>
                      <tr className="hover:bg-gray-700/30 transition-colors duration-200">
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">👨‍🏭</span>
                            <span className="text-white">Worker F</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-300">First Aid Kit</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">Done</span>
                        </td>
                        <td className="px-4 py-3 text-gray-400">28 Jul</td>
                      </tr>
                      <tr className="hover:bg-gray-700/30 transition-colors duration-200">
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">👩‍🔬</span>
                            <span className="text-white">Worker G</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-300">₹300 Amazon Gift Card</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">Done</span>
                        </td>
                        <td className="px-4 py-3 text-gray-400">25 Jul</td>
                      </tr>
                      <tr className="hover:bg-gray-700/30 transition-colors duration-200">
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">👨‍💼</span>
                            <span className="text-white">Worker H</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-300">PPE Kit</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">Done</span>
                        </td>
                        <td className="px-4 py-3 text-gray-400">22 Jul</td>
                      </tr>
                      <tr className="hover:bg-gray-700/30 transition-colors duration-200">
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">👩‍🏭</span>
                            <span className="text-white">Worker I</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-300">Grocery Card</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">Done</span>
                        </td>
                        <td className="px-4 py-3 text-gray-400">20 Jul</td>
                      </tr>
                      <tr className="hover:bg-gray-700/30 transition-colors duration-200">
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">👨‍🔬</span>
                            <span className="text-white">Worker J</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-300">₹200 Mobile Recharge</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">Done</span>
                        </td>
                        <td className="px-4 py-3 text-gray-400">18 Jul</td>
                      </tr>
                      <tr className="hover:bg-gray-700/30 transition-colors duration-200">
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">👩‍💼</span>
                            <span className="text-white">Worker K</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-300">Helmet Kit</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">Done</span>
                        </td>
                        <td className="px-4 py-3 text-gray-400">15 Jul</td>
                      </tr>
                      <tr className="hover:bg-gray-700/30 transition-colors duration-200">
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">👨‍🏭</span>
                            <span className="text-white">Worker L</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-300">Safety Boots</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">Done</span>
                        </td>
                        <td className="px-4 py-3 text-gray-400">12 Jul</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Worker Detail Modal */}
      {selectedWorker && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Worker Profile</h2>
                <button 
                  onClick={() => selectWorker(null)}
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  ✕
                </button>
              </div>
              
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-4xl">{selectedWorker.avatar}</span>
                <div>
                  <h3 className="text-xl font-semibold text-white">{selectedWorker.name}</h3>
                  <p className="text-gray-400">{selectedWorker.department}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-cyan-400">{selectedWorker.points.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">Total Points</div>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-cyan-400">{selectedWorker.level}</div>
                  <div className="text-sm text-gray-400">Level</div>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-cyan-400">{selectedWorker.safetyScore}%</div>
                  <div className="text-sm text-gray-400">Safety Score</div>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-cyan-400">{selectedWorker.streak}</div>
                  <div className="text-sm text-gray-400">Day Streak</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white">Badges Earned</h4>
                {selectedWorker.badges.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3">
                    {selectedWorker.badges.map((badge) => (
                      <div key={badge.id} className="bg-gray-700/50 rounded-lg p-3 flex items-center space-x-3">
                        <span className="text-2xl">{badge.icon}</span>
                        <div>
                          <div className="font-medium text-white">{badge.name}</div>
                          <div className="text-xs text-gray-400">{badge.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    <Trophy className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>No badges earned yet. Keep up the great work!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Challenge Modal */}
      {showCreateChallengeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg border border-cyan-500/20 p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Create New Challenge</h3>
              <button
                onClick={() => setShowCreateChallengeModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Challenge Title
                </label>
                <input
                  type="text"
                  value={newChallenge.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
                  placeholder="Enter challenge title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={newChallenge.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 h-20 resize-none"
                  placeholder="Enter challenge description"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Icon
                  </label>
                  <select
                    value={newChallenge.icon}
                    onChange={(e) => handleInputChange('icon', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Target">Target</option>
                    <option value="Shield">Shield</option>
                    <option value="Trophy">Trophy</option>
                    <option value="Award">Award</option>
                    <option value="CheckCircle">CheckCircle</option>
                    <option value="Star">Star</option>
                    <option value="Users">Users</option>
                    <option value="Zap">Zap</option>
                    <option value="Calendar">Calendar</option>
                    <option value="BarChart3">BarChart3</option>
                    <option value="AlertTriangle">AlertTriangle</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Color
                  </label>
                  <select
                    value={newChallenge.color}
                    onChange={(e) => handleInputChange('color', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="cyan">Cyan</option>
                    <option value="blue">Blue</option>
                    <option value="red">Red</option>
                    <option value="purple">Purple</option>
                    <option value="green">Green</option>
                    <option value="yellow">Yellow</option>
                    <option value="orange">Orange</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Target Points
                  </label>
                  <input
                    type="number"
                    value={newChallenge.total}
                    onChange={(e) => handleInputChange('total', parseInt(e.target.value) || 100)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
                    placeholder="100"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Deadline
                  </label>
                  <input
                    type="text"
                    value={newChallenge.deadline}
                    onChange={(e) => handleInputChange('deadline', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
                    placeholder="e.g., 7 days, Ongoing"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleCreateChallenge}
                className="flex-1 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors duration-300"
              >
                Create Challenge
              </button>
              <button
                onClick={() => setShowCreateChallengeModal(false)}
                className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Dialog */}
      {showConfirmDialog && pendingAction && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4 border border-cyan-500/20">
            <h3 className="text-lg font-semibold text-white mb-4">
              Confirm {pendingAction.type === 'approve' ? 'Approval' : 'Rejection'}
            </h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to {pendingAction.type} the reward request for{' '}
              <span className="font-medium text-white">{pendingAction.workerName}</span>?
              <br />
              <span className="text-sm text-gray-400">
                Reward: {pendingAction.reward}
              </span>
            </p>
            <div className="flex space-x-3">
              <button
                onClick={confirmAction}
                className={`px-4 py-2 rounded-lg transition-colors duration-300 text-sm font-medium ${
                  pendingAction.type === 'approve'
                    ? 'bg-green-500 hover:bg-green-600 text-white'
                    : 'bg-red-500 hover:bg-red-600 text-white'
                }`}
              >
                {pendingAction.type === 'approve' ? 'Approve' : 'Reject'}
              </button>
              <button
                onClick={cancelAction}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-300 text-sm font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Reward Modal */}
      {showAddRewardModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4 border border-cyan-500/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Add New Reward</h3>
              <button
                onClick={() => setShowAddRewardModal(false)}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Reward Name
                </label>
                <input
                  type="text"
                  value={newReward.name}
                  onChange={(e) => handleNewRewardChange('name', e.target.value)}
                  placeholder="e.g., ₹500 Paytm, PPE Kit, etc."
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Points Required
                </label>
                <input
                  type="number"
                  value={newReward.points}
                  onChange={(e) => handleNewRewardChange('points', e.target.value)}
                  placeholder="e.g., 500"
                  min="1"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Category
                </label>
                <select
                  value={newReward.category}
                  onChange={(e) => handleNewRewardChange('category', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                >
                  <option value="Digital">Digital</option>
                  <option value="Gift Card">Gift Card</option>
                  <option value="Safety">Safety</option>
                  <option value="Cash">Cash</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleAddReward}
                disabled={!newReward.name.trim() || !newReward.points || parseInt(newReward.points) <= 0}
                className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-300 text-sm font-medium"
              >
                Add Reward
              </button>
              <button
                onClick={() => setShowAddRewardModal(false)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-300 text-sm font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
