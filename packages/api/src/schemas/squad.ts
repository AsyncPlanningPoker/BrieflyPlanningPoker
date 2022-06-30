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
  users: {
    isArray: {
      bail: true,
    },
  },
  'users.*.id': {
    isString: {
      errorMessage: 'User id must be a string',
    },
    isLength: {
      errorMessage: 'User id is required',
      options: { min: 1 },
    },
  },
  currentMaxRounds: {
    isNumeric: {
      errorMessage: 'currentMaxRounds must hve a numeric value',
    },
    isLength: {
      errorMessage: 'currentMaxRounds is required',
    },
  },
  currentPercentual: {
    isNumeric: {
      errorMessage: 'currentPercentual must hve a numeric value',
    },
    isLength: {
      errorMessage: 'currentPercentual is required',
    },
  },
};

const updateSquad = {
  name: {
    isString: {
      errorMessage: 'Name must be a string',
    },
  },
  currentMaxRounds: {
    isNumeric: {
      errorMessage: 'currentMaxRounds must hve a numeric value',
    },
  },
  currentPercentual: {
    isNumeric: {
      errorMessage: 'currentPercentual must hve a numeric value',
    },
  },
};

const members: Schema = {
  users: {
    isArray: {
      bail: true,
    },
  },
  'users.*.id': {
    isString: {
      errorMessage: 'User id must be a string',
    },
    isLength: {
      errorMessage: 'User id is required',
      options: { min: 1 },
    },
  },
};

export { createSquad, updateSquad, members };
