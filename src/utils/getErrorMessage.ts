import {ErrorMessage} from '../models';

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
};

const reportError = ({message}: ErrorMessage) => {
  throw new Error(message);
};

export {reportError, getErrorMessage};
