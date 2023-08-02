import React from "react";
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
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/home");
  };
  const handleLogin=(e)=>{
    e.preventDefault();
    const id = e.target.elements["id"].value; 
    const password = e.target.elements["password"].value; 

  }
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
            <Input placeholder="ID" type="text" />
            <label id="login-text">Password</label>
            <Input placeholder="Password" type="password" />
            <Button block className="btn-round" color="info" onClick={goHome}>
              Login
            </Button>
          </Form>
        </div>

      </div>
      <div className="footer register-footer text-center">
        <h6>
          © {new Date().getFullYear()}, made with{" "}
          <i className="fa fa-heart heart" /> by GON
        </h6>
      </div>
    </>
  );
}

export default LoginPage;
