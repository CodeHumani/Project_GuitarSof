import { createUser, verifyUserCredentials, getUserById } from '../models/auth.model.js';
import { createAccesToken } from '../libs/jwt.js';
import { catchedAsync, response } from '../middlewares/catchedAsync.js';

class AuthController {
    constructor() {}

    register = catchedAsync(async (req, res) => {
        const { name, email, password } = req.body;
        const user = await createUser(name, email, password);
        const tokens = await createAccesToken({ id: user.id });
        res.cookie('token', tokens, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict'
        });
        response(res, 201, { user, tokens });
    });

    login = catchedAsync(async (req, res) => {
        const { email, password } = req.body;
        const user = await verifyUserCredentials(email, password);
        const token = await createAccesToken({ id: user.id });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict'
        });
        response(res, 200, { user, token });
    });

    logout = catchedAsync(async (req, res) => {
        res.cookie('token', '', {
            expires: new Date(0),
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict'
        });
        response(res, 200, { msg: 'Logout successful' });
    });

    profile = catchedAsync(async (req, res) => {
        const user = await getUserById(req.user.id);
        response(res, 200, user);
    });
}

export default new AuthController();
