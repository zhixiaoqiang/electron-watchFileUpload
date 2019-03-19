// @flow
import type { GetState, Dispatch } from '../reducers/types';

export const SET_FILE_LOG = 'SET_FILE_LOG';
export const SET_FILE_LOG_RESULT = 'SET_FILE_LOG_RESULT';
export const RESET_FILE_LOG = 'RESET_FILE_LOG';

export function setFileLog(data) {
  return {
    type: SET_FILE_LOG,
    data
  }
}

export function setFileLogResult(data) {
  return {
    type: SET_FILE_LOG_RESULT,
    data
  }
}

export function resetFileLog() {
  return {
    type: RESET_FILE_LOG,
    data: []
  }
}

// export function incrementIfOdd() {
//   return (dispatch: Dispatch, getState: GetState) => {
//     const { counter } = getState();

//     if (counter % 2 === 0) {
//       return;
//     }

//     dispatch(setFileLog());
//   };
// }
