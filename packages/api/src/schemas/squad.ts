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
  'users.*.name': {
    isString: {
      errorMessage: 'User name must be a string',
    },
    isLength: {
      errorMessage: 'User name is required',
      options: { min: 1 },
    },
  },
  'users.*.email': {
    isEmail: {
      bail: true,
    },
    isLength: {
      errorMessage: 'User email is required',
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
  'users.*.name': {
    isString: {
      errorMessage: 'User name must be a string',
    },
    isLength: {
      errorMessage: 'User name is required',
      options: { min: 1 },
    },
  },
  'users.*.email': {
    isEmail: {
      bail: true,
    },
    isLength: {
      errorMessage: 'User email is required',
      options: { min: 1 },
    },
  },
};

const delMembers: Schema = {
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

export { createSquad, updateSquad, addMembers, delMembers };