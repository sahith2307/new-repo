const comments = require("../models/comments.model");

const createComment = async (userId, postId, comment) => {
  const newComment = new comments({
    createdBy: userId,
    postId: postId,
    comment: comment,
  });
  await newComment.save();
};
const getPostComments = async (postId) => {
  const postComments = await comments
    .find({
      $and: [{ postId: postId }, { commentId: { $exists: false } }],
    })
    .populate({ path: "createdBy", select: "_id name image" })
    .sort({ createdAt: -1 });
  return postComments;
};

const userLikeComment = async (userId, commentId) => {
  await comments.updateOne(
    { _id: commentId },
    {
      $push: { likes: { id: userId } },
    }
  );
};
const userDislikeComment = async (userId, commentId) => {
  await comments.updateOne(
    { _id: commentId },
    {
      $pullAll: { likes: [{ id: userId }] },
    }
  );
};
module.exports = {
  createComment,
  getPostComments,
  userLikeComment,
  userDislikeComment,
};
