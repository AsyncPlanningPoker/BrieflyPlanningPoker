import { Schema } from 'express-validator';
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
      options: { min: 1, max: 180 },
    },
  },
};

export { vote, message };
