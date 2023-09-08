"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const path = require("path");
const models_1 = require("./models/models");
const users_controller_1 = require("./controllers/users-controller");
const auths_controller_1 = require("./controllers/auths-controller");
const profiles_controller_1 = require("./controllers/profiles-controller");
const petreports_controller_1 = require("./controllers/petreports-controller");
const missingpets_controller_1 = require("./controllers/missingpets-controller");
const sha256_1 = require("./lib/sha256");
const algolia_1 = require("./lib/algolia");
const resend_1 = require("./lib/resend");
const port = process.env.PORT || 3000;
const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cors());
/* sequelize.sync({ alter: true }).then((res) => {
  console.log(res);
}); */
// AUTENTICACIÓN: REGISTRA UN NUEVO USUARIO
app.post("/sign-up", async (req, res) => {
    const foundOrCreatedUser = await (0, users_controller_1.findOrCreateUser)(req.body);
    res.json(foundOrCreatedUser);
});
// CREA UN PERFIL
app.post("/create-profile", async (req, res) => {
    const email = req.headers.authorization.split(" ")[1];
    const password = req.headers.authorization.split(" ")[2];
    const { lat, lng, address, location } = req.body;
    const foundAuth = await (0, auths_controller_1.findOneAuth)(req.headers.authorization);
    // RECORTA EL EMAIL PARA CREAR EL NICKNAME
    const splitEmail = email.split("@")[0];
    // CAPITALIZA LA PRIMERA LETRA DEL NICKNAME
    function capitalizeFirstLetter(nick) {
        const capitalized = nick.charAt(0).toUpperCase() + nick.slice(1);
        return capitalized;
    }
    const capitalizedNick = capitalizeFirstLetter(splitEmail);
    const newProfile = await models_1.Profile.create({
        picURL: "https://res.cloudinary.com/dbgjrxaqf/image/upload/v1693055005/blank-profile-picture_moescb.png",
        nickname: capitalizedNick,
        email: foundAuth?.get("email"),
        password: (0, sha256_1.getSHA256ofString)(password),
        address,
        location,
        lat,
        lng,
        userId: foundAuth?.get("user_id"),
    });
    await algolia_1.profilesIndex
        .saveObject({
        objectID: newProfile.get("id"),
        email: newProfile.get("email"),
        _geoloc: {
            lng: newProfile.get("lng"),
            lat: newProfile.get("lat"),
        },
    })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    try {
        if (foundAuth == null) {
            res.status(400).json({ error: "email or pass are incorrect" });
        }
        else {
            res.status(200).json({ newProfile });
        }
    }
    catch {
        res.status(401).json({ error: true });
    }
});
// LOGUEA UN USUARIO
app.get("/log-in", async (req, res) => {
    const email = req.headers.authorization.split(" ")[1];
    const password = req.headers.authorization.split(" ")[2];
    const foundAuth = await (0, auths_controller_1.findOneAuth)(req.headers.authorization);
    // RECORTA EL EMAIL PARA CREAR EL NICKNAME
    const splitEmail = email.split("@")[0];
    // CAPITALIZA LA PRIMERA LETRA DEL NICKNAME
    function capitalizeFirstLetter(nick) {
        const capitalized = nick.charAt(0).toUpperCase() + nick.slice(1);
        return capitalized;
    }
    const capitalizedNick = capitalizeFirstLetter(splitEmail);
    const [profile, createdProfile] = await models_1.Profile.findOrCreate({
        where: { userId: foundAuth?.get("user_id") },
        defaults: {
            picURL: "https://res.cloudinary.com/dbgjrxaqf/image/upload/v1691418721/blank-profile-picture_cweptd.png",
            nickname: capitalizedNick,
            email: foundAuth?.get("email"),
            password: (0, sha256_1.getSHA256ofString)(password),
            address: "",
            location: "",
            lat: "",
            lng: "",
            userId: foundAuth?.get("user_id"),
        },
    });
    try {
        if (foundAuth == null) {
            res.status(400).json({ error: "email or pass are incorrect" });
        }
        else {
            res.status(200).json({ profile });
        }
    }
    catch {
        res.status(401).json({ error: true });
    }
});
// ACTUALIZA UN PERFIL
app.post("/profile", async (req, res) => {
    const { userId } = req.body;
    if (!req.body) {
        res.status(400).json({ message: "no body" });
    }
    else {
        const updatedProfile = await (0, profiles_controller_1.updateProfile)(userId, req.body);
        res.json(updatedProfile);
    }
});
// REPORTA MASCOTA DEL USUARIO
app.post("/report-my-pet", async (req, res) => {
    const { userId } = req.body;
    const newPet = await (0, petreports_controller_1.createReport)(userId, req.body);
    const newMissingPet = await (0, missingpets_controller_1.createMissingPet)(userId, req.body);
    res.json({ newPet, newMissingPet });
});
// OBTIENE MASCOTAS REPORTADAS
app.get("/reported-pets/:userId", async (req, res) => {
    const { userId } = req.params;
    const reportedPets = await (0, petreports_controller_1.getReportedPets)(userId);
    res.json(reportedPets);
});
// OBTIENE TODAS LAS MASCOTAS PERDIDAS
app.get("/every-missing-pet", async (req, res) => {
    const everyMissingPet = await (0, missingpets_controller_1.getMissingPets)();
    res.json(everyMissingPet);
});
// ACTUALIZA UN REPORTE
app.post("/report", async (req, res) => {
    const { id } = req.body;
    if (!req.body) {
        res.status(400).json({ message: "no body" });
    }
    else {
        const updatedMissingReport = await (0, missingpets_controller_1.updateMissingPet)(id, req.body);
        const updatedPetReport = await (0, petreports_controller_1.updatePetReport)(id, req.body);
        res.json(updatedMissingReport);
    }
});
// ELIMINA UN REPORTE
app.delete("/delete-report", async (req, res) => {
    const { id } = req.body;
    if (!req.body) {
        res.status(400).json({ message: "no body" });
    }
    else {
        const updatedMissingReport = await (0, missingpets_controller_1.deleteMissingPet)(id);
        const updatedPetReport = await (0, petreports_controller_1.deletePetReport)(id);
        res.json(updatedMissingReport);
    }
});
// ACTUALIZA LA CONTRASEÑA
app.post("/update-pass", async (req, res) => {
    const { userId, password } = req.body;
    if (!req.body) {
        res.status(400).json({ message: "no body" });
    }
    else {
        const updatedUserPass = await (0, users_controller_1.updateUserPassword)(userId, password);
        await (0, auths_controller_1.updateAuthPassword)(userId, password);
        await (0, profiles_controller_1.updateProfilePassword)(userId, password);
        res.json(updatedUserPass);
    }
});
// BUSCA MASCOTAS EN UN RADIO
app.get("/pets-near-to", async (req, res) => {
    const { lat, lng, radius } = req.query;
    const { hits } = await algolia_1.missingPetsIndex.search("", {
        aroundLatLng: [lat, lng].join(","),
        aroundRadius: radius,
    });
    res.json(hits);
});
// ENVÍA INFO POR MAIL
app.post("/send-mail", async (req, res) => {
    const { myEmail, myName, ownerEmail, ownerName, missingPetName, info } = req.body;
    const msg = {
        from: "onboarding@resend.dev",
        to: "nicolascasmuz@gmail.com",
        subject: `Hola ${ownerName}, parece que alguien ha visto a ${missingPetName}`,
        html: `<h4>Reportado por el usuario: ${myName}</h4><h4>Email: ${myEmail}</h4><p>Mensaje: ${info}</p>`,
    };
    resend_1.resend.emails.send(msg);
    try {
        res.status(200).json({ msg });
    }
    catch {
        res.status(401).json({ error: true });
    }
});
app.use(express.static(path.join(__dirname, "../dist")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../dist/index.html"));
});
app.listen(port, console.log(`initialized on http://localhost:${port}`));
