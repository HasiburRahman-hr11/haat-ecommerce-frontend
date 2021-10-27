import React from 'react';
import Grid from '@mui/material/Grid';
import { FaRegEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AddressPanel = () => {
    return (
        <>
            <p>The following addresses will be used on the checkout page by default.</p>
            <div className="dashboard_adresses mt-2">
                <Grid
                    container
                    columnSpacing={3}
                    rowSpacing={{ sm: 3 , xs:3 }}
                >

                    <Grid
                        item
                        lg={6}
                        md={6}
                        sm={12}
                        xs={12}
                    >
                        <div className="dashboard_adress_card">
                            <h4 className="mb-1">Billing Address</h4>
                            <p>
                                User Name <br />
                                User Company <br />
                                User Address <br />
                                +01 2345 6789 <br />
                                example@email.com <br />

                            </p>
                            <Link to="#" className="dashboard_edit d-inline-block">Edit <FaRegEdit /></Link>
                        </div>
                    </Grid>

                    <Grid
                        item
                        lg={6}
                        md={6}
                        sm={12}
                        xs={12}
                    >

                        <div className="dashboard_adress_card">
                            <h4 className="mb-1">Shipping Address</h4>
                            <p>
                                User Name <br />
                                User Company <br />
                                User Address <br />
                                +01 2345 6789 <br />
                                example@email.com <br />

                            </p>
                            <Link to="#" className="dashboard_edit d-inline-block">Edit <FaRegEdit /></Link>
                        </div>
                    </Grid>

                </Grid>
            </div>
        </>
    );
};

export default AddressPanel;