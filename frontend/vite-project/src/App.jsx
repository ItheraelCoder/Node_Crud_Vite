import { useState, useEffect } from "react"; //*Hooks de react
import axios from "axios"; //*Axios para hacer peticiones HTTP

const BASE_URL = "http://localhost:3001/users";

const App = () => {
  const [users, setUsers] = useState([]); //*Estado para almacenar los usuarios
  const [newName, setNewName] = useState(""); //*Estado para almacenar el nombre del usuario
  const [newEmail, setNewEmail] = useState(""); //*Estado para almacenar el email del usuario

  //*Función para obtener los usuarios
  useEffect(() => {
    axios.get(`${BASE_URL}`)
      .then((res) => {
        setUsers(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log('Error al obtener los usuarios', err);
      })
  }, []);

  //*Función para agregar un usuario
  const handleCreate = () => {
    if (newName.trim() && newEmail.trim()) {
      axios.post(`${BASE_URL}/add`, {
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
    axios.delete(`${BASE_URL}/delete/${id}`)
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

    // Verificar que los valores no sean null y que hayan cambiado
    if (newName && newEmail && (newName !== nombre || newEmail !== email)) {
      axios.put(`${BASE_URL}/update/${id}`, {  
        nombre: newName,
        email: newEmail
      })
      .then(() => {
        setUsers(prevUsers => 
          prevUsers.map(user => 
            user.id === id 
              ? { ...user, nombre: newName, email: newEmail } 
              : user
          )
        );
        // Opcional: Mostrar mensaje de éxito
        alert('Usuario actualizado correctamente');
      })
      .catch((err) => {
        console.error('Error al actualizar usuario:', err);
        alert('Error al actualizar usuario');
      });
    }
  };

  return (
    <div>
      <h1>Crud Node y React usando Vite</h1>
      <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Nombre" />
      <input type="text" value={newEmail} onChange={(e)=> setNewEmail(e.target.value)} placeholder="Email"/>
      <button onClick={handleCreate}>Agregar</button>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <span style={{marginRight: '10px'}}>{user.id}</span>
            <span style={{marginRight: '10px'}}>{user.nombre}</span>
            <span style={{marginRight: '10px'}}>{user.email}</span>
            <button onClick={() => handleDelete(user.id)}>Eliminar</button>
            <button onClick={() => handleUpdate(user.id, user.nombre, user.email)}>Actualizar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;//*Exportamos el componente App