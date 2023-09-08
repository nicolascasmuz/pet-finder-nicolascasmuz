import "./components/button-comp";
import "./components/deleted-pet-comp";
import "./components/form-input-comp";
import "./components/found-pet-card-comp";
import "./components/found-pet-comp";
import "./components/header-comp";
import "./components/header-menu-comp";
import "./components/map-comp";
import "./components/missing-pet-card-comp";
import "./components/report-form-comp";
import "./components/reported-pet-card-comp";
import "./components/sent-info-comp";
import "./components/set-radius-form-comp";

import "./pages/main-page";
import "./pages/log-in-page";
import "./pages/sign-up-page";
import "./pages/location-page";
import "./pages/home-page";
import "./pages/my-data-page";
import "./pages/edit-data-page";
import "./pages/edit-pass-page";
import "./pages/reported-pets-page";
import "./pages/no-reported-pets-page";
import "./pages/new-report-page";
import "./pages/edit-report-page";
import "./pages/new-reported-pet-page";
import "./pages/found-pet-page";
import "./pages/deleted-pet-page";
import "./pages/map-page";

import "./router";

import { state } from "./state";

(function () {
  state.init();
})();
