import mongoose from 'mongoose'

const referrerSchema = new mongoose.Schema(
  {
    referredBy: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          // required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
)

const Referrer = mongoose.model('Referrer', referrerSchema)

export default Referrer
