import { Grid } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';
import { successNotify } from '../../utils/tost-notify';

const AccountPanel = () => {

    const { user, setUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);


    const [formData, setFormData] = useState({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [validationError, setValidationError] = useState({});
    const [serverError, setServerError] = useState('');

    const errors = {
        newPassword: '',
        confirmPassword: '',
        isValidated: false
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        

        formValidation();

        setValidationError({ ...errors })

        if (errors.isValidated) {
            try {
                setLoading(true);
                const { data } = await axios.put(`/api/users/edit/${user._id}`, formData, {
                    headers: {
                        token: user.token
                    }
                });

                const userData = {
                    _id: data._id,
                    token: user.token,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    isAdmin: data.isAdmin,
                }

                localStorage.setItem('haat-user', JSON.stringify(userData));
                setUser(userData);

                setLoading(false);
                setServerError('');
                successNotify('Account Updated Successfully')

            } catch (error) {
                setServerError(error.response.data.message)
                setLoading(false);
            }
        }


    }

    const formValidation = () => {

        if (formData.newPassword) {
            if (formData.newPassword.length < 6) {
                errors.newPassword = 'Min 6 characters long'
            }

            if (formData.newPassword !== formData.confirmPassword) {
                errors.confirmPassword = 'Password does not match'
            }

            if (!errors.newPassword && !errors.confirmPassword) {
                errors.isValidated = true;
            }
        } else {
            errors.isValidated = true;
        }
    }

    useEffect(() => {

    }, [])


    return (
        <>
            <form className="dash_account_form" onSubmit={handleSubmit} >
                <Grid
                    container
                    columnSpacing={3}
                >
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <div className="auth_input_wrapper">
                            <label className="auth_label" htmlFor="firstName">First Name*</label>
                            <input
                                type="text"
                                className="auth_input"
                                name="firstName"
                                id="firstName"
                                required
                                value={formData.firstName}
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            />
                        </div>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <div className="auth_input_wrapper">
                            <label className="auth_label" htmlFor="lastName">Last Name*</label>
                            <input
                                type="text"
                                className="auth_input"
                                name="lastName"
                                id="lastName"
                                required
                                value={formData.lastName}
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            />
                        </div>
                    </Grid>
                </Grid>

                <div className="auth_input_wrapper">
                    <label className="auth_label" htmlFor="email">Email Address*</label>
                    <input
                        type="email"
                        className="auth_input"
                        name="email"
                        id="email"
                        required
                        readOnly
                        value={formData.email}
                    />
                </div>

                <div className="auth_input_wrapper">
                    <label className="auth_label" htmlFor="currentPassword">Current Password*</label>
                    <input
                        type="password"
                        className="auth_input"
                        name="currentPassword"
                        id="currentPassword"
                        required
                        value={formData.currentPassword}
                        onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                    />
                </div>

                <div className="auth_input_wrapper">
                    <label className="auth_label" htmlFor="newPassword">New Password (Leave blank to keep unchanged)</label>
                    <input
                        type="password"
                        className={validationError.newPassword ? 'auth_input isInvalid' : 'auth_input'}
                        name="newPassword"
                        id="newPassword"
                        value={formData.newPassword}
                        onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}

                    />
                    {validationError.newPassword && <p className="auth_error">{validationError.newPassword}</p>}
                </div>


                <div className="auth_input_wrapper">
                    <label className="auth_label" htmlFor="confirmPassword">Confirm Password (Leave blank to keep unchanged)</label>
                    <input
                        type="password"
                        className={validationError.confirmPassword ? 'auth_input isInvalid' : 'auth_input'}
                        name="confirmPassword"
                        id="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    />
                    {validationError.confirmPassword && <p className="auth_error">{validationError.confirmPassword}</p>}
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
                            : 'Update'}
                    </button>
                </div>



            </form>
        </>
    );
};

export default AccountPanel;