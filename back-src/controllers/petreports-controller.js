"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReportedPets = exports.deletePetReport = exports.updatePetReport = exports.createReport = void 0;
const petreport_1 = require("../models/petreport");
const cloudinary_1 = require("../lib/cloudinary");
async function createReport(userId, newReport) {
    const img = await cloudinary_1.cloudinary.uploader.upload(newReport.picURL, {
        resource_type: "image",
        discard_original_filename: true,
        width: 335,
        height: 180,
    });
    const newPet = {
        picURL: img.secure_url,
        name: newReport.name,
        details: newReport.details,
        found: false,
        lat: newReport.lat,
        lng: newReport.lng,
        userId,
    };
    await petreport_1.PetReport.create(newPet);
    return newPet;
}
exports.createReport = createReport;
async function updatePetReport(petId, updatedReport) {
    if (updatedReport.name) {
        const img = await cloudinary_1.cloudinary.uploader.upload(updatedReport.picURL, {
            resource_type: "image",
            discard_original_filename: true,
            width: 335,
            height: 180,
        });
        const dataToUpdate = {
            picURL: img.secure_url,
            name: updatedReport.name,
            details: updatedReport.details,
            found: updatedReport.found,
            lat: updatedReport.lat,
            lng: updatedReport.lng,
        };
        await petreport_1.PetReport.update(dataToUpdate, {
            where: {
                id: petId,
            },
        });
        return dataToUpdate;
    }
}
exports.updatePetReport = updatePetReport;
async function deletePetReport(petId) {
    const deletedPetReport = await petreport_1.PetReport.destroy({
        where: {
            id: petId,
        },
    });
    return deletedPetReport;
}
exports.deletePetReport = deletePetReport;
async function getReportedPets(userId) {
    const profile = await petreport_1.PetReport.findAll({
        where: {
            userId,
        },
    });
    return profile;
}
exports.getReportedPets = getReportedPets;
