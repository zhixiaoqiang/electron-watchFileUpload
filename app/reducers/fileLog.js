// @flow
import ActionTypes from '../constants/fileLog';
import type { Action } from './types';

export default function fileLog(state: any = {}, action: Action) {
  switch (action.type) {
    case ActionTypes.SET_FILE_LOG:
      console.warn(action);
      const curFileLog = state.fileLog || [];
      return {
        ...state,
        fileLog: [...curFileLog, action.data]
      };
    case ActionTypes.SET_FILE_LOG_RESULT:
      const { path, message } = action.data;
      state.fileLog.filter(
        item => item.text === path && item.type === 'new'
      )[0].result = message || '识别成功';
      return {
        ...state,
        fileLog: [...state.fileLog]
      };
    case ActionTypes.RESET_FILE_LOG:
      return {
        ...state,
        fileLog: []
      };
    default:
      return state;
  }
}
