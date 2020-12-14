import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const newsFetchingState = handleActions(
  {
    [actions.fetchNewsRequest]() {
      return 'requested';
    },
    [actions.fetchNewsFailure]() {
      return 'failed';
    },
    [actions.fetchNewsSuccess]() {
      return 'finished';
    },
  },
  'none'
);

const storyFethingState = handleActions(
  {
    [actions.fetchStoryRequest]() {
      return 'requested';
    },
    [actions.fetchStoryFailure]() {
      return 'failure';
    },
    [actions.fetchStorySuccess]() {
      return 'finished';
    },
  },
  'none'
);

const news = handleActions(
  {
    [actions.fetchNewsSuccess](state, { payload }) {
      return payload.news;
    },
  },
  []
);

const comments = handleActions(
  {
    [actions.fetchCommentsSuccess](state, { payload }) {
      return payload.comments;
    },
  },
  []
);

const activeStory = handleActions(
  {
    [actions.fetchStorySuccess](state, { payload }) {
      return payload.activeStory;
    },
  },
  []
);

export default combineReducers({
  newsFetchingState,
  storyFethingState,
  news,
  activeStory,
  comments,
});
