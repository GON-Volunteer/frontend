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

export default function courseManagement() {
  return (
    <div>
      <AppShellAdmin />
      <div
        style={{
          fontWeight: "bold",
          fontFamily: "Copperplate, sans-serif",
          fontSize: "21px",
        }}
      >
        &nbsp;Course Management
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="management-menu-bar">
          <div className="management-menu-items">
            <a
              style={{
                fontFamily: "Copperplate, sans-serif",
              }}
              href="/courseManagement/subjectManagement"
            >
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              Add
            </a>

            <a
              style={{
                fontFamily: "Copperplate, sans-serif",
              }}
              href="/courseDelete"
            >
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
