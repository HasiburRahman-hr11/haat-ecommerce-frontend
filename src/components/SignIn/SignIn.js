import React, { useContext, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';

const SignIn = () => {

    const { setUser } = useContext(AuthContext);

    const [signInValues, setSignInValues] = useState({
        email: '',
        password: ''
    });
    const [signInErrors, setSignInErrors] = useState({});

    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState('');


    const history = useHistory();

    const signInHandleChange = (event) => {
        setSignInValues({ ...signInValues, [event.target.name]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    };

    const errors = {
        email: '',
        password: '',
        isValidated: false
    }

    const handleSignIn = async (event) => {
        event.preventDefault();
        formValidation();

        setSignInErrors({ ...errors });
        
        if (errors.isValidated) {
            
            setLoading(true);
            try {
                const res = await axios.post('https://hidden-crag-34912.herokuapp.com/api/auth/signin', signInValues);
                if (res.data.accessToken) {
                    setSignInValues({
                        email: '',
                        password: ''
                    });

                    const userData = {
                        _id: res.data._id,
                        token: res.data.accessToken,
                        firstName: res.data.firstName,
                        lastName: res.data.lastName,
                        email: res.data.email,
                        isAdmin: res.data.isAdmin,
                    }

                    localStorage.setItem('haat-user', JSON.stringify(userData));
                    setUser(userData);

                    history.push('/dashboard');
                }
                setLoading(false);
                setServerError('');

            } catch (error) {
                setServerError(error.response.data.message)
                setLoading(false);
            }

        } 
    }


    const formValidation = () => {

        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (signInValues.email === '') {
            errors.email = 'This field is required'
        }
        if (!regex.test(signInValues.email)) {
            errors.email = 'Invalid email address'
        }
        if (signInValues.password === '') {
            errors.password = 'This field is required'
        }

        if (signInValues.password.length < 6) {
            errors.password = 'Min 6 characters long'
        }

        if (!errors.email && !errors.password) {
            errors.isValidated = true;
        }
    }

    return (
        <>
            <form className="auth_form" onSubmit={handleSignIn}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email Address*"
                    required
                    className={signInErrors.email ? 'auth_input isInvalid' : 'auth_input'}
                    value={signInValues.email}
                    onChange={signInHandleChange}
                />
                {signInErrors.email && <p className="auth_error">{signInErrors.email}</p>}


                <div className="auth_password_wrapper">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="Password*"
                        required
                        className={signInErrors.password ? 'auth_input isInvalid' : 'auth_input'}
                        value={signInValues.password}
                        onChange={signInHandleChange}
                        minLength="6"
                    />
                    {signInErrors.password && <p className="auth_error">{signInErrors.password}</p>}
                    <div
                        className="mt-1 d-flex align-items-center">
                        <input
                            type="checkbox"
                            name=""
                            id="showSignInPassword"
                            className="custom_checkbox"
                            checked={showPassword}
                            onChange={handleClickShowPassword}
                        />
                        <label htmlFor="showSignInPassword" >Show Password</label>
                    </div>
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
                            : 'Sign In'}
                    </button>
                </div>
            </form>
            {/* <div className="auth_alter mt-2 text-center">
                <p className="auth_alter_text">or</p>

                <div className="google_auth_wrapper d-flex align-items-center justify-content-center">
                    <p className="d-flex align-items-center">
                        <FcGoogle />
                        <span>Sign In With Google</span>
                    </p>
                </div>
            </div> */}
        </>
    );
};

export default SignIn;