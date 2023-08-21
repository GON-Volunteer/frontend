import AppShell from "./AppShell";
import AppShellAdmin from "../Admin/AppShellAdmin";
import AppShellTeacher from "../Teacher/AppShellTeacher";
import axios from "axios"; // Axios 사용 예시
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import React, { useState, useEffect } from "react";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import ContentCut from "@mui/icons-material/ContentCut";
import ContentCopy from "@mui/icons-material/ContentCopy";
import ContentPaste from "@mui/icons-material/ContentPaste";
import Cloud from "@mui/icons-material/Cloud";

function Course_List({ article1 }) {
  const url = "http://localhost:5000";
  const navigate = useNavigate();
  const [menuList, setMenuList] = useState([]);
  const user = useSelector((state) => state.user);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const token = cookies.token;
  useEffect(() => {
    axios
      .get(url + "/api/courses/list", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        if (response.data && response.status === 200) {
          setMenuList(response.data.list);
        } else {
          console.error("Failed to load menu list.");
        }
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <div>
      {user.account === 1 ? (
        <AppShellTeacher />
      ) : user.account === 0 ? (
        <AppShellAdmin />
      ) : (
        <AppShell />
      )}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Paper sx={{ width: "100%", maxWidth: "100%" }}>
          <MenuList>
            {Object.values(menuList).map((menuItem) => (
              <MenuItem
                component={Link}
                to={`/courses/:${menuItem.course_id}/articles`}
              >
                <ListItemIcon>
                  <MenuBookIcon />
                </ListItemIcon>
                <ListItemText>{menuItem.subject_name}</ListItemText>
                <Typography variant="body2" color="text.secondary">
                  {"⌘Section-" + menuItem.section}
                </Typography>
              </MenuItem>
            ))}
          </MenuList>
        </Paper>
      </div>
    </div>
  );
}
export default Course_List;
