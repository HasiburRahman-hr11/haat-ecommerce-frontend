import { useEffect, useState } from "react";
import { getOldWish } from "../utils/wishlistHandler";

const useWishlist = () => {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        const getWishlist = () => {
            const myWish = getOldWish();
            setWishlist(myWish);
        }
        getWishlist()
    }, []);

    return {wishlist, setWishlist}
}

export default useWishlist;