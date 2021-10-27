import { createContext } from 'react'
import useWishlist from '../hooks/useWishlist';

export const WishlistContext = createContext();


const WishlistContextProvider = ({ children }) => {

    const allContext = useWishlist();
    return (
        <WishlistContext.Provider value={allContext}>
            {children}
        </WishlistContext.Provider>
    )
}

export default WishlistContextProvider;