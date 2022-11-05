const {Review} = require('../../../db');

const updateReview = async (reviewId, newContent) => {
    const review = await Review.findByPk(reviewId);

    if(!review || review.banned === true || review.active === false){
        return false;
    } else {
        await review.update({text: newContent});
        await review.save();
        return true;
    }
}

module.exports = {updateReview}