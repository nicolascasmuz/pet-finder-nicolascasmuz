import * as crypto from "crypto";

function getSHA256ofString(text: string) {
  return crypto.createHash("sha256").update(text).digest("hex");
}

export { getSHA256ofString };
