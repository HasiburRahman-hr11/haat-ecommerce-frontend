import React, { useEffect, useState } from 'react';
import './ToTop.css';
import { BsArrowBarUp } from 'react-icons/bs'

const ToTop = () => {
    const [isActive, setIsActive] = useState(false);
    const scrollTop = () => { window.scrollTo({ top: 0, behavior: 'smooth' }); };

    const scrollFunc = () =>{
        if (window.pageYOffset > 500) {
            setIsActive(true)
        } else {
            setIsActive(false)
        }
    }
    useEffect(() => {
        window.addEventListener('scroll', scrollFunc)

        return () =>{
            window.removeEventListener('scroll' , scrollFunc);
        }

    }, [])
    return (
        <div className={isActive ? 'to_top active d-flex align-items-center justify-content-center' : 'to_top d-flex align-items-center justify-content-center'}
            onClick={scrollTop}
        >
             <BsArrowBarUp />
        </div>
    );
};

export default ToTop;