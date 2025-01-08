import { useState, useEffect } from "react"; //*Hooks de react
import axios from "axios"; //*Axios para hacer peticiones HTTP

const BASE_URL = "http://localhost:3000/usuarios/";

const App = () => {
  const [users, setUsers] = useState([]); //*Estado para almacenar los usuarios
  const [newName, setNewName] = useState(""); //*Estado para almacenar el nombre del usuario
  const [newEmail, setNewEmail] = useState(""); //*Estado para almacenar el email del usuario

  //*Función para obtener los usuarios
  useEffect(() => {
    axios.get(`${BASE_URL}`)
      .then((res) => {
        setUsers(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log('Error al obtener los usuarios', err);
      })
  }, []);

  //*Función para agregar un usuario
  const handleCreate = () => {
    if (nombre.trim() && email.trim()) {
      axios.post(`${BASE_URL}add`, {
        nombre: newName,
        email: newEmail
      }).then((res) => {
        setNewName("");
        setUsers((prevUsers) => [...prevUsers, res.data]);
        setNewEmail("");
      }).catch((err) => {
        console.log('Error al agregar usuario', err);
      });
    }
  };

  //*Función para eliminar un usuario
  const handleDelete = (id) => {
    axios.delete(`${BASE_URL}delete/${id}`)
      .then(() => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      })
      .catch((err) => {
        console.log('Error al eliminar usuario', err);
      });
  };

  //*Función para actualizar un usuario
  const handleUpdate = (id, nombre, email) => {
    const newName = prompt('Ingrese el nuevo nombre', nombre);
    const newEmail = prompt('Ingrese el nuevo email', email);

    if (newName !== nombre && newEmail !== email) {
      axios.put(`${BASE_URL}update/${id}`, {
        nombre: newName,
        email: newEmail
      }).then(() => {
        setUsers((prevUsers) => {
          prevUsers.map((user) => {
            user.id === id ? { ...user, nombre: newName, email: newEmail } : user
          })
        });
      }).catch((err) => {
        console.log('Error al actualizar usuario', err);
      });
    }
  };



};