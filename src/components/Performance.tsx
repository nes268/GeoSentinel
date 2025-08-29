import React, { useState } from 'react';
import { 
  Trophy, 
  Award, 
  Target, 
  TrendingUp, 
  Shield, 
  Clock, 
  CheckCircle, 
  Star,
  Users,
  Zap,
  Calendar,
  BarChart3,
  Plus,
  Loader2
} from 'lucide-react';
import { usePerformance } from '../hooks/usePerformance';
import type { Worker, Challenge, Badge, LeaderboardEntry } from '../services/performanceService';

export default function Performance() {
  const {
    workers,
    challenges,
    badges,
    leaderboard,
    stats,
    selectedWorker,
    activeTab,
    setActiveTab,
    selectWorker,
    completeChallenge,
    updateChallengeProgress,
    isLoading,
    error
  } = usePerformance();

  const getLevelColor = (level: number) => {
    if (level >= 8) return 'from-purple-500 to-pink-500';
    if (level >= 5) return 'from-blue-500 to-cyan-500';
    if (level >= 3) return 'from-green-500 to-blue-500';
    return 'from-yellow-500 to-orange-500';
  };

  const getBadgeRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'from-yellow-400 to-orange-500';
      case 'epic': return 'from-purple-400 to-pink-500';
      case 'rare': return 'from-blue-400 to-cyan-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getProgressColor = (progress: number, target: number) => {
    const percentage = (progress / target) * 100;
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-yellow-500';
    if (percentage >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Safety Performance</h1>
        <p className="text-gray-400">Engage workers through challenges, rewards, and friendly competition</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-800/50 rounded-lg p-1">
        {['overview', 'challenges', 'leaderboard', 'badges', 'analytics'].map((tab) => (
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Stats Cards */}
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
                <div className="text-sm text-gray-400">
                  +15% from last month
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-6 border border-cyan-500/20">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Active Workers</h3>
                    <p className="text-2xl font-bold text-cyan-400">{stats.activeWorkers}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-400">
                  {stats.participationRate.toFixed(1)}% participation rate
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-6 border border-cyan-500/20">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Safety Score</h3>
                    <p className="text-2xl font-bold text-cyan-400">{stats.averageSafetyScore.toFixed(1)}%</p>
                  </div>
                </div>
                <div className="text-sm text-gray-400">
                  +2.1% improvement
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
            <h2 className="text-2xl font-bold text-white">Active Challenges</h2>
            <button className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors duration-300 flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Create Challenge</span>
            </button>
          </div>
          
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
              <span className="ml-2 text-gray-400">Loading challenges...</span>
            </div>
          ) : error ? (
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 text-red-400">
              Error: {error}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {challenges.map((challenge) => (
                <div key={challenge.id} className="bg-gray-800/50 rounded-lg p-6 border border-cyan-500/20">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      challenge.type === 'daily' ? 'bg-blue-500/20 text-blue-400' :
                      challenge.type === 'weekly' ? 'bg-green-500/20 text-green-400' :
                      challenge.type === 'monthly' ? 'bg-purple-500/20 text-purple-400' :
                      'bg-orange-500/20 text-orange-400'
                    }`}>
                      {challenge.type.charAt(0).toUpperCase() + challenge.type.slice(1)}
                    </span>
                    <span className="text-2xl font-bold text-cyan-400">{challenge.points}</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white mb-2">{challenge.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{challenge.description}</p>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-400 mb-2">
                      <span>Progress</span>
                      <span>{challenge.progress}/{challenge.target}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(challenge.progress, challenge.target)}`}
                        style={{ width: `${(challenge.progress / challenge.target) * 100}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    <span>Deadline: {challenge.deadline}</span>
                    {challenge.completed && (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    )}
                  </div>
                  
                  {!challenge.completed && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => updateChallengeProgress('1', challenge.id, challenge.progress + 1)}
                        className="flex-1 px-3 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-lg transition-colors duration-300 text-sm"
                      >
                        Update Progress
                      </button>
                      <button
                        onClick={() => completeChallenge('1', challenge.id)}
                        className="px-3 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg transition-colors duration-300 text-sm"
                      >
                        Complete
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
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
          
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
              <span className="ml-2 text-gray-400">Loading leaderboard...</span>
            </div>
          ) : error ? (
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 text-red-400">
              Error: {error}
            </div>
          ) : (
            <div className="bg-gray-800/50 rounded-lg border border-cyan-500/20 overflow-hidden">
              {leaderboard.map((entry, index) => (
                <div 
                  key={entry.worker.id}
                  className={`flex items-center p-6 border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors duration-300 cursor-pointer ${
                    index === 0 ? 'bg-gradient-to-r from-yellow-500/10 to-orange-500/10' :
                    index === 1 ? 'bg-gradient-to-r from-gray-400/10 to-gray-500/10' :
                    index === 2 ? 'bg-gradient-to-r from-amber-600/10 to-yellow-600/10' : ''
                  }`}
                  onClick={() => selectWorker(entry.worker)}
                >
                  <div className="w-12 h-12 flex items-center justify-center mr-4">
                    {index === 0 && <Trophy className="w-8 h-8 text-yellow-400" />}
                    {index === 1 && <Award className="w-8 h-8 text-gray-400" />}
                    {index === 2 && <Star className="w-8 h-8 text-amber-600" />}
                    {index > 2 && <span className="text-2xl font-bold text-gray-500">{entry.rank}</span>}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{entry.worker.avatar}</span>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{entry.worker.name}</h3>
                        <p className="text-sm text-gray-400">{entry.worker.department}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-cyan-400">{entry.points.toLocaleString()}</div>
                    <div className="flex items-center space-x-1 text-sm">
                      <span className={`${entry.change > 0 ? 'text-green-400' : entry.change < 0 ? 'text-red-400' : 'text-gray-400'}`}>
                        {entry.change > 0 ? '+' : ''}{entry.change}
                      </span>
                      <TrendingUp className={`w-4 h-4 ${entry.change > 0 ? 'text-green-400' : entry.change < 0 ? 'text-red-400' : 'text-gray-400'}`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Badges Tab */}
      {activeTab === 'badges' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Achievement Badges</h2>
          
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
              <span className="ml-2 text-gray-400">Loading badges...</span>
            </div>
          ) : error ? (
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 text-red-400">
              Error: {error}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {badges.map((badge) => (
                <div key={badge.id} className="bg-gray-800/50 rounded-lg p-6 border border-cyan-500/20">
                  <div className={`w-16 h-16 bg-gradient-to-r ${getBadgeRarityColor(badge.rarity)} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <span className="text-3xl">{badge.icon}</span>
                  </div>
                  
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-white mb-2">{badge.name}</h3>
                    <p className="text-gray-400 text-sm mb-3">{badge.description}</p>
                    
                    <div className="flex items-center justify-center space-x-2 mb-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        badge.rarity === 'legendary' ? 'bg-yellow-500/20 text-yellow-400' :
                        badge.rarity === 'epic' ? 'bg-purple-500/20 text-purple-400' :
                        badge.rarity === 'rare' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {badge.rarity.charAt(0).toUpperCase() + badge.rarity.slice(1)}
                      </span>
                      <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded text-xs font-medium">
                        {badge.pointsRequired} pts
                      </span>
                    </div>
                    
                    <div className="text-xs text-gray-500">
                      {badge.earnedAt ? `Earned: ${badge.earnedAt}` : 'Not yet earned'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Performance Analytics</h2>
          
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
              <span className="ml-2 text-gray-400">Loading analytics...</span>
            </div>
          ) : error ? (
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 text-red-400">
              Error: {error}
            </div>
          ) : stats ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-gray-800/50 rounded-lg p-6 border border-cyan-500/20">
                <h3 className="text-lg font-semibold text-white mb-4">Safety Score Trends</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">This Week</span>
                    <span className="text-green-400">+2.1%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">This Month</span>
                    <span className="text-green-400">+5.3%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">This Quarter</span>
                    <span className="text-blue-400">+8.7%</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800/50 rounded-lg p-6 border border-cyan-500/20">
                <h3 className="text-lg font-semibold text-white mb-4">Challenge Completion</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Daily Challenges</span>
                    <span className="text-cyan-400">87%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Weekly Challenges</span>
                    <span className="text-cyan-400">73%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Monthly Challenges</span>
                    <span className="text-cyan-400">91%</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800/50 rounded-lg p-6 border border-cyan-500/20">
                <h3 className="text-lg font-semibold text-white mb-4">Achievement Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Total Badges Earned</span>
                    <span className="text-cyan-400">{stats.totalBadgesEarned}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Challenges Completed</span>
                    <span className="text-cyan-400">{stats.challengesCompleted}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Incidents Reduction</span>
                    <span className="text-green-400">{stats.incidentsReduction}%</span>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
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
    </div>
  );
}
