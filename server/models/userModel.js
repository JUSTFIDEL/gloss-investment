import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, maxLength: 30 },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    referredBy: { type: String, unique: true },
    isAdmin: { type: Boolean, default: false, required: true },
    // username: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model('User', userSchema)

export default User
