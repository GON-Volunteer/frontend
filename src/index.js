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
//admin - student manage
import StudentManagement from "views/Admin/studentManagement/StudentManagement";
import StudentRegister from "views/Admin/studentManagement/StudentRegister";
import StudentDelete from "views/Admin/studentManagement/StudentDelete";
import StudentEdit from "views/Admin/studentManagement/StudentEdit";
import StudentInfo from "views/Admin/studentManagement/StudentInfo";
//admin - teacher manage
import TeacherManagement from "views/Admin/teacherManagementFolder/TeacherManagement";
import TeacherRegister from "views/Admin/teacherManagementFolder/TeacherRegister";
import TeacherEdit from "views/Admin/teacherManagementFolder/TeacherEdit";
import TeacherDelete from "views/Admin/teacherManagementFolder/TeacherDelete";
import TeacherInfo from "views/Admin/teacherManagementFolder/TeacherInfo";
import Home from "views/Common/Home";
import AnnounceContents from "components/AnnounceContent";
//admin - course manage
import CourseManagement from "views/Admin/courseManagementFolder/courseManagement";
import SubjectManagement from "views/Admin/courseManagementFolder/subjectManagementFolder/subjectManagement";
import { Provider } from "react-redux"; // Redux Provider 추가
import store from "./store";
import "./assets/css/index.css";
import LoginCheck from "views/Common/LoginCheck";
import LoginCheckAdmin from "views/Admin/LoginCheckAdmin";

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
          <Route path="/Announcement-page" element={<AnnouncementPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          {/* <Route element={<LoginCheckAdmin />}> */}
          <Route
            path="/StudentManagement"
            element={<StudentManagement />}
          ></Route>
          {/* </Route> */}
          <Route element={<LoginCheck />}>
            <Route path="home" element={<Home />} />
          </Route>
          <Route
            path="/AnnouncementList"
            element={<AnnouncementList />}
          ></Route>
          <Route
            path="/studentManagement/register"
            element={<StudentRegister />}
          ></Route>
          <Route
            path="/studentManagement/delete"
            element={<StudentDelete />}
          ></Route>
          <Route
            path="/studentManagement/studentinfo/StudentEdit"
            element={<StudentEdit />}
          ></Route>
          <Route
            path="/studentManagement/studentinfo"
            element={<StudentInfo />}
          ></Route>
          <Route
            path="/teacherManagement"
            element={<TeacherManagement />}
          ></Route>
          <Route
            path="/teacherManagement/register"
            element={<TeacherRegister />}
          ></Route>
          <Route
            path="/teacherManagement/teacherinfo"
            element={<TeacherInfo />}
          ></Route>
          <Route
            path="/teacherManagement/delete"
            element={<TeacherDelete />}
          ></Route>
          <Route
            path="/teacherManagement/teacherinfo/teacherEdit"
            element={<TeacherEdit />}
          ></Route>
          <Route
            path="/courseManagement"
            element={<CourseManagement />}
          ></Route>
          <Route
            path="/courseManagement/subjectManagement"
            element={<SubjectManagement />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
    {/* </PersistGate> */}
  </Provider>
);
