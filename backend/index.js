const express = require('express');
//TODO hubo que actualizar el modulo mysql a mysql2 
//TODO para poder usar la base de datos con la version actial de mysql
const mysql = require('mysql2');
const cors = require('cors');

//creamos la aplicación de express
const app = express();
app.use(cors());
app.use(express.json());

//creamos la conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Jedwin24865+-',
    database: 'pruebas',
})

//conectamos la base de datos comprobando si hay errores
db.connect((err) => { if (err) throw err; console.log('Database connected') });

//metodo para listar usuarios de la base de datos
app.get('/users', (req, res) => {
    db.query('SELECT * FROM usuarios', (err, result) => { if (err) res.status(500).send({error:'Error al obtener los usuarios'}); res.json(result) })
})

//metodo para agregar usuarios a la base de datos
app.post('/users/add', (req, res) => {
    const { nombre, email } = req.body;
    const query = 'INSERT INTO usuarios (nombre, email) VALUES (?, ?)';
    db.query(query, [nombre, email], (err, results) => {
        if (err) {
            res.status(500).send({ error: 'Error al agregar usuario' });
        } else {
            res.status(201).json({
                id: results.insertId,
                nombre,
                email
            });
        }
    })
});

//metodo para actualizar usuarios de la base de datos
app.put('/users/update/:id', (req, res) => {
    const id = req.params.id; // Corrección aquí
    const { nombre, email } = req.body;
    const query = 'UPDATE usuarios SET nombre = ?, email = ? WHERE id = ?';
    db.query(query, [nombre, email, id], (err, result) => {
        if (err) {
            res.status(500).send({ error: 'Error al actualizar usuario' });
        } else {
            res.status(200).json({
                message: 'Usuario actualizado correctamente',
                id,
                nombre,
                email
            });
        }
    });
});

//metodo para eliminar usuarios de la base de datos
app.delete('/users/delete/:id', (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM usuarios WHERE id = ?'; // Usar parámetros preparados
    db.query(query, [id], (err, result) => { // Solo pasar id una vez
        if (err) {
            res.status(500).send({ error: 'Error al eliminar usuario' });
        } else {
            res.status(204).send();
        }
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));