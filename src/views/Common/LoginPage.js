import React from "react";
import axios from "axios"; // Axios 사용 예시
import { useState } from "react";
// css
import "../../assets/css/Login.css";

// reactstrap components
import { Button, Card, Form, Input, Container, Row, Col } from "reactstrap";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

function LoginPage() {
  const [formData, setFormData] = useState({
    id: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://f12e3ca1-926d-4342-bd7c-a87451995428.mock.pstmn.io",
        formData
      ); // 서버로 로그인 정보 전송
      const token = response.data.token; // 서버에서 발급된 JWT 토큰
      localStorage.setItem("token", token); // 토큰을 로컬 저장소에 저장
      // 로그인 성공 후, 다음 페이지로 이동
      if (response.data.code === "400") {
        alert("아이디 또는 비밀번호가 틀렸습니다.");
        return;
      }
      if (response.data.code === "200") {
        navigate("/home");
      }
    } catch (error) {
      console.log("로그인 실패:", error);
    }
  };

  const navigate = useNavigate();

  const goHome = () => {
    navigate("/home");
  };

  return (
    <>
      <div className="login-page">
        <h3 id="logintitle" className="title mx-auto">
          Creative Learners' Academy
        </h3>
        <div id="bottom">
          <img
            id="logoid"
            width="180px"
            className="centered-img"
            src={require("assets/img/logo.png")}
            alt="logo"
          />
          <Form className="register-form">
            <label id="login-text">ID</label>
            <Input
              name="id"
              placeholder="ID"
              type="text"
              value={formData.id}
              onChange={handleChange}
            />
            <label id="login-text">Password</label>
            <Input
              name="password"
              placeholder="Password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
            <Button
              block
              className="btn-round"
              color="info"
              onClick={handleLogin}
            >
              Login
            </Button>
          </Form>
        </div>
        <div className="footer register-footer text-center">
          <h6>
            © {new Date().getFullYear()}, made with{" "}
            <i className="fa fa-heart heart" /> by GON
          </h6>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
