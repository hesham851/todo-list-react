import React from 'react'
import { IconButton, Box, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import  DeleteIcon from '@mui/icons-material/Delete';
import { useContext } from 'react';
import { Todocontext } from '../contexts/todoscontexts';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useState } from 'react';
import TextField from '@mui/material/TextField';

export default function Tasks({tas}) {
// <chekchange>
  const cont2=useContext(Todocontext)
   function check(id){
          const newcheck= cont2.inatailstat.map((taskchecked)=>{
            if (taskchecked.id === id){
             return { ...taskchecked , isdone: !taskchecked.isdone}
            }else{
              return taskchecked
            }
          })
          cont2.setinatailstat(newcheck)
            localStorage.setItem("todos",JSON.stringify(newcheck))
  }
// </chekchange> 


// <deletchange>
const[closestat,setclosestat]=useState(false)

function handelopen(){

    setclosestat(true)
}

function handleClose(){

    setclosestat(false)
}

function handledelet(id){

const newdelet= cont2.inatailstat.filter((deletedtask)=>{

    return deletedtask.id !== id;

 
}
)
 cont2.setinatailstat(newdelet)
  localStorage.setItem("todos",JSON.stringify(newdelet))
    setclosestat(false);  
}
/* </deletchange> */



/* <editchinge> */

const[editstate,seteditstate]=useState(false)

const[editbox,seteditbox]=useState(tas.titele)

const[editinfobox,seteditinfobox]=useState(tas.titele)

function handalopen(){
  seteditstate(true)
}
function handleClosex(){
  seteditstate(false)
}

function edit(id){

  const newedit=cont2.inatailstat.map((edit1)=>{
    if(edit1.id === id ){
      return {...edit1,titele:editbox,info:editinfobox}
    }else {
      return edit1
    }
  })

cont2.setinatailstat(newedit)
      localStorage.setItem("todos",JSON.stringify(newedit))
  
      seteditstate(false)
}

/* </editchinge> */

return (
    <div>

        <Container maxWidth="sm"  >
        <Box  sx={{ mt:"25px", height: '80px' }} >
           <Grid container spacing={2}  >
        <Grid item xs={4} sx={{bgcolor:"#025186"}}>
            
            <IconButton 
            sx={{color:tas.isdone?"#f2f3f3" : "#0ea500", bgcolor: tas.isdone?"#00b928" : "white", border:"1px solid black" }} 
            onClick={()=>{check(tas.id)}}
             >
            <CheckIcon />
            </IconButton>

             <IconButton  
             sx={{color:"#003d75", bgcolor:"#f2f3f3" , border:"1px solid black", marginLeft:"3PX"}}
             onClick={()=>{handalopen()}}
             >
              <EditIcon/>
            </IconButton>

             <IconButton sx={{color:"#d40000", bgcolor:" #f2f3f3", border:"1px solid black", marginLeft:"3PX"}} 

             onClick={handelopen}
            >
             <DeleteIcon />
            </IconButton>
            
        </Grid>
        <Grid item xs={8} sx={{bgcolor:"#025186", height:"80px"}}>
          <Typography variant="h5" align='right' sx={{pr:"10px", mt:"-5px", color:"#eaecec", fontSize:"26PX", fontWeight:"bold", textDecoration: tas.isdone? "line-through" : "none" }} > {tas.titele}</Typography>
          <Typography variant="h6" align='right' sx={{mb:"80px",color:"#dcdddd" ,pr:"10px" ,fontSize:"25PX"}} > {tas.info}</Typography>
          
        </Grid>
          </Grid>
        </Box>
      </Container>


      <Dialog
        open={closestat}
        onClose={handleClose}
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete the task"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           Are you sure you want to delete the task?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={()=>{handledelet(tas.id)}} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>



      <Dialog 
        open={editstate}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>EDIT</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Edit your task                            
          </DialogContentText>
          <TextField
          value={editbox}

          onChange={(e)=>{seteditbox(e.target.value)}}
            autoFocus
            // required
            margin="dense"
            id="name"
            // name="email"
            label="Task Address"
            // type="email"
            fullWidth
            variant="standard"
          />
          <TextField
           value={editinfobox}
           onChange={(e)=>{seteditinfobox(e.target.value)}}
            autoFocus
            // required
            margin="dense"
            id="Detals"
            // name="email"
            label="Task Detals"
            // type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosex}>Cancel</Button>
          <Button onClick={()=>{edit(tas.id)}} type="submit">EDIT</Button>
        </DialogActions>
      </Dialog>




      
      
    </div>
  )
}
