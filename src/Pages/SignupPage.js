import React, {useState} from 'react';
import {Button, IconButton, Input, InputAdornment, InputLabel} from "@material-ui/core";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import '../styles/login_page.css';
import {useHistory} from "react-router-dom";
import {createUser} from "../services/authorizeUser";

export default function SignupPage() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  });

  const history = useHistory();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();

    createUser({name: values.name, email: values.email, password: values.password})
      .then((user) => {
        console.log(user);
        window.localStorage.setItem('user', user.id);
        history.push("/user");
        return user;
      })
      .catch(() => alert('Incorrect login or password. Try again.'))
  }

    return (
        <div className="login-wrapper">
          <form className='signup-form' onSubmit={handleSubmitForm}>
            <h1 className='login-title'>Login to web App</h1>

            <InputLabel htmlFor="standard-adornment" className='label'>Name</InputLabel>
            <Input
              id="standard-adornment"
              value={values.name}
              onChange={handleChange('name')}
              className='input'
            />

            <InputLabel htmlFor="standard-adornment-email" className='label'>Email</InputLabel>
            <Input
              id="standard-adornment-email"
              type='email'
              value={values.email}
              onChange={handleChange('email')}
              className='input'
            />

            <InputLabel htmlFor="standard-adornment-password" className='label'>Password</InputLabel>
            <Input
              id="standard-adornment-password"
              className='input'
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />

            <Button variant="contained" color="primary" className="button" type="submit">
              Sign Up
            </Button>
            <div><a href="/login">or login</a></div>
          </form>
        </div>
    );
}
