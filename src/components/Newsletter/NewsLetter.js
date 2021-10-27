import React from 'react';
import './NewsLetter.css';
import nlbg from '../../images/nl-banner.jpg';
import Container from '@mui/material/Container';

const NewsLetter = () => {

    const nlbgStyle= {
        background:`linear-gradient(rgba(104, 103, 103, 0.5), rgba(104, 103, 103, 0.5)),url(${nlbg})`, 
        backgroundPosition:'center center' , 
        backgroundAttachment:'fixed',
        backgroundRepeat:'no-repeat',
        backgroundSize:'cover'
    }
    return (
        <div className="newsletter" style={nlbgStyle}>
            <Container fixed>
                <div className="newsletter_content text-center">
                    <h2 className="nl_title mb-1">Subscribe for Our Newsletter</h2>
                    <p className="mb-4">and receive $20 coupon for first shopping</p>
                    <form action="" className="nl_form">
                        <div className="nl_input_group d-flex align-items-center justify-content-center">
                            <input 
                            type="email" 
                            name="emai" 
                            className="nl_input" 
                            placeholder="Email Address"
                            />
                            <button className="nl_btn text-center">Subscribe</button>
                        </div>
                    </form>
                </div>
            </Container>
        </div>
    );
};

export default NewsLetter;