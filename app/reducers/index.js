// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import fileLog from './fileLog';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    fileLog
  });
}
