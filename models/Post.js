// import mongoose from 'mongoose';
// const postSchema = new mongoose.Schema({
//   content: {
//     type: String,
//     required: true
//   },
//   createdByName:{
//      type: String,
//     required: true
//   },
//   createdBy:{
//     type: mongoose.Schema.Types.ObjectId, ref: "users", required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// export const posts=mongoose.model('posts',postSchema);

import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Make sure this matches your User model name
    },
    createdByName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
