import React from 'react'
import {useHistory} from 'react-router-dom';
import { Grid,Paper, TextField, Button, Typography,Link } from '@material-ui/core'
import axios from '../api';
import {useUserDispatch} from '../context/UserContext';
import cogoToast from 'cogo-toast';


const Login=({handleChange})=>{
    var dispatch = useUserDispatch();
    const history = useHistory()
    const [form_inputs, setFormInputs] = React.useState({})

    const handleInput = (e)=>{
        setFormInputs({...form_inputs, [e.target.name]: e.target.value})
    }

    const handleLogin = ()=>{
        axios.post('/Login/', form_inputs)
            .then(resp=>{
                if(resp.data.success){
                    localStorage.setItem('user-token', resp.data.token)
                    axios.defaults.headers.common['Authorization'] = `Bearer ${resp.data.token}`;
                    axios.get('/Verify/Token')
                        .then(resp=>{
                            if(resp.data.success){
                                cogoToast.success('Login successful.')
                                dispatch({ type: 'LOGIN_SUCCESS', user_info: resp.data.message })
                                history.push('/')
                            } 
                        })
                } else {
                    alert(resp.data.message)
                }
            })
    }

    const paperStyle={padding :20,height:'73vh',width:300, margin:"0 auto"}
    const btnstyle={margin:'8px 0'}
    return(
        <Grid>
            <Paper  style={paperStyle}>
                <Grid align='center'>
                    <h2>Sign In</h2>
                </Grid>
                <TextField label='Username' name="email" placeholder='Enter username' fullWidth required onChange={handleInput}/>
                <TextField label='Password' name="password" placeholder='Enter password' type='password' fullWidth required onChange={handleInput}/>
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth onClick={handleLogin}>
                    Sign in
                </Button>
              
                <Typography > Do you have an account ?
                     <Link href="#" onClick={()=>handleChange("event",1)} >
                        Sign Up 
                </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Login