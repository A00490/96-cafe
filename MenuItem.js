import mongoose from 'mongoose'; // <-- CONVERSION: Use 'import' instead of 'require'

// Define the structure of a single menu item document
const menuItemSchema = new mongoose.Schema({
  // Name is required and will be indexed for fast lookups
  name: {
    type: String,
    required: [true, 'A menu item must have a name'],
    trim: true,
    unique: true
  },
  
  description: {
    type: String,
    required: [true, 'A menu item must have a description'],
    trim: true
  },
  
  // Price is stored as a number
  price: {
    type: Number,
    required: [true, 'A menu item must have a price'],
    min: [0, 'Price cannot be negative']
  },
  
  // Category helps the frontend filter and group items
  category: {
    type: String,
    required: [true, 'A menu item must belong to a category'],
    enum: ['Coffee', 'Tea', 'Pastries', 'Sandwiches', 'Desserts'] 
  },

  image: {
    type: String, // Storing the image URL
    default: '/images/default.jpg'
  },
  
  isAvailable: {
    type: Boolean,
    default: true // Item is available by default
  },
  
  createdAt: {
    type: Date,
    default: Date.now 
  }
});

// Create the model using the schema
const MenuItem = mongoose.model('MenuItem', menuItemSchema);

// CONVERSION: Use 'export default' instead of 'module.exports'
export default MenuItem;