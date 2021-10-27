import React from 'react';
import './HomeBanner.css';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import {sliderData} from '../../fakeData';
import Container from '@mui/material/Container';

const options = {
    nav: false,
    dots: false,
    autoplay: true,
    loop:true,
    smartSpeed: 500,
    autoplayTimeout:3000,
    animateOut: 'fadeOut',
    responsive: {
        0: {
            items: 1,
        }
    },
};

const HomeBanner = () => {
    return (
        <div className="home_banner">
            <OwlCarousel 
            {...options}
            >

                {sliderData.map((item, ind) => (

                    <div key={ind} className='hmb_item'>
                        <div className="hmb_image">
                            <img src={item.image} alt={item.title} />
                        </div>
                        <div className="hm_banner_content d-flex align-items-center">
                            <Container fixed>
                                <p className="hmb_subtitle mb-1">{item.subtitle}</p>
                                <h2 className="hmb_title">{item.title}</h2>
                                <a href={item.link} className="hmb_btn btn_hover">Shop Now</a>
                            </Container>
                        </div>
                        <div className="hmb_overlay"></div>
                    </div>

                ))}

            </OwlCarousel>

        </div>
    );
};

export default HomeBanner;