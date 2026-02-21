import Application from '../models/Application.js';
import Job from '../models/Job.js';

export const getApplications = async (req, res, next) => {
  try {
    const applications = await Application.find({ userId: req.userId })
      .populate('jobId')
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    next(error);
  }
};

export const createApplication = async (req, res, next) => {
  try {
    const { jobId, coverLetter } = req.body;

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if already applied
    const existingApplication = await Application.findOne({
      userId: req.userId,
      jobId,
    });

    if (existingApplication) {
      return res.status(422).json({
        message: 'You have already applied to this job',
      });
    }

    const application = new Application({
      userId: req.userId,
      jobId,
      coverLetter,
    });

    await application.save();

    // Increment applicants count
    job.applicants = (job.applicants || 0) + 1;
    await job.save();

    res.status(201).json(application);
  } catch (error) {
    next(error);
  }
};

export const updateApplicationStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json(application);
  } catch (error) {
    next(error);
  }
};

export const getApplicationById = async (req, res, next) => {
  try {
    const application = await Application.findById(req.params.id).populate('jobId');

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json(application);
  } catch (error) {
    next(error);
  }
};
