import { Schema, model } from "mongoose";

const GiftSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    to: { type: String, required: true },
    from: { type: String, required: true },
    expirationDate: { type: String, required: true },
    code: { type: String, required: true },
    amount: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export default model('Gift', GiftSchema);
