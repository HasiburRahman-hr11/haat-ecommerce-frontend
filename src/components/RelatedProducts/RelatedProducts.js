import './RelatedProducts.css';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import Product from '../Product/Product';

const RelatedProducts = ({ products }) => {

    const options = {
        margin: 15,
        nav: false,
        dots: false,
        autoplay: true,
        rewind:true,
        loop: false,
        smartSpeed: 1000,
        autoplayTimeout: 2500,
        responsive: {
            0: {
                items: 2,
            },
            768: {
                items: 3,
            },
            991: {
                items: 4,
            },
            1200: {
                items: 5,

            },
            1400: {
                items: 6
            }
        }
    };
    return (
        <div className="mt-5 related_products mb-3">
            <h2 className="section_title mb-4 text-center">You may also like</h2>
            <OwlCarousel
                className='related_product_slider'
                {...options}

            >
                {products.map(product => (
                    <Product key={product._id} product={product} />
                ))}
            </OwlCarousel>
        </div >

    );
};

export default RelatedProducts;