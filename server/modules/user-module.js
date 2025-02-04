import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  email: { type: String, unique: true, require: true },
  password: { type: String, require: true },
  isActived: { type: Boolean, default: false },
  activationLink: { type: String },
});

export default model('User', UserSchema);
