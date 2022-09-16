import { Schema } from 'express-validator';
const createSquad: Schema = {
  name: {
    isString: {
      errorMessage: 'Name must be a string',
    },
    isLength: {
      errorMessage: 'Name is required',
      options: { min: 1 },
    },
  },
  currentMaxRounds: {
    isNumeric: {
      errorMessage: 'currentMaxRounds must have a numeric value',
    },
    isLength: {
      errorMessage: 'currentMaxRounds is required',
    },
  },
  currentPercentual: {
    isNumeric: {
      errorMessage: 'currentPercentual must have a numeric value',
    },
    isLength: {
      errorMessage: 'currentPercentual is required',
    },
  },
};

const updateSquad: Schema = {
  name: {
    optional: true,
    isString: {
      errorMessage: 'Name must be a string',
    },
  },
  currentMaxRounds: {
    optional: true,
    isNumeric: {
      errorMessage: 'currentMaxRounds must have a numeric value',
    },
  },
  currentPercentual: {
    optional: true,
    isNumeric: {
      errorMessage: 'currentPercentual must have a numeric value',
    },
  },
};

const addMembers: Schema = {
  email: {
    isString: {
      errorMessage: 'Email must be a string',
    },
    isLength: {
      errorMessage: 'Email is required',
      options: { min: 1 },
    },
    isEmail: {
      bail: true,
    },
  },
  owner:{
    isBoolean:{
      errorMessage: 'Owner must be a boolean',
    },
    isLength: {
      errorMessage: 'Owner is required',
      options: { min: 1 },
    },
  }
};

export { createSquad, updateSquad, addMembers };
