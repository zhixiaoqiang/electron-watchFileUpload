// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import counter from './counter';
import fileLog from './fileLog';

export default function createRootReducer(history: History) {
  return combineReducers<{}, *>({
    router: connectRouter(history),
    counter,
    fileLog
  });
}
