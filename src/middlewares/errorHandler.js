export class ClientError extends Error {
    constructor(message, status = 400) {
        super(message);
        this.statusCode = status;
    }
}

export class ValidationError extends ClientError {
    constructor(message) {
        super(message, 400);
    }
}

export class CredentialError extends ClientError {
    constructor(message) {
        super(message, 401);
    }
}

export const catchedAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    }
};

export const errorHandler = (err, req, res, next) => {
    if (err.statusCode) {
        // Errores personalizados
        res.status(err.statusCode).json({ error: err.message });
    } else {
        // Errores del servidor
        console.error(err.stack);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

