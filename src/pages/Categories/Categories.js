import React, { useContext } from 'react';
import { CategoryContext } from '../../Context/CategoryContext';

import { AiOutlineUser } from 'react-icons/ai';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';


import Loading from '../../components/Loading/Loading';
import PageBanner from '../../components/PageBanner/PageBanner';
import BreadCumb from '../../components/BreadCumb/BreadCumb';
import Category from '../../components/Category/Category';

const Categories = () => {

    const { categories, loading } = useContext(CategoryContext);
    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div className="main">
                    <PageBanner title="Categories" />
                    <BreadCumb label="Categories" Icon={<AiOutlineUser />} />

                    <div className="pt-4 pb-4">
                        <Container fixed>
                            <Grid
                                container
                                spacing={4}
                            >
                                {categories.map(category => (
                                    <Grid
                                        item
                                        lg={3}
                                        md={4}
                                        sm={6}
                                        xs={12}
                                        key={category._id}
                                    >
                                        <Category category={category} />
                                    </Grid>
                                ))}

                            </Grid>
                        </Container>
                    </div>
                </div>
            )}
        </>
    );
};

export default Categories;