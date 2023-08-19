import React, { Component, useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios"; // Axios 사용 예시

import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, UncontrolledAlert } from "reactstrap";

import { useNavigate } from "react-router-dom";
function TeacherRegister() {
  const formItemStyle = {
    margin: "5px",
  };

  const {
    register, //input 요소를 react hook form과 연결해서 검증 규칙 적용 메소드
    handleSubmit, // form을 submit 할때 실행 함수
    getValues, //input 값을 가져올 수 있는 함수
    reset,
    formState: { errors }, //form state에 관한 정보를 담고 있는 객체
  } = useForm({ mode: "onSubmit" });

  //server에 form data 전송 코드 작성하기
  // const onSubmit = (data) => console.log(data);
  const [value, setValue] = useState("");
  const [resultClass, setResultClass] = useState([]);
  const navigate = useNavigate();
  const [errpopupVisible, setErrPopupVisible] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const handleBackButtonClick = () => {
    navigate("/TeacherManagement");
  };

  const onSubmit = async (data) => {
    data["account"] = 1;
    try {
      console.log(data);
      const response = await axios.post("/api/teachers/", data);
      console.log("teacher add 서버 응답:");
      console.log(response.data);
      if (response.data.code === "200") {
        // 성공적으로 추가된 경우
        setPopupVisible(true);
        setTimeout(() => {
          setPopupVisible(false);
        }, 3000);
      } else if (response.data.code == "400") {
        // 실패한 경우 처리
        setErrPopupVisible(true);
        setTimeout(() => {
          setErrPopupVisible(false);
        }, 3000);
      } else {
        console.log("어케할까");
      }
      reset();
      // 서버의 응답 데이터를 확인하거나 다른 작업을 수행하시면 됩니다.
    } catch (error) {
      console.error("Error sending data to server:", error);
    }
  }; //빈배열을 넘겨주면 컴포넌트가 마운트 되었을 때 한번만 실행됩니다.

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <div>
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="back"
              onClick={handleBackButtonClick}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Add Teacher
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
      <UncontrolledAlert color="info" isOpen={errpopupVisible}>
        <b>Failed!</b> ID is already exists.
        <utton className="close" onClick={() => setErrPopupVisible(false)}>
          <span aria-hidden="true">&times;</span>
        </utton>
      </UncontrolledAlert>
      <UncontrolledAlert color="info" isOpen={popupVisible}>
        <b>Success!</b> Student info edited successfully!
        <button className="close" onClick={() => setPopupVisible(false)}>
          <span aria-hidden="true">&times;</span>
        </button>
      </UncontrolledAlert>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control__items" style={formItemStyle}>
          <label htmlFor="full_name">Full Name : </label>
          <input
            style={formItemStyle}
            id="full_name"
            type="text"
            placeholder="Full Name"
            {...register("full_name", {
              required: "Full Name is required.",
            })}
          />
        </div>
        <div className="form-control__items" style={formItemStyle}>
          <label htmlFor="phone_num">Phone No : </label>
          <input
            style={formItemStyle}
            id="phone_num"
            type="text"
            placeholder="Phone Number"
            {...register("phone_num", {
              required: "Phone Number is required.",
            })}
          />
        </div>

        <div className="form-control__items" style={formItemStyle}>
          <label htmlFor="id">ID : </label>
          <input
            id="id"
            type="text"
            placeholder="ID"
            style={formItemStyle}
            // input의 기본 config를 작성
            {...register("id", {
              required: "ID is required.",
              pattern: {
                message: "아이디 형식에 맞지 않습니다.",
              },
            })}
          />
          {errors.id && <small role="alert">{errors.id.message}</small>}
        </div>
        <div className="form-control__items" style={formItemStyle}>
          <label htmlFor="pw">PW : </label>
          <input
            id="pw"
            type="password"
            placeholder="password"
            style={formItemStyle}
            {...register("pw", {
              required: "Password is required.",
              minLength: {
                value: 7,
                message: "7자리 이상 비밀번호를 입력하세요.",
              },
            })}
          />
          {/* {errors.password && (
            <small role="alert">{errors.password.message}</small>
          )} */}
        </div>
        <div className="form-control__items" style={formItemStyle}>
          <label htmlFor="passwordConfirm">Re-type PW:</label>
          <input
            style={formItemStyle}
            id="passwordConfirm"
            type="password"
            placeholder="password"
            {...register("passwordConfirm", {
              required: "비밀번호 확인 필수.",
              minLength: {
                value: 7,
                message: "7자리 이상 비밀번호를 사용하세요.",
              },
              validate: {
                check: (val) => {
                  if (getValues("pw") !== val) {
                    return "비밀번호가 일치하지 않습니다.";
                  }
                },
              },
            })}
          />
          {errors.passwordConfirm && (
            <small role="alert">{errors.passwordConfirm.message}</small>
          )}
        </div>
        <Button type="submit">create</Button>
        {/* <RadioGroup label="연락 방법" value={value} onChange={setValue}>
          {resultClass.map((item, idx) => {
            <Radio key={idx} value={item}>
              {item}
            </Radio>;
          })}
        </RadioGroup> */}
      </form>
    </div>
  );
}

export default TeacherRegister;
//아이디 5~8
//비밀번호 5~12
