import { Schema } from 'express-validator';
const createTask: Schema = {
  name: {
    isString: {
      errorMessage: 'Name must be a string',
    },
    isLength: {
      errorMessage: 'Name is required',
      options: { min: 1 },
    },
  },
  description: {
    optional: true,
    isString: {
      errorMessage: 'Description must be a string',
    },
  },
};

const vote: Schema = {
  points: {
      isNumeric: {
        errorMessage: 'Points must have a numeric value',
      },
      isLength: {
        errorMessage: 'Points is required',
      },
    },
};

const message: Schema = {
  message: {
    isString: {
      errorMessage: 'Message must be a string',
    },
    isLength: {
      errorMessage: 'Message is required',
      options: { min: 1 },
    },
  },
};

export { createTask, vote, message };
