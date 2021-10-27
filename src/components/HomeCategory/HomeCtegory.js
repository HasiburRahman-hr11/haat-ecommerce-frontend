import React from 'react';
import './HomeCategory.css';
import {homeCategories} from '../../fakeData';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

const HomeCtegory = () => {
    return (
        <div className="home_categories mt-5">
            <Container fixed>
                <Grid 
                container
                spacing={3}
                >
                    {homeCategories.map((cat,ind) => (
                        <Grid
                        item
                        lg={4}
                        md={4}
                        sm={6}
                        xs={12} 
                        key={cat.title+ind} 
                        className="hm_cat_item"
                        // className="col-lg-4 col-md-6 col-sm-6 col-12 hm_cat_item"
                        >
                            <div className="hm_cat_wrapper">
                                <div className="hm_cat_img">
                                    <img src={cat.image} alt={cat.title} />
                                </div>
                                <div className="hm_cat_content d-flex align-items-center">
                                    <div>
                                        <p className="hm_cat_subtitle mb-1">{cat.subtitle}</p>
                                        <h3 className="hm_cat_title mb-1">{cat.title}</h3>
                                        <p className="hm_cat_offer mb-2">{cat.offer}</p>
                                        <a href={cat.link} className="hm_cat_btn btn_hover">Shop Now</a>
                                    </div>
                                </div>
                                <div className="hm_cat_overlay"></div>
                            </div>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    );
};

export default HomeCtegory;