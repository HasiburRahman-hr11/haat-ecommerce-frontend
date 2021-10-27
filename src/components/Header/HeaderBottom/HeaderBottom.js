/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import './HeaderBottom.css';
import { AiOutlineMenu } from 'react-icons/ai';
import { GiTornado } from 'react-icons/gi'
import { Link, NavLink } from 'react-router-dom';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { desktopMenu } from '../../../fakeData';
import { BsChevronDown } from 'react-icons/bs';

const HeaderBottom = ({ categories }) => {

    const sortedCategories = categories.sort((a, b) => a.title.localeCompare(b.title))

    const [sticky, setSticky] = useState(false);
    const scrollFunc = () => {
        if (window.pageYOffset > 300) {
            setSticky(true)
        } else {
            setSticky(false)
        }
    }
    useEffect(() => {
        window.addEventListener('scroll', scrollFunc)

        return () => {
            window.removeEventListener('scroll', scrollFunc);
        }

    }, [])
    return (
        <div className={sticky ? 'header_bottom sticky' : 'header_bottom'}>
            <Container fixed>
                <Grid
                    container
                    sx={{
                        alignItems: 'center'
                    }}
                >
                    <Grid
                        item
                        lg={3}
                        md={3}
                        className="hb_left"
                    // className="col-lg-3 hb_left ps-0"
                    >
                        <div className="hb_category_dropdown">
                            <a href="#" className="hb_dropdown_toggle d-flex align-items-center">
                                <AiOutlineMenu className="hb_toggle_icon" />
                                <span>Browse Categories</span>
                            </a>
                            <div className="hb_dropdown_menu">
                                <ul className="mb-0 ps-0">
                                    {sortedCategories.map(category => (
                                        <li key={category._id}>
                                            <Link to={`/category/${category.title}`}>{category.title}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </Grid>
                    <Grid
                        item
                        lg={6}
                        md={6}
                        className="hb_center"
                    // className="col-lg-6 hb_center"
                    >
                        <nav className="main_nav">
                            <ul className="main_menu d-flex aligin-items-center ps-0 mb-0">
                                {
                                    desktopMenu.map(menuItem => (
                                        menuItem.submenu ?
                                            <li
                                                key={menuItem.name}
                                                className="menu_item d-flex align-items-center has_submenu"
                                            >
                                                <NavLink activeClassName="active" exact to={menuItem.link}>{menuItem.name}</NavLink>
                                                <span>
                                                    <BsChevronDown className="menu_icon" />
                                                </span>
                                                <ul className="submenu">
                                                    {menuItem.submenu.map(subItem => (
                                                        <li
                                                            key={subItem.name}
                                                            className="menu_item">
                                                            <NavLink activeClassName="active" exact to={subItem.link}>{subItem.name}</NavLink>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </li>
                                            :
                                            <li
                                                key={menuItem.name}
                                                className="menu_item">
                                                <NavLink activeClassName="active" exact to={menuItem.link}>{menuItem.name}</NavLink>
                                            </li>
                                    ))
                                }


                            </ul>
                        </nav>
                    </Grid>
                    <Grid
                        item
                        lg={3}
                        md={3}

                        className="hb_right">
                        <p className="mb-0 d-flex align-items-center justify-conten-end">

                            <span className="d-flex align-items-center justify-conten-end"> <GiTornado className="hb_right_icon" /> Cyclone Offer</span>
                            <strong>Up to 30% off</strong>
                        </p>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default HeaderBottom;