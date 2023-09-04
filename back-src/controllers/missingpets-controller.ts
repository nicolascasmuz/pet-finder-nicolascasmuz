import { MissingPet } from "../models/missingpet";
import { cloudinary } from "../lib/cloudinary";
import { missingPetsIndex } from "../lib/algolia";

export async function createMissingPet(userId, missingPetData) {
  const img = await cloudinary.uploader.upload(missingPetData.picURL, {
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

  const newMissingPet = await MissingPet.create(newPet);
  await missingPetsIndex
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

export async function updateMissingPet(petId, updatedMissingPet) {
  if (updatedMissingPet.name) {
    const img = await cloudinary.uploader.upload(updatedMissingPet.picURL, {
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

    await MissingPet.update(dataToUpdate, {
      where: {
        id: petId,
      },
    });

    function bodyToIndex(data, id?) {
      const response: any = {};

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

    await missingPetsIndex.partialUpdateObject(indexItem);

    return dataToUpdate;
  }
}

export async function deleteMissingPet(petId) {
  const deletedMissingPet = await MissingPet.destroy({
    where: {
      id: petId,
    },
  });

  await missingPetsIndex.deleteObject(`${petId}`);

  return deletedMissingPet;
}

export async function getMissingPets() {
  const missingPets = await MissingPet.findAll({});

  return missingPets;
}
