import React from "react";

// css
import "../../assets/css/Login.css";

// reactstrap components
import { Button, Card, Form, Input, Container, Row, Col } from "reactstrap";
// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";

import Home from "./Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
function LoginPage() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/home");
  };
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("register-page");
    return function cleanup() {
      document.body.classList.remove("register-page");
    };
  });

  return (
    <>
      <div className="login-page">
        <h3 id="logintitle" className="title mx-auto">
          Creative Learners' Academy
        </h3>
        <img
          id="logoid"
          width="180px"
          className="centered-img"
          src={require("assets/img/logo.png")}
          alt="logo"
        />
        <Form className="register-form">
          <label id="login-text">ID</label>
          <Input placeholder="ID" type="text" />
          <label id="login-text">Password</label>
          <Input placeholder="Password" type="password" />
          <Button block className="btn-round" color="info" onClick={goHome}>
            Login
          </Button>
        </Form>
        <Routes>
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </>
  );
}

export default LoginPage;
