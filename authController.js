import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret-dev-key-123', {
    expiresIn: '90d'
  });
};

export const signup = async (req, res) => {
  try {
    // We only allow creating 'customer' accounts via public signup & staff roles must be updated manually in the DB for security
    const newUser = await User.create({
      email: req.body.email,
      password: req.body.password,
      role: 'customer' 
    });

    const token = signToken(newUser._id);

    res.status(201).json({
      status: 'success',
      token,
      data: { user: newUser }
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if email and password exist
    if (!email || !password) {
      return res.status(400).json({ status: 'fail', message: 'Please provide email and password' });
    }

    // 2. Check if user exists && password is correct
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({ status: 'fail', message: 'Incorrect email or password' });
    }

    // 3. If everything ok, send token AND role to client
    const token = signToken(user._id);

    res.status(200).json({
      status: 'success',
      token,
      data: {
        user: {
          id: user._id,
          email: user.email,
          role: user.role // <--- Crucial: Send role to frontend
        }
      }
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};