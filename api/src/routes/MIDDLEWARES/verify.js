const verifyToken = (req, res, next) => {
    const bearerheader = req.headers['authorization']
    if (typeof bearerheader !== "undefined") {
        req.token = bearerheader.split(" ")[1]
        next();
    } else {
        res.sendStatus(403)
    }
}

module.exports = verifyToken