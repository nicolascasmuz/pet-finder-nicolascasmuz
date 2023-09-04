"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfilePassword = exports.updateProfile = void 0;
const profile_1 = require("../models/profile");
const cloudinary_1 = require("../lib/cloudinary");
const sha256_1 = require("../lib/sha256");
async function updateProfile(userId, updatedProfile) {
    if (updatedProfile.nickname) {
        const img = await cloudinary_1.cloudinary.uploader.upload(updatedProfile.picURL, {
            resource_type: "image",
            discard_original_filename: true,
            width: 500,
            height: 500,
        });
        const dataToUpdate = {
            picURL: img.secure_url,
            nickname: updatedProfile.nickname,
            email: updatedProfile.email,
            address: updatedProfile.address,
            location: updatedProfile.location,
        };
        await profile_1.Profile.update(dataToUpdate, {
            where: {
                id: userId,
            },
        });
        return dataToUpdate;
    }
}
exports.updateProfile = updateProfile;
async function updateProfilePassword(userId, newPassword) {
    const hashedPassword = (0, sha256_1.getSHA256ofString)(newPassword);
    const updatedPassword = {
        password: hashedPassword,
    };
    await profile_1.Profile.update(updatedPassword, {
        where: {
            userId: userId,
        },
    });
    return updatedPassword;
}
exports.updateProfilePassword = updateProfilePassword;
