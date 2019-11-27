const { addComment } = require("../models/comments-model");

exports.postComment = (req, res, next) => {
  console.log("Posting comment");
  addComment();
};
