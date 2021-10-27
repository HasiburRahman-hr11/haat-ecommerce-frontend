import React, { useRef } from 'react';
import './SingleProductGallery.css';
import Grid from '@mui/material/Grid';

const SingleProductGallery = ({ product }) => {
    const productThumb = useRef();

    const galleryHandler = (e) => {
        productThumb.current.src = e.target.src
        console.log(productThumb.current)
    }
    return (
        <Grid
            item
            md={6}
        >
            <div className="single_product_gallery">
                <figure className="sp_main_image">
                    <img src={process.env.REACT_APP_SERVER_URL + product.thumbnail} alt={product.name} ref={productThumb} />
                </figure>
                {!product.inStock && (
                    <span className="sp_stock_out">Stock Out</span>
                )}
            </div>
            {product.gallery.length > 0 && (
                <div className="sp_zoom_gallery d-flex align-items-center">
                    <button className="zoom_gallery_item">
                        <img src={process.env.REACT_APP_SERVER_URL + product.thumbnail} alt="" onClick={galleryHandler} />
                    </button>
                    {product.gallery.map((image, ind) => (
                        <button key={ind} className="zoom_gallery_item">
                            <img src={process.env.REACT_APP_SERVER_URL + image} alt="" onClick={galleryHandler} />
                        </button>
                    ))}
                </div>
            )}
        </Grid>
    );
};

export default SingleProductGallery;