// models/User.js
import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    required:true
  },
});
const User = models.User || model("User", UserSchema);
export default User;
