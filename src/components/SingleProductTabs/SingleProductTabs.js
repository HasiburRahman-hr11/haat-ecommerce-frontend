import React from 'react';
import './SingleProductTabs.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import SingleProductReview from '../SingleProductReview/SingleProductReview';

const SingleProductTabs = ({ product , setProduct }) => {
    return (
        <div className="sp_tabs_wrapper mt-5">
            <Tabs className="sp_tabs">
                <TabList className="sp_tab_header mb-0 ps-0 d-flex align-items-center justify-content-center">
                    <Tab className="sp_tab_list">Description</Tab>
                    <Tab className="sp_tab_list">Additional Information</Tab>
                    <Tab className="sp_tab_list">Review</Tab>
                </TabList>

                <div className="sp_tab_content">
                    <TabPanel className="sp_tab_panel">
                        <p>{product?.description}</p>
                    </TabPanel>
                    <TabPanel className="sp_tab_panel">
                        <h4 className="mb-1">Additional Information</h4>


                        {product?.colors.length > 0 && (
                            <>
                                <h4 className="mb-1">Colors</h4>
                                <ul className="ps-2 mb-2">
                                    {product.colors.map(color => (
                                        <li key={color}>{color}</li>
                                    ))}

                                </ul>
                            </>
                        )}


                        {product?.sizes.length > 0 && (
                            <>
                                <h4 className="mb-1">Sizes</h4>
                                <ul className="ps-2 mb-2">
                                    {product.sizes.map(size => (
                                        <li key={size}>{size}</li>
                                    ))}

                                </ul>
                            </>
                        )}

                    </TabPanel>
                    <TabPanel className="sp_tab_panel">
                        <SingleProductReview product={product} setProduct={setProduct} />
                    </TabPanel>
                </div>
            </Tabs>
        </div>
    );
};

export default SingleProductTabs;