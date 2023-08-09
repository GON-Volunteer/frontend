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
      console.log("response come in uuu");
      if (true) {
        console.log("response come in uuu?");
        axios
          .get(
            "https://4ece099f-93aa-44bb-a61a-5b0fa04f47ac.mock.pstmn.io/check",
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          )
          .then((response) => {
            console.log("response come in uuu");
            console.log(response);
            if (response.data.code === 400) {
              dispatch(searchAction.clearUser(user));
              alert("Not authorized");
              setRenderComponent(
                <Navigate to="/login" state={{ from: location }} replace />
              );
            } else if (response.data.code === 200) {
              setRenderComponent(<Outlet />);
            }
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
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
