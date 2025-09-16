import mongoose, { Document, Schema } from 'mongoose';

export interface ITrip extends Document {
  _id: string;
  userId: string;
  title: string;
  description?: string;
  destination: {
    name: string;
    country: string;
    region?: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  dates: {
    startDate: Date;
    endDate: Date;
    duration: number; // in days
  };
  difficulty: 'easy' | 'moderate' | 'hard';
  travelStyle: 'adventure' | 'rest' | 'dating' | 'family' | 'solo';
  trail: {
    name: string;
    type: 'hiking' | 'climbing' | 'cycling' | 'walking' | 'backpacking';
    distance: number; // in kilometers
    elevationGain: number; // in meters
    estimatedTime: number; // in hours
    waypoints: Array<{
      name: string;
      coordinates: {
        lat: number;
        lng: number;
      };
      elevation?: number;
      description?: string;
      type: 'start' | 'checkpoint' | 'landmark' | 'rest' | 'finish';
    }>;
  };
  map: {
    provider: 'google' | 'mapbox' | 'openstreetmap';
    bounds: {
      northeast: { lat: number; lng: number };
      southwest: { lat: number; lng: number };
    };
    zoom: number;
    centerPoint: {
      lat: number;
      lng: number;
    };
    polyline?: string; // encoded polyline for trail path
  };
  planning: {
    steps: Array<{
      id: string;
      title: string;
      description?: string;
      completed: boolean;
      dueDate?: Date;
      category: 'preparation' | 'booking' | 'packing' | 'travel' | 'activity';
      priority: 'low' | 'medium' | 'high';
    }>;
    budget: {
      total: number;
      currency: string;
      breakdown: {
        transportation: number;
        accommodation: number;
        food: number;
        equipment: number;
        activities: number;
        other: number;
      };
    };
    gear: Array<{
      item: string;
      category: 'clothing' | 'equipment' | 'safety' | 'food' | 'other';
      packed: boolean;
      essential: boolean;
    }>;
  };
  sharing: {
    isPublic: boolean;
    allowComments: boolean;
    allowRatings: boolean;
    shareWithFriends: boolean;
    socialLinks?: {
      instagram?: string;
      facebook?: string;
      strava?: string;
    };
  };
  weather: {
    forecast?: Array<{
      date: Date;
      temperature: {
        min: number;
        max: number;
        unit: 'celsius' | 'fahrenheit';
      };
      conditions: string;
      precipitation: number;
      windSpeed: number;
      humidity: number;
    }>;
    alerts?: Array<{
      type: 'warning' | 'watch' | 'advisory';
      title: string;
      description: string;
      severity: 'minor' | 'moderate' | 'severe' | 'extreme';
      validFrom: Date;
      validTo: Date;
    }>;
  };
  status: 'planning' | 'confirmed' | 'active' | 'completed' | 'cancelled';
  participants?: Array<{
    userId: string;
    role: 'organizer' | 'participant' | 'guide';
    status: 'invited' | 'confirmed' | 'declined';
    joinedAt?: Date;
  }>;
  reviews?: Array<{
    userId: string;
    rating: number; // 1-5
    comment?: string;
    photos?: string[];
    createdAt: Date;
  }>;
  photos: string[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const tripSchema = new Schema<ITrip>({
  userId: {
    type: String,
    required: true,
    ref: 'User',
    index: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    maxlength: 2000,
    default: ''
  },
  destination: {
    name: { type: String, required: true },
    country: { type: String, required: true },
    region: String,
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true }
    }
  },
  dates: {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    duration: { type: Number, required: true, min: 1 }
  },
  difficulty: {
    type: String,
    enum: ['easy', 'moderate', 'hard'],
    required: true
  },
  travelStyle: {
    type: String,
    enum: ['adventure', 'rest', 'dating', 'family', 'solo'],
    required: true
  },
  trail: {
    name: { type: String, required: true },
    type: {
      type: String,
      enum: ['hiking', 'climbing', 'cycling', 'walking', 'backpacking'],
      required: true
    },
    distance: { type: Number, required: true, min: 0 },
    elevationGain: { type: Number, required: true, min: 0 },
    estimatedTime: { type: Number, required: true, min: 0 },
    waypoints: [{
      name: String,
      coordinates: {
        lat: Number,
        lng: Number
      },
      elevation: Number,
      description: String,
      type: {
        type: String,
        enum: ['start', 'checkpoint', 'landmark', 'rest', 'finish'],
        default: 'checkpoint'
      }
    }]
  },
  map: {
    provider: {
      type: String,
      enum: ['google', 'mapbox', 'openstreetmap'],
      default: 'google'
    },
    bounds: {
      northeast: {
        lat: Number,
        lng: Number
      },
      southwest: {
        lat: Number,
        lng: Number
      }
    },
    zoom: { type: Number, default: 10 },
    centerPoint: {
      lat: Number,
      lng: Number
    },
    polyline: String
  },
  planning: {
    steps: [{
      id: String,
      title: String,
      description: String,
      completed: { type: Boolean, default: false },
      dueDate: Date,
      category: {
        type: String,
        enum: ['preparation', 'booking', 'packing', 'travel', 'activity'],
        default: 'preparation'
      },
      priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
      }
    }],
    budget: {
      total: { type: Number, default: 0 },
      currency: { type: String, default: 'USD' },
      breakdown: {
        transportation: { type: Number, default: 0 },
        accommodation: { type: Number, default: 0 },
        food: { type: Number, default: 0 },
        equipment: { type: Number, default: 0 },
        activities: { type: Number, default: 0 },
        other: { type: Number, default: 0 }
      }
    },
    gear: [{
      item: String,
      category: {
        type: String,
        enum: ['clothing', 'equipment', 'safety', 'food', 'other'],
        default: 'other'
      },
      packed: { type: Boolean, default: false },
      essential: { type: Boolean, default: false }
    }]
  },
  sharing: {
    isPublic: { type: Boolean, default: false },
    allowComments: { type: Boolean, default: true },
    allowRatings: { type: Boolean, default: true },
    shareWithFriends: { type: Boolean, default: false },
    socialLinks: {
      instagram: String,
      facebook: String,
      strava: String
    }
  },
  weather: {
    forecast: [{
      date: Date,
      temperature: {
        min: Number,
        max: Number,
        unit: {
          type: String,
          enum: ['celsius', 'fahrenheit'],
          default: 'celsius'
        }
      },
      conditions: String,
      precipitation: Number,
      windSpeed: Number,
      humidity: Number
    }],
    alerts: [{
      type: {
        type: String,
        enum: ['warning', 'watch', 'advisory']
      },
      title: String,
      description: String,
      severity: {
        type: String,
        enum: ['minor', 'moderate', 'severe', 'extreme']
      },
      validFrom: Date,
      validTo: Date
    }]
  },
  status: {
    type: String,
    enum: ['planning', 'confirmed', 'active', 'completed', 'cancelled'],
    default: 'planning'
  },
  participants: [{
    userId: {
      type: String,
      ref: 'User'
    },
    role: {
      type: String,
      enum: ['organizer', 'participant', 'guide'],
      default: 'participant'
    },
    status: {
      type: String,
      enum: ['invited', 'confirmed', 'declined'],
      default: 'invited'
    },
    joinedAt: Date
  }],
  reviews: [{
    userId: {
      type: String,
      ref: 'User'
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    comment: String,
    photos: [String],
    createdAt: { type: Date, default: Date.now }
  }],
  photos: [String],
  tags: [String]
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function(doc: any, ret: any) {
      delete ret.__v;
      return ret;
    }
  }
});

// Indexes for performance
tripSchema.index({ userId: 1, status: 1 });
tripSchema.index({ 'destination.country': 1, difficulty: 1 });
tripSchema.index({ travelStyle: 1, difficulty: 1 });
tripSchema.index({ 'dates.startDate': 1, 'dates.endDate': 1 });
tripSchema.index({ tags: 1 });
tripSchema.index({ 'sharing.isPublic': 1, status: 1 });
tripSchema.index({ createdAt: -1 });

// Virtual for trip duration calculation
tripSchema.virtual('durationDays').get(function(this: ITrip) {
  const start = new Date(this.dates.startDate);
  const end = new Date(this.dates.endDate);
  return Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
});

// Virtual for completion percentage
tripSchema.virtual('completionPercentage').get(function(this: ITrip) {
  if (!this.planning?.steps || this.planning.steps.length === 0) return 0;
  const completed = this.planning.steps.filter(step => step.completed).length;
  return Math.round((completed / this.planning.steps.length) * 100);
});

export const Trip = mongoose.model<ITrip>('Trip', tripSchema);
