import { Schema, model } from 'mongoose';

const CourseSchema = new Schema({
  specialist: { type: Schema.Types.ObjectId, ref: 'Specialist', required: true },
  title: { type: String, required: true },
  provider: { type: String, required: true },
  hours: { type: Number },
  year: { type: Number, required: true },
  imageUrl: { type: String, default: '' },
}, {
  timestamps: true,
});

export default model('Course', CourseSchema);
