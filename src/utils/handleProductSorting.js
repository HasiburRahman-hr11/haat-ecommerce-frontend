
const handleProductSorting = (value, products, setProducts,) => {

    if (value === 'default') {
        return setProducts(products.sort((a, b) => a.title.localeCompare(b.title)));
    }

    if (value === 'popular') {
        return setProducts(products.sort((a, b) => (a.reviews.length > b.reviews.length) ? -1 : 1))
    }

    if (value === 'latest') {
        return setProducts(products.sort((a, b) => (new Date(a.createdAt) < new Date(b.createdAt)) ? -1 : 1))
    }

    if (value === 'low') {
        return setProducts(products.sort((a, b) => (a.regularPrice < b.regularPrice) ? -1 : 1))
    }

    if (value === 'high') {
        return setProducts(products.sort((a, b) => (a.regularPrice > b.regularPrice) ? -1 : 1))
    }
}


export default handleProductSorting;