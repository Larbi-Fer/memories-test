import React, { useState } from 'react'
import { Avatar, Button, Paper, Typography, Container, Grid, CircularProgress } from '@material-ui/core'
import { GoogleLogin } from 'react-google-login'
import { FacebookProvider, Login, LoginButton, Profile } from 'react-facebook';

import { useHistory } from 'react-router-dom'
import Icon from '@material-ui/icons/Email';
import IconFacebook from '@material-ui/icons/Facebook';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Input from './Input'
import useStyles from './style'
import { useDispatch } from 'react-redux';

import { signup, signin } from '../../actions/auth'

const initailState = { firstName: '', lastName: '', email: "", password: '', confirmPassword: '',};

const Auth = () => {
    const classes = useStyles()

    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initailState);

    const dispatch = useDispatch();
    const history = useHistory();

    const handelShowPassword = ({ isShowPassword }) => setShowPassword((prevShowPassword) => isShowPassword != undefined ? isShowPassword : !prevShowPassword);

    const handleSubmit = e => {
        e.preventDefault()
        if ( isSignUp ) {
            dispatch(signup(formData, history))
        } else {
            dispatch(signin(formData, history))

        }
    }

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleResponse = (data) => {
        console.log(data);
    }
    
    const handleError = (error) => {
        console.log(error);
    }

    const googleSuccess = async res => {
        const result = res?.profileObj; // cannot get proprty profieObj of undefind
        const token = res?.tokenId;
        try {
            dispatch({ type: 'AUTH', data: { result, token } })
            history.push('/')
        } catch (error) {
            console.log(error)
        }
    }
    const googleFailure = (e) => {
        console.log(e)
        console.log('Google sign in was unsuccessful. Try again later');
    }

    const switchMod = () => {
        setIsSignUp(prevIsSignUp => !prevIsSignUp)
        handelShowPassword({isShowPassword: false})
    }

    return (
        <Container component='main' maxWidth='xs' >
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5'>{isSignUp ? 'Sign Up' : 'Sign Up'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        { isSignUp && (
                            <>
                                <Input name='firstName' label='First name' handleChange={handleChange} autoFocus half />
                                <Input name='lastName' label='Last name' handleChange={handleChange} half />
                            </>
                        ) }
                        <Input name='email' label='Email' handleChange={handleChange} type='email' />
                        <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handelShowPassword={handelShowPassword} />
                        { isSignUp && (
                            <Input name='confirmPassword' label='Repeat password' handleChange={handleChange} type='password' />
                        ) }
                        <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                            { isSignUp ? 'Sign up' : 'Login' }
                        </Button>
                        <GoogleLogin 
                            clientId="570064325953-3km8rjvmcpsqpvvf37i2pouhvj1o0cr9.apps.googleusercontent.com"
                            render={renderProps => (
                                <Button
                                    className={classes.googleButton}
                                    color="primary"
                                    fullWidth
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                    startIcon={ <Icon /> }
                                    variant="contained"
                                >
                                    Google Sign In
                                    {renderProps.disabled && (
                                        <CircularProgress className={classes.spanLoding} size={27} />
                                    )}
                                </Button>
                            )}
                            onSuccess={googleSuccess}
                            onFailure={googleFailure}
                            cookiePolicy="single_host_origin"
                        />
                        <FacebookProvider appId="831879244034463">
                            <Login
                                scope="email"
                                onCompleted={handleResponse}
                                onError={handleError}
                            >
                            {({ loading, handleClick, error, data }) => (
                                <Button
                                    className={classes.googleButton}
                                    color="primary"
                                    fullWidth
                                    onClick={handleClick}
                                    startIcon={ <IconFacebook /> }
                                    variant="contained"
                                    disabled={loading}
                                >
                                Login via Facebook
                                {loading && (
                                    /* <span className={classes.spanLoding}>Loading...</span> */
                                    <CircularProgress className={classes.spanLoding} size={27} />
                                )}
                                </Button>
                            )}
                            </Login>
                        </FacebookProvider>
                        {/* <Button
                            className={classes.googleButton}
                            color="primary"
                            fullWidth
                            startIcon={ <Icon /> }
                            variant="contained"
                        >
                            <FacebookProvider appId="831879244034463">
                                <LoginButton
                                    scope="email"
                                    onCompleted={handleResponse}
                                    onError={handleError}
                                >
                                <span>Login via Facebook</span>
                                </LoginButton>
                            </FacebookProvider>
                        </Button> */}
                        <Grid item xs={12}>
                            <Button onClick={switchMod} fullWidth>
                            { isSignUp ? 'Already have an account? Sign in' : "Don't have account? Sign Up" }
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
