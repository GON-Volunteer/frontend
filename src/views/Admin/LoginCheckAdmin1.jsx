import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import axios from "axios";
import { searchAction } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
function LoginCheckAdmin() {
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const token = cookies.token;
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      try {
        const response = axios.get(
          "https://f12e3ca1-926d-4342-bd7c-a87451995428.mock.pstmn.io/check",
          {
            headers: {
              Authorization: "Bearer " + token, // 토큰을 포함한 Authorization 헤더
            },
          }
        );
        if (response === 400 && auth != "admin") {
          dispatch(searchAction.clearUser(user));
          return alert("Not authorized"), navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      dispatch(searchAction.clearUser(user));
      return alert("Not authorized"), navigate("/login");
    }
  }, []);

  return <></>;
}
export default LoginCheckAdmin;
