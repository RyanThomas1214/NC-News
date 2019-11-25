exports.formatDates = list => {
  if (list.length === 0) return [];
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
  if (list.length === 0) return {};
  const refObj = {};
  list.forEach(article => {
    refObj[article.title] = article.article_id;
  });
  return refObj;
};

exports.formatComments = (comments, articleRef) => {
  if (comments.length === 0) return [];
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
