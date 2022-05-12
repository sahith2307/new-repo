const Posts = require("../models/posts.model");

const queryPosts = async (filter, options) => {
  const posts = await Posts.paginate(filter, options);
  return posts;
};
module.exports = {
  queryPosts,
};
