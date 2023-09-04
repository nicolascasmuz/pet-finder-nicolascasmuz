import { Auth } from "../models/auth";
import { getSHA256ofString } from "../lib/sha256";

export async function updateAuthPassword(userId, newPassword) {
  const hashedPassword = getSHA256ofString(newPassword);

  const updatedPassword = {
    password: hashedPassword,
  };

  await Auth.update(updatedPassword, {
    where: {
      user_id: userId,
    },
  });

  return updatedPassword;
}

export async function findOneAuth(authorization) {
  const email = authorization.split(" ")[1];
  const password = authorization.split(" ")[2];

  const auth = await Auth.findOne({
    where: { email, password: getSHA256ofString(password) },
  });

  return auth;
}
