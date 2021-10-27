import { createContext } from 'react'
import useCarts from '../hooks/useCarts';

export const CartContext = createContext();


const CartContextProvider = ({ children }) => {

    const allContext = useCarts();
    return (
        <CartContext.Provider value={allContext}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider;