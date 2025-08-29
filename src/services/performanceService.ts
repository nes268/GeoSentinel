export interface Worker {
  id: string;
  name: string;
  avatar: string;
  points: number;
  level: number;
  badges: Badge[];
  safetyScore: number;
  streak: number;
  department: string;
  lastActivity: Date;
  totalIncidents: number;
  responseTime: number; // average response time in minutes
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  category: 'safety' | 'response' | 'training' | 'teamwork' | 'innovation';
  pointsRequired: number;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  points: number;
  type: 'daily' | 'weekly' | 'monthly' | 'special';
  progress: number;
  target: number;
  completed: boolean;
  deadline: string;
  category: 'safety' | 'training' | 'compliance' | 'emergency';
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
}

export interface LeaderboardEntry {
  rank: number;
  worker: Worker;
  points: number;
  change: number;
  period: 'daily' | 'weekly' | 'monthly' | 'allTime';
}

export interface PerformanceStats {
  totalPoints: number;
  activeWorkers: number;
  participationRate: number;
  averageSafetyScore: number;
  totalBadgesEarned: number;
  challengesCompleted: number;
  incidentsReduction: number;
}

class PerformanceService {
  private workers: Worker[] = [];
  private challenges: Challenge[] = [];
  private badges: Badge[] = [];
  private leaderboards: Map<string, LeaderboardEntry[]> = new Map();

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    // Initialize badges
    this.badges = [
      {
        id: 'safety-first',
        name: 'Safety First',
        description: '30 days without incidents',
        icon: '🛡️',
        earnedAt: '',
        rarity: 'rare',
        category: 'safety',
        pointsRequired: 1000
      },
      {
        id: 'quick-responder',
        name: 'Quick Responder',
        description: 'Responded to 10 alerts under 2 minutes',
        icon: '⚡',
        earnedAt: '',
        rarity: 'epic',
        category: 'response',
        pointsRequired: 2000
      },
      {
        id: 'perfect-week',
        name: 'Perfect Week',
        description: '7 days of perfect safety compliance',
        icon: '⭐',
        earnedAt: '',
        rarity: 'legendary',
        category: 'safety',
        pointsRequired: 5000
      },
      {
        id: 'team-player',
        name: 'Team Player',
        description: 'Helped 5 colleagues with safety training',
        icon: '🤝',
        earnedAt: '',
        rarity: 'common',
        category: 'teamwork',
        pointsRequired: 500
      },
      {
        id: 'innovation-leader',
        name: 'Innovation Leader',
        description: 'Proposed 3 safety improvements',
        icon: '💡',
        earnedAt: '',
        rarity: 'epic',
        category: 'innovation',
        pointsRequired: 3000
      }
    ];

    // Initialize challenges
    this.challenges = [
      {
        id: 'daily-safety-check',
        title: 'Daily Safety Check',
        description: 'Complete all assigned safety inspections',
        points: 50,
        type: 'daily',
        progress: 0,
        target: 5,
        completed: false,
        deadline: this.getDeadline('daily'),
        category: 'safety',
        difficulty: 'easy'
      },
      {
        id: 'emergency-response-training',
        title: 'Emergency Response Training',
        description: 'Complete quarterly emergency response certification',
        points: 200,
        type: 'monthly',
        progress: 0,
        target: 1,
        completed: false,
        deadline: this.getDeadline('monthly'),
        category: 'training',
        difficulty: 'medium'
      },
      {
        id: 'safety-protocol-review',
        title: 'Safety Protocol Review',
        description: 'Review and update 3 safety protocols',
        points: 150,
        type: 'weekly',
        progress: 0,
        target: 3,
        completed: false,
        deadline: this.getDeadline('weekly'),
        category: 'compliance',
        difficulty: 'hard'
      }
    ];

    // Initialize workers with mock data
    this.workers = [
      {
        id: '1',
        name: 'Sarah Chen',
        avatar: '👩‍🔬',
        points: 2840,
        level: 8,
        badges: [],
        safetyScore: 98,
        streak: 45,
        department: 'Mining Operations',
        lastActivity: new Date(),
        totalIncidents: 0,
        responseTime: 1.2
      },
      {
        id: '2',
        name: 'Mike Rodriguez',
        avatar: '👨‍🏭',
        points: 3120,
        level: 9,
        badges: [],
        safetyScore: 99,
        streak: 52,
        department: 'Safety Team',
        lastActivity: new Date(),
        totalIncidents: 0,
        responseTime: 0.8
      },
      {
        id: '3',
        name: 'Emma Thompson',
        avatar: '👩‍💼',
        points: 1980,
        level: 6,
        badges: [],
        safetyScore: 95,
        streak: 28,
        department: 'Engineering',
        lastActivity: new Date(),
        totalIncidents: 1,
        responseTime: 2.1
      }
    ];

