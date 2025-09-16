import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  passwordHash: string;
  profilePicture?: string;
  bio?: string;
  experience: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  preferences: {
    travelStyle: 'adventure' | 'rest' | 'dating' | 'family' | 'solo';
    difficulty: 'easy' | 'moderate' | 'hard';
    interests: string[];
    notifications: {
      email: boolean;
      push: boolean;
      tripReminders: boolean;
      weatherAlerts: boolean;
    };
  };
  stats: {
    totalDistance: number; // in kilometers
    trailsCompleted: number;
    adventurePoints: number;
    totalElevationGain: number; // in meters
    averageRating: number;
    reviewsCount: number;
  };
  achievements: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
    unlockedAt: Date;
    progress: number; // percentage
  }>;
  location?: {
    country: string;
    city: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  isActive: boolean;
  lastLogin?: Date;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30,
    index: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  passwordHash: {
    type: String,
    required: true,
    select: false // Don't include in queries by default
  },
  profilePicture: {
    type: String,
    default: null
  },
  bio: {
    type: String,
    maxlength: 500,
    default: ''
  },
  experience: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced', 'expert'],
    default: 'beginner'
  },
  preferences: {
    travelStyle: {
      type: String,
      enum: ['adventure', 'rest', 'dating', 'family', 'solo'],
      default: 'adventure'
    },
    difficulty: {
      type: String,
      enum: ['easy', 'moderate', 'hard'],
      default: 'moderate'
    },
    interests: [{
      type: String,
      trim: true
    }],
    notifications: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
      tripReminders: { type: Boolean, default: true },
      weatherAlerts: { type: Boolean, default: true }
    }
  },
  stats: {
    totalDistance: { type: Number, default: 0 },
    trailsCompleted: { type: Number, default: 0 },
    adventurePoints: { type: Number, default: 0 },
    totalElevationGain: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0 },
    reviewsCount: { type: Number, default: 0 }
  },
  achievements: [{
    id: String,
    title: String,
    description: String,
    icon: String,
    unlockedAt: { type: Date, default: Date.now },
    progress: { type: Number, min: 0, max: 100, default: 0 }
  }],
  location: {
    country: { type: String, default: '' },
    city: { type: String, default: '' },
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date,
    default: null
  },
  emailVerified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  collection: 'user', // Explicitly set collection name to 'user'
  toJSON: {
    virtuals: true,
    transform: function(doc, ret) {
      delete (ret as any).passwordHash;
      delete (ret as any).__v;
      return ret;
    }
  }
});

// Indexes for performance
userSchema.index({ email: 1, isActive: 1 });
userSchema.index({ username: 1, isActive: 1 });
userSchema.index({ 'stats.adventurePoints': -1 });
userSchema.index({ createdAt: -1 });

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

export const User = mongoose.model<IUser>('User', userSchema);
