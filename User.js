import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false // Never show password in output by default
  },
  // === NEW: Role Field ===
  role: {
    type: String,
    enum: ['customer', 'staff'],
    default: 'customer' // Everyone is a customer by default
  }
});

// === FIXED: Encrypt password before saving (Removed 'next') ===
userSchema.pre('save', async function() {
  // If password wasn't modified, return immediately
  if (!this.isModified('password')) return;
  
  // Hash the password
  this.password = await bcrypt.hash(this.password, 12);
});

// Method to check if password is correct
userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

export default User;