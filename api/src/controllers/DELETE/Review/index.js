const { Review } = require('../../../db');

const deleteReview = async (reviewId) => {
    const review = await Review.findByPk(reviewId);

    if (!review || review.active === false) {
        return false;
    } else {
        await review.update({ active: false });
        await review.save();
        return true;
    }
}

module.exports = { deleteReview }