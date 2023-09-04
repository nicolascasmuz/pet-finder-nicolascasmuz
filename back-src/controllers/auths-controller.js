"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOneAuth = exports.updateAuthPassword = void 0;
const auth_1 = require("../models/auth");
const sha256_1 = require("../lib/sha256");
async function updateAuthPassword(userId, newPassword) {
    const hashedPassword = (0, sha256_1.getSHA256ofString)(newPassword);
    const updatedPassword = {
        password: hashedPassword,
    };
    await auth_1.Auth.update(updatedPassword, {
        where: {
            user_id: userId,
        },
    });
    return updatedPassword;
}
exports.updateAuthPassword = updateAuthPassword;
async function findOneAuth(authorization) {
    const email = authorization.split(" ")[1];
    const password = authorization.split(" ")[2];
    const auth = await auth_1.Auth.findOne({
        where: { email, password: (0, sha256_1.getSHA256ofString)(password) },
    });
    return auth;
}
exports.findOneAuth = findOneAuth;
