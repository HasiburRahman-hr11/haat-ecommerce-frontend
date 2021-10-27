import React, { useContext, useEffect, useState } from 'react';
import './Product.css';
import { AiOutlineShoppingCart, AiOutlineHeart, AiOutlineEye, AiOutlineClose, AiFillShopping, AiFillHeart } from 'react-icons/ai';

import { Grid, Rating } from '@mui/material';
import { Link } from 'react-router-dom';
import { getOldWish, setNewWishToLs } from '../../utils/wishlistHandler';
import 'react-toastify/dist/ReactToastify.css';
import { successNotify } from '../../utils/tost-notify';
import { getOldCart, setNewCartToLs } from '../../utils/cartHandler';

import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import SingleProductGallery from '../SingleProductGallery/SingleProductGallery';
import SingleProductDetails from '../SingleProductDetails/SingleProductDetails';
import { CartContext } from '../../Context/CartContext';
import { WishlistContext } from '../../Context/WishlistContext';
import ratingCalculator from '../../utils/calculateRttings';

const Product = ({ product }) => {

    const { carts, setCarts } = useContext(CartContext);
    const { wishlist, setWishlist } = useContext(WishlistContext);


    const [ratings, setRatings] = useState(0);

    const [isWishlisted, setIsWishlisted] = useState(false);
    const [isCarted, setIsCarted] = useState(false);

    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    const handleWishlist = () => {
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

    const handleAddtoCart = () => {
        if (!isCarted) {
            setNewCartToLs(product, 1);
            const newCart = getOldCart();
            setCarts(newCart);
            setIsCarted(true)
            successNotify('Product Added to Cart.')
        } else {
            successNotify('Product Already in Cart')
        }
    }

    useEffect(() => {

        const getRatings = ratingCalculator(product);
        setRatings(getRatings)

        const productInWishlist = () => {
            wishlist.forEach(item => {
                if (item._id === product._id) {
                    setIsWishlisted(true)
                }
            })
        }

        const productInCart = () => {
            carts.forEach(item => {
                if (item._id === product._id) {
                    setIsCarted(true)
                }
            })
        }

        productInCart();
        productInWishlist();
    }, [wishlist, product, carts])

    return (
        <div className="product">
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className="qv_modal"
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openModal}>
                    <Box sx={modalStyle} className="qv_content_wrapper">
                        <span className="qv_modal_close d-flex align-items-center justify-content-center" onClick={handleCloseModal}>
                            <AiOutlineClose />
                        </span>
                        <div className="qv_content">

                            <Grid
                                container
                                spacing={3}
                            >

                                <SingleProductGallery product={product} />

                                <SingleProductDetails product={product} setCarts={setCarts} setWishlist={setWishlist} />

                            </Grid>
                        </div>
                    </Box>
                </Fade>
            </Modal>


            <div className="product_wrapper">
                <figure className="product_media mb-0">
                    <Link
                        to={`/product/${product._id}`}
                        className="product_thumbnail d-block">
                        <img src={ product?.thumbnail} alt={product?.name} />
                    </Link>
                    <div className="product_action d-flex align-items-center justify-content-center">
                        <ul className="mb-0 ps-0 d-flex justify-content-center">
                            {product.inStock && (
                                <li>
                                    {product.variation ? (

                                        <Link
                                            to={`/product/${product._id}`}
                                            className="product_action_circle d-flex align-items-center justify-content-center"
                                            title={isCarted ? 'In Cart' : 'Add To Cart'}>


                                            {isCarted ? <AiFillShopping className="product_action_icon added" /> : <AiOutlineShoppingCart className="product_action_icon" />}

                                        </Link>
                                    ) : (
                                        <span className="product_action_circle d-flex align-items-center justify-content-center" title={isCarted ? 'In Cart' : 'Add To Cart'} onClick={handleAddtoCart}>
                                            {isCarted ? <AiFillShopping className="product_action_icon added" /> : <AiOutlineShoppingCart className="product_action_icon" />}

                                        </span>
                                    )}
                                </li>
                            )}
                            <li>
                                <span className="product_action_circle d-flex align-items-center justify-content-center" title={isWishlisted ? 'In Wishlist' : 'Add To Wishlist'} onClick={handleWishlist}>
                                    {isWishlisted ? (
                                        <AiFillHeart className="product_action_icon added" />
                                    ) : (
                                        <AiOutlineHeart className="product_action_icon" />
                                    )}
                                </span>
                            </li>
                            <li>
                                <span className="product_action_circle d-flex align-items-center justify-content-center" title="Quick View" onClick={handleOpenModal}>
                                    <AiOutlineEye className="product_action_icon" />
                                </span>
                            </li>
                        </ul>
                    </div>
                    {product.stock < 1 && (
                        <span className="stock_Out_badge d-flex align-items-center justify-content-center text-center">Stock Out</span>
                    )}
                    <Link
                        to={`/product/${product._id}`}
                        className="product_overlay d-block"></Link>
                </figure>
                <div className="product_content">
                    <div className="product_cats">
                        {product?.categories.map(cat => (
                            <Link to={`/category/${cat}`} key={cat}>{cat}</Link>
                        ))}
                    </div>
                    <h3 className="product_title mb-1">
                        <Link
                            to={`/product/${product._id}`}
                        >{product?.title}</Link>
                    </h3>
                    <h4 className="product_price d-flex align-items-center justify-content-center">
                        {product.salePrice ? (
                            <>
                                <span className="price_regular text_line_through">${product.regularPrice}</span>
                                <span className="price_sale">${product.salePrice}</span>
                            </>
                        ) : (
                            <span className="price_sale">${product.regularPrice}</span>
                        )}


                    </h4>
                    <div className="product_reviews d-flex align-items-center justify-content-center">

                        <Rating name="read-only" className="starts" value={ratings} readOnly />
                        <span className="review_text">({product?.reviews?.length} Review{product?.reviews?.length > 1 ? 's' : ''})</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;