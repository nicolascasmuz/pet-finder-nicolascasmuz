import { Profile } from "../models/profile";
import { cloudinary } from "../lib/cloudinary";
import { getSHA256ofString } from "../lib/sha256";

export async function updateProfile(userId, updatedProfile) {
  if (updatedProfile.nickname) {
    const img = await cloudinary.uploader.upload(updatedProfile.picURL, {
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

    await Profile.update(dataToUpdate, {
      where: {
        id: userId,
      },
    });

    return dataToUpdate;
  }
}

export async function updateProfilePassword(userId, newPassword) {
  const hashedPassword = getSHA256ofString(newPassword);

  const updatedPassword = {
    password: hashedPassword,
  };

  await Profile.update(updatedPassword, {
    where: {
      userId: userId,
    },
  });

  return updatedPassword;
}
