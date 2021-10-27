import { Container } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import './BreadCumb.css';
import { AiOutlineHome, AiOutlineShop } from 'react-icons/ai';

const BreadCumb = ({ label, Icon }) => {
    return (
        <div className="breadcumb d-flex align-items-center">
            <Container fixed>
                <ul className="brc_list d-flex align-items-center">
                    <li>
                        <Link to="/">
                            <AiOutlineHome />
                            <span>Home</span>
                        </Link>
                    </li>
                    /
                    <li>
                        <Link to="/shop">
                            <AiOutlineShop />
                            <span>Shop</span>
                        </Link>
                    </li>

                    {label && (
                        <>
                            /
                            <li>
                                <Link to="#" >
                                    {Icon}
                                    <span>{label}</span>
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </Container>
        </div>
    );
};

export default BreadCumb;