
export const getLocalStorageCarts = () => {
    const oldCart = JSON.parse(localStorage.getItem('haat-cart')) || [];
    return oldCart;
}

export const setNewCartToLs = (product, quantity) => {
    let cartItems = [];
    const cartInfo = {
        _id: product._id,
        quantity: quantity,
        info: {
            color: product.color,
            size: product.size
        }
    }

    const oldCart = getLocalStorageCarts();
    if (oldCart?.length > 0) {
        oldCart.forEach(item => {
            if (item._id === product._id) {
                cartInfo.quantity = item.quantity + quantity;
                const newCartItems = oldCart.filter(item => item._id !== product._id);
                cartItems = [...newCartItems, cartInfo]
            } else {
                const newCartItems = oldCart.filter(item => item._id !== product._id);
                cartItems = [...newCartItems, cartInfo]
            }
        });

    } else {
        cartItems.push(cartInfo)
    }

    localStorage.setItem('haat-cart', JSON.stringify(cartItems));
}

export const clearCart = () => {
    localStorage.removeItem('haat-cart');
}
