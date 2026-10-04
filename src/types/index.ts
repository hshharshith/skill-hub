export type ActiveScreen = 
  | 'welcome' 
  | 'dashboard' 
  | 'discover' 
  | 'workshop-details' 
  | 'mentors' 
  | 'challenge' 
  | 'pathway';

export type WorkshopCategory = 'All' | 'Engineering' | 'Communication' | 'Career' | 'AI';

export interface Workshop {
  id: string;
  title: string;
  category: 'Engineering' | 'Communication' | 'Career' | 'AI';
  date: string;
  time: string;
  duration: string;
  location: string;
  building: string;
  credits: number;
  totalSeats: number;
  enrolledSeats: number;
  peersCount: number;
  facilitator: {
    name: string;
    role: string;
    avatar: string;
    companyOrDept: string;
  };
  skills: string[];
  description: string;
  academicFit: {
    freeSlot: string; // e.g., "Between Data Structures Lab & 4:00 PM Break"
    clashStatus: 'none' | 'warning';
    notes: string;
  };
  isRegistered?: boolean;
  reminderEnabled?: boolean;
}

export interface Mentor {
  id: string;
  name: string;
  title: string;
  dept: string;
  avatar: string;
  tags: string[];
  bio: string;
  availableSlot: string;
  rating: number;
  reviewsCount: number;
}

export interface ChallengeStep {
  id: number;
  title: string;
  points: number;
  status: 'completed' | 'in_progress' | 'pending';
  proofRequired?: boolean;
}

export interface Challenge {
  id: string;
  title: string;
  category: string;
  description: string;
  participantsCount: number;
  completedSteps: number;
  totalSteps: number;
  points: number;
  credits: number;
  streakDays: number;
  steps: ChallengeStep[];
  isActive: boolean;
  submittedUrl?: string;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  isCurrentUser?: boolean;
  points: number;
  credits: number;
  avatar: string;
}

export interface TimetableClass {
  day: string;
  time: string;
  course: string;
  code: string;
  room: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  rollNo?: string;
  role: 'student' | 'mentor';
  department: string;
  year?: string;
  avatar: string;
  creditsEarned: number;
  streakDays: number;
}
