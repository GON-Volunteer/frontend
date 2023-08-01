import React from "react";
import AppShell from "./AppShell";
// css
import "../../assets/css/Announcement.css";
// reactstrap components

// core components
import AnnouncementList from "./AnnouncementList";

function AnnouncementPage() {
  return (
    <>
      <AppShell />
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
