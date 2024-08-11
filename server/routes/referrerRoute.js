// import express from 'express'
// import User from '../models/userModel.js'
// import Referrer from '../models/referrerModel.js'
// import expressAsyncHandler from 'express-async-handler'
// import { generateToken, isAuth } from '../utils.js'

// const referrerRouter = express.Router()

// referrerRouter.get(
//   '/',
//   isAuth,
//   expressAsyncHandler(async (req, res) => {
//     const user = await User.findById(req.user._id)
//     if (user) {
//       username = user.name
//       email = user.email
//       phone = user.phone
//     }
//     const referrals = await Referrer.find(user.phone)
//     // const filteredValue = req.query.role;
//     // const referrals = await User.find({ referredBy: { $exists: true } }).exec()
//     // const referrals = await User.find({ referredBy: phone })
//     res.send(referrals)
//   })
// )

// export default referrerRouter

// To list users with a particular Mongoose value associated with another user in the database, you can use the populate() method in Mongoose. This allows you to reference documents from other collections and fetch related data. You can set up your schema to establish relationships and then perform a query that populates the associated documents based on the specified value.

// Here's a simplified example:

// User.find({ someField: 'desiredValue' })
//     .populate('relatedUserField') // Replace with the actual field name
//     .exec(function (err, users) {
//         if (err) return handleError(err);
//         console.log(users);
//     });
// Make sure to customize the query and fields based on your specific schema and requirements.
