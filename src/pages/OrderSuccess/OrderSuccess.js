import React, { useEffect, useState } from 'react';
import './OrderSuccess.css';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../../components/Loading/Loading';

const OrderSuccess = () => {

    const { orderId } = useParams();

    const [order, setOrder] = useState({});
    const [loading, setLoading] = useState(false);
    const [productIds, setProductIds] = useState([])
    const [orderProducts, setOrderProducts] = useState([])

    const subtotal = orderProducts.reduce((p, c) => p + c.price * c.quantity, 0);
    const shipping = 10;
    const tax = (subtotal + shipping) * 10 / 100
    const total = subtotal + shipping + tax;

    useEffect(() => {

        const getOrderDetails = async () => {
            const cartIds = [];
            const productsArray = [];
            setLoading(true);
            try {
                const currentOrder = await axios.get(`https://hidden-crag-34912.herokuapp.com/api/orders/${orderId}`)
                setOrder(currentOrder.data);

                currentOrder.data.products.forEach(product => {
                    if (!cartIds.includes(product._id)) {
                        cartIds.push(product._id)
                    }
                });

                setProductIds(cartIds)
                if (cartIds.length > 0) {
                    const { data } = await axios.post('https://hidden-crag-34912.herokuapp.com/api/products/cartProducts', { cartIds });


                    currentOrder.data.products.forEach(product => {
                        const orderProduct = data.find(p => p._id === product._id)
                        if (orderProduct) {

                            orderProduct._id = product._id;
                            orderProduct.quantity = product.quantity;
                            orderProduct.color = product.info.color;
                            orderProduct.size = product.info.size;

                            if (orderProduct.salePrice) {
                                orderProduct.price = orderProduct.salePrice
                            } else {
                                orderProduct.price = orderProduct.regularPrice
                            }

                            productsArray.push(orderProduct)

                        }


                    });

                    setOrderProducts(productsArray);
                }

                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        getOrderDetails();

    }, [orderId])

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div className="main">
                    <div className="order_success_wrapper py-4">
                        <Container fixed>
                            <div className="thankyou_card">
                                <h2>Thank You.</h2>
                                <p>Your order has been placed successfully.</p>
                                <p style={{
                                    color: '#666',
                                    marginTop: '20px'
                                }} >Your order will begin processing within one hour of being placed. Your order summery is given below.</p>
                            </div>

                            <div className="order_summery_wrapper">
                                <h2>Order Summery</h2>
                                <Grid container spacing={4}>
                                    <Grid item md={6} xs={12}>
                                        <div className="order_details">
                                            <div className="order_calculation">
                                                <p>
                                                    <span>Subtotal</span>
                                                    <span>${subtotal}</span>
                                                </p>
                                                <p>
                                                    <span>Shipping</span>
                                                    <span>${shipping}</span>
                                                </p>
                                                <p>
                                                    <span>Tax</span>
                                                    <span>${tax}</span>
                                                </p>
                                                <p style={{
                                                    fontSize: '18px'
                                                }}>
                                                    <strong>Total</strong>
                                                    <strong>${total}</strong>
                                                </p>
                                            </div>

                                            <div className="order_address">
                                                <Grid container spacing={4}>
                                                    <Grid item xs={12} md={order?.shippingInformation?.firstName ? 6 : 12}>
                                                        <div className="order_billing_address">
                                                            <h3>Billing Information</h3>

                                                            <p> Name: {order?.billingInformation?.firstName} {order?.billingInformation?.lastName}</p>

                                                            {order?.billingInformation?.address.street && (
                                                                <p> Address: {order.billingInformation.address.street}</p>
                                                            )}

                                                            {order?.billingInformation?.address.zip && (
                                                                <p> Zip: {order.billingInformation.address.zip}</p>
                                                            )}

                                                            {order?.billingInformation?.address.city && (
                                                                <p> City: {order.billingInformation.address.city}</p>
                                                            )}
                                                            {order?.billingInformation?.address.country && (
                                                                <p> Country: {order.billingInformation.address.country}</p>
                                                            )}
                                                            {order?.billingInformation?.phone && (
                                                                <p> Phone: {order.billingInformation.phone}</p>
                                                            )}
                                                            {order?.billingInformation?.email && (
                                                                <p> Email: {order.billingInformation.email}</p>
                                                            )}

                                                        </div>

                                                    </Grid>
                                                    {order?.shippingInformation?.firstName && (
                                                        <Grid item xs={12} md={6}>
                                                            <div className="order_shipping_address">
                                                                <h3>Shipping Information</h3>

                                                                {order.shippingInformation.firstName && order.shippingInformation.lastName && (
                                                                    <p> Name: {order.shippingInformation.firstName} {order.shippingInformation.lastName}</p>
                                                                )}


                                                                {order.shippingInformation.address.street && (
                                                                    <p> Address: {order.shippingInformation.address.street}</p>
                                                                )}

                                                                {order.shippingInformation.address.zip && (
                                                                    <p> Zip: {order.shippingInformation.address.zip}</p>
                                                                )}

                                                                {order.shippingInformation.address.city && (
                                                                    <p> City: {order.shippingInformation.address.city}</p>
                                                                )}
                                                                {order.shippingInformation.address.country && (
                                                                    <p> Country: {order.shippingInformation.address.country}</p>
                                                                )}
                                                                {order.shippingInformation.phone && (
                                                                    <p> Phone: {order.shippingInformation.phone}</p>
                                                                )}
                                                                {order.shippingInformation.email && (
                                                                    <p> Email: {order.shippingInformation.email}</p>
                                                                )}

                                                            </div>
                                                        </Grid>
                                                    )}
                                                </Grid>

                                                {order?.orderNote && (
                                                    <div className="order_note">
                                                        <h3>Order Note</h3>
                                                        <p>{order.orderNote}</p>
                                                    </div>
                                                )}

                                                {order?.paymentMethod && (
                                                    <div style={{ marginTop: '30px', textAlign: 'center' }}>
                                                        <p>Payment Method: <strong>{order.paymentMethod}</strong></p>
                                                    </div>
                                                )}

                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        {orderProducts.length > 0 && (
                                            <div className="order_items_wrapper">
                                                {
                                                    orderProducts.map(product => (
                                                        <div className="order_item" key={product._id}>
                                                            {product.thumbnail && (
                                                                <div>
                                                                    <img src={product.thumbnail} alt={product.title} />
                                                                </div>
                                                            )}

                                                            <div
                                                                className="order_item_content">
                                                                <h4>{product.title}</h4>
                                                                <p className="order_item_price">
                                                                    <strong>Price:</strong> {product.price}
                                                                </p>
                                                                <p
                                                                    className="order_item_info"
                                                                >
                                                                    <span>
                                                                        <strong>Qty:</strong> {product.quantity}
                                                                    </span>
                                                                    {product.color && (
                                                                        <span>
                                                                            <strong>Color:</strong> {product.color}
                                                                        </span>
                                                                    )}
                                                                    {product.size && (
                                                                        <span>
                                                                            <strong>Size:</strong> {product.size}
                                                                        </span>
                                                                    )}
                                                                </p>

                                                            </div>

                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        )}

                                    </Grid>
                                </Grid>
                            </div>

                            <div style={{ marginTop: '50px', textAlign: 'center' }}>
                                <Link to="/shop" className="btn btn-primary">Shop More</Link>
                            </div>

                        </Container>
                    </div>
                </div>
            )}
        </>
    );
};

export default OrderSuccess;