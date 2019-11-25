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

exports.formatComments = (comments, articleRef) => {};
