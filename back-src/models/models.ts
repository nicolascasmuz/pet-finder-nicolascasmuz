import { User } from "./user";
import { Profile } from "./profile";
import { PetReport } from "./petreport";
import { MissingPet } from "./missingpet";

User.hasOne(Profile);
Profile.belongsTo(User);

User.hasMany(MissingPet);
MissingPet.belongsTo(User);

User.hasMany(PetReport);
PetReport.belongsToMany(User, { through: "C" });

export { User, Profile };
