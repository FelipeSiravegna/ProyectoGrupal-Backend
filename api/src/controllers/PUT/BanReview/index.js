const {Review} = require('../../../db');

const banReview = async (reviewId) => {
    const review = await Review.findByPk(reviewId);

    if(!review || review.banned === true){
        return false;
    } else {
        await review.update({banned: true});
        await review.save();
        return true;
    }
}

module.exports = {banReview}