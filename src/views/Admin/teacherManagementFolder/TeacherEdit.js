import { useForm, SubmitHandler } from "react-hook-form";
import { useLocation } from "react-router-dom";

import axios from "axios"; // Axios 사용 예시

import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, { Component, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function TeacherEdit() {
  const location = useLocation();
  const rowData = location.state
    ? location.state.rowData
    : console.log("rowData null");
  const {
    register, //input 요소를 react hook form과 연결해서 검증 규칙 적용 메소드
    handleSubmit, // form을 submit 할때 실행 함수
    getValues, //input 값을 가져올 수 있는 함수
    formState: { errors }, //form state에 관한 정보를 담고 있는 객체
  } = useForm({ mode: "onSubmit" });

  //server에 form data 전송 코드 작성하기
  const [value, setValue] = useState("");
  const [resultClass, setResultClass] = useState([]);
  const navigate = useNavigate();
  if (!rowData) {
    return <div>data loading error </div>;
  } else {
    const formItemStyle = {
      margin: "5px",
    };

    const onSubmit = async (data) => {
      // console.log("data너ㅁ겨주고" + JSON.stringify(data));
      //   navigate("/teacherManagement/TeacherInfo");
      await axios

        .patch(`/api/teachers/${rowData._id}`, data)
        .then((res) => console.log("teacher edit이후 server res: " + res));
    };
    const handleBackButtonClick = () => {
      navigate("/teacherManagement/teacherinfo");
    };

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
                Edit Teacher Info
              </Typography>
            </Toolbar>
          </AppBar>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control__items" style={formItemStyle}>
            <label htmlFor="full_name">Full Name : </label>
            <input
              style={formItemStyle}
              id="full_name"
              type="text"
              placeholder="Full Name"
              defaultValue={rowData.full_name}
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
              defaultValue={rowData.phone_num}
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
              defaultValue={rowData.id}
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
              defaultValue={rowData.pw}
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
              defaultValue={rowData.pw}
              {...register("passwordConfirm", {
                required: "비밀번호 확인 필수.",
                minLength: {
                  value: 7,
                  message: "7자리 이상 비밀번호를 사용하세요.",
                },
                validate: {
                  check: (val) => {
                    if (getValues("password") !== val) {
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
          <button type="submit">Edit</button>
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
}
export default TeacherEdit;
