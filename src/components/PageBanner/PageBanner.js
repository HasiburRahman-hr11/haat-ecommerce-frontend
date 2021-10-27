import React from 'react';
import './PageBanner.css';
import nlbg from '../../images/page-banner.jpg';

const PageBanner = ({ title, bannerBg }) => {

    const pbBg = {
        background: `linear-gradient(rgba(104, 103, 103, 0.5), rgba(104, 103, 103, 0.5)),url(${bannerBg ? bannerBg : nlbg})`,
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    }
    return (
        <div className="page_banner" style={pbBg}>
            <div className="container">
                <div className="pb_content d-flex align-items-center justify-content-center">
                    <h2 className="pb_title mb-0">{title}</h2>
                </div>
            </div>
        </div>
    );
};

export default PageBanner;