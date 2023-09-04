"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOrCreateUser = exports.updateUserPassword = void 0;
const user_1 = require("../models/user");
const auth_1 = require("../models/auth");
const sha256_1 = require("../lib/sha256");
async function updateUserPassword(userId, newPassword) {
    const hashedPassword = (0, sha256_1.getSHA256ofString)(newPassword);
    const updatedPassword = {
        password: hashedPassword,
    };
    await user_1.User.update(updatedPassword, {
        where: {
            id: userId,
        },
    });
    return updatedPassword;
}
exports.updateUserPassword = updateUserPassword;
async function findOrCreateUser(body) {
    const { email, password } = body;
    const [user, createdUser] = await user_1.User.findOrCreate({
        where: { email: email },
        defaults: {
            email: email,
            password: (0, sha256_1.getSHA256ofString)(password),
        },
    });
    const [auth, createdAuth] = await auth_1.Auth.findOrCreate({
        where: { user_id: user.get("id") },
        defaults: {
            email: email,
            password: user.get("password"),
            user_id: user.get("id"),
        },
    });
    return { createdUser };
}
exports.findOrCreateUser = findOrCreateUser;
