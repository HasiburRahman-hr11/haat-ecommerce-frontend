import React, { useContext, useEffect, useState } from 'react';
import PageBanner from '../../components/PageBanner/PageBanner';
import './Wishlist.css';
import '../Cart/Cart.css';
import 'react-toastify/dist/ReactToastify.css';
import { successNotify } from '../../utils/tost-notify';
import { Link } from 'react-router-dom';
import { AiOutlineCloseCircle, AiOutlineHeart } from 'react-icons/ai';
import { getOldWish } from '../../utils/wishlistHandler';
import Container from '@mui/material/Container';
import Error from '../Error/Error';
import BreadCumb from '../../components/BreadCumb/BreadCumb';
import {WishlistContext} from '../../Context/WishlistContext';
import { ProductContext } from '../../Context/ProductContext';

const Wishlist = () => {

    const { products } = useContext(ProductContext);
    const [wishlistProducts, setWishlistProducts] = useState([]);
    const { wishlist, setWishlist } = useContext(WishlistContext);

    const handleRemoveWish = (product) => {
        const updatedWishlist = wishlist.filter(item => item._id !== product._id);
        localStorage.setItem('haat-wish', JSON.stringify(updatedWishlist));

        const newWish = getOldWish();
        setWishlist(newWish);
        successNotify('Item Removed From Wishlist.')
    }

    useEffect(() => {
        const getWishlist = () => {
            const wishProductsArr = []
            wishlist.forEach(item => {
                const wishlistProduct = products.find(p => p._id === item._id)
                if (wishlistProduct) {
                    wishProductsArr.push(wishlistProduct)
                }
            })
            setWishlistProducts(wishProductsArr)
        }
        getWishlist()

    }, [products, wishlist])


    return (
        <div className="main">
            <PageBanner title="Wishlist" />
            <BreadCumb label="Wishlist" Icon={<AiOutlineHeart />} />
            <div className="wishlist_wrapper py-4">
                <Container>
                    {wishlist.length > 0 ? (
                        <table className="table_wishlist w-100 table_responsive">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Stock</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {wishlistProducts.map(product => (
                                    <tr key={product._id} className="table_item">
                                        <td className="product_col">
                                            <div className="d-flex align-items-center">
                                                <img src={process.env.REACT_APP_SERVER_URL + product.thumbnail} alt="" />
                                                <p className="table_product_title mb-0">
                                                    <Link
                                                        to={`/product/${product._id}`}
                                                    >{product.title}</Link>
                                                </p>
                                            </div>
                                        </td>
                                        <td className="price_col">
                                            ${product.salePrice}
                                        </td>
                                        <td className="stock_col">
                                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                                        </td>
                                        <td className="action_col">
                                            {product.variation ? (
                                                <Link
                                                    to={{
                                                        pathname: `/product/${product._id}`,
                                                        product: product
                                                    }}
                                                    className="wl_cart_btn btn_hover btn-outline-primary btn">
                                                    Select Option
                                                </Link>
                                            ) : (
                                                <button
                                                    className="wl_cart_btn btn_hover"
                                                    disabled={!product.inStock}
                                                >
                                                    Add to Cart
                                                </button>
                                            )}
                                        </td>
                                        <td
                                            onClick={() => handleRemoveWish(product)}
                                            className="cart_close"
                                        ><AiOutlineCloseCircle className="cart_close_icon" /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <Error content="Your Wishlist is Empty!" />
                    )}
                </Container>
            </div>
        </div >
    );
};

export default Wishlist;