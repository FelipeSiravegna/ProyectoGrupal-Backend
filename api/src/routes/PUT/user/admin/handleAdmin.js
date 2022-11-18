const { Router } = require("express");
const router = Router();
const { setUserAsAdmin, setUserAsPublic } = require("../../../../../controllers/PUT/user");

router.put("/handleAdmin/:password", async (req, res) => {
    //example route user/handleAdmin/password?user=1
    try {
        const { password } = req.params;
        const { setAs, user } = req.query;
        //setAs--> SetAs=true || setAs=...
        //user --> user=userId
        if (!user) {
            res.status(400).json({ status: 400, message: `query "user" needed` });
        } else {
            if (setAs === "true") {
                const setAsAdmin = await setUserAsAdmin(user, password);
                res.status(setAsAdmin.status).json({ status: setAsAdmin.status, message: setAsAdmin.message });
            } else {
                const setAsPublic = await setUserAsPublic(user, password);
                res.status(setAsPublic.status).json({ status: setAsPublic.status, message: setAsPublic.message });
            };
        };
    } catch (error) {
        res.status(500).json({ status: 500, message: `There was a problem` });
    };
});

module.exports = router;