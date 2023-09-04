import * as express from "express";
import * as cors from "cors";
import * as path from "path";
import { sequelize } from "./models/index";
import { Profile } from "./models/models";
import {
  updateUserPassword,
  findOrCreateUser,
} from "./controllers/users-controller";
import {
  updateAuthPassword,
  findOneAuth,
} from "./controllers/auths-controller";
import {
  updateProfile,
  updateProfilePassword,
} from "./controllers/profiles-controller";
import {
  createReport,
  updatePetReport,
  deletePetReport,
  getReportedPets,
} from "./controllers/petreports-controller";
import {
  createMissingPet,
  updateMissingPet,
  deleteMissingPet,
  getMissingPets,
} from "./controllers/missingpets-controller";
import { getSHA256ofString } from "./lib/sha256";
import { missingPetsIndex, profilesIndex } from "./lib/algolia";
import { sgMail } from "./lib/sendgrid";

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(cors());

/* sequelize.sync({ alter: true }).then((res) => {
  console.log(res);
}); */

// AUTENTICACIÓN: REGISTRA UN NUEVO USUARIO
app.post("/sign-up", async (req, res) => {
  const foundOrCreatedUser = await findOrCreateUser(req.body);

  res.json(foundOrCreatedUser);
});

// CREA UN PERFIL
app.post("/create-profile", async (req, res) => {
  const email = req.headers.authorization.split(" ")[1];
  const password = req.headers.authorization.split(" ")[2];
  const { lat, lng, address, location } = req.body;

  const foundAuth = await findOneAuth(req.headers.authorization);

  // RECORTA EL EMAIL PARA CREAR EL NICKNAME
  const splitEmail = email.split("@")[0];

  // CAPITALIZA LA PRIMERA LETRA DEL NICKNAME
  function capitalizeFirstLetter(nick) {
    const capitalized = nick.charAt(0).toUpperCase() + nick.slice(1);
    return capitalized;
  }
  const capitalizedNick = capitalizeFirstLetter(splitEmail);

  const newProfile = await Profile.create({
    picURL:
      "https://res.cloudinary.com/dbgjrxaqf/image/upload/v1693055005/blank-profile-picture_moescb.png",
    nickname: capitalizedNick,
    email: foundAuth?.get("email"),
    password: getSHA256ofString(password),
    address,
    location,
    lat,
    lng,
    userId: foundAuth?.get("user_id"),
  });
  await profilesIndex
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
    } else {
      res.status(200).json({ newProfile });
    }
  } catch {
    res.status(401).json({ error: true });
  }
});

// LOGUEA UN USUARIO
app.get("/log-in", async (req, res) => {
  const email = req.headers.authorization.split(" ")[1];
  const password = req.headers.authorization.split(" ")[2];

  const foundAuth = await findOneAuth(req.headers.authorization);

  // RECORTA EL EMAIL PARA CREAR EL NICKNAME
  const splitEmail = email.split("@")[0];

  // CAPITALIZA LA PRIMERA LETRA DEL NICKNAME
  function capitalizeFirstLetter(nick) {
    const capitalized = nick.charAt(0).toUpperCase() + nick.slice(1);
    return capitalized;
  }
  const capitalizedNick = capitalizeFirstLetter(splitEmail);

  const [profile, createdProfile] = await Profile.findOrCreate({
    where: { userId: foundAuth?.get("user_id") },
    defaults: {
      picURL:
        "https://res.cloudinary.com/dbgjrxaqf/image/upload/v1691418721/blank-profile-picture_cweptd.png",
      nickname: capitalizedNick,
      email: foundAuth?.get("email"),
      password: getSHA256ofString(password),
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
    } else {
      res.status(200).json({ profile });
    }
  } catch {
    res.status(401).json({ error: true });
  }
});

// ACTUALIZA UN PERFIL
app.post("/profile", async (req, res) => {
  const { userId } = req.body;

  if (!req.body) {
    res.status(400).json({ message: "no body" });
  } else {
    const updatedProfile = await updateProfile(userId, req.body);
    res.json(updatedProfile);
  }
});

// REPORTA MASCOTA DEL USUARIO
app.post("/report-my-pet", async (req, res) => {
  const { userId } = req.body;

  const newPet = await createReport(userId, req.body);
  const newMissingPet = await createMissingPet(userId, req.body);

  res.json({ newPet, newMissingPet });
});

// OBTIENE MASCOTAS REPORTADAS
app.get("/reported-pets/:userId", async (req, res) => {
  const { userId } = req.params;

  const reportedPets = await getReportedPets(userId);

  res.json(reportedPets);
});

// OBTIENE TODAS LAS MASCOTAS PERDIDAS
app.get("/every-missing-pet", async (req, res) => {
  const everyMissingPet = await getMissingPets();

  res.json(everyMissingPet);
});

// ACTUALIZA UN REPORTE
app.post("/report", async (req, res) => {
  const { id } = req.body;

  if (!req.body) {
    res.status(400).json({ message: "no body" });
  } else {
    const updatedMissingReport = await updateMissingPet(id, req.body);
    const updatedPetReport = await updatePetReport(id, req.body);
    res.json(updatedMissingReport);
  }
});

// ELIMINA UN REPORTE
app.delete("/delete-report", async (req, res) => {
  const { id } = req.body;

  if (!req.body) {
    res.status(400).json({ message: "no body" });
  } else {
    const updatedMissingReport = await deleteMissingPet(id);
    const updatedPetReport = await deletePetReport(id);
    res.json(updatedMissingReport);
  }
});

// ACTUALIZA LA CONTRASEÑA
app.post("/update-pass", async (req, res) => {
  const { userId, password } = req.body;

  if (!req.body) {
    res.status(400).json({ message: "no body" });
  } else {
    const updatedUserPass = await updateUserPassword(userId, password);
    await updateAuthPassword(userId, password);
    await updateProfilePassword(userId, password);
    res.json(updatedUserPass);
  }
});

// BUSCA MASCOTAS EN UN RADIO
app.get("/pets-near-to", async (req, res) => {
  const { lat, lng, radius } = req.query;

  const { hits } = await missingPetsIndex.search("", {
    aroundLatLng: [lat, lng].join(","),
    aroundRadius: radius,
  });

  res.json(hits);
});

// ENVÍA INFO POR MAIL
app.post("/send-mail", async (req, res) => {
  const { ownerEmail, myEmail, ownerName, missingPetName, info } = req.body;

  const msg = {
    to: ownerEmail,
    from: myEmail,
    subject: `Hola ${ownerName}, parece que alguien ha visto a ${missingPetName}`,
    text: info,
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };

  /* console.log("msg: ", msg);
  res.json(msg); */

  sgMail.send(msg).then(() => {
    res.json("ok");
  });
});

app.use(express.static("dist"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.listen(port, console.log(`initialized on http://localhost:${port}`));
