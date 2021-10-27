import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import RelatedProducts from '../../components/RelatedProducts/RelatedProducts';
import SingleProductDetails from '../../components/SingleProductDetails/SingleProductDetails';
import SingleProductGallery from '../../components/SingleProductGallery/SingleProductGallery';
import SingleProductTabs from '../../components/SingleProductTabs/SingleProductTabs';
import './SingleProduct.css';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Loading from '../../components/Loading/Loading';
import { ProductContext } from '../../Context/ProductContext';

const SingleProduct = () => {
    const params = useParams();
    const { products } = useContext(ProductContext);

    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(`/api/products/${params.id}`);
                setProduct(data);

                getRelatedProducts(data);

                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        fetchProduct();

        const getRelatedProducts = (product) => {
            const relatedProductsArr = []
            if (product?.categories?.length > 0) {
                products.forEach(item => {
                    product.categories.forEach(cat => {
                        if (item.categories.includes(cat)) {
                            if (!relatedProductsArr.includes(item)) {
                                relatedProductsArr.push(item)
                            }
                        }
                    })
                });
                setRelatedProducts(relatedProductsArr)
            } else {
                setRelatedProducts(products)
            }
        }


    }, [params.id, products])

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div className="main">
                    {product?.title && (
                        <Container fixed>
                            <div className="single_product_top pt-5">
                                <Grid
                                    container
                                    spacing={3}
                                    rowSpacing={{ sm: 5 }}
                                >

                                    <SingleProductGallery product={product} />

                                    <SingleProductDetails product={product} />

                                </Grid>
                                <SingleProductTabs product={product} setProduct={setProduct} />

                                <RelatedProducts product={product} products={relatedProducts} />
                            </div>
                        </Container>
                    )}
                </div>
            )}
        </>
    );
};

export default SingleProduct;