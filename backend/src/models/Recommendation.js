import mongoose from 'mongoose';

const recommendationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    matchScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    skillMatch: {
      matchedSkills: [String],
      missingSkills: [String],
      matchPercentage: { type: Number, default: 0 },
    },
    locationMatch: { type: Boolean, default: false },
    domainMatch: { type: Boolean, default: false },
    workModeMatch: { type: Boolean, default: false },
    analysis: String,
    strengths: [String],
    gaps: [String],
    suggestions: [String],
  },
  { timestamps: true }
);

export default mongoose.model('Recommendation', recommendationSchema);
