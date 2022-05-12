const { response } = require("express");
const Posts = require("../models/posts.model");
const { queryPosts } = require("../services/posts.service");
const { uploadToCloudinary } = require("../services/upload.service");
const pick = require("../utils/pick");

const uploadPost = async (req, res, next) => {
  const { caption } = req.body;
  let localFilePath = req.file.path;
  console.log(req.user);
  let result = await uploadToCloudinary(localFilePath, "feedImages");
  const dataPost = {
    image: result.url,
    caption: caption,
    likes: [],
    createdBy: req.user.id,
  };
  try {
    const newPost = new Posts(dataPost);
    await newPost.save();
    res.status(201).send({ message: "uploaded successfully" });
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

const getAllPosts = async (req, res, next) => {
  const filter = pick(req.query, ["name", "role"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const posts = await queryPosts(filter, { ...options });
  res.status(200).send(posts);
};

module.exports = {
  uploadPost,
  getAllPosts,
};
