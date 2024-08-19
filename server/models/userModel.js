import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, maxLength: 30 },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    referredBy: { type: String },
    isAdmin: { type: Boolean, default: false, required: true },
    bonus: { type: Number, default: 0 },
    // username: { type: String, required: true },
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'User',
    //   // required: true,
    // },
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model('User', userSchema)

export default User
