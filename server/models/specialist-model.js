import { Schema, model } from 'mongoose';

const AvailabilitySlotSchema = new Schema({
  dayOfWeek: {
    type: String,
    enum: [
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
      'sunday',
    ],
    required: true,
  },
  from: { type: String, required: true },
  to:   { type: String, required: true },
}, { _id: false });

const SpecialistSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },

  dateOfBirth:          { type: Date, required: true },
  dateOfStart:          { type: Date, required: true },
  gender:               { type: String, enum: ['male','female'], required: true },
  bio:                  { type: String, default: '' },
  isFired:              { type: Boolean, default: false },

  mainAreas:            { type: [String], required: true },
  secondaryAreas:       { type: [String], default: [] },
  excludedAreas:        { type: [String], default: [] },
  methods:              { type: [String], required: true },
  specialNeeds:         { type: [String], default: [] },

  availability:         { type: [AvailabilitySlotSchema], default: [] },
  avatarUrl:            { type: String, default: '' },
});

SpecialistSchema.pre('save', async function(next) {
  const User = model('User');
  const user = await User.findById(this.user).lean();
  if (!user) return next(new Error('User not found'));
  if (user.role !== 'specialist')
    return next(new Error('User.role must be "specialist"'));
  next();
});

export default model('Specialist', SpecialistSchema);
