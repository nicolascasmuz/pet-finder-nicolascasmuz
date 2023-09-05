"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profilesIndex = exports.missingPetsIndex = void 0;
const algoliasearch_1 = require("algoliasearch");
const client = (0, algoliasearch_1.default)("E8DDTO76Q8", "ae188ac13f1eb017fb373e783d766a8c");
const missingPetsIndex = client.initIndex("missingpets");
exports.missingPetsIndex = missingPetsIndex;
const profilesIndex = client.initIndex("profiles");
exports.profilesIndex = profilesIndex;
