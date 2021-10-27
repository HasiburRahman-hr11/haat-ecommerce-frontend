/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import './Pagination.css';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'

const Pagination = ({ totalPage, currentPage, changePage }) => {
    return (
        <nav className="pagination d-block text-center mt-4">
            <ul className="page_list d-flex align-items-center justify-content-center mb-0 ps-0">
                <li
                    className={currentPage === 1 ? 'page_item disabled' : 'page_item'}
                    onClick={() => changePage(currentPage - 1)}
                >
                    <span className="page_link page_prev d-flex align-items-center justify-content-center">
                        <BsArrowLeft />
                    </span>
                </li>

                {
                    [...Array(totalPage).keys()].map(page => (
                        <li className={currentPage === (page+1) ? 'page_item active' : 'page_item'} key={page} onClick={() => changePage(page + 1)} >
                            <span className="page_link d-flex align-items-center justify-content-center">{page + 1}</span>
                        </li>
                    ))
                }


                <li
                    className={currentPage === totalPage ? 'page_item disabled' : 'page_item'}
                    onClick={() => changePage(currentPage + 1)}
                >
                    <span className="page_link page_next d-flex align-items-center justify-content-center">
                        <BsArrowRight />
                    </span>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;