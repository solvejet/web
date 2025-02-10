// src/models/newsletter.ts
import mongoose, { Schema, Document, Model } from 'mongoose';

// Interface for Newsletter Subscriber
export interface INewsletterSubscriber extends Document {
  email: string;
  subscribed: boolean;
  subscribedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Newsletter Schema
const NewsletterSchema = new Schema<INewsletterSubscriber>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    subscribed: {
      type: Boolean,
      default: true,
    },
    subscribedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Static method to find by email
NewsletterSchema.statics['findByEmail'] = function (email: string) {
  return this.findOne({ email: email.toLowerCase() });
};

// Create interface for model with static method
interface NewsletterModel extends Model<INewsletterSubscriber> {
  findByEmail(email: string): Promise<INewsletterSubscriber | null>;
}

// Create and export model
export const Newsletter =
  (mongoose.models['Newsletter'] as NewsletterModel) ||
  mongoose.model<INewsletterSubscriber, NewsletterModel>('Newsletter', NewsletterSchema);
