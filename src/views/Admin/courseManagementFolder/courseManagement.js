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
      <div style={{ fontWeight: "bold", fontSize: "30px" }}>
        CourseManagement
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Paper sx={{ width: "100%", maxWidth: "100%" }}>
          <MenuList>
            <MenuItem component={Link} to="/courseManagement/subjectManagement">
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText>Add</ListItemText>
              <Typography variant="body2" color="text.secondary">
                ⌘Admin
              </Typography>
            </MenuItem>
            <MenuItem component={Link} to="/courseDelete">
              <ListItemIcon>
                <DeleteIcon />
              </ListItemIcon>
              <ListItemText>Delete</ListItemText>
              <Typography variant="body2" color="text.secondary">
                ⌘Admin
              </Typography>
            </MenuItem>
          </MenuList>
        </Paper>
      </div>
    </div>
  );
}
