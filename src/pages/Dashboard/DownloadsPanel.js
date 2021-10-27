import React from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const DownloadsPanel = () => {
    return (
        <>
            <p>No downloads available yet.</p>
            <Link to="/shop" className="btn btn_with_icon btn_hover btn-outline-primary mt-1">Go to Shop <BsArrowRight className="dash_panel_icon" /></Link>
        </>
    );
};

export default DownloadsPanel;