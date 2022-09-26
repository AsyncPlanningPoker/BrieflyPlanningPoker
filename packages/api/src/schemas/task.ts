import { Schema } from 'express-validator';
const createTask: Schema = {
  name: {
    isString: {
      errorMessage: 'Name must be a string',
    },
    isLength: {
      errorMessage: 'Name is required',
      options: { min: 1, max: 85 },
    },
  },
  description: {
    optional: true,
    isString: {
      errorMessage: 'Description must be a string',
    },
    isLength: {
      errorMessage: 'Name is required',
      options: { max: 300 },
    },
  },
};

export { createTask };
