import { token } from 'morgan';
import userSchema from '../schemas/userSchema.js';
import { createUser, verifyUserCredentials, getUserById } from '../models/auth.model.js';
import { createAccesToken } from '../libs/jwt.js';

export const register = async (req, res) => {
  try {
    const { error, value } = userSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message}); 
    const { name, email, password } = value;
    const user = await createUser(name, email, password);
    const tokens = await createAccesToken({ id: user.id });
    res.cookie('token', tokens)
    return res.status(201).json({ id: user.id, name: user.name, email: user.email,});
  } catch (error) {
    return res.status(500).json({ message: 'Error registrando usuario', detail: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFound = await verifyUserCredentials(email, password);
    if (!userFound)  return res.status(401).json({ message: 'Credenciales incorrectas' });
    const token = await createAccesToken({ id: userFound.id });
    res.cookie('token', token)
    return res.status(201).json({ id: userFound.id, email: userFound.email,});
  } catch (err) {
    res.status(500).json({message: "Error login usuarios"});
  }
};

export const logout = async (req, res) => {
  res.cookie('token', "", {
    expires: new Date(0)
  })
  return  res.sendStatus(200)
};

export const profile = async (req, res) => {
  const userFound =  await getUserById(req.user.id);
  if (!userFound)  return res.status(400).json({ message: "User not found" });
  return res.json({
    id: userFound.id,
    name: userFound.name,
    email: userFound.email,
    createdat: userFound.createdat,
    updatedat: userFound.updatedat,
  });
};
