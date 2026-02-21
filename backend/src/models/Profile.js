import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    fullName: String,
    email: String,
    phone: String,
    dateOfBirth: Date,
    gender: String,
    address: String,
    city: String,
    state: String,
    pincode: String,

    education: [
      {
        institution: String,
        degree: String,
        field: String,
        startDate: Date,
        endDate: Date,
        cgpa: Number,
        percentage: Number,
        current: Boolean,
      },
    ],

    experience: [
      {
        company: String,
        position: String,
        description: String,
        startDate: Date,
        endDate: Date,
        current: Boolean,
        location: String,
      },
    ],

    skills: [String],
    resumeUrl: String,
    resumeParsedData: {
      name: String,
      email: String,
      phone: String,
      skills: [String],
      summary: String,
    },

    preferences: {
      preferredLocations: [String],
      preferredDomains: [String],
      workMode: [{ type: String, enum: ['remote', 'onsite', 'hybrid'] }],
      expectedStipend: Number,
      availability: String,
    },

    completeness: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Calculate profile completeness
profileSchema.methods.calculateCompleteness = function () {
  let score = 0;
  const fields = [
    { key: 'fullName', weight: 10 },
    { key: 'phone', weight: 10 },
    { key: 'education', weight: 20, isArray: true },
    { key: 'experience', weight: 20, isArray: true },
    { key: 'skills', weight: 20, isArray: true },
    { key: 'resumeUrl', weight: 20 },
  ];

  fields.forEach((field) => {
    if (field.isArray) {
      if (this[field.key] && this[field.key].length > 0) {
        score += field.weight;
      }
    } else {
      if (this[field.key]) {
        score += field.weight;
      }
    }
  });

  this.completeness = Math.min(score, 100);
  return this.completeness;
};

export default mongoose.model('Profile', profileSchema);
