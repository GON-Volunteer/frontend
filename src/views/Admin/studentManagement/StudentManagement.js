import AppShellAdmin from "../AppShellAdmin";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";
import * as React from "react";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";

export default function StudentManagement() {
  return (
    <div>
      <AppShellAdmin />
      <div style={{ fontWeight: "bold", fontSize: "30px" }}>
        StudentManagement
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="management-menu-bar">
          <div className="management-menu-items">
            <a href="/studentManagement/register">
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              Add
            </a>

            <a href="/studentManagement/delete">
              {" "}
              <ListItemIcon>
                <DeleteIcon />
              </ListItemIcon>
              Delete
            </a>

            <a href="/studentManagement/StudentInfo">
              {" "}
              <ListItemIcon>
                <EditIcon />
              </ListItemIcon>
              Edit
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
