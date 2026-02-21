import User from '../models/User.js';
import Profile from '../models/Profile.js';
import { generateToken } from '../utils/jwt.js';

export const register = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(422).json({
        message: 'User already exists',
        errors: { email: ['Email is already registered'] },
      });
    }

    // Create user
    const user = new User({ name, email, password, phone });
    await user.save();

    // Create profile
    const profile = new Profile({
      userId: user._id,
      fullName: name,
      email: email,
      phone: phone,
    });
    await profile.save();

    const token = generateToken(user._id);

    res.status(201).json({
      user: user.toJSON(),
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({
        message: 'Please provide email and password',
        errors: {
          email: email ? [] : ['Email is required'],
          password: password ? [] : ['Password is required'],
        },
      });
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }

    const token = generateToken(user._id);

    res.json({
      user: user.toJSON(),
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.toJSON());
  } catch (error) {
    next(error);
  }
};
