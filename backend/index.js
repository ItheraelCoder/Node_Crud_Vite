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
    db.query('SELECT * FROM usuarios', (err, result) => { if (err) throw err; res.json(result) })
})

//metodo para agregar usuarios a la base de datos
app.post('/users/add', (req, res) => {
    const { nombre, email } = req.body;
    const query = `INSERT INTO usuarios (nombre, email) VALUES ('${nombre}', '${email}')`;
    db.query(query, [nombre, email], (err, result) => {
        if (err) {
            res.status(500).send({ error: 'Error al agregar usuario' });
        } else {
            res.status(201).send.json(
                {
                    message: 'Usuario agregado correctamente',
                    id: result.insertId,
                    nombre,
                    email
                }
            );
        }
    })
});

//metodo para eliminar usuarios de la base de datos
app.put('/users/update/:id', (req, res) => {
    const id = req.params.id;
    const { nombre, email } = req.body;
    const query = `UPDATE usuarios SET nombre = '${nombre}', email = '${email}' WHERE id = ${id}`;
    db.query(query, [nombre, email], (err, result) => {
        if (err) {
            res.status(500).send({ error: 'Error al actualizar usuario' });
        } else {
            res.status(200).send.json(
                {
                    message: 'Usuario actualizado correctamente',
                    id,
                    nombre,
                    email
                }
            );
        }
    })
});

//metodo para eliminar usuarios de la base de datos
app.delete('/users/delete/:id', (req, res) => {
    const id = req.params.id;
    const query = `DELETE FROM usuarios WHERE id = ${id}`;
    db.query(query, (err, result) => {
        if (err) {
            res.status(500).send({ error: 'Error al eliminar usuario' });
        } else {
            res.send.json(
                {
                    message: 'Usuario eliminado correctamente',
                    id
                }
            );
        }
    })
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));