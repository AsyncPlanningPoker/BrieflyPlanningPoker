import { Schema } from 'express-validator';

const createUser: Schema = {
  name: {
    isString: {
      errorMessage: 'Name must be a string',
    },
    isLength: {
      errorMessage: 'Name is required',
      options: { min: 1, max: 55 },
    },
  },
  email: {
    isEmail: {
      bail: true,
    },
  },
  password: {
    isLength: {
      errorMessage: 'Password must contain a maximum of 255 characters and a minimum of 6 characters',
      options: { max: 255, min: 6 },
    },
  },
};

const login: Schema = {
  email: {
    isEmail: {
      bail: true,
    },
  },
  password: {
    isLength: {
      errorMessage: 'Password must contain a maximum of 255 characters and a minimum of 6 characters',
      options: { max: 255, min: 6 },
    },
  },
};

const passRecovery: Schema = {
  email: {
    isEmail: {
      bail: true,
    },
  },
  url: {
    isString: {
      errorMessage: 'Url must be a string',
    },
    isLength: {
      errorMessage: 'Url is required',
    },
  },
};

const passUpdate: Schema = {
  password: {
    isLength: {
      errorMessage: 'Password must contain a maximum of 255 characters and a minimum of 8 characters',
      options: { max: 255, min: 6 },
    },
  },
  token: {
    isString: {
      errorMessage: 'Token must be a string',
    },
    isLength: {
      errorMessage: 'Token is required',
    },
  },
};

const updateUser: Schema = {
  name: {
    optional: true,
    isString: {
      errorMessage: 'Name must be a string',
    },
    isLength: {
      errorMessage: 'Name cannot be empty',
      options: { min: 1, max: 55 },
    },
  },
  oldpassword: {
    optional: true,
    isLength: {
      errorMessage: 'Old password must contain a maximum of 255 characters and a minimum of 6 characters',
      options: { max: 255, min: 6 },
    },
  },
  password: {
    optional: true,
    isLength: {
      errorMessage: 'Password must contain a maximum of 255 characters and a minimum of 6 characters',
      options: { max: 255, min: 6 },
    },
  },
};

export { createUser, login, passRecovery, passUpdate, updateUser };
