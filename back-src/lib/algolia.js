"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profilesIndex = exports.missingPetsIndex = void 0;
const algoliasearch_1 = require("algoliasearch");
const client = (0, algoliasearch_1.default)(`${process.env.ALGOLIA_APPID}`, `${process.env.ALGOLIA_ADMINAPIKEY}`);
const missingPetsIndex = client.initIndex("missingpets");
exports.missingPetsIndex = missingPetsIndex;
const profilesIndex = client.initIndex("profiles");
exports.profilesIndex = profilesIndex;
