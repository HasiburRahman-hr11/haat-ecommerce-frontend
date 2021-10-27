import React from 'react';
import './Category.css';
import { Link } from 'react-router-dom';
import catImg from '../../images/category.jpg';

const Category = ({ category }) => {
    return (
        <div className="category">
            <img src={category.thumbnail ? category.thumbnail : catImg} alt={category.title} />
            <Link to={`/category/${category.title}`} className="category_content">
                <h4>{category.title}</h4>
            </Link>
        </div>
    );
};

export default Category;