import { useContext, useEffect, useState } from "react";
import { CartContext } from "../Context/CartContext";
import axios from 'axios';

const useCartProducts = () => {

    const [loading, setLoading] = useState(false);
    const { carts } = useContext(CartContext);
    const [cartProducts, setCartProducts] = useState([]);

    useEffect(() => {
        const getCartProducts = async () => {
            setLoading(true);
            const productsArray = [];
            const cartIds = [];

            // Get Product Ids from cart
            carts.forEach(item => {
                if (!cartIds.includes(item._id)) {
                    cartIds.push(item._id)
                }
            });

            // Fetch Products by using cartIds
            if (cartIds.length > 0) {
                try {


                    const { data } = await axios.post('https://hidden-crag-34912.herokuapp.com/api/products/cartProducts', { cartIds });

                    setLoading(false);

                    carts.forEach(item => {
                        const cartProduct = data.find(p => p._id === item._id)
                        if (cartProduct) {

                            cartProduct._id = item._id;
                            cartProduct.quantity = item.quantity;
                            cartProduct.color = item.info.color;
                            cartProduct.size = item.info.size;

                            if (cartProduct.salePrice) {
                                cartProduct.price = cartProduct.salePrice
                            } else {
                                cartProduct.price = cartProduct.regularPrice
                            }

                            productsArray.push(cartProduct)
                        }


                    });

                    setCartProducts(productsArray);

                } catch (error) {
                    setLoading(false);
                    console.log(error);
                }
            }

        }
        getCartProducts();



    }, [carts]);

    return [cartProducts, loading]
}

export default useCartProducts;