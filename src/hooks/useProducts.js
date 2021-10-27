import { useEffect, useState } from "react";
import axios from 'axios';

const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getAllProducts = async () => {
            try {
                const { data } = await axios.get('https://hidden-crag-34912.herokuapp.com/api/products');
                setProducts(data.products);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        getAllProducts();
    }, []);
    return { products, setProducts, loading, setLoading }
}

export default useProducts;