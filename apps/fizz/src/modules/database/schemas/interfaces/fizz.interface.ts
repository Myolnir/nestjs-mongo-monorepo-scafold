import { Document } from 'mongoose';

export interface IFizz extends Document {
  id: string,
  name: string,
  createdAt: string,
  updatedAd: string,
  deletedAt: string,
}
