import { Avatar, Button, Grid, Link, Paper, TextField, Typography } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import './Register.css';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { toast } from "react-toastify";

const Register = (props) => {

    const navigate = useNavigate();

    const [formRegister, setFormRegister] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
    });

    const onChangeForm = (label, e) => {
      console.log(e.target.value);
      switch (label) {
        case "Firstname":
          setFormRegister({ ...formRegister, firstname: e.target.value });
          break;
        case "Lastname":
          setFormRegister({ ...formRegister,lastname: e.target.value });
          break;
        case "email":
          setFormRegister({ ...formRegister, email: e.target.value });
          break;
        case "password":
          setFormRegister({ ...formRegister, password: e.target.value });
      }
    };

    const onSubmitHandler = async (event) => {
      event.preventDefault();
      console.log(formRegister);

      await axios
        .post("http://localhost:8000/auth/register", formRegister)
        .then((response) => {
          console.log(response);
          if(response){
            toast.success(response.data.detail);
            navigate("/?signin");
          }

          

          // setTimeout(() => {
          //   window.location.reload();
          // }, 1000);
  
          
        })
        .catch((error) => {
          console.log(error);

          // toast.error(error.response.data.detail);
        });
    };

    return (
        <Grid>
            <Paper elevation={10} className='register'>
                <Grid align='center' >
                    <Avatar className='lock'><LockOutlinedIcon/></Avatar>
                    <h2>Sign Up</h2>
                </Grid>
                <TextField 
                    className='field' 
                    variant="standard" 
                    label='First Name' 
                    placeholder='First Name' 
                    onChange={(e) => {onChangeForm("Firstname", e);}}
                    fullWidth/>
                <TextField 
                    className='field' 
                    variant="standard" 
                    label='Last Name' 
                    placeholder='Last Name' 
                    onChange={(e) => {onChangeForm("Lastname", e);}}
                    fullWidth/>
                <TextField 
                    className='field' 
                    variant="standard" 
                    label='Email' 
                    placeholder='Email' 
                    type='email' 
                    onChange={(e) => {onChangeForm("email", e);}}
                    fullWidth/>
                <TextField 
                    className='field' 
                    variant="standard" 
                    label='Password' 
                    placeholder='Password' 
                    type='password' 
                    onChange={(e) => {onChangeForm("password", e);}}
                    fullWidth 
                    required/>
                <Button 
                    type='submit' 
                    color='primary' 
                    variant='contained' 
                    className='enter' 
                    onClick={onSubmitHandler}
                    fullWidth>
                        Register
                </Button>
                <Typography className='link'>
                    Already have an account? <Link to="/?signin"
              onClick={() => {
                props.setPage("login");
              }} >Sign-In</Link>
                </Typography>
            </Paper>
        </Grid>
    );
}

export default Register;

