import { generateRandomSalt, hash } from "../utils/hash.js";
import { createToken } from "../utils/createToken.js";
import { Users } from './../models/users.js';

// userInfo = { firstname, lastname, email, password }
async function registerUser({ firstname, lastname, email, address, password }) {
    const foundUserWithEmail = await Users.findOne({ email });
    if (foundUserWithEmail)
        throw new Error("User with this email already has an account");

    const passwordSalt = generateRandomSalt();
    const passwordHash = hash(`${password}${passwordSalt}`); // Klartext password mit salt hashen

    const user = await Users.create({
        firstname,
        lastname,
        email,
        passwordHash, // hash(password + passwordSalt)
        passwordSalt, // salt
        address
    });

    // await sendVerificationEmail(user);

    return userToView(user);
}

async function loginUser({ email, password }) {
    const user = await Users.findOne({ email });
    if (!user) throw new Error("Invalid login");

    // if (!user.isEmailVerified)
    //   throw new Error("Email not verified, login aborted");

    const passwordHash = hash(`${password}${user.passwordSalt}`);
    const correctPassword = passwordHash === user.passwordHash;
    if (!correctPassword) throw new Error("Invalid login");

    const accessToken = createToken(user, "access"); // header.payload.signature
    //   const refreshToken = createToken(user, "refresh"); // header.payload.signature

    return {
        user: userToView(user),
        tokens: { accessToken },
    };
}

async function deleteUserById(userId) {
    const user = await Users.findByIdAndDelete(userId);
    if (!user) throw new Error("User could not be found");

    return userToView(user);
}

async function updateUserById(userId, newData) {
    const user = await Users.findByIdAndUpdate(userId, { $set: newData }, { new: true });
    if (!user) throw new Error("User could not be found");

    return userToView(user);
}

async function getAllUsers() {
    const users = await Users.find({});

    return users.map(x => userToView(x))
}

async function getUserDetails(userId) {
    const user = await Users.findById(userId);
    if (!user) throw new Error("User could not be found");

    return userToView(user);
}

async function checkForAdmin(userId) {
    const user = await Users.findById(userId);
    if (!user) throw new Error("User could not be found");
    return user.isAdmin;
}

function userToView(user) {
    return {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        address: user.address,
        isAdmin: user.isAdmin
    };
}


export const UserService = {
    registerUser,
    loginUser,
    deleteUserById,
    updateUserById,
    getAllUsers,
    getUserDetails,
    checkForAdmin
};