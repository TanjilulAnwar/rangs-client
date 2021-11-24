import React from 'react'
import { Button, Container, Grid } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';
import ToDoTable from './ToDoTable';
import ToDoForm from './ToDoForm';
import axios, {url} from '../../api';
import cogoToast from 'cogo-toast';
import {useUserState} from '../../context/UserContext';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function Home() {
  var { userInfo } = useUserState();
  const [todo_list, setTodoList] = React.useState([])
  const [update_date, setUpdateData] = React.useState({})

  const refresh = ()=>{
    axios.get('/Duty/GetList')
      .then(resp => {
        if(resp.data.success){
          setTodoList([...resp.data.message])
        } else cogoToast.error(resp.data?.message)
      })
  }

  React.useEffect(()=>{
    refresh()
  },[])

  const handleTodoList = (todo)=>{
    cogoToast.success('Todo Saved!')
    refresh()
  }

  const handleUpdate = (data)=>{
    setUpdateData(data)
  }

  const handleLogout = ()=>{
    localStorage.clear()
    window.location.reload()
  }

  return (
    <Container maxWidth="md">
      <Grid container spacing={3} justify="space-between" alignItems="center">
        <Grid item xs={4}>
          <h2 style={{margin: 0}}>{userInfo.first_name} {userInfo.last_name}</h2>
        </Grid>
        <Grid item>
          <Button size="small" onClick={handleLogout}>Logout</Button>
        </Grid>
      </Grid>
      {!userInfo.email_confirmed &&
        <Alert severity="warning">Your email is not verified! <a target="_blank" href={`${url}Send/VerificationEmail?user_id=${userInfo.user_id}`}>Click here to verify</a></Alert>
      }
      <ToDoForm update_date={update_date} handleTodoList={handleTodoList}/>
      <ToDoTable handleUpdate={handleUpdate} todo_list={todo_list} refresh={refresh}/>
    </Container>
  )
}
