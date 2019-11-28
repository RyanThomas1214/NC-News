exports.formatDates = list => {
  const formattedArticle = [];
  list.forEach(article => {
    formattedArticle.push({
      ...article,
      created_at: new Date(article.created_at)
    });
  });
  return formattedArticle;
};

exports.makeRefObj = list => {
  const refObj = {};
  list.forEach(article => {
    refObj[article.title] = article.article_id;
  });
  return refObj;
};

exports.formatComments = (comments, articleRef) => {
  const formattedComments = [];
  comments.forEach(comment => {
    formattedComments.push({
      body: comment.body,
      article_id: articleRef[comment.belongs_to],
      author: comment.created_by,
      votes: comment.votes,
      created_at: new Date(comment.created_at)
    });
  });
  return formattedComments;
};
