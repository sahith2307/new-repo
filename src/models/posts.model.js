const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const feedSchema = new Schema(
  {
    createdBy: { type: Schema.Types.ObjectId, ref: "user" },
    image: { type: String, required: true },
    caption: { type: String, required: false },
    likes: {
      type: Array,
      required: false,
    },
  },
  { timestamps: true }
);
const Posts = mongoose.model("post", feedSchema);
module.exports = Posts;
