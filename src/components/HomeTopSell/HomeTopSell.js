import React, { useEffect, useState } from 'react';
import './HomeTopSell.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Product from '../Product/Product';
import Container from '@mui/material/Container';

const HomeTopSell = ({ products, setWishlist, setCarts }) => {

    const [mensProducts, setMensProducts] = useState([]);
    const [womensProducts, setWomensProducts] = useState([]);
    const [kidsProducts, setKidsProducts] = useState([]);



    useEffect(() => {
        const getMens = () => {
            let men = []
            products.forEach(product => {
                product.categories.forEach(cat => {
                    if (cat.toLowerCase() === 'men') {
                        men.push(product)
                    }
                })
            })
            setMensProducts(men)
        }
        getMens();
        const getWomens = () => {
            let women = [];
            products.forEach(product => {
                product.categories.forEach(cat => {
                    if (cat.toLowerCase() === 'women') {
                        women.push(product)
                    }
                })
            })
            setWomensProducts(women)
        }
        getWomens();

        const getKids = () => {
            let kids = [];
            products.forEach(product => {
                product.categories.forEach(cat => {
                    if (cat.toLowerCase() === 'kids') {
                        kids.push(product)
                    }
                })
            })
            setKidsProducts(kids)
        }
        getKids();

    }, [products])
    return (
        <div className="home_top_sell">
            <h3 className="section_title text-center mb-2">Top Selling Products</h3>

            <div className="top_sell_tabs_wrapper">
                <Tabs className="top_sell_tabs">
                    <TabList
                        className="ts_tabs_list d-flex align-items-center justify-content-center ps-0 mb-4">
                        <Tab className="ts_tabs_item">All</Tab>
                        <Tab className="ts_tabs_item">Men</Tab>
                        <Tab className="ts_tabs_item">Women</Tab>
                        <Tab className="ts_tabs_item">Kids</Tab>
                    </TabList>

                    <TabPanel>
                        <div className="products">
                            <Container fixed>
                                <div className="five_col_row">
                                    {products.map(product => (
                                        <Product key={product._id} product={product} setCarts={setCarts} setWishlist={setWishlist} />
                                    ))}
                                </div>
                            </Container>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="products">
                            <Container fixed>
                                <div className="five_col_row">
                                    {mensProducts.map(product => (
                                        <Product key={product._id} product={product} setCarts={setCarts} setWishlist={setWishlist} />
                                    ))}
                                </div>
                            </Container>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="products">
                            <Container fixed>
                                <div className="five_col_row">
                                    {womensProducts.map(product => (
                                        <Product key={product._id} product={product} setCarts={setCarts} setWishlist={setWishlist} />
                                    ))}
                                </div>
                            </Container>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="products">
                            <Container fixed>
                                <div className="five_col_row">
                                    {kidsProducts.map(product => (
                                        <Product key={product._id} product={product} setCarts={setCarts} setWishlist={setWishlist} />
                                    ))}
                                </div>
                            </Container>
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
};

export default HomeTopSell;