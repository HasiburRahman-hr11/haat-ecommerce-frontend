import { useContext } from 'react';

import HomeBanner from '../../components/HomeBanner/HomeBanner';
import HomeCtegory from '../../components/HomeCategory/HomeCtegory';
import HomeDeal from '../../components/HomeDeal/HomeDeal';
import HomeTopSell from '../../components/HomeTopSell/HomeTopSell';
import NewsLetter from '../../components/Newsletter/NewsLetter';
import Loading from '../../components/Loading/Loading';

import { CartContext } from '../../Context/CartContext';
import { WishlistContext } from '../../Context/WishlistContext';
import { ProductContext } from '../../Context/ProductContext';


const Home = () => {

    const { setCarts } = useContext(CartContext);
    const { setWishlist } = useContext(WishlistContext);
    const { products, loading } = useContext(ProductContext);

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <HomeBanner />
                    <HomeCtegory />
                    <HomeTopSell products={products} setCarts={setCarts} setWishlist={setWishlist} />
                    <HomeDeal />
                    <NewsLetter />
                </>
            )}
        </>
    );
};

export default Home;