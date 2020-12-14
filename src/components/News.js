import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import * as actions from '../actions/index.js';
import { urlAllNews, createUrlStory } from '../urls';
import { parse } from '../parse';

const News = () => {
  const news = useSelector((state) => state.news);
  const newsFetchingState = useSelector((state) => state.newsFetchingState);
  const dispatch = useDispatch();

  const handleUpdateNews = useCallback(() => {
    dispatch(actions.fetchNews());
  }, [dispatch]);

  useEffect(() => {
    dispatch(actions.fetchNews());
  }, [dispatch]);

  const [newStories, setNewStories] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(urlAllNews);
        const response = res.data.slice(0, 100);
        const data = await Promise.all(
          response.map(async (item) => {
            const res = await axios.get(createUrlStory(item));
            return res.data;
          })
        );
        setNewStories(parse(data));
      } catch (e) {
        throw e;
      }
    };
    const updater = () => {
      setTimeout(fetch, 10000);
    };
    setTimeout(updater, 10000);
    dispatch(actions.fetchNews());
    return clearTimeout(updater);
  }, [dispatch, newStories]);

  if (newsFetchingState === 'requested') {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
  if (newsFetchingState === 'failed') {
    return (
      <span className="d-flex justify-content-center align-items-center min-vh-100">
        Please, reload page!
      </span>
    );
  }
  if (news.length === 0) {
    return null;
  }

  return (
    <>
      <button className="btn btn-info mt-3" onClick={handleUpdateNews}>
        Update HakerNews
      </button>
      <div className="mt-3">
        {news.map(({ title, author, score, time, id }) => (
          <div key={id} className="card mt-3 w-75 flex">
            <div className="card-header d-flex justify-content-between">
              <strong className="d-flex align-items-center">{title}</strong>
              <Link
                to={`/${id}`}
                className="btn btn-primary ml-3 d-flex align-items-center"
              >
                to Story
              </Link>
            </div>
            <div className="card-body">
              <span className="card-title text-uppercase">{author}</span>
              <span className="ml-3">|</span>
              <span className="card-text ml-3">score: {score}</span>
              <span className="ml-3">|</span>
              <span className="ml-3">{time}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default News;
