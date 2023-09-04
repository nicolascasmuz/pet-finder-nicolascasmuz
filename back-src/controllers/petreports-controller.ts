import { PetReport } from "../models/petreport";
import { cloudinary } from "../lib/cloudinary";

export async function createReport(userId, newReport) {
  const img = await cloudinary.uploader.upload(newReport.picURL, {
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

  await PetReport.create(newPet);

  return newPet;
}

export async function updatePetReport(petId, updatedReport) {
  if (updatedReport.name) {
    const img = await cloudinary.uploader.upload(updatedReport.picURL, {
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

    await PetReport.update(dataToUpdate, {
      where: {
        id: petId,
      },
    });

    return dataToUpdate;
  }
}

export async function deletePetReport(petId) {
  const deletedPetReport = await PetReport.destroy({
    where: {
      id: petId,
    },
  });

  return deletedPetReport;
}

export async function getReportedPets(userId) {
  const profile = await PetReport.findAll({
    where: {
      userId,
    },
  });

  return profile;
}
