import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import axios from "axios";
import { searchAction } from "../../store/userSlice";
import { useLocation, Outlet, Navigate } from "react-router-dom";

function LoginCheck() {
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const token = cookies.token;
  const user = useSelector((state) => state.user);
  const location = useLocation();
  const [renderComponent, setRenderComponent] = useState(null);

  useEffect(() => {
    const checkAuthorization = async () => {
      if (token) {
        try {
          const response = await axios.get(
            "https://f12e3ca1-926d-4342-bd7c-a87451995428.mock.pstmn.io/check",
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );
          console.log(response);
          if (response.data.code === 400 || user.auth !== "admin") {
            dispatch(searchAction.clearUser(user));
            alert("Not authorized");
            setRenderComponent(
              <Navigate to="/login" state={{ from: location }} replace />
            );
          } else if (response.data.code === 200) {
            setRenderComponent(<Outlet />);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        dispatch(searchAction.clearUser(user));
        alert("Not authorized");
        setRenderComponent(
          <Navigate to="/login" state={{ from: location }} replace />
        );
      }
    };

    checkAuthorization();
  }, []);

  return renderComponent;
}

export default LoginCheck;
