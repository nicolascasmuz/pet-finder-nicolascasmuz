import { Router } from "@vaadin/router";

export var API_BASE_URL: any = "";

if (process.env.ENV == "development") {
  API_BASE_URL = "http://localhost:3000";
} else if (process.env.ENV == "production") {
  API_BASE_URL = process.env.BACKEND_URL;
}

export const emptyData = {
  userId: "",
  picURL: "",
  nickname: "",
  email: "",
  password: "",
  address: "",
  location: "",
  lat: "",
  lng: "",
  newUser: "",
  selectedPet: "",
  petsByRadius: [],
  myReportedPets: [],
};

export const state = {
  data: {
    userId: "",
    picURL: "",
    nickname: "",
    email: "",
    password: "",
    address: "",
    location: "",
    newUser: "",
    selectedPet: "",
    petsByRadius: [],
    myReportedPets: [],
  },
  listeners: [],
  init() {
    const localData: any = localStorage.getItem("saved-state");
    if (!localData) {
      return;
    } else if (
      location.pathname == "/main" ||
      location.pathname == "/" ||
      location.pathname == "/log-in" ||
      location.pathname == "/sign-up"
    ) {
      this.setState(emptyData);
    } else {
      this.setState(JSON.parse(localData));
    }
  },
  getState() {
    return this.data;
  },
  setState(newState) {
    this.data = newState;
    for (const cb of this.listeners) {
      cb(newState);
    }
    localStorage.setItem("saved-state", JSON.stringify(newState));
    console.log("State: ", newState);
  },
  subscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },
  async signupUser(email, password) {
    const cs = this.getState();

    await fetch(API_BASE_URL + "/sign-up", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.createdUser == true) {
          cs.newUser = true;
        } else if (data.createdUser == false) {
          cs.newUser = false;
        }
        this.setState(cs);
      });
  },
  async loginUser(email, password) {
    const cs = this.getState();

    await fetch(API_BASE_URL + "/log-in", {
      headers: {
        "content-type": "application/json",
        authorization: "Bearer " + email + " " + password,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (!data.error) {
          cs.userId = data.profile.userId;
          cs.picURL = data.profile.picURL;
          cs.nickname = data.profile.nickname;
          cs.email = data.profile.email;
          cs.address = data.profile.address;
          cs.location = data.profile.location;
          cs.password = data.profile.password;
          cs.lat = data.profile.lat;
          cs.lng = data.profile.lng;

          this.setState(cs);
        } else {
          console.log(data);
        }
      });
  },
  async setProfile(setProfileData) {
    const cs = this.getState();

    await fetch(API_BASE_URL + "/create-profile", {
      method: "post",
      headers: {
        "content-type": "application/json",
        authorization:
          "Bearer " + setProfileData.email + " " + setProfileData.password,
      },
      body: JSON.stringify(setProfileData),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (!data.error) {
          cs.userId = data.newProfile.userId;
          cs.picURL = data.newProfile.picURL;
          cs.nickname = data.newProfile.nickname;
          cs.email = data.newProfile.email;
          cs.address = data.newProfile.address;
          cs.location = data.newProfile.location;
          cs.password = data.newProfile.password;
          cs.lat = data.newProfile.lat;
          cs.lng = data.newProfile.lng;

          this.setState(cs);
        } else {
          console.log(data);
        }
      });
  },
  async getReportedPets() {
    const cs = this.getState();

    await fetch(API_BASE_URL + "/reported-pets/" + cs.userId, {
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((reportedPets) => {
        const myReportedPets = reportedPets.filter((rp) => {
          return rp.userId == cs.userId;
        });

        cs.myReportedPets = myReportedPets;
        this.setState(cs);
      });
  },
  async getPetsByRadius(algoliaResults) {
    const cs = this.getState();

    let petsByRadius: any = [];

    cs.petsByRadius = petsByRadius;
    this.setState(cs);

    await fetch(API_BASE_URL + "/every-missing-pet")
      .then((res) => res.json())
      .then((missingPets) => {
        for (const r of algoliaResults) {
          const foundMp = missingPets.filter((mp) => {
            return mp.id == r.objectID;
          });
          petsByRadius.push(foundMp[0]);
        }
        cs.petsByRadius = petsByRadius;
        this.setState(cs);
      });
  },
  setSelectedPet(petId) {
    const cs = this.getState();

    const foundPet = cs.myReportedPets.find((p) => {
      return p.id == petId;
    });

    cs.selectedPet = foundPet;

    this.setState(cs);
  },
  async editReport(newData) {
    const cs = this.getState();

    await fetch(API_BASE_URL + "/report", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newData),
    })
      .then((res) => res.json())
      .then((data) => {
        cs.selectedPet.picURL = data.picURL;
        cs.selectedPet.name = data.name;
        cs.selectedPet.details = data.details;
        cs.selectedPet.found = data.found;
        cs.selectedPet.lng = data.lng;
        cs.selectedPet.lat = data.lat;
        this.setState(cs);
      });
  },
  async deleteReport(petId) {
    const cs = this.getState();

    await fetch(API_BASE_URL + "/delete-report", {
      method: "delete",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(petId),
    }).then(() => {
      const newArray = cs.myReportedPets.filter((rp) => {
        return rp.id != petId;
      });

      cs.myReportedPets = newArray;
      this.setState(cs);
    });
  },
  async editData(newData) {
    const cs = this.getState();

    await fetch(API_BASE_URL + "/profile", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newData),
    })
      .then((res) => res.json())
      .then((data) => {
        cs.picURL = data.picURL;
        cs.nickname = data.nickname;
        cs.email = data.email;
        cs.address = data.address;
        cs.location = data.location;
        this.setState(cs);
      });
  },
  async editPass(newPass) {
    const cs = this.getState();

    await fetch(API_BASE_URL + "/update-pass", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newPass),
    })
      .then((res) => res.json())
      .then((data) => {
        cs.password = data.password;
        this.setState(cs);
      });
  },
  async setReport(newData) {
    await fetch(API_BASE_URL + "/report-my-pet", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newData),
    })
      .then((res) => res.json())
      .then(() => {
        Router.go("/new-reported-pet");
      });
  },
};
