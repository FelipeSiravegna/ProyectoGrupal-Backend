const { getUserByUsername, getUserByEmail, getUserByPk } = require("../../GET/users");
const { subscriptionMail } = require('../Mail');
const { HANDLE_ADMIN_PASSWORD } = process.env;

const checkNewUsername = async (currentUsername, newUsername) => {
    const existingUsername = await getUserByUsername(newUsername);
    console.log(`current username: ${currentUsername} | new username: ${newUsername}`);
    if (newUsername === "") {
        return { status: 400, message: "The username is needed." };
    }
    else if (newUsername.split("").includes(" ")) {
        return { status: 400, message: "The username can't containt spaces." };
    }
    else if (currentUsername === newUsername) {
        return { status: 403, message: "The username is equal to the current one." };
    }
    else if (!(currentUsername.length > 1 && newUsername.length < 20)) {
        return { status: 400, message: "The username must containt between 1 and 20 characters." };
    }
    else if (existingUsername) {
        return { status: 403, message: "This username belongs to another user." };
    }
    else {
        console.log("username aproved");
    }
}

const checkNewEmail = async (currentEmail, newEmail) => {
    const existingEmail = await getUserByEmail(newEmail);
    console.log(`current email: ${currentEmail} | new email: ${newEmail}`);
    console.log(currentEmail === newEmail);
    if (newEmail === "") {
        return { status: 400, message: "The email is needed." };
    }
    else if (currentEmail === newEmail) {
        return { status: 403, message: "The email is equal to the current one." };
    }
    else if (newEmail.split("").includes(" ")) {
        return { status: 400, message: "The email isn't valid. It can't containt spaces." };
    }
    else if (!(newEmail.length > 1 && newEmail.length < 30)) {
        return { status: 400, message: "The email must containt between 1 and 30 characters." };
    }
    else if (existingEmail) {
        return { status: 403, message: "This email is used by another user." };
    }
    else {
        console.log("email aproved");
    }
}

const checkNewPassword = (currentPassword, newPassword) => {
    const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    console.log(`current password: ${currentPassword} | new password: ${newPassword}`);
    if (newPassword === "") {
        return { status: 400, message: "password is needed." };
    }
    else if (!(newPassword.length > 8 && newPassword.length < 30)) {
        return { status: 400, message: `password has more than 30 characters` }
    }
    else if (newPassword.split("").includes(" ")) {
        return { status: 400, message: "The password can't containt spaces." };
    }
    else if (!validPassword.test(newPassword)) {
        return { status: 400, message: `The password must contain:\rBetween 8 and 15 characters\rOne or multiple numbers and special characters (@, $, !, %, *, ?, &)\rAt least a capital letter".` };
    }
    else if (currentPassword === newPassword) {
        return { status: 403, message: "password is equal to the current one." };
    }
    else {
        console.log("password aproved");
    }
}

const handleUserBanning = async (id, action) => {
    const user = await getUserByPk(id);
    if (action === "bann") {
        if (!user.banned) {
            user.banned = true;
            await user.save();
            return { status: 200, message: `User "${user.username}" banned` };
        }
        else {
            return { status: 403, message: `User "${user.username}" is already banned` };
        }
    } else {
        if (user.banned) {
            user.banned = false;
            await user.save();
            return { status: 200, message: `User "${user.username}" unnbanned` };
        }
        else {
            return { status: 403, message: `User "${user.username}" isn't banned` };
        }
    }
}

const setUserAsDeleted = async (userId) => {
    const user = await getUserByPk(userId);
    if (!user) {
        return { status: 404, message: "This user doesn't exist" };
    } else {
        if (user.active) {
            console.log("user now disabled");
            const setAsDeleted = await user.update({ active: false });
            await setAsDeleted.save();
            return { status: 200, message: `User "${user.username}" has been disabled.` };
        } else {
            console.log("This user was already disabled");
            return { status: 403, message: `The user "${user.username}" was already disabled` };
        }
    }
}

const enableUser = async (userId) => {
    const user = await getUserByPk(userId);
    if (!user) {
        return { status: 404, message: "There was a problem while trying to get the user data for their disabling." };
    } else {
        if (!user.active) {
            console.log("user now enabled");
            const setAsDeleted = await user.update({ active: true });
            await setAsDeleted.save();
            return { status: 200, message: `The user "${user.username}" has been enabled` };
        } else {
            console.log("This user is disabled");
            return { status: 403, message: `The user "${user.username}" wasn't disabled` };
        }
    }
}

const deleteUser = async (userId) => {
    const user = await getUserByPk(userId);
    if (user) {
        // const userDeletion = setTimeout(
        //     //a year has 31536000000ms
        //     async()=>{
        //         await user.destroy();
        //         console.log(`user ${user.username} deleted`);
        //     },10000
        // );
        // const deletion =await user.set({deletionId:userDeletion, active:false});
        const deletion = await user.set({ active: false });
        await deletion.save();
        return { status: 200, message: `The user ${user.username} is now disabled. It will be deleted within a year.` };
    } else {
        return { status: 404, message: "This user doesn't exist" };
    }
}

const cancelDeletion = async (userId, deletionId) => {
    clearTimeout(deletionId);
    const user = await getUserByPk(userId);
    const userNowAvailable = user.set({ deletionId: null, active: true });
    await userNowAvailable.save();
    console.log("deletion canceled.");
}

const handlePremium = async (email) => {
    const user = await getUserByEmail(email);
    if (!user) {
        return { status: 404, message: "User not found." }
    } else {
        if (!user.premium) {
            // setTimeout(async()=>{
            //     //a month has 2592000000ms
            //     const setAsFree = await user.update({premium:false});
            //     await setAsFree.save();
            //     console.log(`User is no longer premium.`);
            //     // return{status:200, message:`User "${user.username} is no longer premium`};
            // }, 10000);
            const setAsPremium = await user.update({ premium: true });
            await setAsPremium.save();
            subscriptionMail(user.email);
            return { status: 200, message: `User "${user.username} is now premium.` };
        } else {
            return { status: 200, message: `User "${user.username} is already premium.` };
        }
    }
}

const setUserAsAdmin = async (userId, password) => {
    console.log(HANDLE_ADMIN_PASSWORD);
    if (password !== HANDLE_ADMIN_PASSWORD) {
        return { status: 400, message: `wrong password` };
    } else {
        const user = await getUserByPk(userId);
        if (!user.active) return { status: 403, message: `This user is inactive` };
        if (user.banned) return { status: 403, message: `This user is banned` };
        if (user.admin) return { status: 403, message: `The user "${user.username}" is already administrator` };
        const setAsAdmin = await user.update({ admin: true });
        await setAsAdmin.save();
        return { status: 200, message: `The user "${user.username}" is now an administrator` };
    };
};

const setUserAsPublic = async (userId, password) => {
    if (password !== HANDLE_ADMIN_PASSWORD) {
        return { status: 400, message: `wrong password` };
    } else {
        const user = await getUserByPk(userId);
        if (!user.active) return { status: 403, message: `This user is inactive` };
        if (user.banned) return { status: 403, message: `This user is banned` };
        if (!user.admin) return { status: 403, message: `The user "${user.username}" is already public` };
        const setAsPublic = await user.update({ admin: false });
        await setAsPublic.save();
        return { status: 200, message: `The user "${user.username}" is now a public user` };
    };
};

module.exports = {
    checkNewUsername,
    checkNewEmail,
    checkNewPassword,
    handleUserBanning,
    setUserAsDeleted,
    enableUser,
    deleteUser,
    cancelDeletion,
    handlePremium,
    setUserAsAdmin,
    setUserAsPublic,
}