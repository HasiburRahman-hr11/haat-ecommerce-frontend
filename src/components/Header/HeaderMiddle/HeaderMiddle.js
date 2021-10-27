import React, {useEffect, useState } from 'react';
import './HeaderMiddle.css';
import { AiOutlineSearch, AiOutlineUser , AiOutlineHeart , AiOutlineShoppingCart , AiOutlineMenu} from 'react-icons/ai';
import { Link } from 'react-router-dom';
import logo from '../../../images/logo.png';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

const HeaderMiddle = ({setMobileMenu , carts , wishlist}) => {
    const [sticky , setSticky] = useState(false);
    const cartItems = carts?.reduce((p,c)=> p+ c.quantity,0);
    const wishItems = wishlist?.length

    const scrollFunc = () =>{
        if (window.pageYOffset > 500) {
            setSticky(true)
        } else {
            setSticky(false)
        }
    }
    useEffect(() => {
        window.addEventListener('scroll', scrollFunc)

        return () =>{
            window.removeEventListener('scroll' , scrollFunc);
        }

    }, [])
    return (
        <div className={sticky ? 'header_middle sticky' : 'header_middle'}>
            <Container fixed>
                <Grid
                container  
                sx={{
                    alignItems:'center'
                }}
                // className="row d-flex align-items-center"
                >
                    <Grid 
                    item
                    xs={6} 
                    sm={6} 
                    md={6}
                    lg={3}
                    className="hm_left"
                    // className="col-lg-3 col-6 hm_left"
                    >
                        <div className="hm_logo d-flex align-items-center">
                            <span className="mb_menu_toggler" onClick={()=>setMobileMenu(true)}>
                                <AiOutlineMenu className="mb_toggler_icon" />
                            </span>
                            <Link to="/" className="logo">
                                {/* <span>Haat</span> */}
                                <img src={logo} alt="Logo" />
                            </Link>
                        </div>
                    </Grid>

                    <Grid 
                    item 
                    lg={6}
                    className="hm_center"
                    // className="col-lg-6 hm_center"
                    >
                        <div className="hm_search">
                            <form action="">
                                <div className="hm_search_wrapper d-flex align-items-center">
                                    <input
                                        type="text"
                                        className="hm_search_input"
                                        placeholder="Search product..."
                                    />
                                    <button className="hm_search_btn">
                                        <AiOutlineSearch className="hm_search_icon" />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </Grid>

                    <Grid 
                    item
                    xs={6} 
                    sm={6} 
                    md={6}
                    lg={3}
                    sx={{
                        justifyContent:'flex-end',
                        display:'flex'
                    }}
                    // className="col-lg-3 col-6 hm_right d-flex justify-content-end"
                    className="hm_right"
                    >
                        <div className="hm_account text-center">
                            <Link to="/dashboard">
                                <AiOutlineUser className="hm_right_icon" />
                                <p>Account</p>
                            </Link>
                        </div>
                        <div className="hm_wishlist text-center">
                            <Link to="/wishlist">
                                <AiOutlineHeart className="hm_right_icon" />
                                <p>Wishlist</p>
                                <span className="hm_count d-flex align-items-center justify-content-center">{wishItems}</span>
                            </Link>
                        </div>
                        <div className="hm_cart text-center">
                            <Link to="/cart">
                                <AiOutlineShoppingCart className="hm_right_icon" />
                                <p>Cart</p>
                                <span className="hm_count d-flex align-items-center justify-content-center">{cartItems}</span>
                            </Link>
                        </div>
                    </Grid>

                </Grid>
            </Container>
        </div>
    );
};

export default HeaderMiddle;