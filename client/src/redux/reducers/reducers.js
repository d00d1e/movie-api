import { combineReducers } from "redux";

import {
  SET_FILTER,
  SET_MOVIES,
  SET_USER,
  TOGGLE_FAVORITE,
} from "../actions/actions";

function visibilityFilter(state = "", action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

function userProfile(state = null, action) {
  switch (action.type) {
    case SET_USER:
      return action.value;
    default:
      return state;
  }
}

function favorites(state = [], action) {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      return action.value;
    default:
      return state;
  }
}

const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  userProfile,
  favorites,
});

export default moviesApp;
