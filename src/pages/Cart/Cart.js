import React, { useContext, useState } from 'react';
import './Cart.css';
import axios from 'axios';

import { Link } from 'react-router-dom';
import { AiOutlineCloseCircle, AiOutlineShoppingCart } from 'react-icons/ai';
import { getOldCart } from '../../utils/cartHandler';
import { BsArrowRepeat, BsArrowRight } from 'react-icons/bs';

import 'react-toastify/dist/ReactToastify.css';
import { successNotify } from '../../utils/tost-notify';
import PageBanner from '../../components/PageBanner/PageBanner';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Error from '../Error/Error';
import BreadCumb from '../../components/BreadCumb/BreadCumb';
import { CartContext } from '../../Context/CartContext';
import { AuthContext } from '../../Context/AuthContext';
import useCartProducts from '../../hooks/useCartProducts';
// import Loading from '../../components/Loading/Loading';

const Cart = () => {

    const { user } = useContext(AuthContext)
    const [cartProducts] = useCartProducts();
    const { carts, setCarts } = useContext(CartContext);

    const cartItems = cartProducts.reduce((p, c) => p + c.quantity, 0);
    const subtotal = cartProducts.reduce((p, c) => p + c.price * c.quantity, 0);
    const shipping = 10;
    const tax = (subtotal + shipping) * 10 / 100
    const total = subtotal + shipping + tax

    const qtyIncreamanet = (prevQty, index) => {
        const value = prevQty;
        const cloneProducts = [...carts];

        cloneProducts[index].quantity = value + 1;
        // cloneProducts[index].total = cloneProducts[index].price * cloneProducts[index].quantity

        setCarts(cloneProducts);
    }
    const qtyDecreamanet = (prevQty, index) => {
        const value = prevQty;
        const cloneProducts = [...carts];
        const valueInt = parseInt(value);
        if (valueInt > 1) {
            cloneProducts[index].quantity = value - 1;

            // cloneProducts[index].total = cloneProducts[index].price * cloneProducts[index].quantity

            setCarts(cloneProducts);

        }
    }
    const qtyChangeHandler = (event, index) => {
        const value = event.target.value;
        const valueInt = parseInt(value);
        const cloneProducts = [...carts];


        if (value === "") {
            cloneProducts[index].quantity = 1;
        } else {
            cloneProducts[index].quantity = valueInt;
        }
        setCarts(cloneProducts);
    }

    const handleUpdateCart = async () => {
        if (user.token) {
            try {
                const { data } = await axios.put(`/api/cart/update/${user._id}`,
                    { items: carts },
                    {
                        headers: {
                            token: user.token
                        }
                    }
                )
                successNotify('Cart Updated Successfully.');

            } catch (error) {
                console.log(error);
            }
        } else {
            localStorage.setItem('haat-cart', JSON.stringify(carts));
            successNotify('Cart Updated Successfully.')
        }
    }

    const handleRemoveCart = async (product) => {
        if (user.token) {
            try {
                const { data } = await axios.put(`/api/cart/removeSingle/${user._id}`,
                    { productId: product._id },
                    {
                        headers: {
                            token: user.token
                        }
                    });

                setCarts(data.products);
                successNotify('Item Removed From Cart.')
            } catch (error) {
                console.log(error)
            }
        } else {
            const updatedCart = carts.filter(item => item._id !== product._id);
            localStorage.setItem('haat-cart', JSON.stringify(updatedCart));
            const newCarts = getOldCart();
            setCarts(newCarts);
            successNotify('Item Removed From Cart.')
        }
    }

    return (
        <>
            {/* {loading ? (<Loading />) : (
                
            )} */}
            <div className="main">
                <PageBanner title="Shopping Cart" />
                <BreadCumb label="Cart" Icon={<AiOutlineShoppingCart />} />
                <div className="cart_wrapper py-5">
                    <Container>
                        {carts.length > 0 ? (
                            <Grid
                                container
                                spacing={3}
                            >
                                <Grid
                                    item
                                    lg={9}
                                    md={8}
                                    sm={12}
                                    xs={12}
                                >
                                    <table className="table_cart w-100 table_responsive">
                                        <thead>
                                            <tr>
                                                <th>Product</th>
                                                <th>Price</th>
                                                <th>Quantity</th>
                                                <th>Total</th>
                                                <th></th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                cartProducts.map((product, index) => (
                                                    <tr key={index} className="table_item">
                                                        <td className="product_col">
                                                            <div className="d-flex align-items-center">
                                                                <img src={process.env.REACT_APP_SERVER_URL + product.thumbnail} alt="" />
                                                                <p className="table_product_title mb-0">
                                                                    <Link to={`/product/${product._id}`}
                                                                    >{product.title}</Link>
                                                                </p>
                                                            </div>
                                                        </td>
                                                        <td className="price_col">
                                                            ${product.price}
                                                        </td>
                                                        <td className="qty_col">
                                                            <div className="sp_quantity_box d-flex align-items-center">
                                                                <button
                                                                    className="cart_dec qty_btn"
                                                                    onClick={() => qtyDecreamanet(product.quantity, index)}
                                                                >-</button>
                                                                <input
                                                                    type="number"
                                                                    name="qty"
                                                                    className="qty_input"
                                                                    value={product.quantity}
                                                                    onChange={(event) => qtyChangeHandler(event, index)}
                                                                />
                                                                <button
                                                                    className="cart_inc qty_btn"
                                                                    onClick={() => qtyIncreamanet(product.quantity, index)}
                                                                >+</button>
                                                            </div>
                                                        </td>
                                                        <td className="total_col">
                                                            ${(product.quantity * product.price).toFixed(2)}

                                                        </td>
                                                        <td
                                                            className="cart_close"
                                                            onClick={() => handleRemoveCart(product)}
                                                        ><AiOutlineCloseCircle className="cart_close_icon" /></td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>

                                    <div className="cart_actions mt-3">
                                        <button
                                            onClick={handleUpdateCart}
                                            className="update_cart btn btn-primary align-items-center"
                                        >
                                            Update Cart
                                            <BsArrowRepeat className="update_cart_icon" />
                                        </button>

                                    </div>
                                </Grid>
                                <Grid
                                    item
                                    lg={3}
                                    md={4}
                                    sm={12}
                                    xs={12}
                                >
                                    <div className="cart_summary">
                                        <h4 className="cart_summary_title">Cart Total ({cartItems} {cartItems > 1 ? 'items' : 'item'})</h4>
                                        <div className="cart_summary_items">
                                            <div className="cs_item cs_subtotal d-flex justify-content-between">
                                                <span>Subtotal: </span>
                                                <span>${subtotal.toFixed(2)}</span>
                                            </div>
                                            <div className="cs_item cs_shipping d-flex justify-content-between">
                                                <span>Shipping: </span>
                                                <span>${shipping}</span>
                                            </div>
                                            <div className="cs_item cs_tax d-flex justify-content-between">
                                                <span>Tax: </span>
                                                <span>${tax.toFixed(2)}</span>
                                            </div>
                                            <div className="cs_item cs_total d-flex justify-content-between">
                                                <span>Total: </span>
                                                <span>${total.toFixed(2)}</span>
                                            </div>
                                        </div>

                                        <Link to="/checkout" className="checkout_btn btn_hover btn btn-outline-primary mt-3">Proceed to Checkout</Link>
                                    </div>
                                    <Link
                                        className="continue_shopping btn btn-outline-primary mt-2 btn_hover align-items-center justify-content-center"
                                        to="/shop"
                                    >Continue Shopping <BsArrowRight /></Link>
                                </Grid>
                            </Grid>
                        ) : (
                            <Error content="Your Cart is Empty!" />
                        )}
                    </Container>
                </div>
            </div>
        </>
    );
};

export default Cart;