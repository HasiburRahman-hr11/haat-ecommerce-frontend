import React from 'react';
import { Link } from 'react-router-dom';
import './Error.css';
import Container from '@mui/material/Container';

const Error = ({content}) => {
    return (
        <div className="error_page main">
            <Container fixed>
                <div className="error_content text-center">
                    <h2>{content}</h2>
                    <Link className="err_btn td-none mt-2 btn btn-primary" to='/shop'>Shop</Link>
                </div>
            </Container>
        </div>
    );
};

export default Error;