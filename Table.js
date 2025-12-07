import mongoose from 'mongoose';

const tableSchema = new mongoose.Schema({
  tableNumber: {
    type: Number,
    required: true,
    unique: true
  },
  capacity: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Available', 'Occupied', 'Reserved', 'Dirty'],
    default: 'Available'
  }
});

const Table = mongoose.model('Table', tableSchema);
export default Table;