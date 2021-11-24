import React from 'react'
import { Grid, Paper, Typography, TextField, Button } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import axios from '../api';
import cogoToast from 'cogo-toast';


const paperStyle = { padding: 20, width: 300, margin: "0 auto" }
const headerStyle = { margin: 0 }
const marginTop = { marginTop: 10 }


const Signup = () => {
    const {register, handleSubmit, formState: {errors}} = useForm({
        reValidateMode: 'onChange'
    })
    const [loading, setLoading] = React.useState(false)

    
    const handleSignup = (data)=>{
        setLoading(true)
        axios.post('/SignUp/', data)
            .then(resp=>{
                if(resp.data.success){
                  
                    cogoToast.success('Registration Successful!')
                    window.location.reload()
                    
                } else cogoToast.error(resp.data.message)
            })
            .finally(()=>setLoading(false))
    }

    return (
        <Grid>
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <h2 style={headerStyle}>Sign Up</h2>
                    <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
                </Grid>
                <form onSubmit={handleSubmit(handleSignup)}>
                    <TextField 
                        style={marginTop}
                        fullWidth
                        label='First Name'
                        placeholder="Enter your first name" 
                        required
                        disabled={loading}
                        error={!!errors['first_name']}
                        inputProps={{...register('first_name', {required: true}), required: ''}}
                    />
                    <TextField 
                        style={marginTop}
                        fullWidth
                        label='Last Name'
                        placeholder="Enter your last name" 
                        required
                        disabled={loading}
                        error={!!errors['last_name']}
                        inputProps={{...register('last_name', {required: true}), required: ''}}
                    />
                    <TextField 
                        style={marginTop}
                        fullWidth
                        label='Email'
                        placeholder="Enter your email" 
                        required
                        disabled={loading}
                        error={!!errors['email']}
                        inputProps={{...register('email', {required: true}), required: ''}}
                    />
                    <TextField 
                        style={marginTop}
                        fullWidth
                        label='Phone number'
                        placeholder="Enter your phone nnumber" 
                        required
                        disabled={loading}
                        error={!!errors['phone_number']}
                        inputProps={{...register('phone_number', {required: true}), required: ''}}
                    />
                    <TextField 
                        style={marginTop}
                        fullWidth
                        label='Address'
                        disabled={loading}
                        placeholder="Enter your Home address" 
                        inputProps={{...register('address')}}
                    />
                    <TextField
                        style={marginTop}
                        fullWidth
                        label='Password'
                        placeholder="Enter your password" 
                        type="password"
                        disabled={loading}
                        required
                        error={!!errors['password']}
                        inputProps={{...register('password', {required: true}), required: ''}}
                    />
                    <TextField
                        style={marginTop}
                        fullWidth
                        label='Confirm password'
                        placeholder="Confirm your password" 
                        type="password"
                        disabled={loading}
                        required
                        error={!!errors['password_retype']}
                        inputProps={{...register('password_retype', {required: true}), required: ''}}
                    />
                    <Button style={marginTop} type='submit' variant='contained' disabled={loading} color='primary'>
                        Sign up
                    </Button>
                </form>
            </Paper>
        </Grid>
    )
}

export default Signup;