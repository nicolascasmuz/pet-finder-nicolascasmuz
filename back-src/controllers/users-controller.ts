import { User } from "../models/user";
import { Auth } from "../models/auth";
import { getSHA256ofString } from "../lib/sha256";

export async function updateUserPassword(userId, newPassword) {
  const hashedPassword = getSHA256ofString(newPassword);

  const updatedPassword = {
    password: hashedPassword,
  };

  await User.update(updatedPassword, {
    where: {
      id: userId,
    },
  });

  return updatedPassword;
}

export async function findOrCreateUser(body) {
  const { email, password } = body;

  const [user, createdUser] = await User.findOrCreate({
    where: { email: email },
    defaults: {
      email: email,
      password: getSHA256ofString(password),
    },
  });

  const [auth, createdAuth] = await Auth.findOrCreate({
    where: { user_id: user.get("id") },
    defaults: {
      email: email,
      password: user.get("password"),
      user_id: user.get("id"),
    },
  });

  return { createdUser };
}
