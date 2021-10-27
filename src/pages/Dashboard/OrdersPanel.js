import React, { useContext, useEffect, useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';

const OrdersPanel = () => {
    const { user } = useContext(AuthContext);

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUserOrders = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(`https://hidden-crag-34912.herokuapp.com/api/orders/user/${user._id}`, {
                    headers: {
                        token: user.token
                    }
                });
                setOrders(data.sort((a, b) => (new Date(a.createdAt) > new Date(b.createdAt)) ? -1 : 1));
                setLoading(false);

            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        fetchUserOrders()
    }, [user])
    return (
        <>
            {loading ? (
                <div 
                className="d-flex align-items-center justify-content-center"
                style={{minHeight:'200px'}}
                >
                    <CircularProgress sx={{color:'#666'}} />
                </div>
            ) : (
                <>
                    {orders.length === 0 ? (
                        <>
                            <p>No order has been made yet.</p>
                            <Link to="/shop" className="btn btn_with_icon btn_hover btn-outline-primary mt-1">Go to Shop <BsArrowRight className="dash_panel_icon" /></Link>
                        </>
                    ) : (
                        <div className="dashboard_orders_wrapper">
                            <TableContainer component={Paper}>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="left">SN</TableCell>
                                            <TableCell align="left">Amount</TableCell>
                                            <TableCell align="left">Items</TableCell>
                                            <TableCell align="left">Date</TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {orders.map((order, index) => (
                                            <TableRow
                                                key={order._id}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell align="left">
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell align="left">{order.amount}</TableCell>
                                                <TableCell align="left">
                                                    {order.products.reduce((p, c) => p + c.quantity, 0)}
                                                </TableCell>
                                                <TableCell align="left">{new Date(order.createdAt).toDateString()}</TableCell>


                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default OrdersPanel;