export const parse = (data) => {
  return data.map((el) => {
    const title = el.title;
    const score = el.score;
    const author = el.by;
    const id = el.id;
    const time = new Date(el.time * 1000).toLocaleString();
    return { title, score, author, time, id };
  });
};

export const parseStory = (data) => {
  const url = data.url;
  const title = data.title;
  const time = new Date(data.time * 1000).toLocaleString();
  const author = data.by;
  const countComments = data.descendants;
  const listComments = data.kids;
  return { url, title, time, author, countComments, listComments };
};

export const parseComments = (data) => {
  return data.map((el) => {
    const idComment = el.id;
    const date = new Date(el.time * 1000).toLocaleString();
    const text = el.text;
    const kids = el.kids;
    return { date, text, kids, idComment };
  });
};
