import Recommendation from '../models/Recommendation.js';
import Job from '../models/Job.js';
import Profile from '../models/Profile.js';

export const getRecommendations = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    
    const recommendations = await Recommendation.find({ userId: req.userId })
      .populate('jobId')
      .sort({ matchScore: -1 })
      .limit(limit);

    res.json(recommendations);
  } catch (error) {
    next(error);
  }
};

export const generateRecommendations = async (userId) => {
  try {
    const profile = await Profile.findOne({ userId });
    const jobs = await Job.find({ isActive: true });

    for (const job of jobs) {
      // Calculate match score
      const userSkills = profile.skills || [];
      const jobRequiredSkills = job.requiredSkills || [];

      const matchedSkills = userSkills.filter((skill) =>
        jobRequiredSkills.some((jobSkill) =>
          jobSkill.toLowerCase().includes(skill.toLowerCase())
        )
      );

      const missingSkills = jobRequiredSkills.filter(
        (skill) =>
          !userSkills.some((userSkill) =>
            skill.toLowerCase().includes(userSkill.toLowerCase())
          )
      );

      const skillMatchPercentage = jobRequiredSkills.length
        ? (matchedSkills.length / jobRequiredSkills.length) * 100
        : 0;

      const locationMatch = profile.preferences?.preferredLocations?.includes(
        job.location
      ) ?? false;
      const workModeMatch = profile.preferences?.workMode?.includes(job.workMode) ?? false;
      const domainMatch = profile.preferences?.preferredDomains?.includes(job.domain) ?? false;

      // Calculate overall match score
      const matchScore =
        skillMatchPercentage * 0.4 +
        (locationMatch ? 20 : 0) +
        (workModeMatch ? 20 : 0) +
        (domainMatch ? 20 : 0);

      // Check if recommendation exists
      let recommendation = await Recommendation.findOne({
        userId,
        jobId: job._id,
      });

      if (!recommendation) {
        recommendation = new Recommendation({
          userId,
          jobId: job._id,
          matchScore: Math.round(matchScore),
          skillMatch: {
            matchedSkills,
            missingSkills,
            matchPercentage: Math.round(skillMatchPercentage),
          },
          locationMatch,
          workModeMatch,
          domainMatch,
          strengths: [
            matchedSkills.length > 0 ? `Strong in ${matchedSkills.join(', ')}` : '',
            locationMatch ? 'Location matches your preferences' : '',
            domainMatch ? 'Domain aligns with your interests' : '',
          ].filter(Boolean),
          gaps: missingSkills.length > 0 ? [`Missing skills: ${missingSkills.join(', ')}`] : [],
          suggestions: [
            missingSkills.length > 0 ? `Consider learning ${missingSkills.slice(0, 2).join(', ')}` : '',
            'Update your resume with relevant projects',
          ].filter(Boolean),
        });
        await recommendation.save();
      } else {
        // Update existing recommendation
        recommendation.matchScore = Math.round(matchScore);
        recommendation.skillMatch = {
          matchedSkills,
          missingSkills,
          matchPercentage: Math.round(skillMatchPercentage),
        };
        recommendation.locationMatch = locationMatch;
        recommendation.workModeMatch = workModeMatch;
        recommendation.domainMatch = domainMatch;
        await recommendation.save();
      }
    }
  } catch (error) {
    console.error('Error generating recommendations:', error);
  }
};
