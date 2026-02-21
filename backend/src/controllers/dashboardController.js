import Application from '../models/Application.js';
import Job from '../models/Job.js';
import Recommendation from '../models/Recommendation.js';

export const getDashboardStats = async (req, res, next) => {
  try {
    const userId = req.userId;

    const totalApplications = await Application.countDocuments({ userId });
    const pendingApplications = await Application.countDocuments({
      userId,
      status: 'pending',
    });
    const shortlistedApplications = await Application.countDocuments({
      userId,
      status: 'shortlisted',
    });
    const recommendationsCount = await Recommendation.countDocuments({ userId });

    res.json({
      profileCompleteness: 0, // Will be set from profile
      totalApplications,
      recommendationsCount,
      pendingApplications,
      shortlistedApplications,
    });
  } catch (error) {
    next(error);
  }
};
