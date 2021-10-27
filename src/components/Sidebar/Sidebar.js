import React, { useContext } from 'react';
import './Sidebar.css';
import SidebarItem from './SidebarItem/SidebarItem';
import {CategoryContext} from '../../Context/CategoryContext';

const Sidebar = () => {
    const {categories} = useContext(CategoryContext)
    const sortedCategories = categories.sort((a, b) => a.title.localeCompare(b.title))
    return (
        <div className="sidebar">
            <div className="sidebar_header d-flex align-items-center">
                <h4 className="mb-0">Filter Products</h4>
            </div>
            <SidebarItem title="Categories" list={sortedCategories} />
            {/* <SidebarItem title="Brands" list={brands} /> */}
        </div>
    );
};

export default Sidebar;