import Profile from '../models/Profile.js';
import User from '../models/User.js';

export const getProfile = async (req, res, next) => {
  try {
    let profile = await Profile.findOne({ userId: req.userId });

    if (!profile) {
      // Create profile if doesn't exist
      const user = await User.findById(req.userId);
      profile = new Profile({
        userId: req.userId,
        fullName: user.name,
        email: user.email,
      });
      await profile.save();
    }

    res.json(profile);
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    let profile = await Profile.findOne({ userId: req.userId });

    if (!profile) {
      const user = await User.findById(req.userId);
      profile = new Profile({
        userId: req.userId,
        fullName: user.name,
        email: user.email,
      });
    }

    Object.assign(profile, req.body);
    profile.calculateCompleteness();
    await profile.save();

    res.json(profile);
  } catch (error) {
    next(error);
  }
};

export const uploadResume = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file provided' });
    }

    const profile = await Profile.findOne({ userId: req.userId });

    if (!profile) {
      const user = await User.findById(req.userId);
      profile = new Profile({
        userId: req.userId,
        fullName: user.name,
        email: user.email,
      });
    }

    // In production, upload to cloud storage (S3, etc.)
    // For now, just store the file name
    profile.resumeUrl = `/uploads/${req.file.filename}`;
    profile.calculateCompleteness();
    await profile.save();

    res.json({
      url: profile.resumeUrl,
      message: 'Resume uploaded successfully',
    });
  } catch (error) {
    next(error);
  }
};
