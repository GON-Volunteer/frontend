import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
// styles
import "bootstrap/scss/bootstrap.scss";
import "assets/scss/paper-kit.scss?v=1.3.0";
import "assets/demo/demo.css?v=1.3.0";
// pages
import NucleoIcons from "views/NucleoIcons.js";
import LandingPage from "views/examples/LandingPage.js";
import ProfilePage from "views/examples/ProfilePage.js";
import LoginPage from "views/Common/LoginPage.js";
import AnnouncementPage from "views/Common/AnnouncementPage";
import AnnouncementList from "views/Common/AnnouncementList";
import StudentManagement from "views/Admin/StudentManagement";
import Home from "views/Common/Home";
import { Provider } from "react-redux"; // Redux Provider 추가
import store from "./views/redux/store";
import "./assets/css/index.css";
// others

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <CookiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/index" element={<Index />} />
          <Route path="/nucleo-icons" element={<NucleoIcons />} />
          <Route path="/landing-page" element={<LandingPage />} />
          <Route path="/profile-page" element={<ProfilePage />} />
          <Route path="/Login-page" element={<LoginPage />} />
          <Route path="/Announcement-page" element={<AnnouncementPage />} />
          <Route path="*" element={<Navigate to="/index" replace />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<Home />}></Route>
          <Route
            path="/AnnouncementList"
            element={<AnnouncementList />}
          ></Route>
          <Route
            path="/StudentManagement"
            element={<StudentManagement />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  </Provider>
);
