import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import * as actions from '../actions/index.js';
import { createUrlStory, urlComment } from '../urls';
import { parseStory, parseComments } from '../parse';

const Story = () => {
  let { id } = useParams();
  const story = useSelector((state) => state.activeStory);
  const comments = useSelector((state) => state.comments);
  const storyFethingState = useSelector((state) => state.storyFethingState);
  const dispatch = useDispatch();

  const handleUpdateComments = useCallback(() => {
    dispatch(actions.fetchStory(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(actions.fetchStory(id));
  }, [dispatch, id]);

  const { url, title, time, author, countComments, listComments } = story;

  const [newComments, setNewComments] = useState(null);

  useEffect(() => {
    if (listComments === undefined) {
      return;
    }
    dispatch(actions.fetchComments(listComments));
  }, [dispatch, listComments]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(createUrlStory(id));
        setNewComments(parseStory(res.data));
      } catch (e) {
        throw e;
      }
    };
    const updater = () => {
      setTimeout(fetch, 10000);
    };
    setTimeout(updater, 10000);
    dispatch(actions.fetchStory(id));
    return clearTimeout(updater);
  }, [dispatch, newComments, id]);

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target.style === 'none') {
      e.target.style = 'block';
    } else {
      e.target.style = 'none';
    }
  };

  const renderComments = (listComments) => {
    if (listComments === undefined) {
      return;
    }
    const fetch = async (idComments) => {
      const data = await Promise.all(
        idComments.map(async (item) => {
          const res = await axios.get(urlComment(item));
          return res.data;
        })
      );
      return parseComments(data);
    };
    fetch(listComments);
    if (comments === undefined) {
      return <div>Comments not a found</div>;
    }
    return (
      <div>
        <h1 className="mt-3 mb-3">Comments</h1>
        {comments.map(({ date, text, kids, idComment }) => (
          <div onClick={handleClick} key={idComment} className="card w-100">
            <div className="card-body">
              <p className="card-text">{text}</p>
              <p>{date}</p>
            </div>
            <div style={{ display: 'none' }}>
              {kids === undefined ? null : renderComments(kids)}
            </div>
          </div>
        ))}
      </div>
    );
  };

  if (storyFethingState === 'requested') {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
  if (storyFethingState === 'failed') {
    return (
      <span className="d-flex justify-content-center align-items-center min-vh-100">
        Please, reload page!
      </span>
    );
  }
  if (story.length === 0) {
    return null;
  }

  return (
    <>
      <div className="d-flex justify-content-between w-75">
        <button
          className="btn btn-info mt-3 mb-3"
          onClick={handleUpdateComments}
        >
          Update Comments
        </button>
        <button className="btn btn-info mt-3 mb-3">
          <Link to="/" className="btn btn-info">
            Back to news
          </Link>
        </button>
      </div>
      <div className="card d-flex w-75">
        <h5 className="card-header">{title}</h5>
        <div className="card-body d-flex justify-content-between">
          <div className="align-self-center">
            <span className="card-title text-uppercase">{author}</span>
            <span className="ml-3">|</span>
            <span className="card-text ml-3">comments: {countComments}</span>
            <span className="ml-3">|</span>
            <span className="ml-3">{time}</span>
          </div>
          <button className="btn btn-info ml-auto">
            <a href={url}>Go to story</a>
          </button>
        </div>
      </div>
      {renderComments(comments)}
    </>
  );
};

export default Story;
