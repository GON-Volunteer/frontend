import AppShellAdmin from "../AppShellAdmin";

import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";
import ListItemIcon from "@mui/material/ListItemIcon";

import * as React from "react";
import "../../../assets/css/MenuBar.css";
export default function TeacherManagement() {
  return (
    <div>
      <AppShellAdmin />
      <div style={{ fontWeight: "bold", fontSize: "30px" }}>
        TeacherManagement
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="management-menu-bar">
          <div className="management-menu-items">
            <a href="/teacherManagement/register">
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              Add
            </a>

            <a href="/teacherManagement/delete">
              {" "}
              <ListItemIcon>
                <DeleteIcon />
              </ListItemIcon>
              Delete
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
