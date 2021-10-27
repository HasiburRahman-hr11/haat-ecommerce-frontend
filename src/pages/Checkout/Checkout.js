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
                const res = await axios.post('/api/orders/create', orderData);
                if (res.status === 201) {
                    if (user.token) {
                        const { data } = await axios.delete(`/api/cart/remove/${user._id}`, {
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

                            <h3 className="checkout_billing_title mb-2">Billing Address</h3>
                            <Grid
                                container
                                columnSpacing={{ lg: 3, md: 3 }}
                            >
                                <Grid
                                    item
                                    lg={6}
                                    md={6}
                                    sm={12}
                                    xs={12}
                                >
                                    <div className="checkout_input">
                                        <label className="auth_label" htmlFor="billingFirstName">First Name*</label>
                                        <input
                                            type="text"
                                            name="billingFirstName"
                                            id="billingFirstName"
                                            className={billingError.firstName ? 'auth_input isInvalid' : 'auth_input'}
                                            required
                                            value={billingInformation.firstName}
                                            onChange={(e) => setBillingInformation({ ...billingInformation, firstName: e.target.value })}
                                        />
                                        {billingError.firstName && <p className="auth_error">{billingError.firstName}</p>}
                                    </div>
                                </Grid>
                                <Grid
                                    item
                                    lg={6}
                                    md={6}
                                    sm={12}
                                    xs={12}
                                >
                                    <div className="checkout_input">
                                        <label className="auth_label" htmlFor="billingLastName">Last Name*</label>
                                        <input
                                            type="text"
                                            name="billingLastName"
                                            id="billingLastName"
                                            className={billingError.lastName ? 'auth_input isInvalid' : 'auth_input'}
                                            required
                                            value={billingInformation.lastName}
                                            onChange={(e) => setBillingInformation({ ...billingInformation, lastName: e.target.value })}
                                        />
                                        {billingError.lastName && <p className="auth_error">{billingError.lastName}</p>}
                                    </div>
                                </Grid>
                            </Grid>

                            <div className="checkout_input">
                                <label className="auth_label" htmlFor="billingCompany">Company Name (Optional)</label>
                                <input
                                    type="text"
                                    name="billingCompany"
                                    id="billingCompany"
                                    className="auth_input"
                                    value={billingInformation.company}
                                    onChange={(e) => setBillingInformation({ ...billingInformation, company: e.target.value })}
                                />
                            </div>

                            <div className="checkout_input">
                                <label className="auth_label" htmlFor="billingCountry">Country*</label>
                                <input
                                    type="text"
                                    name="billingCountry"
                                    id="billingCountry"
                                    className={billingError.country ? 'auth_input isInvalid' : 'auth_input'}
                                    required
                                    value={billingInformation.address.country}
                                    onChange={(e) => setBillingInformation({ ...billingInformation, address: { ...billingInformation.address, country: e.target.value } })}
                                />
                                {billingError.country && <p className="auth_error">{billingError.country}</p>}
                            </div>


                            <div className="checkout_input">
                                <label className="auth_label" htmlFor="billingStreet">Street Address*</label>
                                <input
                                    type="text"
                                    name="billingStreet"
                                    id="billingStreet"
                                    className={billingError.street ? 'auth_input isInvalid' : 'auth_input'}
                                    placeholder="House Number and Street Number"
                                    required
                                    value={billingInformation.address.street}
                                    onChange={(e) => setBillingInformation({ ...billingInformation, address: { ...billingInformation.address, street: e.target.value } })}
                                />
                                {billingError.street && <p className="auth_error">{billingError.street}</p>}

                            </div>

                            <div className="checkout_input">
                                <input
                                    type="text"
                                    name="billingApartment"
                                    id="billingApartment"
                                    className="auth_input"
                                    placeholder="Apartment, Suite, Unite etc..."
                                    value={billingInformation.address.apartment}
                                    onChange={(e) => setBillingInformation({ ...billingInformation, address: { ...billingInformation.address, apartment: e.target.value } })}
                                />
                            </div>

                            <Grid
                                container
                                columnSpacing={{ lg: 3, md: 3 }}
                            >
                                <Grid
                                    item
                                    lg={6}
                                    md={6}
                                    sm={12}
                                    xs={12}
                                >
                                    <div className="checkout_input">
                                        <label className="auth_label" htmlFor="billingCity">Town / City*</label>
                                        <input
                                            type="text"
                                            name="billingCity"
                                            id="billingCity"
                                            className={billingError.city ? 'auth_input isInvalid' : 'auth_input'}
                                            required
                                            value={billingInformation.address.city}
                                            onChange={(e) => setBillingInformation({ ...billingInformation, address: { ...billingInformation.address, city: e.target.value } })}
                                        />
                                        {billingError.city && <p className="auth_error">{billingError.city}</p>}
                                    </div>
                                </Grid>
                                <Grid
                                    item
                                    lg={6}
                                    md={6}
                                    sm={12}
                                    xs={12}
                                >
                                    <div className="checkout_input">
                                        <label className="auth_label" htmlFor="billingState">State / County*</label>
                                        <input
                                            type="text"
                                            name="billingState"
                                            id="billingState"
                                            className={billingError.state ? 'auth_input isInvalid' : 'auth_input'}
                                            required
                                            value={billingInformation.address.state}
                                            onChange={(e) => setBillingInformation({ ...billingInformation, address: { ...billingInformation.address, state: e.target.value } })}
                                        />
                                        {billingError.state && <p className="auth_error">{billingError.state}</p>}
                                    </div>
                                </Grid>
                            </Grid>


                            <Grid
                                container
                                columnSpacing={{ lg: 3, md: 3 }}
                            >
                                <Grid
                                    item
                                    lg={6}
                                    md={6}
                                    sm={12}
                                    xs={12}
                                >
                                    <div className="checkout_input">
                                        <label className="auth_label" htmlFor="billingPostcode">Postcode / ZIP*</label>
                                        <input
                                            type="text"
                                            name="billingPostcode"
                                            id="billingPostcode"
                                            className={billingError.zip ? 'auth_input isInvalid' : 'auth_input'}
                                            required
                                            value={billingInformation.address.zip}
                                            onChange={(e) => setBillingInformation({ ...billingInformation, address: { ...billingInformation.address, zip: e.target.value } })}
                                        />
                                        {billingError.zip && <p className="auth_error">{billingError.zip}</p>}
                                    </div>
                                </Grid>
                                <Grid
                                    item
                                    lg={6}
                                    md={6}
                                    sm={12}
                                    xs={12}
                                >
                                    <div className="checkout_input">
                                        <label className="auth_label" htmlFor="billingPhone">Phone*</label>
                                        <input
                                            type="tel"
                                            name="billingPhone"
                                            id="billingPhone"
                                            className={billingError.phone ? 'auth_input isInvalid' : 'auth_input'}
                                            required
                                            value={billingInformation.phone}
                                            onChange={(e) => setBillingInformation({ ...billingInformation, phone: e.target.value })}
                                        />
                                        {billingError.phone && <p className="auth_error">{billingError.phone}</p>}
                                    </div>
                                </Grid>
                            </Grid>

                            <div className="checkout_input">
                                <label className="auth_label" htmlFor="billingEmail">Email Address</label>
                                <input
                                    type="email"
                                    name="billingEmail"
                                    id="billingEmail"
                                    className={billingError.email ? 'auth_input isInvalid' : 'auth_input'}
                                    value={billingInformation.email}
                                    onChange={(e) => setBillingInformation({ ...billingInformation, email: e.target.value })}
                                />
                                {billingError.email && <p className="auth_error">{billingError.email}</p>}
                            </div>
                            <div className="checkout_checkbox  d-flex align-items-center">
                                <input
                                    type="checkbox"
                                    name="billingCreateAccount"
                                    id="billingCreateAccount"
                                    className="custom_checkbox"
                                />
                                <label className="auth_label" htmlFor="billingCreateAccount">Create an Account?</label>
                            </div>


                            <Accordion
                                expanded={expandedShipping === 'shippingAddress'} onChange={handleShippingToggle('shippingAddress')}
                                className="checkout_collapsable"
                            >
                                <AccordionSummary
                                    className="checkout_toggle_label w-100"
                                    htmlFor="shipToDiff"
                                    aria-controls="shippingAddress-content"
                                >
                                    <input
                                        type="checkbox"
                                        name="shipToDiff"
                                        id="shipToDiff"
                                        className="custom_checkbox checkout_toggle_checkbox"
                                        checked={expandedShipping}
                                        onChange={handleShippingToggle('shippingAddress')}
                                    />
                                    Ship to different address?
                                </AccordionSummary>
                                <AccordionDetails className="checkout_shipping_details">
                                    <div className={expandedShipping ? 'show' : 'hide'}>
                                        <Grid
                                            container
                                            columnSpacing={{ lg: 3, md: 3 }}
                                        >
                                            <Grid
                                                item
                                                lg={6}
                                                md={6}
                                                sm={12}
                                                xs={12}
                                            >
                                                <div className="checkout_input">
                                                    <label className="auth_label" htmlFor="shippingFirstName">First Name*</label>
                                                    <input
                                                        type="text"
                                                        name="shippingFirstName"
                                                        id="shippingFirstName"
                                                        className={shippingError.firstName ? 'auth_input isInvalid' : 'auth_input'}
                                                        value={shippingInformation.firstName}
                                                        onChange={(e) => setShippingInformation({ ...shippingInformation, firstName: e.target.value })}
                                                    />
                                                    {shippingError.firstName && <p className="auth_error">{shippingError.firstName}</p>}
                                                </div>
                                            </Grid>
                                            <Grid
                                                item
                                                lg={6}
                                                md={6}
                                                sm={12}
                                                xs={12}
                                            >
                                                <div className="checkout_input">
                                                    <label className="auth_label" htmlFor="shippingLastName">Last Name*</label>
                                                    <input
                                                        type="text"
                                                        name="shippingLastName"
                                                        id="shippingLastName"
                                                        className={shippingError.lastName ? 'auth_input isInvalid' : 'auth_input'}
                                                        value={shippingInformation.lastName}
                                                        onChange={(e) => setShippingInformation({ ...shippingInformation, lastName: e.target.value })}
                                                    />
                                                    {shippingError.lastName && <p className="auth_error">{shippingError.lastName}</p>}
                                                </div>
                                            </Grid>
                                        </Grid>

                                        <div className="checkout_input">
                                            <label className="auth_label" htmlFor="shippingCompany">Company Name (Optional)</label>
                                            <input
                                                type="text"
                                                name="shippingCompany"
                                                id="shippingCompany"
                                                className="auth_input"
                                                value={shippingInformation.company}
                                                onChange={(e) => setShippingInformation({ ...shippingInformation, company: e.target.value })}
                                            />
                                        </div>

                                        <div className="checkout_input">
                                            <label className="auth_label" htmlFor="shippingCountry">Country*</label>
                                            <input
                                                type="text"
                                                name="shippingCountry"
                                                id="shippingCountry"
                                                className={shippingError.country ? 'auth_input isInvalid' : 'auth_input'}
                                                value={shippingInformation.address.country}
                                                onChange={(e) => setShippingInformation({ ...shippingInformation, address: { ...shippingInformation.address, country: e.target.value } })}
                                            />
                                            {shippingError.country && <p className="auth_error">{shippingError.country}</p>}
                                        </div>


                                        <div className="checkout_input">
                                            <label className="auth_label" htmlFor="shippingStreet">Street Address*</label>
                                            <input
                                                type="text"
                                                name="shippingStreet"
                                                id="shippingStreet"
                                                className={shippingError.street ? 'auth_input isInvalid' : 'auth_input'}
                                                placeholder="House Number and Street Number"
                                                value={shippingInformation.address.street}
                                                onChange={(e) => setShippingInformation({ ...shippingInformation, address: { ...shippingInformation.address, street: e.target.value } })}
                                            />
                                            {shippingError.street && <p className="auth_error">{shippingError.street}</p>}

                                        </div>
                                        <div className="checkout_input">
                                            <input
                                                type="text"
                                                name="shippingApartment"
                                                id="shippingApartment"
                                                className="auth_input"
                                                placeholder="Apartment, Suite, Unite etc..."
                                                value={shippingInformation.address.apartment}
                                                onChange={(e) => setShippingInformation({ ...shippingInformation, address: { ...shippingInformation.address, apartment: e.target.value } })}
                                            />
                                        </div>

                                        <Grid
                                            container
                                            columnSpacing={{ lg: 3, md: 3 }}
                                        >
                                            <Grid
                                                item
                                                lg={6}
                                                md={6}
                                                sm={12}
                                                xs={12}
                                            >
                                                <div className="checkout_input">
                                                    <label className="auth_label" htmlFor="shippingCity">Town / City*</label>
                                                    <input
                                                        type="text"
                                                        name="shippingCity"
                                                        id="shippingCity"
                                                        className={shippingError.city ? 'auth_input isInvalid' : 'auth_input'}
                                                        value={shippingInformation.address.city}
                                                        onChange={(e) => setShippingInformation({ ...shippingInformation, address: { ...shippingInformation.address, city: e.target.value } })}
                                                    />
                                                    {shippingError.city && <p className="auth_error">{shippingError.city}</p>}
                                                </div>
                                            </Grid>
                                            <Grid
                                                item
                                                lg={6}
                                                md={6}
                                                sm={12}
                                                xs={12}
                                            >
                                                <div className="checkout_input">
                                                    <label className="auth_label" htmlFor="shippingState">State / County*</label>
                                                    <input
                                                        type="text"
                                                        name="shippingState"
                                                        id="shippingState"
                                                        className={shippingError.state ? 'auth_input isInvalid' : 'auth_input'}
                                                        value={shippingInformation.address.state}
                                                        onChange={(e) => setShippingInformation({ ...shippingInformation, address: { ...shippingInformation.address, state: e.target.value } })}
                                                    />
                                                    {shippingError.state && <p className="auth_error">{shippingError.state}</p>}
                                                </div>
                                            </Grid>
                                        </Grid>


                                        <Grid
                                            container
                                            columnSpacing={{ lg: 3, md: 3 }}
                                        >
                                            <Grid
                                                item
                                                lg={6}
                                                md={6}
                                                sm={12}
                                                xs={12}
                                            >
                                                <div className="checkout_input">
                                                    <label className="auth_label" htmlFor="shippingPostcode">Postcode / ZIP*</label>
                                                    <input
                                                        type="text"
                                                        name="shippingPostcode"
                                                        id="shippingPostcode"
                                                        className={shippingError.zip ? 'auth_input isInvalid' : 'auth_input'}
                                                        value={shippingInformation.address.zip}
                                                        onChange={(e) => setShippingInformation({ ...shippingInformation, address: { ...shippingInformation.address, zip: e.target.value } })}
                                                    />
                                                    {shippingError.zip && <p className="auth_error">{shippingError.zip}</p>}
                                                </div>
                                            </Grid>
                                            <Grid
                                                item
                                                lg={6}
                                                md={6}
                                                sm={12}
                                                xs={12}
                                            >
                                                <div className="checkout_input">
                                                    <label className="auth_label" htmlFor="shippingPhone">Phone*</label>
                                                    <input
                                                        type="tel"
                                                        name="shippingPhone"
                                                        id="shippingPhone"
                                                        className={shippingError.phone ? 'auth_input isInvalid' : 'auth_input'}
                                                        value={shippingInformation.phone}
                                                        onChange={(e) => setShippingInformation({ ...shippingInformation, phone: e.target.value })}
                                                    />
                                                    {shippingError.phone && <p className="auth_error">{shippingError.phone}</p>}
                                                </div>
                                            </Grid>
                                        </Grid>

                                        <div className="checkout_input">
                                            <label className="auth_label" htmlFor="shippingEmail">Email Address</label>
                                            <input
                                                type="email"
                                                name="shippingEmail"
                                                id="shippingEmail"
                                                className={shippingError.email ? 'auth_input isInvalid' : 'auth_input'}
                                                value={shippingInformation.email}
                                                onChange={(e) => setShippingInformation({ ...shippingInformation, email: e.target.value })}
                                            />
                                            {shippingError.email && <p className="auth_error">{shippingError.email}</p>}
                                        </div>
                                    </div>
                                </AccordionDetails>
                            </Accordion>




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
                                        expanded={expandedPayment === 'bankPayment'} onChange={handlePaymentToggle('bankPayment')}
                                        className="checkout_collapsable"
                                    >
                                        <AccordionSummary
                                            className="checkout_toggle_label checkout_payment_toggle w-100"
                                            aria-controls="shippingAddress-content"
                                            onClick={() => setPaymentMethod('Direct bank transfer')}
                                        >
                                            <div className="checkout_payment_header">
                                                <span className="payment_toggle_button d-block w-100">
                                                    Direct Bank Transfer
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
                                        expanded={expandedPayment === 'checkPayment'} onChange={handlePaymentToggle('checkPayment')}
                                        className="checkout_collapsable"
                                    >
                                        <AccordionSummary
                                            className="checkout_toggle_label checkout_payment_toggle w-100"
                                            aria-controls="shippingAddress-content"
                                            onClick={() => setPaymentMethod('Check payment')}
                                        >
                                            <div className="checkout_payment_header">
                                                <span className="payment_toggle_button d-block w-100">
                                                    Check Payment
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
                                        expanded={expandedPayment === 'paypalPayment'} onChange={handlePaymentToggle('paypalPayment')}
                                        className="checkout_collapsable"
                                    >
                                        <AccordionSummary
                                            className="checkout_toggle_label checkout_payment_toggle w-100"
                                            aria-controls="shippingAddress-content"
                                            onClick={() => setPaymentMethod('PayPal')}
                                        >
                                            <div className="checkout_payment_header">
                                                <span className="payment_toggle_button d-block w-100">
                                                    PayPal
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