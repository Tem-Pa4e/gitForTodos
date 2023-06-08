import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "features/auth/auth.reducer";
import {Navigate} from "react-router-dom";
import {LoginParamsType} from "api/todolist-api";
import './Login.css'
import {selectIsLoggedIn} from "features/auth/auth.selector";

export const Login = () => {

    const isLoggedIn = useSelector(selectIsLoggedIn)
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: Partial<Omit<LoginParamsType, 'captcha'>> = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required'
            } else if (values.password.length < 4) {
                errors.password = 'Invalid password'
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(loginTC(values))
        },
    })
    if (isLoggedIn) {
        return <Navigate to={'/'}/>
    }


    return <Grid container justifyContent={'center'} >
        <Grid item justifyContent={'center'}>
            <FormControl className={'loginFormBlock'} style={{marginTop: '25%',padding: '0 20px'}}>
                <FormLabel>
                    <p>To log in get registered
                        <a style={{color: 'aquamarine'}} href={'https://social-network.samuraijs.com/'}
                           target={'_blank'} rel="noreferrer"> here
                        </a>
                    </p>
                    <p>or use common test account credentials:</p>
                    <p>Email: free@samuraijs.com</p>
                    <p>Password: free</p>
                </FormLabel>
                <form onSubmit={formik.handleSubmit}>
                    <FormGroup className={'loginFormBox'}>
                        <TextField color={'success'} InputLabelProps={{style: {color: 'white'}}} label="Email" margin="normal" {...formik.getFieldProps('email')}/>
                        {formik.touched.email && formik.errors.email && <div style={{color: 'red'}}>{formik.errors.email}</div>}
                        <TextField InputLabelProps={{style: {color: 'white'}}} color={'success'} type="password" label="Password"
                                   margin="normal"
                                   {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password && <div style={{color: 'red'}}>{formik.errors.password}</div>}
                        <FormControlLabel style={{color: 'white'}} label={'Remember me'}
                                          control={<Checkbox style={{color: 'white'}}  {...formik.getFieldProps('rememberMe')}/>}/>
                        <Button style={{margin: '10px 0'}} type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </form>
            </FormControl>
        </Grid>
    </Grid>
}

