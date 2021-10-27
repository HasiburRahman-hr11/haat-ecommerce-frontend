import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';

const DashboardPanel = () => {
    const { handleLogout, user } = useContext(AuthContext);
    return (
        <p>
            Hello <span> {user.firstName + ' ' + user.lastName} </span>
            (not <span> {user.firstName + ' ' + user.lastName} ? </span>
            <span
                onClick={() => handleLogout()}
                style={{
                    cursor: 'pointer',
                    color: 'var(--link-hover)'
                }}
            >
                Logout
            </span>)
            <br />
            From your account dashboard you can view your  recent orders , manage your  shipping and billing addresses , and edit your password and account details.
        </p>
    );
};

export default DashboardPanel;