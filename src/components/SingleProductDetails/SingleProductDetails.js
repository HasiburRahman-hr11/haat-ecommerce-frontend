import { Rating } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import './SingleProductDetails.css';
import { AiOutlineShoppingCart, AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { getOldCart, setNewCartToLs } from '../../utils/cartHandler';

import { successNotify } from '../../utils/tost-notify';
import { getOldWish, setNewWishToLs } from '../../utils/wishlistHandler';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import { CartContext } from '../../Context/CartContext';
import { WishlistContext } from '../../Context/WishlistContext';
import ratingCalculator from '../../utils/calculateRttings';


const SingleProductDetails = ({ product }) => {

    const { user } = useContext(AuthContext);

    const { setCarts } = useContext(CartContext);
    const { wishlist, setWishlist } = useContext(WishlistContext);
    const [isWishlisted, setIsWishlisted] = useState(false);

    const [ratings, setRatings] = useState(0);

    const [color, setColor] = useState('');
    const [size, setSize] = useState('');
    const [qty, setQty] = useState(1);
    const [hasColor, setHasColor] = useState(false);
    const [hasSize, setHasSize] = useState(false);
    const [hasSizeAndColor, setHasSizeAndColor] = useState(false);


    const handleColorChange = (e) => {
        if (e.target.value !== '') {
            setColor(e.target.value);
        } else {
            setHasColor(false)
        }
    }
    const handleSizeChange = (e) => {
        if (e.target.value !== '') {
            setSize(e.target.value);
        } else {
            setHasSize(false)
        }
    }

    const qtyIncreamanet = () => {
        setQty(qty + 1)
    }
    const qtyDecreamanet = () => {
        if (qty > 1) {
            setQty(qty - 1)
        }
    }

    const handleAddToCart = async () => {
        if (size) product.size = size
        if (color) product.color = color

        if (user.token) {
            const cartData = {
                productId: product._id,
                quantity: qty
            }

            if (size) cartData.size = size
            if (color) cartData.color = color
            const { data } = await axios.post(`https://hidden-crag-34912.herokuapp.com/api/cart/add/${user._id}`, cartData, {
                headers: {
                    token: user.token
                }
            });

            setCarts(data.products);
            successNotify('Product Added to Cart.');

        } else {
            setNewCartToLs(product, qty);
            const newCart = getOldCart();
            setCarts(newCart);
            setQty(1);
            successNotify('Product Added to Cart.');
        }

    }

    const handleWishList = () => {
        if (isWishlisted) {
            const updatedWishlist = wishlist.filter(item => item._id !== product._id);
            localStorage.setItem('haat-wish', JSON.stringify(updatedWishlist));

            const newWish = getOldWish();
            setWishlist(newWish);
            setIsWishlisted(false);
            successNotify('Item Removed From Wishlist.');
        } else {
            setNewWishToLs(product);
            successNotify('Product Added to Wishlist');
            const myWish = getOldWish();
            setWishlist(myWish);
            setIsWishlisted(true);
        }
    }

    useEffect(() => {


        const getRatings = ratingCalculator(product);
        setRatings(getRatings)


        const handleVariations = () => {
            if (product.colors.length > 0 && color && !product.sizes.length > 0) {
                setHasColor(true)
            }
            if (product.sizes.length > 0 && size && !product.colors.length > 0) {
                setHasSize(true)
            }
            if (product.colors.length > 0 && color && product.sizes.length > 0 && size) {
                setHasSizeAndColor(true)
            }
            if (!product.variation) {
                setHasColor(true)
                setHasSize(true)
                setHasSizeAndColor(true)
            }
        }
        handleVariations();

        const productInWishlist = () => {
            wishlist.forEach(item => {
                if (item._id === product._id) {
                    setIsWishlisted(true)
                }
            })
        }
        productInWishlist();
    }, [product, color, size, wishlist])

    return (
        <Grid
            item
            md={6}
        >

            <div className="single_product_details">
                <h2 className="sp_title mb-1">{product.title}</h2>
                <div className="sp_ratting_wrpper d-flex align-items-center mb-1">
                    <Rating className="sp_ratting" name="read-only" value={ratings} readOnly />
                    <span className="sp_review ms-1">({product?.reviews?.length} Review{product?.reviews?.length > 1 ? 's' : ''})</span>
                </div>
                <div className="sp_category_wrapper d-flex align-items-center mb-2">
                    <span className="me-1">Category: </span>
                    {product.categories?.map(cat => (
                        <Link key={cat} to={`/category/${cat}`}>{cat}</Link>
                    ))}
                </div>

                <h4 className="sp_price mb-2">
                    {product.salePrice ? (
                        <>
                            <span className="price_regular text_line_through">${product.regularPrice}</span>
                            <span className="price_sale">${product.salePrice}</span>
                        </>
                    ) : (
                        <span className="price_sale">${product.regularPrice}</span>
                    )}
                </h4>
                <div className="sp_description mb-3">
                    {product.description}
                </div>
                {product.colors.length > 0 && (
                    <div className="sp_variant color_variant d-flex align-items-center mb-2">
                        <span className="sp_variant_title">Color: </span>
                        <select
                            name="color"
                            className="select_variant"
                            value={color}
                            onChange={handleColorChange}
                        >
                            <option value="">Select A Color</option>
                            {product.colors?.map(color => (
                                <option key={color} value={color}>{color}</option>
                            ))}
                        </select>
                    </div>
                )}

                {product.sizes.length > 0 && (
                    <div className="sp_variant size_variant d-flex align-items-center mb-2">
                        <span className="sp_variant_title">Size: </span>
                        <select
                            name="color"
                            className="select_variant"
                            value={size}
                            onChange={handleSizeChange}
                        >
                            <option value="">Select A Size</option>
                            {product.sizes?.map(size => (
                                <option key={size} value={size}>{size}</option>
                            ))}
                        </select>
                    </div>
                )}
                {/* <h4
                    className={hasColor || hasSize || hasSizeAndColor ? 'sp_price sp_final_price mb-3 reveal' : 'sp_price sp_final_price mb-2'}
                >
                    <span>Price: </span> ${product.salePrice}
                </h4> */}

                <div className="sp_quantity_wrapper d-flex align-items-center">
                    <span className="sp_variant_title">Qty: </span>
                    <div className="sp_quantity_box d-flex align-items-center">
                        <button
                            className="qty_dec qty_btn"
                            onClick={qtyDecreamanet}
                        >-</button>
                        <input
                            type="number"
                            name="quantity"
                            className="qty_input"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                        />
                        <button
                            className="qty_inc qty_btn"
                            onClick={qtyIncreamanet}
                        >+</button>
                    </div>
                </div>

                <div className="sp_actions d-flex align-items-center mt-5">
                    {product.inStock && (
                        <button
                            className="sp_cart_btn btn_hover me-2 btn btn-outline-primary"
                            onClick={handleAddToCart}
                            disabled={!hasColor && !hasSize && !hasSizeAndColor}
                        >
                            <AiOutlineShoppingCart className="sp_cart_icon me-1" />
                            <span>Add to cart</span>
                        </button>
                    )}


                    <span
                        className="sp_wishlist_btn d-flex align-items-center"
                        onClick={handleWishList}
                    >
                        {isWishlisted ? (
                            <>
                                <AiFillHeart className="me-1" />
                                Remove From Wishlist
                            </>
                        ) : (
                            <>
                                <AiOutlineHeart className="me-1" />
                                Add to wishlist
                            </>
                        )}
                    </span>


                </div>
            </div>
        </Grid>
    );
};

export default SingleProductDetails;