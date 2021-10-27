
export const getOldWish = () => {
    const oldWish = JSON.parse(localStorage.getItem('haat-wish')) || [];
    return oldWish;
}

export const setNewWishToLs = (product) => {
    let wishItems = [];
    const wishInfo = {
        _id: product._id
    }

    const oldWish = getOldWish();

    if (oldWish?.length > 0) {

        oldWish.forEach(item => {
            if (item._id !== product._id) {
                const newWishItems = oldWish.filter(item => item._id !== product._id);
                wishItems = [...newWishItems, wishInfo]
            } else {
                wishItems = [...oldWish]
            }
        });

    } else {
        wishItems.push(wishInfo)
    }



    localStorage.setItem('haat-wish', JSON.stringify(wishItems));
}

