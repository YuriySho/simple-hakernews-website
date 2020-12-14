import axios from 'axios';

import { createAction } from 'redux-actions';
import { parse, parseComments, parseStory } from '../parse';
import { urlAllNews, createUrlStory, urlComment } from '../urls';

export const fetchNewsRequest = createAction('NEWS_FETCH_REQUEST');
export const fetchNewsSuccess = createAction('NEWS_FETCH_SUCCESS');
export const fetchNewsFailure = createAction('NEWS_FETCH_FAILURE');

export const fetchStoryRequest = createAction('STORY_FETCH_REQUEST');
export const fetchStorySuccess = createAction('STORY_FETCH_SUCCESS');
export const fetchStoryFailure = createAction('STORY_FETCH_FAILURE');

export const fetchCommentsRequest = createAction('COMMENTS_FETCH_REQUEST');
export const fetchCommentsSuccess = createAction('COMMENTS_FETCH_SUCCESS');
export const fetchCommentsFailure = createAction('COMMENTS_FETCH_FAILURE');

export const fetchNews = () => async (dispatch) => {
  dispatch(fetchNewsRequest());
  try {
    const res = await axios.get(urlAllNews);
    const response = res.data.slice(0, 100);
    const data = await Promise.all(
      response.map(async (item) => {
        const res = await axios.get(createUrlStory(item));
        return res.data;
      })
    );
    const parseData = parse(data);
    dispatch(fetchNewsSuccess({ news: parseData }));
  } catch (e) {
    dispatch(fetchNewsFailure());
    throw e;
  }
};

export const fetchStory = (id) => async (dispatch) => {
  dispatch(fetchStoryRequest());
  try {
    const urlStory = createUrlStory(id);
    const response = await axios.get(urlStory);
    const parseData = parseStory(response.data);
    dispatch(fetchStorySuccess({ activeStory: parseData }));
  } catch (e) {
    dispatch(fetchStoryFailure());
    throw e;
  }
};

export const fetchComments = (idComments) => async (dispatch) => {
  dispatch(fetchCommentsRequest());
  try {
    const data = await Promise.all(
      idComments.map(async (item) => {
        const res = await axios.get(urlComment(item));
        return res.data;
      })
    );
    const parseData = parseComments(data);
    dispatch(fetchCommentsSuccess({ comments: parseData }));
  } catch (e) {
    dispatch(fetchCommentsFailure());
    throw e;
  }
};
