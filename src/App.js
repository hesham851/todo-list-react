import './App.css';
import TodoList from './componants/todolist';
import { useContext } from 'react';
import { Todocontext } from './contexts/todoscontexts';
import Tasks from './componants/tasks';
import { useState } from 'react';
import { v4 as uu} from 'uuid';
import { useEffect } from 'react';

function App() {

  const tasksarry=[
          {
              id:uu(),
              titele:"",
              
              info:"",
              isdone:false
          }, 
      ]


  const[inatailstat , setinatailstat]=useState(tasksarry)

useEffect(()=>{

  let infoob=JSON.parse(localStorage.getItem("todos")) 

  if(infoob){
  setinatailstat(infoob)

  }

},[])
       

  return (
    <div >

      <Todocontext.Provider value={{ inatailstat , setinatailstat }}>
      <TodoList/>
      </Todocontext.Provider>
 
    </div>
  );
}

export default App;
