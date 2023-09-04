"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSHA256ofString = void 0;
const crypto = require("crypto");
function getSHA256ofString(text) {
    return crypto.createHash("sha256").update(text).digest("hex");
}
exports.getSHA256ofString = getSHA256ofString;
