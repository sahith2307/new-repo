const Posts = require("../models/posts.model");

const queryPosts = async (filter, options) => {
  const posts = await Posts.paginate(filter, options);
  return posts;
};
const getPostsByUserId = async (filter, options) => {
  const posts = await Posts.paginate(filter, options);
  return posts;
};

const userLikePost = async (userId, postId) => {
  await Posts.updateOne(
    { _id: postId },
    {
      $push: { likes: { id: userId } },
    }
  );
};
const userDislikePost = async (userId, postId) => {
  await Posts.updateOne(
    { _id: postId },
    {
      $pullAll: { likes: [{ id: userId }] },
    }
  );
};
module.exports = {
  queryPosts,
  getPostsByUserId,
  userLikePost,
  userDislikePost,
};
