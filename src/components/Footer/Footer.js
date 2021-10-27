import React from 'react';
import './Footer.css';
import paymentImg from '../../images/payments.png';
import { TiSocialFacebook, TiSocialInstagram, TiSocialTwitter, TiSocialYoutube } from 'react-icons/ti'
import ToTop from '../ToTop/ToTop';
import logo from '../../images/logo.png';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer_top">
                <Container fixed>
                    <Grid
                        container
                        rowSpacing={{ xs: 5 }}
                        spacing={3}
                    >
                        <Grid
                            item
                            lg={6}
                            md={6}
                            sm={12}
                            xs={12}
                        // className="col-lg-6 col-sm-12 mb-lg-0 mb-5"
                        >
                            <div className="widget widget_about pe-lg-3">
                                <Link to="/">
                                    {/* <h2 className="widget_logo">Haat</h2> */}
                                    <img src={logo} alt="Logo" className="footer_logo d-block mb-1" />
                                </Link>

                                <p className="widget_about_txt mb-2">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore consequatur sint impedit. Veniam tempore at nam cumque natus necessitatibus et hic amet sint explicabo vel officiis assumenda, harum possimus itaque.
                                </p>
                                <div className="widget_about_info">
                                    <Grid container>
                                        <Grid
                                            item
                                            lg={4}
                                            md={4}
                                            sm={6}
                                            xs={6}
                                            className="col-md-4 col-sm-6">
                                            <p className="widget_info_title mb-2">Call us 24/7</p>
                                            <a href="tel:123456789" className="widget_info_num">+0123 456 789</a>
                                        </Grid>
                                        <Grid
                                            item
                                            lg={8}
                                            md={8}
                                            sm={6}
                                            xs={6}
                                            className="col-md-8 col-sm-6">
                                            <p className="widget_info_title mb-2">Payment Method</p>
                                            <img className="widget_info_payment" src={paymentImg} alt="" />
                                        </Grid>
                                    </Grid>
                                </div>
                            </div>
                        </Grid>
                        <Grid
                            item
                            lg={2}
                            md={2}
                            sm={4}
                            xs={12}
                            className="widget"
                        // className="col-lg-2 col-sm-4 widget"
                        >
                            <h3 className="widget_title mb-1">Quick Links</h3>
                            <ul className="ps-0 mb-0 widget_list">
                                <li><Link to="#">About Flone</Link></li>
                                <li><Link to="#">FAQ</Link></li>
                                <li><Link to="#">Contact Us</Link></li>
                                <li><Link to="#">Return</Link></li>
                                <li><Link to="#">Login</Link></li>
                            </ul>
                        </Grid>
                        <Grid
                            item
                            lg={2}
                            md={2}
                            sm={4}
                            xs={12}
                            className="widget">
                            <h3 className="widget_title mb-1">Services</h3>
                            <ul className="ps-0 mb-0 widget_list">
                                <li><Link to="#">Payment</Link></li>
                                <li><Link to="#">Shipping</Link></li>
                                <li><Link to="#">Returns</Link></li>
                                <li><Link to="#">Privacy Policy</Link></li>
                                <li><Link to="#">Terms and Conditions</Link></li>
                            </ul>
                        </Grid>
                        <Grid
                            item
                            lg={2}
                            md={2}
                            sm={4}
                            xs={12}
                            className="widget">
                            <h3 className="widget_title mb-1">My Account</h3>
                            <ul className="ps-0 mb-0 widget_list">
                                <li><Link to="/login">Sign In</Link></li>
                                <li><Link to="/cart">My Cart</Link></li>
                                <li><Link to="/wishlist">Wishlist</Link></li>
                                <li><Link to="/dashboard">My Order</Link></li>
                                <li><Link to="#">Help</Link></li>
                            </ul>
                        </Grid>
                    </Grid>
                </Container>
            </div>
            <div className="footer_bottom">
                <Container fixed>
                    <div className="footer_bottom_wrapper d-flex align-items-center">
                        <p className="footer_copyright mb-0">
                            Copyright &copy; 2021 Flone Shop. All Rights Reserved.
                        </p>
                        <ul className="fb_menu d-flex align-items-center mb-0 ps-0">
                            <li><Link to="#">Terms of Use</Link></li> |
                            <li><Link to="#">Privacy Policy</Link></li>
                        </ul>
                        <div className="fb_social d-flex ms-auto align-items-center">
                            <span className="me-1">Social Media</span>
                            <ul className="fb_social_list d-flex mb-0 ps-0">
                                <li>
                                    <Link to="#">
                                        <TiSocialFacebook />
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#">
                                        <TiSocialTwitter />
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#">
                                        <TiSocialInstagram />
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#">
                                        <TiSocialYoutube />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Container>
            </div>

            <ToTop />
        </footer>
    );
};

export default Footer;