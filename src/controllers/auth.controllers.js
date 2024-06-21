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
  res.cookie('token', tokens);
  response(res, 201, { id: user.id, email: user.email, tokens });
});

export const login = catchedAsync(async (req, res) => {
  const { email, password } = req.body;
  const userFound = await verifyUserCredentials(email, password);
  if (!userFound) {
    const err = new Error('Credenciales incorrectas');
    err.statusCode = 401;
    throw err;
  }
  const token = await createAccesToken({ id: userFound.id });
  res.cookie('token', token);
  response(res, 200, { id: userFound.id, email: userFound.email, token });
});

export const logout = catchedAsync(async (req, res) => {
  res.cookie('token', "", {
    expires: new Date(0)
  });
  res.sendStatus(200);
});

export const profile = catchedAsync(async (req, res) => {
  const userFound = await getUserById(req.user.id);
  response(res, 404, {
    id: userFound.id,
    name: userFound.name,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  });
});
