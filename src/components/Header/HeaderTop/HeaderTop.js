/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import './HeaderTop.css';
import { FiChevronDown } from 'react-icons/fi'
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthContext';

const HeaderTop = () => {

    const { user, handleLogout } = useContext(AuthContext);

    const [openLinks, setOpenLinks] = useState(false);
    const [openLangLinks, setOpenLangLinks] = useState(false);
    return (
        <div className="header_top">
            <Container
                fixed
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',

                }}
            // className="container d-flex align-items-center justify-content-between"
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        overflow: 'hidden'
                    }}
                    className="ht_left"
                >
                    <Box
                        sx={{
                            display: 'flex',
                        }}
                        className="welcome_message"
                    >
                        <p className="mb-0">Special collection already available.</p>
                        <a href="#">&nbsp;Read more ...</a>
                    </Box>
                </Box>
                <div className="ht_right">
                    <div className="htr_menu">
                        <span className="htr_mb_open" onClick={() => setOpenLinks(!openLinks)}>
                            Links <FiChevronDown />
                        </span>
                        <ul className={openLinks ? 'd-flex align-items-center mb-0 active' : 'd-flex align-items-center mb-0'}>
                            <li>
                                <div className="htr_dropdown">
                                    <a href="#" onClick={() => setOpenLangLinks(!openLangLinks)}>
                                        English <FiChevronDown />
                                    </a>
                                    <div className={openLangLinks ? 'htr_dropdown_menu active' : 'htr_dropdown_menu'}>
                                        <ul className="mb-0 ps-0">
                                            <li><a href="#">English</a></li>
                                            <li><a href="#">Spanish</a></li>
                                            <li><a href="#">French</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                            <li>
                                {user.token ? (
                                    <span
                                        style={{
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => handleLogout()}
                                    >
                                        Logout
                                    </span>
                                ) : (
                                    <Link to="/login">Sign In / Sign Up</Link>
                                )}

                            </li>
                        </ul>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default HeaderTop;