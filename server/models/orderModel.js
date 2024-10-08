import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema(
  {
    orderItems: [
      {
        slug: { type: String, required: true },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        interest: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
      },
    ],
    bankDetails: {
      fullName: { type: String, required: true },
      bank: { type: String, required: true },
      accountNum: { type: String, required: true },
      // postalCode: { type: String, required: true },
      // country: { type: String, required: true },
    },
    // shippingAddress: {
    //   fullName: { type: String, required: true },
    //   address: { type: String, required: true },
    //   city: { type: String, required: true },
    //   postalCode: { type: String, required: true },
    //   country: { type: String, required: true },
    // },
    paymentMethod: { type: String, required: true },
    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email_address: String,
    },
    itemsPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isPaid: { type: Boolean, default: false },
    isDue: { type: Boolean, default: false },
    paidAt: { type: String, required: true },
    dueAt: { type: String, required: true },
    payReceived: { type: Boolean, default: false },

    // isDelivered: { type: Boolean, default: false },
    // deliveredAT: { type: Date },
  },
  { timestamps: true }
)

const Order = mongoose.model('Order', orderSchema)

export default Order
