import { token } from 'morgan';
import userSchema from '../schemas/userSchema.js';
import { createUser, verifyUserCredentials, getUserById } from '../models/auth.model.js';
import { createAccesToken } from '../libs/jwt.js';
import { catchedAsync, response } from '../middlewares/catchedAsync.js';

export const register = catchedAsync(async (req, res) => {
  const { error, value } = userSchema.validate(req.body);
  if (error) {
    const err = new Error(error.details[0].message);
    err.statusCode = 400;
    throw err;
  }
  const { name, email, password } = value;
  const user = await createUser(name, email, password);
  const tokens = await createAccesToken({ id: user.id });
  res.cookie('token', tokens, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict'
  });
  response(res, 201, { user, tokens });
});

export const login = catchedAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await verifyUserCredentials(email, password);
  if (!user) {
    const err = new Error('Credenciales incorrectas');
    err.statusCode = 401;
    throw err;
  }
  const token = await createAccesToken({ id: user.id });
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict'
  });
  response(res, 200, { user, token });
});

export const logout = catchedAsync(async (req, res) => {
  res.cookie('token', '', {
    expires: new Date(0),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict'
  });
  response(res, 404, token);
});

export const profile = catchedAsync(async (req, res) => {
  const user = await getUserById(req.user.id);
  response(res, 404, user);
});
