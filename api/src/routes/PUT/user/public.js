const { Router } = require("express");
const { getUserByPk } = require("../../../controllers/GET/users");
const { checkNewUsername, checkNewEmail, checkNewPassword } = require("../../../controllers/PUT/user");
const router = Router();

router.put("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const { username, email, password } = req.body;
        const currentUserData = await getUserByPk(userId);
        if (!currentUserData) {
            res.status(404).json({ status: 404, message: "This user doesn't exist" });
            return;
        }
        const updateProps = [];
        const errors = [];
        if (password) {
            const validatePassword = checkNewPassword(currentUserData.password, password);
            if (!validatePassword) {
                updateProps.push("password");
                currentUserData.password = password;
            } else {
                errors.push(validatePassword);
            }
        }
        if (username) {
            const validateUser = await checkNewUsername(currentUserData.username, username);
            if (!validateUser) {
                updateProps.push("username");
                currentUserData.username = username;
            } else {
                errors.push(validateUser);
            }
        }
        if (email) {
            const validateEmail = await checkNewEmail(currentUserData.email, email);
            if (!validateEmail) {
                updateProps.push("email");
                currentUserData.email = email;
            } else {
                errors.push(validateEmail);
            }
        }
        console.log("errors: ", errors)
        if (errors.length) {
            res.status(400).json(errors);
        } else {
            await currentUserData.save();
            res.status(200).json({ message: `${updateProps.join(", ")} updated` });
        }
    } catch (error) {
        console.log(error);
        console.log("______________________");
        console.log("                ERROR: " + error.message);
        res.status(500).json({ success: false, message: "There was an error while trying to update the username." });
    }
});

module.exports = router