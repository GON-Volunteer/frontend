import React from "react";
import AppShell from "./AppShell";
import AppShellAdmin from "..//Admin/AppShellAdmin";
import { useSelector } from "react-redux";
import AppShellTeacher from "../Teacher/AppShellTeacher";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
// css
import "../../assets/css/Announcement.css";
// reactstrap components

// core components
import AnnouncementList from "./AnnouncementList";

function AnnouncementPage() {
  const user = useSelector((state) => state.user);
  const goArticleCreate = (e) => {
    e.preventDefault();
    navigate("/ArticleCreate");
  };
  const navigate = useNavigate();
  return (
    <>
      {user.account === 1 ? (
        <AppShellTeacher />
      ) : user.account === 0 ? (
        <AppShellAdmin />
      ) : (
        <AppShell />
      )}
      <div>
        <AnnouncementList />
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        {user.account === 0 && (
          <Button color="info" onClick={goArticleCreate}>
            Create
          </Button>
        )}
      </div>

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
