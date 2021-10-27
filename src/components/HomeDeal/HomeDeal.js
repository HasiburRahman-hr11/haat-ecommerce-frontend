import React from 'react';
import './HomeDeal.css';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';

const HomeDeal = () => {
    return (
        <div className="home_deal">
            <Container fixed>
                <div className="deal_wrapper">
                    <Grid
                        container
                    >
                        <Grid
                            item
                            lg={7}
                            md={7}
                            sm={12}
                            xs={12}
                            sx={{
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        // className="col-lg-7 col-md-7 col-sm-12 d-flex align-items-center"
                        >
                            <div className="deal_content ">
                                <p className="deal_subtitle">Limited Quantities</p>
                                <h2 className="deal_title mb-2">50% Discount on Women Accessories</h2>
                                <Link to="/category/women" className="deal_btn btn_hover">Shop Now</Link>
                            </div>
                        </Grid>
                        <Grid
                            item
                            lg={5}
                            md={5}
                            sm={12}
                            xs={12}
                        // className="col-lg-5 col-md-5 col-sm-12"
                        >
                            <div className="deal_image">
                                <img src="https://images.pexels.com/photos/7742547/pexels-photo-7742547.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" alt="" />
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </div>
    );
};

export default HomeDeal;