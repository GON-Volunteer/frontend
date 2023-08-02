import AppShellAdmin from "./AppShellAdmin";

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
import ContentCut from "@mui/icons-material/ContentCut";
import ContentCopy from "@mui/icons-material/ContentCopy";
import ContentPaste from "@mui/icons-material/ContentPaste";
import Cloud from "@mui/icons-material/Cloud";

export default function StudentManagement() {
  return (
    <div>
      <AppShellAdmin />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Paper sx={{ width: "100%", maxWidth: "100%" }}>
          <MenuList>
            <MenuItem component={Link} to="/add">
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText>Add</ListItemText>
              <Typography variant="body2" color="text.secondary">
                ⌘Admin
              </Typography>
            </MenuItem>
            <MenuItem component={Link} to="/add">
              <ListItemIcon>
                <DeleteIcon />
              </ListItemIcon>
              <ListItemText>Delete</ListItemText>
              <Typography variant="body2" color="text.secondary">
                ⌘Admin
              </Typography>
            </MenuItem>
            <MenuItem component={Link} to="/add">
              <ListItemIcon>
                <EditIcon />
              </ListItemIcon>
              <ListItemText>Edit</ListItemText>
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
