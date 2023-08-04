import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
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
import AnnounceContents from "components/AnnounceContent";

import { Provider } from "react-redux"; // Redux Provider 추가
import store from "./store";
import "./assets/css/index.css";
// others

const root = ReactDOM.createRoot(document.getElementById("root"));
export let persistorInfo = persistStore(store); //persistStore():유지하고싶은 redux store을 인자로 넣으면 persistor 객체를 반환
root.render(
  <Provider store={store}>
    {/* persistor={}: localStorage에 저장할 스토어를 persistor객체로 전달 */}
    {/* <PersistGate loading={null} persistor={persistorInfo}> */}
    <CookiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/nucleo-icons" element={<NucleoIcons />} />
          <Route path="/landing-page" element={<LandingPage />} />
          <Route path="/profile-page" element={<ProfilePage />} />
          <Route path="/Login-page" element={<LoginPage />} />
          <Route path="/Announcement-page" element={<AnnouncementPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
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
          <Route
            exact
            path="/AnnouncementList/:id"
            element={<AnnounceContents />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
    {/* </PersistGate> */}
  </Provider>
);
