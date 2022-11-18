const ratingFilter = (array, rating) => {
    if (rating === "ASC") {
        return array.rows.sort(function (a, b) {
            if (a.rating > b.rating) {
                return -1
            }
            if (a.rating < b.rating) {
                return 1
            }
            return 0
        })
    }
    else {
        return array.rows.sort(function (a, b) {
            if (a.rating > b.rating) {
                return 1
            }
            if (a.rating < b.rating) {
                return -1
            }
            return 0
        })
    }
}
module.exports = { ratingFilter }