import { useState, useEffect, useCallback } from 'react';
import performanceService, { 
  Worker, 
  Challenge, 
  Badge, 
  LeaderboardEntry, 
  PerformanceStats 
} from '../services/performanceService';

export interface UsePerformanceReturn {
  // State
  workers: Worker[];
  challenges: Challenge[];
  badges: Badge[];
  leaderboard: LeaderboardEntry[];
  stats: PerformanceStats | null;
  selectedWorker: Worker | null;
  activeTab: string;
  
  // Actions
  setActiveTab: (tab: string) => void;
  selectWorker: (worker: Worker | null) => void;
  awardPoints: (workerId: string, activity: string, points: number) => Promise<boolean>;
  completeChallenge: (workerId: string, challengeId: string) => Promise<boolean>;
  updateChallengeProgress: (workerId: string, challengeId: string, progress: number) => Promise<boolean>;
  createChallenge: (challenge: Omit<Challenge, 'id' | 'progress' | 'completed'>) => Promise<string>;
  updateSafetyScore: (workerId: string, score: number) => Promise<boolean>;
  recordIncident: (workerId: string) => Promise<boolean>;
  
  // Computed values
  getWorkerStats: (workerId: string) => Worker | null;
  getRecommendedChallenges: (workerId: string) => Challenge[];
  getLeaderboardByPeriod: (period: string) => LeaderboardEntry[];
  
  // Loading states
  isLoading: boolean;
  error: string | null;
}

export function usePerformance(): UsePerformanceReturn {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [stats, setStats] = useState<PerformanceStats | null>(null);
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load initial data
  useEffect(() => {
    loadPerformanceData();
  }, []);

  const loadPerformanceData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Load all data in parallel
      const [workersData, challengesData, badgesData, leaderboardData, statsData] = await Promise.all([
        Promise.resolve(performanceService.getAllWorkers()),
        Promise.resolve(performanceService.getChallenges()),
        Promise.resolve(performanceService.getBadges()),
        Promise.resolve(performanceService.getLeaderboard('monthly')),
        Promise.resolve(performanceService.getPerformanceStats())
      ]);

      setWorkers(workersData);
      setChallenges(challengesData);
      setBadges(badgesData);
      setLeaderboard(leaderboardData);
      setStats(statsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load performance data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const awardPoints = useCallback(async (workerId: string, activity: string, points: number): Promise<boolean> => {
    try {
      const success = performanceService.awardPoints(workerId, activity, points);
      if (success) {
        // Reload data to reflect changes
        await loadPerformanceData();
      }
      return success;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to award points');
      return false;
    }
  }, [loadPerformanceData]);

  const completeChallenge = useCallback(async (workerId: string, challengeId: string): Promise<boolean> => {
    try {
      const success = performanceService.completeChallenge(workerId, challengeId);
      if (success) {
        // Reload data to reflect changes
        await loadPerformanceData();
      }
      return success;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to complete challenge');
      return false;
    }
  }, [loadPerformanceData]);

  const updateChallengeProgress = useCallback(async (workerId: string, challengeId: string, progress: number): Promise<boolean> => {
    try {
      const success = performanceService.updateChallengeProgress(workerId, challengeId, progress);
      if (success) {
        // Reload data to reflect changes
        await loadPerformanceData();
      }
      return success;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update challenge progress');
      return false;
    }
  }, [loadPerformanceData]);

  const createChallenge = useCallback(async (challenge: Omit<Challenge, 'id' | 'progress' | 'completed'>): Promise<string> => {
    try {
      const challengeId = performanceService.createChallenge(challenge);
      // Reload data to reflect changes
      await loadPerformanceData();
      return challengeId;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create challenge');
      throw err;
    }
  }, [loadPerformanceData]);

  const updateSafetyScore = useCallback(async (workerId: string, score: number): Promise<boolean> => {
    try {
      const success = performanceService.updateSafetyScore(workerId, score);
      if (success) {
        // Reload data to reflect changes
        await loadPerformanceData();
      }
      return success;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update safety score');
      return false;
    }
  }, [loadPerformanceData]);

  const recordIncident = useCallback(async (workerId: string): Promise<boolean> => {
    try {
      const success = performanceService.recordIncident(workerId);
      if (success) {
        // Reload data to reflect changes
        await loadPerformanceData();
      }
      return success;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to record incident');
      return false;
    }
  }, [loadPerformanceData]);

  const getWorkerStats = useCallback((workerId: string): Worker | null => {
    return performanceService.getWorkerStats(workerId);
  }, []);

  const getRecommendedChallenges = useCallback((workerId: string): Challenge[] => {
    return performanceService.getRecommendedChallenges(workerId);
  }, []);

  const getLeaderboardByPeriod = useCallback((period: string): LeaderboardEntry[] => {
    return performanceService.getLeaderboard(period);
  }, []);

  const selectWorker = useCallback((worker: Worker | null) => {
    setSelectedWorker(worker);
  }, []);

  return {
    // State
    workers,
    challenges,
    badges,
    leaderboard,
    stats,
    selectedWorker,
    activeTab,
    
    // Actions
    setActiveTab,
    selectWorker,
    awardPoints,
    completeChallenge,
    updateChallengeProgress,
    createChallenge,
    updateSafetyScore,
    recordIncident,
    
    // Computed values
    getWorkerStats,
    getRecommendedChallenges,
    getLeaderboardByPeriod,
    
    // Loading states
    isLoading,
    error
  };
}
