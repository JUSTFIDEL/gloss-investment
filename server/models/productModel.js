import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    brand: { type: String, required: true },
    rating: { type: Number, required: true },
    numReviews: { type: Number, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
)

// plan?: 'Starter' | 'Silver' | 'Gold' | 'Platinium' | 'Diamond' | 'Master'
// amount?: number
// duration?: string
// naration?: string

const Product = mongoose.model('Product', productSchema)

export default Product
