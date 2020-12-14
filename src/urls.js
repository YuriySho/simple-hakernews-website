export const urlAllNews =
  'https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty';
export const createUrlStory = (id) =>
  `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`;
export const urlComment = (id) =>
  `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`;
