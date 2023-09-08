"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resend = void 0;
const resend_1 = require("resend");
const resend = new resend_1.Resend(process.env.RESEND_KEY);
exports.resend = resend;
