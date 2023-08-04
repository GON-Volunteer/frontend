import React from "react";
import AppShell from "./AppShell";
import AppShellAdmin from "..//Admin/AppShellAdmin";
import { useSelector } from "react-redux";
import AppShellTeacher from "../Teacher/AppShellTeacher";
// css
import "../../assets/css/Announcement.css";
// reactstrap components

// core components
import AnnouncementList from "./AnnouncementList";

function AnnouncementPage() {
  const user = useSelector((state) => state.user);

  return (
    <>
      {user.auth === "teacher" ? (
        <AppShellTeacher />
      ) : user.auth === "admin" ? (
        <AppShellAdmin />
      ) : (
        <AppShell />
      )}
      <AnnouncementList />
      <div className="footer register-footer text-center">
        <h6>
          © {new Date().getFullYear()}, made by{" GON"}
          <i className="fa fa-heart heart" />
        </h6>
      </div>
    </>
  );
}

export default AnnouncementPage;
