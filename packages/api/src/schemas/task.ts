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

export { createTask };
