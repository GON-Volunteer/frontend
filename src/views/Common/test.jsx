import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import axios from "axios";
import { searchAction } from "../store/userSlice";
import { useLocation, Outlet, useNavigate } from "react-router-dom";

function test() {
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const token = cookies.token;
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    // 비동기 함수를 이용하여 axios 호출을 처리합니다.
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
          // HTTP 상태 코드를 정확하게 참조합니다.
          if (response.data.code === 400) {
            dispatch(searchAction.clearUser(user));
            alert("Not authorized");
            navigate("/login");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        dispatch(searchAction.clearUser(user));
        alert("Not authorized");
        navigate("/login");
      }
    };

    // 권한 확인 함수를 호출합니다.
    checkAuthorization();
  }, []); // 종속성 배열 수정

  return null;
}

export default test;
