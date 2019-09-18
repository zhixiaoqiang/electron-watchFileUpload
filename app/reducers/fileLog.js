// @flow
import { SET_FILE_LOG, RESET_FILE_LOG, SET_FILE_LOG_RESULT } from '../actions/fileLog';
import type { Action } from './types';

export default function fileLog(state: any = {}, action: Action) {
  switch (action.type) {
    case SET_FILE_LOG:
      let curFileLog = state.fileLog || []
      return {
        ...state,
        fileLog: [ ...curFileLog, action.data ]
      };
    case SET_FILE_LOG_RESULT:
      let { path, message } = action.data
      state.fileLog.filter(item => (item.text === path) && item.type === 'new')[0].result = message || '未知'
      return {
        ...state,
        fileLog: [ ...state.fileLog]
      }
    case RESET_FILE_LOG:
      return {
        ...state,
        fileLog: []
      };
    default:
      return state;
  }
}
