const Comments = require("../models/comments.model");
const {
  createComment,
  getPostComments,
  userLikeComment,
  userDislikeComment,
  replyToComment,
} = require("../services/comments.service");

//post comment function
const postComment = async (req, res, next) => {
  const { id } = req.user;
  const { postId } = req.params;
  const { comment } = req.body;

  try {
    await createComment(id, postId, comment);
    res.status(201).send({ message: "comment posted successfully" });
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

//this function will get comments according to post(postId)
const getComments = async (req, res, next) => {
  const { postId } = req.params;

  try {
    const comments = await getPostComments(postId);
    res.status(200).send({ comments });
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

//this function will edit comment
const updateComment = async (req, res, next) => {
  const { postId, commentId } = req.params;
  const { comment } = req.body;
  const { id } = req.user;
  try {
    const commenter = await Comments.updateOne(
      {
        $and: [{ createdBy: id }, { postId: postId }, { _id: commentId }],
      },
      { $set: { comment: comment } }
    );
    if (!commenter) {
      res.status(400).send("user doesn't have access to update");
    }
    res.status(200).send({ message: "post updated successfully" });
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

//This function will Add like to function (pull method)
const likeComment = async (req, res, next) => {
  const { _id } = req.user;
  const { commentId } = req.params;
  try {
    await userLikeComment(_id, commentId);
    res.status(200).send({ like: true, message: "you have liked" });
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

//this function will Remove like to function (pullAll method)

const dislikeComment = async (req, res, next) => {
  const { _id } = req.user;
  const { commentId } = req.params;
  try {
    await userDislikeComment(_id, commentId);
    res.status(202).send({ like: false, message: "you have disliked" });
  } catch (error) {
    error.status = 400;
    next(error);
  }
};
// it will delete comment
const deleteComment = async (req, res, next) => {
  const { commentId } = req.params;
  const { id } = req.user;
  try {
    const commentDel = await Comments.findOneAndDelete({
      $and: [{ createdBy: id }, { _id: commentId }],
    });
    if (!commentDel) {
      res.status(400).send({ massage: "params is not valid" });
    } else {
      res.status(204).send({ massage: "comment Deleted" });
    }
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

// it will create replay to comment

const replyComment = async (req, res, next) => {
  const { commentId, postId } = req.params;
  const { id } = req.user;
  const { comment } = req.body;
  try {
    const reply = await replyToComment(commentId, postId, id, comment, next);
    if (reply) {
      res.status(201).send({ massage: "reply is created" });
    }
  } catch (error) {
    error.status = 400;
    next(error);
  }
};
module.exports = {
  postComment,
  getComments,
  likeComment,
  dislikeComment,
  replyComment,
};
