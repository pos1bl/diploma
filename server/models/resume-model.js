import { Schema, model } from "mongoose";

const ResumeSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    experienceYears: { type: Number, required: true },
    education: { type: String, required: true },
    about: { type: String, required: true },
    availability: { type: String, required: true },
    profileLink: { type: String, required: true },
    motivation: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default model('Resume', ResumeSchema);
