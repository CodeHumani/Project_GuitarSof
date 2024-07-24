import app from './config/app.js'
import pool from './config/db.js'  // Asegúrate de que la ruta sea correcta
import errorHandler from './middlewares/catchedAsync.js';

pool.connect()
    .then(() => console.log("Conectado Exitosamente a la base de datos"))
    .catch(err => console.error("Error conectando a la base de datos", err.stack))

app.use(errorHandler);

app.listen(3000)

app.use((req, res, next) => {
    res.status(404).json({ error: 'Not Found' });
});

console.log('Server on port', 3000)
