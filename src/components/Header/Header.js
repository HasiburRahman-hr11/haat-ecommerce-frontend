import React, { useState , useContext } from 'react';
import {CartContext} from '../../Context/CartContext';
import {WishlistContext} from '../../Context/WishlistContext';
import {CategoryContext} from '../../Context/CategoryContext';
import './Header.css';
import HeaderBottom from './HeaderBottom/HeaderBottom';
import HeaderMiddle from './HeaderMiddle/HeaderMiddle';
import HeaderTop from './HeaderTop/HeaderTop';
import MobileMenu from './MobileMenu/MobileMenu';

const Header = () => {

    const {categories} = useContext(CategoryContext)
    const {carts} = useContext(CartContext);
    const {wishlist} = useContext(WishlistContext);

    const [mobileMenu , setMobileMenu] = useState(false);
    return (
        <header className="header">
            <HeaderTop/>
            <HeaderMiddle setMobileMenu={setMobileMenu} carts={carts} wishlist={wishlist}/>
            <HeaderBottom categories={categories}/>
            <MobileMenu mobileMenu={mobileMenu} setMobileMenu={setMobileMenu} categories={categories}/>
            <div 
            className={mobileMenu ? 'mb_overlay active' : 'mb_overlay'} 
            onClick={()=>setMobileMenu(false)}></div>
        </header>
    );
};

export default Header;