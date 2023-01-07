import React, { useState, useEffect } from 'react';
import './styles.css';
import {Card} from '../../componentes/card/index'

export function Home() {
  
  const [studentName, setStudentName] = useState();
  const [students, setStudents] = useState([]);
  const [user, setUser] = useState({name: "", avatar: ""});

  function createId() {
    const newId =  Math.floor((Math.random() * 1000) - (Math.random() * 100));
    return newId;
  }

  function handleAddStudent() {
      const newStudent = {
        key: createId(),
        name: studentName,
        time: new Date().toLocaleTimeString("pt-br", {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      }
      setStudents(prevState => [...prevState, newStudent]);
  }

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://api.github.com/users/devMRNGN");
      const data = await response.json();
      setUser({
        name: data.name,
        avatar: data.avatar_url,
      }) 
    }
    fetchData();
  },[])

  return (
    <div className='container'>
      <header>
        <h1>Lista de Presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Foto de Perfil"/>
        </div>
      </header>

      <input type="text" placeholder="digite seu nome..."onChange={e => setStudentName(e.target.value)}/>

      <button type="button" onClick={handleAddStudent}>Adicionar</button>

      {students.map(student => <Card key={student.key} name={student.name} time={student.time}/>)}
    </div>
  );
}


export default Home;
