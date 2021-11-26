import { Container, Grid } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { successNotify } from '../../utils/tost-notify';
import { AiOutlineCheckSquare } from 'react-icons/ai';
import './Checkout.css';
import useCartProducts from '../../hooks/useCartProducts';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';


// Components
import BreadCumb from '../../components/BreadCumb/BreadCumb';
import PageBanner from '../../components/PageBanner/PageBanner';
import { AuthContext } from '../../Context/AuthContext';
import { billingFormValidator, shippingFormValidator } from '../../utils/checkoutFormValidator';
import { CartContext } from '../../Context/CartContext';
import CheckOutBilling from '../../components/CheckOutBilling/CheckOutBilling';
import CheckOutShipping from '../../components/CheckOutShipping/CheckOutShipping';

const Checkout = () => {

    const { user } = useContext(AuthContext);

    const { setCarts } = useContext(CartContext);

    const history = useHistory();

    const [cartProducts] = useCartProducts();
    const subtotal = cartProducts.reduce((p, c) => p + c.price * c.quantity, 0);
    const shipping = 10;
    const tax = (subtotal + shipping) * 10 / 100
    const total = subtotal + shipping + tax


    const [expandedShipping, setExpandShipping] = useState(false);
    const [expandedPayment, setExpandPayment] = useState('cashPayment');


    const [billingInformation, setBillingInformation] = useState({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: '',
        company: '',
        address: {
            country: '',
            state: '',
            city: '',
            zip: '',
            street: '',
            apartment: ''
        }
    });

    const [shippingInformation, setShippingInformation] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        address: {
            country: '',
            state: '',
            city: '',
            zip: '',
            street: '',
            apartment: ''
        }
    });

    const [orderNote, setOrderNote] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('Cash on delivery');
    const [orderProducts, setOrderProducts] = useState([]);

    const [billingError, setBillingError] = useState({});
    const [shippingError, setShippingError] = useState({});


    const handleShippingToggle = (panel) => (event, isExpanded) => {
        setExpandShipping(isExpanded ? panel : false);
    };
    const handlePaymentToggle = (panel) => (event, isExpanded) => {
        setExpandPayment(isExpanded ? panel : false);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        let isValid = false;

        const orderData = {
            billingInformation: billingInformation,
            products: orderProducts,
            amount: total,
            paymentMethod: paymentMethod
        }
        if (user.token) {
            orderData.userId = user._id
        }
        if (orderNote) {
            orderData.orderNote = orderNote
        }

        const billingErrors = billingFormValidator(billingInformation);
        setBillingError({ ...billingErrors });

        if (expandedShipping) {
            orderData.shippingInformation = shippingInformation
            const shippingErrors = shippingFormValidator(shippingInformation);
            setShippingError({ ...shippingErrors });

            if (billingErrors.isValidated && shippingErrors.isValidated) {
                isValid = true;
            }

        } else {
            if (billingErrors.isValidated) {
                isValid = true;
            }
        }

        if (isValid) {
            try {
                const res = await axios.post('https://hidden-crag-34912.herokuapp.com/api/orders/create', orderData);
                if (res.status === 201) {
                    if (user.token) {
                        const { data } = await axios.delete(`https://hidden-crag-34912.herokuapp.com/api/cart/remove/${user._id}`, {
                            headers: {
                                token: user.token
                            }
                        });
                    } else {
                        localStorage.removeItem('haat-cart');
                    }
                    setCarts([]);
                    successNotify('Order Placed Successfully');
                    history.push(`/order/${res.data._id}`)
                }

            } catch (error) {
                console.log(error)
            }
        }



    }

    useEffect(() => {

        const getOrderProducts = () => {
            const orderProductsArray = [];

            cartProducts.forEach(product => {
                const productObj = {
                    _id: product._id,
                    quantity: product.quantity,
                    info: {}
                }
                if (product.color) {
                    productObj.info.color = product.color
                }
                if (product.size) {
                    productObj.info.size = product.size
                }

                orderProductsArray.push(productObj);
            })
            setOrderProducts(orderProductsArray)
        }
        getOrderProducts();

    }, [cartProducts])

    return (
        <div className="main">
            <PageBanner title="Checkout" />
            <BreadCumb label="Checkout" Icon={<AiOutlineCheckSquare />} />
            <Container fixed className="py-4">
                <form className="checkout_form" onSubmit={handleSubmit}>
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            lg={8}
                            md={6}
                            sm={12}
                            xs={12}
                        >


                            <CheckOutBilling
                                billingInformation={billingInformation}
                                setBillingInformation={setBillingInformation}
                                billingError={billingError}
                            />


                            <CheckOutShipping
                                expandedShipping={expandedShipping}
                                handleShippingToggle={handleShippingToggle}
                                shippingInformation={shippingInformation}
                                setShippingInformation={setShippingInformation}
                                shippingError={shippingError}
                            />



                            <div className="checkout_input mt-2">
                                <label className="auth_label" htmlFor="orderNotes">Order Notes (Optional)</label>
                                <textarea
                                    name="orderNotes"
                                    id="orderNotes"
                                    className="auth_input order_notes"
                                    value={orderNote}
                                    onChange={(e) => setOrderNote(e.target.value)}
                                >

                                </textarea>
                            </div>






                        </Grid>
                        <Grid
                            item
                            lg={4}
                            md={6}
                            sm={12}
                            xs={12}
                        >

                            <div className="checkout_summery">
                                <h4 className="checkout_summery_title">Your Order</h4>
                                <table className="checkout_summery_table mb-2 w-100">
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartProducts.map(product => (
                                            <tr key={product._id} className="summery_product">
                                                <td>{product.title}</td>
                                                <td>${product.quantity * product.price}</td>
                                            </tr>
                                        ))}

                                        <tr className="summery_subtotal">
                                            <td>Subtotal</td>
                                            <td>${subtotal.toFixed(2)}</td>
                                        </tr>
                                        <tr className="summery_shipping">
                                            <td>Shipping</td>
                                            <td>${shipping.toFixed(2)}</td>
                                        </tr>
                                        <tr className="summery_tax">
                                            <td>Tax</td>
                                            <td>${tax.toFixed(2)}</td>
                                        </tr>
                                        <tr className="summery_total">
                                            <td>Total</td>
                                            <td>${total.toFixed(2)}</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div className="checkout_payments_wrapper">
                                    <Accordion
                                        expanded={expandedPayment === 'cashPayment'} onChange={handlePaymentToggle('cashPayment')}
                                        className="checkout_collapsable"
                                    >
                                        <AccordionSummary
                                            className="checkout_toggle_label checkout_payment_toggle w-100"
                                            aria-controls="shippingAddress-content"
                                            onClick={() => setPaymentMethod('Cash on delivery')}
                                        >
                                            <div className="checkout_payment_header">
                                                <span className="payment_toggle_button d-block w-100">
                                                    Cash on delivery
                                                </span>
                                            </div>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <p className="payment_description">
                                                Payment method is not implemented yet. But you can select a method. It will be added to the order data.
                                                &#128522; &#128522;
                                            </p>
                                        </AccordionDetails>

                                    </Accordion>

                                    <Accordion
                                        expanded={expandedPayment === 'cardPayment'} onChange={handlePaymentToggle('cardPayment')}
                                        className="checkout_collapsable"
                                    >
                                        <AccordionSummary
                                            className="checkout_toggle_label checkout_payment_toggle w-100"
                                            aria-controls="shippingAddress-content"
                                            onClick={() => setPaymentMethod('Credit card')}
                                        >
                                            <div className="checkout_payment_header">
                                                <span className="payment_toggle_button d-block w-100">
                                                    Credit Card
                                                </span>
                                            </div>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <p className="payment_description">
                                                Payment method is not implemented yet. But you can select a method. It will be added to the order data.
                                                &#128522; &#128522;
                                            </p>
                                        </AccordionDetails>

                                    </Accordion>

                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-outline-primary btn_hover w-100 mt-2"
                                >Place Order</button>

                            </div>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </div>
    );
};

export default Checkout;