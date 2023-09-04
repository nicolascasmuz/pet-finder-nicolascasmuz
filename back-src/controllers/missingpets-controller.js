"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMissingPets = exports.deleteMissingPet = exports.updateMissingPet = exports.createMissingPet = void 0;
const missingpet_1 = require("../models/missingpet");
const cloudinary_1 = require("../lib/cloudinary");
const algolia_1 = require("../lib/algolia");
async function createMissingPet(userId, missingPetData) {
    const img = await cloudinary_1.cloudinary.uploader.upload(missingPetData.picURL, {
        resource_type: "image",
        discard_original_filename: true,
        width: 335,
        height: 180,
    });
    const newPet = {
        picURL: img.secure_url,
        name: missingPetData.name,
        details: missingPetData.details,
        found: false,
        lng: missingPetData.lng,
        lat: missingPetData.lat,
        ownerEmail: missingPetData.ownerEmail,
        ownerName: missingPetData.ownerName,
        userId,
    };
    const newMissingPet = await missingpet_1.MissingPet.create(newPet);
    await algolia_1.missingPetsIndex
        .saveObject({
        objectID: newMissingPet.get("id"),
        userId: newMissingPet.get("userId"),
        name: newMissingPet.get("name"),
        found: newMissingPet.get("found"),
        _geoloc: {
            lng: newMissingPet.get("lng"),
            lat: newMissingPet.get("lat"),
        },
    })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    return newMissingPet;
}
exports.createMissingPet = createMissingPet;
async function updateMissingPet(petId, updatedMissingPet) {
    if (updatedMissingPet.name) {
        const img = await cloudinary_1.cloudinary.uploader.upload(updatedMissingPet.picURL, {
            resource_type: "image",
            discard_original_filename: true,
            width: 335,
            height: 180,
        });
        const dataToUpdate = {
            picURL: img.secure_url,
            name: updatedMissingPet.name,
            details: updatedMissingPet.details,
            found: updatedMissingPet.found,
            lat: updatedMissingPet.lat,
            lng: updatedMissingPet.lng,
        };
        await missingpet_1.MissingPet.update(dataToUpdate, {
            where: {
                id: petId,
            },
        });
        function bodyToIndex(data, id) {
            const response = {};
            if (data.name) {
                response.name = data.name;
            }
            if (data.found) {
                response.found = data.found;
            }
            if (data.lng && data.lat) {
                response._geoloc = {
                    lng: data.lng,
                    lat: data.lat,
                };
            }
            if (id) {
                response.objectID = id;
            }
            return response;
        }
        const indexItem = bodyToIndex(updatedMissingPet, petId);
        await algolia_1.missingPetsIndex.partialUpdateObject(indexItem);
        return dataToUpdate;
    }
}
exports.updateMissingPet = updateMissingPet;
async function deleteMissingPet(petId) {
    const deletedMissingPet = await missingpet_1.MissingPet.destroy({
        where: {
            id: petId,
        },
    });
    await algolia_1.missingPetsIndex.deleteObject(`${petId}`);
    return deletedMissingPet;
}
exports.deleteMissingPet = deleteMissingPet;
async function getMissingPets() {
    const missingPets = await missingpet_1.MissingPet.findAll({});
    return missingPets;
}
exports.getMissingPets = getMissingPets;
