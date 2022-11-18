const JWT = require("jsonwebtoken")
const verifyToken = require("../verify")
const { Router } = require("express");
const router = Router();

router.get('/', verifyToken, async (req, res) => {
    JWT.verify(req.token, "secretkey", (err, authData) => {
        if (err) {
            res.sendStatus(403)
        } else {
            res.json({
                "mensaje": "PostfueCreado",
                authData
            })
        }
    })
})

module.exports = router;