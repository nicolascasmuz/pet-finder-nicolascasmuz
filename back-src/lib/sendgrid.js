"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sgMail = void 0;
const sgMail = require("@sendgrid/mail");
exports.sgMail = sgMail;
sgMail.setApiKey(process.env.SENDGRID_KEY);
