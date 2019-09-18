import ActionTypes from '../constants/fileLog';

export function setFileLog(data) {
  return {
    type: ActionTypes.SET_FILE_LOG,
    data
  };
}

export function setFileLogResult(data) {
  return {
    type: ActionTypes.SET_FILE_LOG_RESULT,
    data
  };
}

export function resetFileLog() {
  return {
    type: ActionTypes.RESET_FILE_LOG,
    data: []
  };
}
