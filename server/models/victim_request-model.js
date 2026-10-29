import { Schema, model } from "mongoose";

const VictimRequestModel = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    type: { type: String, enum: ["civilian", "military", "veteran"] },
    fileUrl: { type: String, default: '' },
    description: { type: String, required: true },
    status: { type: String, enum: ["pending", "cancelled", "verified"], default: "pending" }
  },
  {
    timestamps: true,
  }
);

export default model('VictimRequest', VictimRequestModel);
