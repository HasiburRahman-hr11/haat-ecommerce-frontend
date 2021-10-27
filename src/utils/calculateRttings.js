
const ratingCalculator = (product) => {
    const fiveStar = product.reviews.filter(review => review.rating === 5);
    const fourStar = product.reviews.filter(review => review.rating === 4);
    const threeStar = product.reviews.filter(review => review.rating === 3);
    const twoStar = product.reviews.filter(review => review.rating === 2);
    const oneStar = product.reviews.filter(review => review.rating === 1);

    const ratings = (
        (fiveStar.length * 5) +
        (fourStar.length * 4) +
        (threeStar.length * 3) +
        (twoStar.length * 2) +
        (oneStar.length * 1)
    ) / product.reviews.length

    return ratings;
}

export default ratingCalculator;