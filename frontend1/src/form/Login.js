import { Avatar, Button, Grid, Link, Paper, TextField, Typography } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import './Login.css';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { toast } from "react-toastify";


const Login = (props) => {

const navigate = useNavigate();

    const [loginForm, setLoginform] = useState({
        email: "",
        password: "",
    });
    
    const onChangeForm = (label,e) => {
        console.log(e.target.value);
        switch (label) {
          case "email":
            setLoginform({ ...loginForm, email: e.target.value });
            break;
          case "password":
            setLoginform({ ...loginForm, password: e.target.value });
            break;
        }
    };

    const login = async  () => {
      await axios
      .post("http://localhost:8000/auth/login", loginForm)
      .then((response) => {
        console.log(response);

        
        if(response){
          localStorage.setItem("auth_token", response.data.result.access_token);
          localStorage.setItem(
            "auth_token_type",
            response.data.result.token_type
          );
          toast.success(response.data.detail);
          navigate("/home")
        }

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {

        
        console.log(error);
        // toast.error(error.response.data.detail);
      });
    }

    return (
        <Grid>
            <Paper elevation={10} className='sign'>
                <Grid align='center' >
                    <Avatar className='lock'><LockOutlinedIcon/></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <TextField 
                    className='field' 
                    variant="standard" 
                    label='Email' 
                    placeholder='Email' 
                    type='email'
                    onChange={(e) => {onChangeForm("email", e);}}
                    fullWidth
                    required/>
                <TextField 
                    className='field' 
                    variant="standard" 
                    label='Password' 
                    placeholder='Password' 
                    type='password'
                    onChange={(e) => {onChangeForm("password", e);}} 
                    fullWidth 
                    required/>
                <Button type='submit' 
                    color='primary' 
                    variant='contained' 
                    className='enter'
                    onClick={login}
                    fullWidth>
                        Sign In
                </Button>
                <Typography className='link'>
                    <Link >Forgot Password</Link>
                </Typography>
                <Typography className='link'>
                    Don't have an account? <Link to='/?register' onClick={() => {props.setPage("register");}}>Sign Up</Link>
                </Typography>
            </Paper>
        </Grid>
    );
}

export default Login;
