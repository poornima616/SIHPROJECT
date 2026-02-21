import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a job title'],
    },
    company: {
      type: String,
      required: [true, 'Please provide a company name'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a job description'],
    },
    location: String,
    workMode: {
      type: String,
      enum: ['remote', 'onsite', 'hybrid'],
      default: 'hybrid',
    },
    domain: String,
    requiredSkills: [String],
    preferredSkills: [String],
    stipend: Number,
    duration: String,
    startDate: Date,
    applicationDeadline: Date,
    openings: { type: Number, default: 1 },
    applicants: { type: Number, default: 0 },
    isPMScheme: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('Job', jobSchema);