    this.assignBadges();
    this.updateLeaderboards();
  }

  private getDeadline(type: string): string {
    const now = new Date();
    switch (type) {
      case 'daily':
        return new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      case 'weekly':
        return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      case 'monthly':
        return new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      default:
        return now.toISOString().split('T')[0];
    }
  }

  private assignBadges() {
    this.workers.forEach(worker => {
      this.badges.forEach(badge => {
        if (this.shouldAwardBadge(worker, badge)) {
          if (!worker.badges.find(b => b.id === badge.id)) {
            worker.badges.push({
              ...badge,
              earnedAt: new Date().toISOString().split('T')[0]
            });
          }
        }
      });
    });
  }

  private shouldAwardBadge(worker: Worker, badge: Badge): boolean {
    switch (badge.id) {
      case 'safety-first':
        return worker.streak >= 30 && worker.totalIncidents === 0;
      case 'quick-responder':
        return worker.responseTime <= 2.0;
      case 'perfect-week':
        return worker.streak >= 7 && worker.safetyScore === 100;
      case 'team-player':
        return worker.points >= 500;
      case 'innovation-leader':
        return worker.points >= 3000;
      default:
        return false;
    }
  }

  // Award points for various safety activities
  awardPoints(workerId: string, activity: string, points: number): boolean {
    const worker = this.workers.find(w => w.id === workerId);
    if (!worker) return false;

    worker.points += points;
    worker.lastActivity = new Date();
    
    // Update level based on points
    const newLevel = Math.floor(worker.points / 500) + 1;
    if (newLevel > worker.level) {
      worker.level = newLevel;
    }

    // Update streak for daily activities
    if (activity === 'daily-safety-check') {
      worker.streak++;
    }

    this.updateLeaderboards();
    return true;
  }

  // Complete a challenge
  completeChallenge(workerId: string, challengeId: string): boolean {
    const worker = this.workers.find(w => w.id === workerId);
    const challenge = this.challenges.find(c => c.id === challengeId);
    
    if (!worker || !challenge) return false;

    if (challenge.completed) return false;

    challenge.completed = true;
    challenge.progress = challenge.target;
    
    // Award points
    this.awardPoints(workerId, `challenge-${challengeId}`, challenge.points);
    
    // Check for new badges
    this.assignBadges();
    
    return true;
  }

  // Update challenge progress
  updateChallengeProgress(workerId: string, challengeId: string, progress: number): boolean {
    const challenge = this.challenges.find(c => c.id === challengeId);
    if (!challenge) return false;

    challenge.progress = Math.min(progress, challenge.target);
    
    if (challenge.progress >= challenge.target && !challenge.completed) {
      this.completeChallenge(workerId, challengeId);
    }
    
    return true;
  }

  // Get worker statistics
  getWorkerStats(workerId: string): Worker | null {
    return this.workers.find(w => w.id === workerId) || null;
  }

  // Get all workers
  getAllWorkers(): Worker[] {
    return [...this.workers];
  }

  // Get challenges
  getChallenges(): Challenge[] {
    return [...this.challenges];
  }

  // Get badges
  getBadges(): Badge[] {
    return [...this.badges];
  }

  // Get leaderboard for a specific period
  getLeaderboard(period: string = 'monthly'): LeaderboardEntry[] {
    return this.leaderboards.get(period) || [];
  }

  // Update leaderboards
  private updateLeaderboards() {
    const periods: ('daily' | 'weekly' | 'monthly' | 'allTime')[] = ['daily', 'weekly', 'monthly', 'allTime'];
    
    periods.forEach(period => {
      const sortedWorkers = [...this.workers]
        .sort((a, b) => b.points - a.points)
        .map((worker, index) => ({
          rank: index + 1,
          worker,
          points: worker.points,
          change: 0, // This would be calculated based on historical data
          period
        }));
      
      this.leaderboards.set(period, sortedWorkers);
    });
  }

  // Get performance statistics
  getPerformanceStats(): PerformanceStats {
    const totalPoints = this.workers.reduce((sum, worker) => sum + worker.points, 0);
    const activeWorkers = this.workers.filter(w => 
      (new Date().getTime() - w.lastActivity.getTime()) < 7 * 24 * 60 * 60 * 1000
    ).length;
    const participationRate = (activeWorkers / this.workers.length) * 100;
    const averageSafetyScore = this.workers.reduce((sum, worker) => sum + worker.safetyScore, 0) / this.workers.length;
    const totalBadgesEarned = this.workers.reduce((sum, worker) => sum + worker.badges.length, 0);
    const challengesCompleted = this.challenges.filter(c => c.completed).length;
    
    // Calculate incidents reduction (mock data)
    const incidentsReduction = 15.3; // This would be calculated from historical data

    return {
      totalPoints,
      activeWorkers,
      participationRate,
      averageSafetyScore,
      totalBadgesEarned,
      challengesCompleted,
      incidentsReduction
    };
  }

  // Create a new challenge
  createChallenge(challenge: Omit<Challenge, 'id' | 'progress' | 'completed'>): string {
    const newChallenge: Challenge = {
      ...challenge,
      id: `challenge-${Date.now()}`,
      progress: 0,
      completed: false
    };
    
    this.challenges.push(newChallenge);
    return newChallenge.id;
  }

  // Update worker safety score
  updateSafetyScore(workerId: string, newScore: number): boolean {
    const worker = this.workers.find(w => w.id === workerId);
    if (!worker) return false;

    worker.safetyScore = Math.max(0, Math.min(100, newScore));
    
    // Check for new badges
    this.assignBadges();
    
    return true;
  }

  // Record an incident
  recordIncident(workerId: string): boolean {
    const worker = this.workers.find(w => w.id === workerId);
    if (!worker) return false;

    worker.totalIncidents++;
    worker.streak = 0; // Reset streak on incident
    worker.safetyScore = Math.max(0, worker.safetyScore - 5); // Reduce safety score
    
    return true;
  }

  // Get recommended challenges for a worker
  getRecommendedChallenges(workerId: string): Challenge[] {
    const worker = this.workers.find(w => w.id === workerId);
    if (!worker) return [];

    return this.challenges
      .filter(c => !c.completed)
      .sort((a, b) => {
        // Prioritize by difficulty and worker level
        const difficultyScore = { easy: 1, medium: 2, hard: 3, expert: 4 };
        const aScore = difficultyScore[a.difficulty];
        const bScore = difficultyScore[b.difficulty];
        
        if (Math.abs(aScore - worker.level) < Math.abs(bScore - worker.level)) {
          return -1;
        }
        return 1;
      })
      .slice(0, 3);
  }
}

export const performanceService = new PerformanceService();
export default performanceService;
