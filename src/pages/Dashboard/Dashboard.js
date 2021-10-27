import React, { useContext } from 'react';
import './Dashboard.css';
import PageBanner from '../../components/PageBanner/PageBanner';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { BsArrowRight } from 'react-icons/bs';
import DashboardPanel from './DashboardPanel';
import OrdersPanel from './OrdersPanel';
import DownloadsPanel from './DownloadsPanel';
import AccountPanel from './AccountPanel';
import BreadCumb from '../../components/BreadCumb/BreadCumb';
import { AiOutlineUser } from 'react-icons/ai';

import { AuthContext } from '../../Context/AuthContext'

const Dashboard = () => {
    const { handleLogout } = useContext(AuthContext);
    return (
        <div className="main">
            <PageBanner title="My Account" />
            <BreadCumb label="Dashboard" Icon={<AiOutlineUser />} />
            <div className="account_wrapper py-4">
                <Container fixed>
                    <Tabs>
                        <Grid
                            container
                            spacing={4}
                            rowSpacing={{ sm: 6, xs: 6 }}
                        >
                            <Grid
                                item
                                lg={4}
                                md={4}
                                sm={12}
                                xs={12}
                            >
                                <TabList className="dashboard_tabs">
                                    <Tab className="dashboard_tabs_item d-flex align-items-center">
                                        <BsArrowRight className="dash_tabs_icon" />
                                        Dashboard
                                    </Tab>
                                    <Tab className="dashboard_tabs_item d-flex align-items-center">
                                        <BsArrowRight className="dash_tabs_icon" />
                                        Orders
                                    </Tab>
                                    <Tab className="dashboard_tabs_item d-flex align-items-center">
                                        <BsArrowRight className="dash_tabs_icon" />
                                        Downloads
                                    </Tab>
                                    <Tab className="dashboard_tabs_item d-flex align-items-center">
                                        <BsArrowRight className="dash_tabs_icon" />
                                        Account Details
                                    </Tab>
                                    <Tab className="dashboard_tabs_item d-flex align-items-center">
                                        <BsArrowRight className="dash_tabs_icon" />
                                        Signout
                                    </Tab>
                                </TabList>

                            </Grid>
                            <Grid
                                item
                                lg={8}
                                md={8}
                                sm={12}
                                xs={12}
                            >
                                <TabPanel className="dashbord_panel">
                                    <DashboardPanel />
                                </TabPanel>

                                <TabPanel className="dashbord_panel">
                                    <OrdersPanel />
                                </TabPanel>

                                <TabPanel className="dashbord_panel">
                                    <DownloadsPanel />
                                </TabPanel>

                                <TabPanel className="dashbord_panel">
                                    <AccountPanel />
                                </TabPanel>

                                <TabPanel className="dashbord_panel">
                                    <p>Confirm Signout?</p>
                                    <span
                                        onClick={() => handleLogout()}
                                        style={{
                                            cursor: 'pointer'
                                        }}
                                        className="btn btn-outline-primary btn_hover mt-1">Signout</span>
                                </TabPanel>

                            </Grid>
                        </Grid>
                    </Tabs>
                </Container>
            </div>
        </div>
    );
};

export default Dashboard;