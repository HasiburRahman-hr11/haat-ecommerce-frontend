import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { FcGoogle } from 'react-icons/fc';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';

const SignUp = () => {

    const [signUpValues, setSignUpValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [signUpErrors, setSignUpErrors] = useState({});

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [serverError, setServerError] = useState('');

    const signUpHandleChange = (event) => {
        setSignUpValues({ ...signUpValues, [event.target.name]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    };

    const errors = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        isValidated: false
    }

    const handleSignUp = async (event) => {
        event.preventDefault();
        formValidation();

        setSignUpErrors({ ...errors });

        if (errors.isValidated) {

            setLoading(true);
            try {
                const res = await axios.post('https://hidden-crag-34912.herokuapp.com/api/auth/signup', signUpValues);
                if (res.data.email) {
                    setSignUpValues({
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: '',
                        confirmPassword: ''
                    })
                }
                setLoading(false);
                setServerError('')
                setSuccess(true);
            } catch (error) {
                setServerError(error.response.data.message)
                setLoading(false);
                setSuccess(false);
            }

        }
    }

    const formValidation = () => {

        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (signUpValues.firstName === '') {
            errors.firstName = 'This field is required'
        }
        if (signUpValues.lastName === '') {
            errors.lastName = 'This field is required'
        }
        if (!regex.test(signUpValues.email)) {
            errors.email = 'Invalid email address'
        }
        if (signUpValues.email === '') {
            errors.email = 'This field is required'
        }
        if (signUpValues.password === '') {
            errors.password = 'This field is required'
        }
        if (signUpValues.confirmPassword === '') {
            errors.confirmPassword = 'This field is required'
        }

        if (signUpValues.password.length < 6) {
            errors.password = 'Min 6 characters long'
        }

        if (signUpValues.password !== signUpValues.confirmPassword) {
            errors.confirmPassword = 'Password does not match'
        }

        if (!errors.firstName && !errors.lastName && !errors.email && !errors.password && !errors.confirmPassword) {
            errors.isValidated = true;
        }
    }

    return (
        <>
            <form className="auth_form" onSubmit={handleSignUp}>
                <Grid
                    container
                    columnSpacing={{ sm: 2, xs: 0 }}
                >
                    <Grid
                        item
                        xs={12}
                        sm={6}
                    >
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name*"
                            required
                            className={signUpErrors.firstName ? 'auth_input isInvalid' : 'auth_input'}
                            value={signUpValues.firstName}
                            onChange={signUpHandleChange}
                        />
                        {signUpErrors.firstName && <p className="auth_error">{signUpErrors.firstName}</p>}
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                    >
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name*"
                            required
                            className={signUpErrors.lastName ? 'auth_input isInvalid' : 'auth_input'}
                            value={signUpValues.lastName}
                            onChange={signUpHandleChange}
                        />
                        {signUpErrors.lastName && <p className="auth_error">{signUpErrors.lastName}</p>}
                    </Grid>
                </Grid>
                <input
                    type="email"
                    name="email"
                    placeholder="Email Address*"
                    required
                    className={signUpErrors.email ? 'auth_input isInvalid' : 'auth_input'}
                    value={signUpValues.email}
                    onChange={signUpHandleChange}
                />
                {signUpErrors.email && <p className="auth_error">{signUpErrors.email}</p>}
                <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Password*"
                    required
                    className={signUpErrors.password ? 'auth_input isInvalid' : 'auth_input'}
                    value={signUpValues.password}
                    onChange={signUpHandleChange}
                />
                {signUpErrors.password && <p className="auth_error">{signUpErrors.password}</p>}
                <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="Confirm Password*"
                    required
                    className={signUpErrors.confirmPassword ? 'auth_input isInvalid' : 'auth_input'}
                    value={signUpValues.confirmPassword}
                    onChange={signUpHandleChange}
                />
                {signUpErrors.confirmPassword && <p className="auth_error">{signUpErrors.confirmPassword}</p>}
                <div
                    className="d-flex align-items-center mt-1"
                    style={{
                        marginTop: '20px'
                    }}
                >
                    <input
                        type="checkbox"
                        name="showPassword"
                        id="showSignUpPassword"
                        className="custom_checkbox"
                        checked={showPassword}
                        onChange={handleClickShowPassword}
                    />
                    <label htmlFor="showSignUpPassword">Show Password</label>
                </div>
                <div className="d-flex align-items-center mt-1">
                    <input
                        required
                        type="checkbox"
                        name="authAgree"
                        className="custom_checkbox"
                        id="authAgree" />
                    <label htmlFor="authAgree">I agree to the privacy policy *</label>
                </div>

                {serverError && (
                    <div className="text-center mt-3">
                        <p className="auth_error" style={{ fontSize: '15px' }}>{serverError}</p>
                    </div>
                )}



                <div className="text-center mt-2">
                    <button type="submit" className="auth_btn btn-primary btn">
                        {loading ? <CircularProgress sx={{
                            color: '#fff',
                            width: '25px !important',
                            height: '25px !important'
                        }}
                        />
                            : 'Sign Up'}
                    </button>
                </div>

                <div className="auth_alter mt-2 text-center">
                    <p className="auth_alter_text">or</p>

                    <div className="google_auth_wrapper d-flex align-items-center justify-content-center">
                        <p className="d-flex align-items-center">
                            <FcGoogle />
                            <span>Sign Up With Google</span>
                        </p>
                    </div>
                </div>
            </form>


            {success && (
                <div className="text-center mt-3">
                    <p style={{
                        color: 'var(--link-hover)'
                    }}>
                        Sign Up Successfully. You can now Sign In to your account.
                    </p>
                </div>
            )}

        </>
    );
};

export default SignUp;