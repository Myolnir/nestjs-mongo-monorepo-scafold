import * as mongoose from 'mongoose';
import { uuid } from 'uuidv4';

export const FizzSchema = new mongoose.Schema({
  id: {
    type: String, index: true, unique: true,
  },
  name: { type: String, default: null },
  deletedAt: { type: Date, default: null },
}, { timestamps: true });

FizzSchema.pre('save', function (next) {
  this.id = uuid();
  next();
});
