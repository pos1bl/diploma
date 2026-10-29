import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isActivated: { type: Boolean, default: false },
  isVictim: { type: Boolean, default: false },
  activationLink: { type: String },
  role: { type: String, default: 'user' },
  name: { type: String }
});

export default model('User', UserSchema);
