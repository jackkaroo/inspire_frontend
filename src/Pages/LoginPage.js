import React, {useState} from 'react';
import {Button, IconButton, Input, InputAdornment, InputLabel} from "@material-ui/core";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import '../styles/login_page.css';
import {validateEmail, validatePassword} from "../utils/validation";
import {useHistory} from "react-router-dom";
import jwt_decode from 'jwt-decode';
import {authorizeUser} from "../services/authorizeUser";

export default function LoginPage() {
  const [values, setValues] = useState({
    showPassword: false,
    email: '',
    password: '',
  });
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

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

    if (!validateEmail(values.email)) {
      setEmailError(true);
    } else setEmailError(false);

    if (!validatePassword(values.password)) {
      setPasswordError(true);
    } else setPasswordError(false);

    if (emailError === false && passwordError === false) {
      authorizeUser({email: values.email, password: values.password})
        .then((data) => {
          const user = jwt_decode(data.token);
          window.localStorage.setItem('token', data.token);
          window.localStorage.setItem('user', user.id);
          history.push("/user");
          return user;
        })
        .catch(() => alert('Incorrect login or password. Try again.'))
    }
  }

    return (
        <div className="login-wrapper">
          <form className='login-form' onSubmit={handleSubmitForm}>
            <h1 className='login-title'>Login to web App</h1>
            <InputLabel htmlFor="standard-adornment-email" className='label'>Email</InputLabel>
            <Input
              id="standard-adornment-email"
              type='email'
              value={values.email}
              onChange={handleChange('email')}
              className='input'
              error={emailError === true}
            />
            {emailError === true && 'Please enter valid email'}
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
              error={passwordError === true}
            />
            {passwordError === true && 'Password length should be more than 3 symbols'}
            <Button variant="contained" color="primary" className="button" type="submit">
              Login
            </Button>
            <div><a href="/signup">or sign up</a></div>
          </form>
        </div>
    );
}
