import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
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
import { searchAction } from "../../store/userSlice";

function LoginPage() {
  const url = "http://localhost:5000";
  const formRef = useRef();
  const [cookies, setCookie] = useCookies(["id"]);
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/home");
  };
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  let user = useSelector((state) => {
    return state.user;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (msg) {
      setTimeout(() => {
        setMsg("");
        setLoading(false);
      }, 1500);
    }
  }, [msg]);

  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   const id = e.target.elements["id"].value;
  //   const password = e.target.elements["password"].value;
  // };
  const LoginFunc = (e) => {
    e.preventDefault();
    if (!id) {
      return alert("Put in your ID");
    } else if (!password) {
      return alert("Put in your Password");
    } else {
      let body = {
        id,
        password,
      };

      axios.post(url + "/api/login", body).then((res) => {
        if (res.data.code == 200) {
          console.log(res.data);
          console.log("로그인");
          goHome();
          setCookie("token", res.data.token); //cookie에 토큰저장
          dispatch(searchAction.loginUser(res.data));
        } else if (res.data.code === 401) {
          setMsg("존재하지 않는 ID입니다.");
        } else if (res.data.code === 402) {
          setMsg("Password가 틀립니다.");
        } else {
          alert("계정정보가 틀렸습니다");
          console.log(res.data);
          setMsg("ID, Password가 비어있습니다.");
        }
      });
    }
    setLoading(true);
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
              placeholder="ID"
              type="text"
              onChange={(e) => setId(e.target.value)}
            />
            <label id="login-text">Password</label>
            <Input
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              block
              className="btn-round"
              color="info"
              disabled={loading}
              onClick={LoginFunc}
            >
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
