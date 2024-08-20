import express from 'express'
import User from '../models/userModel.js'
import expressAsyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import { generateToken, isAuth } from '../utils.js'

const userRouter = express.Router()

userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email })

    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          referredBy: user.referredBy,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        })
        return
      }
    }
    res.status(401).send({ message: 'Invalid email or password' })
  })
)

userRouter.post(
  '/signup',
  expressAsyncHandler(async (req, res) => {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      referredBy: req.body.referredBy,
      password: bcrypt.hashSync(req.body.password),
    })
    const user = await newUser.save()
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      referredBy: user.referredBy,
      isAdmin: user.isAdmin,
      bonus: user.bonus,
      token: generateToken(user),
    })
  })
)

userRouter.put(
  '/profile',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      user.phone = req.body.phone || user.phone
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8)
      }

      const updatedUser = await user.save()
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      })
    } else {
      res.status(404).send({ message: 'User not found' })
    }
  })
)

// userRouter.get(
//   '/refs',
//   expressAsyncHandler(async (req, res) => {
//     const user = await User.findById(req.user._id)

//     const id = await User.find({ referredBy: '08121146164' })

//     res.send(refs)
//   })
// )

userRouter.get(
  '/my/:referrerId',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    // const { referrerId } = req.query // Extract query parameters
    // const referrerId = req.params.referrerId // Extract query parameters

    const referrerData = await User.find({ referredBy: req.params.referrerId })
    if (referrerData) {
      res.send(referrerData)
    } else {
      res.status(404).send({ message: 'No Referrer yet' })
    }
  })
)

userRouter.get(
  '/all',
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({})

    res.send(users)
  })
)

export default userRouter

// app.get('/api/users', async (req, res) => {
//   const { age, name } = req.query; // Extract query parameters
//   const filter = {};

//   if (age) filter.age = age; // Add age to filter if provided
//   if (name) filter.name = name; // Add name to filter if provided

//   try {
//       const users = await User.find(filter); // Perform the query
//       res.json(users);
//   } catch (error) {
//       res.status(500).send(error);
//   }
// });

// To list users with a particular Mongoose value associated with another user in the database, you can use the populate() method in Mongoose. This allows you to reference documents from other collections and fetch related data. You can set up your schema to establish relationships and then perform a query that populates the associated documents based on the specified value.

// Here's a simplified example:

// User.find({ someField: 'desiredValue' })
//     .populate('relatedUserField') // Replace with the actual field name
//     .exec(function (err, users) {
//         if (err) return handleError(err);
//         console.log(users);
//     });
// Make sure to customize the query and fields based on your specific schema and requirements.
