const validateRating = (rating) => {
    if (rating < 0 || rating > 10) {
        return false;
    } else {
        return true;
    }
}

const validateLength = (length) => {
    if (length < 0) {
        return false;
    }
}

const validateReleaseDate = (releaseDate) => {
    if (Date.now() < Date.parse(releaseDate)) {
        return false;
    }
}

module.exports = { validateRating, validateLength, validateReleaseDate };