import { Schema, model } from 'mongoose'

const SessionSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    gift: { type: Schema.Types.ObjectId, ref: 'Gift' },
    specialist: { type: Schema.Types.ObjectId, ref: 'Specialist', required: true },
    scheduledAt: { type: Date, required: true },
    type: { type: String, enum: ['free', 'gift', 'paid'], required: true },
    status: { type: String, enum: ['scheduled', 'completed', 'cancelled', 'cancelled with refund', 'no-show'], default: 'scheduled' },
    isMoved: { type: Boolean, default: false },
    paymentIntentId: { type: String, unique: true, sparse: true },
    notes: { type: String },
  },
  {
    timestamps: true
  }
)

export default model('Session', SessionSchema);
