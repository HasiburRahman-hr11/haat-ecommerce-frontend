import { useContext, useEffect, useState } from 'react';
import PageBanner from '../../components/PageBanner/PageBanner';
import './Shop.css';
import { CartContext } from '../../Context/CartContext';
import { WishlistContext } from '../../Context/WishlistContext';
import handleProductSorting from '../../utils/handleProductSorting';
import axios from 'axios';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

// Components
import Product from '../../components/Product/Product';
import Sidebar from '../../components/Sidebar/Sidebar';
import Pagination from '../../components/Pagination/Pagination';
import BreadCumb from '../../components/BreadCumb/BreadCumb';
import Loading from '../../components/Loading/Loading';
import { Link } from 'react-router-dom';



const Shop = () => {

    const { setCarts } = useContext(CartContext);
    const { setWishlist } = useContext(WishlistContext);

    const [products, setProducts] = useState([])
    const [sort, setSort] = useState('default');

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const [limit, setLimit] = useState(20);
    const [loading, setLoading] = useState(false);

    const handleSort = (e) => {
        let sortValue = e.target.value
        setSort(sortValue);
        handleProductSorting(sortValue, products, setProducts);
    }


    useEffect(() => {

        const fetchProducts = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(`https://hidden-crag-34912.herokuapp.com/api/products?page=${currentPage}&&limit=${limit}`);

                setProducts(data.products);
                setTotalPage(data.totalPage);
                setTotalProducts(data.totalProducts);

                setLoading(false);

            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        fetchProducts();


    }, [currentPage, limit]);
    return (
        <>

            {loading ? (
                <Loading />
            ) : (
                <div className="main">
                    <PageBanner title="Shop" />
                    <BreadCumb />
                    {products.length === 0 ? (
                        <div className="no_products">
                            <h2>No Products Found</h2>
                            <Link to="/" className="btn btn-primary">Home</Link>
                        </div>
                    ) : (
                        <div className="shop_wrapper pt-2 pb-4">
                            <Container>
                                <Grid
                                    container
                                    spacing={3}
                                >
                                    <Grid
                                        item
                                        lg={3}
                                        md={3}
                                        className="sidebar_lg">
                                        <Sidebar />
                                    </Grid>
                                    <Grid
                                        item
                                        lg={9}
                                        md={9}
                                        sm={12}
                                    >
                                        <div className="shop_header d-flex align-items-center justify-content-between">
                                            <p className="shop_result_counts mb-0">
                                                Showing <strong>{products.length}</strong> of <strong>{totalProducts}</strong> product{totalProducts > 1 ? 's' : ''}
                                            </p>
                                            <div className="sort_product d-flex align-items-center">
                                                <span className="me-2">Sort by:</span>
                                                <select
                                                    name="sort-product"
                                                    id=""
                                                    className="sort_select"
                                                    onChange={handleSort}
                                                    value={sort}
                                                >
                                                    <option value="default">Default</option>
                                                    <option value="popular">Popular</option>
                                                    <option value="latest">Latest</option>
                                                    <option value="low">Price: Low to High</option>
                                                    <option value="high">Price: High to Low</option>
                                                </select>
                                            </div>
                                        </div>
                                        <Grid
                                            container
                                            spacing={3}
                                        >
                                            {products?.map(product => (
                                                <Grid
                                                    item
                                                    lg={3}
                                                    md={4}
                                                    sm={6}
                                                    xs={6}
                                                    key={product._id}
                                                >
                                                    <Product product={product} setCarts={setCarts} setWishlist={setWishlist} />
                                                </Grid>
                                            ))}
                                        </Grid>

                                        {totalPage && totalPage > 1 && <Pagination totalPage={totalPage} currentPage={currentPage} changePage={setCurrentPage} />}

                                    </Grid>
                                </Grid>
                            </Container >
                        </div >
                    )}
                </div >
            )}
        </>
    );
};

export default Shop;