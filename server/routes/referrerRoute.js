import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const userRouter = express.Router()

userRouter.get('/referrer', async (req, res) => {
  const referrer = await User.find({ phone: req.body.phone })
  res.send(referrer)
})

export default referrerRoutes
