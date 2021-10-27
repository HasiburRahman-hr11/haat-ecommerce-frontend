import { Rating } from '@mui/material';
import React, { useState } from 'react';
import './SingleProductReview.css';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { successNotify } from '../../utils/tost-notify';

const SingleProductReview = ({ product, setProduct }) => {
    const [rating, setRating] = useState(0);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        review: ''
    });

    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rating === 0) {
            alert('Please provide your rating')
        } else {
            try {
                setLoading(true);
                const { data } = await axios.put(`https://hidden-crag-34912.herokuapp.com/api/products/review/${product._id}`, { rating, ...formData });

                console.log(data);
                setProduct(data);
                setLoading(false);
                setFormData({
                    name: '',
                    email: '',
                    review: ''
                });
                setRating(0);

                successNotify('Review added successfully.')

            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }

    }

    return (
        <>
            <div className="sp_reviews">
                <h3> Review{product?.reviews?.length > 1 ? 's' : ''} ({product?.reviews?.length})</h3>

                <div className="sp_reviews_wrapper">
                    {product?.reviews?.map((item, ind) => (
                        <div className="sp_review_item d-flex" key={ind}>
                            <div className="review_meta">
                                <h4>{item.name.split(' ')[0]}</h4>
                                <Rating className="rm_rattings rattings" name="read-only" value={item.rating} readOnly />
                                <p>{new Date(item.time).toDateString()}</p>
                            </div>
                            <div className="review_content">
                                <p>{item.review}</p>

                            </div>
                        </div>
                    ))}
                </div>



            </div>
            <div className="sp_reply mt-5">
                <h3>Add a Review</h3>
                <p className="mb-1 mt-1">Your email address will not be published. Required fields are marked *</p>
                <p className="reply_ratting_wrapper d-flex align-items-center mb-1">
                    <span>Your  Ratings: </span>
                    <Rating
                        className="reply_rattings rattings ms-1"
                        name="simple-controlled"
                        value={rating}
                        onChange={(event, newValue) => {
                            setRating(newValue);
                        }}
                    />
                </p>

                <div className="reply_form_wrapper">
                    <form action="" className="review_form" onSubmit={handleSubmit}>
                        <Grid
                            container
                            spacing={2}
                        >
                            <Grid
                                item
                                md={6}
                                sm={12}
                                xs={12}
                            >
                                <input
                                    type="text"
                                    placeholder="Name*"
                                    name="name"
                                    className="reply_input"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </Grid>
                            <Grid
                                item
                                md={6}
                                sm={12}
                                xs={12}
                            >
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email*"
                                    className="reply_input"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </Grid>
                        </Grid>
                        <textarea
                            name="review"
                            className="reply_input mt-2"
                            placeholder="Your Review*"
                            required
                            value={formData.review}
                            onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                        ></textarea>

                        <p className="reply_checkbox mt-1 d-flex align-items-center mb-2">
                            <input type="checkbox" name="signin-remember" id="signin-remember" />
                            <label htmlFor="signin-remember">Save my name and email in this browser.</label>
                        </p>

                        <button type="submit" className="btn_hover reply_btn">
                            {loading ? <CircularProgress sx={{
                                color: '#fff',
                                width: '25px !important',
                                height: '25px !important'
                            }}
                            />
                                : 'Submit'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default SingleProductReview;