import React from 'react'
import {TextField, Button , CssBaseline, Box, Container, Typography, Divider } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Tasks from './tasks';
import { v4 as uu} from 'uuid';
import { useState } from 'react';
import { useContext } from 'react';
import { Todocontext } from '../contexts/todoscontexts';

export default function TodoList() {
    

  const cont1=useContext(Todocontext)

  const[inputstat,setinputstat]=useState("")


  const[todotype,settodotype]=useState("ALL")

  function typechange(e){
    settodotype(e.target.value)
  }

  const fineshedtodos=cont1.inatailstat.filter((t)=>{
    return t.isdone
  })

    const notfineshedtodos=cont1.inatailstat.filter((t)=>{
    return !t.isdone
  })

  let rendertodo=cont1.inatailstat


  if(todotype==="ALL"){

   
    // const showtask=cont1.inatailstat.map((t)=>{
    //     return <Tasks tas={t} /> ;
    // })

  }else if (todotype==="Finished") {

     rendertodo=fineshedtodos
    
  } else {
      rendertodo=notfineshedtodos
  }

 const showtask=rendertodo.map((t)=>{
        return <Tasks tas={t} /> ;
    })

    





    function clickfun(){
      const newarry={
            id:uu(),
            titele:inputstat,
            info:"",
            isdone:false

      }

      const newdata=[...cont1.inatailstat,newarry]


      cont1.setinatailstat(newdata)

      localStorage.setItem("todos",JSON.stringify(newdata))

      

      setinputstat("")
    } 




    

  return (

   

    <div>
     
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: '#dddcdc62', mt:"35px" , maxHeight: "88vh",overflowY: "auto"}}
       
        >
        <Typography variant='h4' align='center' component="h2" pt="15px"> Todo List</Typography>
        <Divider />

      <ToggleButtonGroup
      color="primary"
      sx={{ml:"147px", mt:"25px"}}
      value={todotype}
      onChange={typechange}
        exclusive
    >
      <ToggleButton value="ALL">ALL</ToggleButton>
      <ToggleButton value="Finished">Finished</ToggleButton>
      <ToggleButton value="UnFinished">UnFinished</ToggleButton>
    </ToggleButtonGroup>

   
       {showtask}
       



      <Button

      onClick={()=>{clickfun()}}
       sx={{mt:"40px", ml:"25px", width:"130px ", height:"55px", mb:"15px"}} variant="contained"  
       disabled={inputstat.length==0}
       >
        ADD

        
        </Button>

       <TextField  sx={{mt:"40px", ml:"25px" ,  width:"340px ", height:"50px"}}  label="NEW TASK" variant="outlined"
       value={inputstat}
       onChange={(e)=>{setinputstat(e.target.value)}}
       />


         
        
      
         </Box>
      </Container>

    
    </div>
  )
}
