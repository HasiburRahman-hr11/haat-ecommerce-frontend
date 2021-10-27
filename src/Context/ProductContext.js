import { createContext } from 'react'
import useProducts from '../hooks/useProducts';

export const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {

    const allContext = useProducts();
    return (
        <ProductContext.Provider value={allContext}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductContextProvider;