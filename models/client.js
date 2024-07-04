import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const clientSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
}, {
  timestamps: true,
});

clientSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const Client = mongoose.models.Client || mongoose.model("Client", clientSchema);

export default Client;
