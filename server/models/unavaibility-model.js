import { Schema, model } from 'mongoose';

const UnavailabilitySchema = new Schema({
  specialist: {
    type: Schema.Types.ObjectId,
    ref: 'Specialist',
    required: true,
  },
  type: {
    type: String,
    enum: ['vacation','dayOff','sick','other'],
    default: 'other',
  },
  start: { type: Date, required: true },
  end:   { type: Date, required: true },
  note:  { type: String, default: '' },
}, {
  timestamps: true,
});

export default model('Unavailability', UnavailabilitySchema);
