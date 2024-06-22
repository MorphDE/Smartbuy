import { UserService } from './../services/users-service.js';

async function registerUserCtrl(req, res) {
    try {
        const userInfo = req.body;
        const result = await UserService.registerUser(userInfo);
        res.json(result);
    } catch (err) {
        console.log(err);
        res
            .status(500)
            .json({ err, message: err.message || "Could not register" });
    }
}

async function loginUserCtrl(req, res) {
    try {
        const userInfo = {
            email: req.body.email,
            password: req.body.password,
        };
        const result = await UserService.loginUser(userInfo);
        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err, message: err.message || "Could not login" });
    }
};

async function getAllUsersCtrl(req, res) {
    try {
        const result = await UserService.getAllUsers();
        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err, message: err.message || "Could not get users" });
    }
};

async function getLoggedInUserDetailsCtrl(req, res) {
    try {
        const result = await UserService.getUserDetails(req.authenticatedUserId);
        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err, message: err.message || "Could not get users" });
    }
};

async function getUserDetailsCtrl(req, res) {
    try {
        const result = await UserService.getUserDetails(req.params.userId);
        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err, message: err.message || "Could not get users" });
    }
};

async function deleteUserByIdCtrl(req, res) {
    try {
        const result = await UserService.deleteUserById(req.params.userId);
        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err, message: err.message || "Could not delete users" });
    }
}

async function updateUserByIdCtrl(req, res) {
    try {
        let body = req.body;
        const disallowedFields = ["email", "passwordHash", "passwordSalt", "isAdmin"];

        disallowedFields.forEach(field => delete body[field])

        const result = await UserService.updateUserById(req.params.userId, body);
        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err, message: err.message || "Could not delete users" });
    }
}


export const UsersController = {
    registerUserCtrl,
    loginUserCtrl,
    getAllUsersCtrl,
    getUserDetailsCtrl,
    getLoggedInUserDetailsCtrl,
    deleteUserByIdCtrl,
    updateUserByIdCtrl
};

