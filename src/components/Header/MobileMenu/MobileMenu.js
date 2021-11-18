import './MobileMenu.css';
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { BsChevronDown } from 'react-icons/bs';
import { TiSocialFacebook, TiSocialInstagram, TiSocialTwitter, TiSocialYoutube } from 'react-icons/ti'
import { Link, NavLink } from 'react-router-dom';

import { mobileMenu as menu } from '../../../fakeData';


const MobileMenu = ({ mobileMenu, setMobileMenu, categories }) => {

    const sortedCategories = categories.sort((a, b) => a.title.localeCompare(b.title))

    const handleSubmenu = (e) => {
        e.currentTarget.classList.toggle('active')
    }

    return (
        <div className={mobileMenu ? 'mobile_menu_container active' : 'mobile_menu_container'}>
            <div className="mobile_menu_wrapper">
                <span
                    className="mobile_menu_close d-flex align-items-center justify-content-center"
                    onClick={() => setMobileMenu(false)}>
                    <AiOutlineClose className="menu_close_icon" />
                </span>
                <form action="" className="mobile_search d-flex">
                    <input
                        className="ms_input"
                        type="text"
                        placeholder="Search product..."
                    />
                    <button className="ms_btn d-flex align-items-center justify-content-center" onClick={() => setMobileMenu(false)}>
                        <AiOutlineSearch className="ms_icon" />
                    </button>
                </form>
                <Tabs>
                    <TabList className="mb_tab_header d-flex align-items-center ps-0 mb-0">
                        <Tab className="mb_tab_list text-center">Menu</Tab>
                        <Tab className="mb_tab_list text-center">Categories</Tab>
                    </TabList>

                    <TabPanel>
                        <nav className="mobile_nav">
                            <ul className="ps-0 mb-0 mobile_menu">
                                {menu.map(menuItem => (
                                    menuItem.submenu ?
                                        <li
                                            key={menuItem.name}
                                            onClick={handleSubmenu}
                                            className="mb_menu_item  has_submenu"
                                        >
                                            <span
                                                className="d-flex align-items-center"
                                            >
                                                <NavLink
                                                    activeClassName="active"
                                                    exact to={menuItem.link}
                                                    onClick={() => setMobileMenu(false)}>
                                                    {menuItem.name}
                                                </NavLink>
                                                <span
                                                    className="mb_menu_icon text-center"
                                                >
                                                    <BsChevronDown className="menu_icon" />
                                                </span>
                                            </span>

                                            <ul className="sub_menu">
                                                {menuItem.submenu.map(subItem => (
                                                    <li
                                                        key={subItem.name}
                                                        className="d-flex mb_menu_item align-items-center">
                                                        <NavLink activeClassName="active" exact to={subItem.link} onClick={() => setMobileMenu(false)}>{subItem.name}</NavLink>
                                                    </li>
                                                ))}
                                            </ul>

                                        </li>
                                        :
                                        <li
                                            key={menuItem.name}
                                            className="d-flex mb_menu_item align-items-center">
                                            <NavLink activeClassName="active" exact to={menuItem.link} onClick={() => setMobileMenu(false)}>{menuItem.name}</NavLink>
                                        </li>
                                ))}

                            </ul>
                        </nav>
                    </TabPanel>
                    <TabPanel>
                        <nav className="mb_cat_nav">
                            <ul className="mb-0 ps-0 mb_cat_menu" onClick={() => setMobileMenu(false)}>
                                {sortedCategories.map(category => (
                                    <li className="mb_cat_item" key={category.title}>
                                        <Link to={`/category/${category.title}`}>{category.title}</Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </TabPanel>
                </Tabs>

                <div className="mb_social mt-3">
                    <ul className="mb_social_list d-flex ps-0 mb-0 justify-content-center align-items-center">
                        <li onClick={() => setMobileMenu(false)}>
                            <Link to="#">
                                <TiSocialFacebook className="mb_social_icon" />
                            </Link>
                        </li>
                        <li onClick={() => setMobileMenu(false)}>
                            <Link to="#">
                                <TiSocialTwitter className="mb_social_icon" />
                            </Link>
                        </li>
                        <li onClick={() => setMobileMenu(false)}>
                            <Link to="#">
                                <TiSocialInstagram className="mb_social_icon" />
                            </Link>
                        </li>
                        <li onClick={() => setMobileMenu(false)}>
                            <Link to="#">
                                <TiSocialYoutube className="mb_social_icon" />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MobileMenu;