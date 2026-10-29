import { Schema, model } from 'mongoose';

const DiplomaSchema = new Schema({
  specialist: { type: Schema.Types.ObjectId, ref: 'Specialist', required: true },
  title: { type: String, rquired: true },
  specialty: { type: String, required: true },
  degree: { type: String, required: true },
  year: { type: Number, required: true },
  imageUrl: { type: String, default: '' },
}, {
  timestamps: true,
});

export default model('Diploma', DiplomaSchema);

