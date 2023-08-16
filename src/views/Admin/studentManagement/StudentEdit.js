import { useForm, SubmitHandler } from "react-hook-form";
import { useLocation } from "react-router-dom";

import axios from "axios"; // Axios 사용 예시
// import Radio from "../../components/Radio";
// import RadioGroup from "../../components/RadioGroup";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, { Component, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function StudentEdit() {
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
      console.log("data너ㅁ겨주고" + JSON.stringify(data));
      navigate("/studentManagement/StudentInfo");

      await axios
        .patch(
          `/api/students/${rowData._id.$oid}`,
          // "https://f12e3ca1-926d-4342-bd7c-a87451995428.mock.pstmn.io/DeleteStudent",
          data
        )
        .then((res) => console.log("server res: " + JSON.stringify(res)));
    };
    const handleBackButtonClick = () => {
      navigate("/studentManagement/StudentInfo");
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
                Edit Student Info
              </Typography>
            </Toolbar>
          </AppBar>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control__items" style={formItemStyle}>
            <label htmlFor="s_n">S.N : </label>
            <input
              style={formItemStyle}
              id="s_n"
              type="text"
              placeholder="Serial Number"
              defaultValue={rowData.s_n}
              {...register("s_n", {
                required: "Serial number is required.",

                pattern: {
                  message: "아이디 형식에 맞지 않습니다.",
                },
              })}
            />
          </div>
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
            <label htmlFor="user_phone">Phone No : </label>
            <input
              style={formItemStyle}
              id="user_phone"
              type="text"
              placeholder="Phone Number"
              defaultValue={rowData.phone_num}
              {...register("user_phone", {
                required: "Phone Number is required.",
              })}
            />
          </div>
          <div className="form-control__items" style={formItemStyle}>
            <label htmlFor="father_phone">Father Phone No : </label>
            <input
              style={formItemStyle}
              id="father_phone"
              type="text"
              placeholder="Father Phone Number"
              defaultValue={rowData.father_phone_num}
              {...register("father_phone")}
            />
          </div>
          <div className="form-control__items" style={formItemStyle}>
            <label htmlFor="mother_phone">Mother Phone No : </label>
            <input
              id="mother_phone"
              type="text"
              placeholder="Mother Phone Number"
              defaultValue={rowData.mother_phone_num}
              style={formItemStyle}
              {...register("mother_phone")}
            />
          </div>
          <div className="form-control__items" style={formItemStyle}>
            <label htmlFor="guardians_phone_num">Guardians Phone No : </label>
            <input
              id="guardians_phone_num"
              type="text"
              placeholder="Guardians Phone Number"
              defaultValue={rowData.guardians_phone_num}
              style={formItemStyle}
              {...register("guardians_phone_num")}
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
              {...register("ID", {
                required: "ID is required.",
                pattern: {
                  message: "아이디 형식에 맞지 않습니다.",
                },
              })}
            />
            {errors.id && <small role="alert">{errors.id.message}</small>}
          </div>
          <div className="form-control__items" style={formItemStyle}>
            <label htmlFor="password">PW : </label>
            <input
              id="password"
              type="password"
              placeholder="password"
              style={formItemStyle}
              defaultValue={rowData.pw}
              {...register("password", {
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
            <label htmlFor="password">Re-type PW:</label>
            <input
              style={formItemStyle}
              id="password"
              type="password"
              placeholder="password"
              defaultValue={rowData.pw}
              {...register("passwordConfirm", {
                required: "비밀번호 확인 필수.",
                minLength: {
                  value: 7,
                  message: "7자리 이상 비밀번호를 .",
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
export default StudentEdit;
