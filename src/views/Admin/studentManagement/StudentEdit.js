import { useForm, SubmitHandler } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { FormGroup, Label, Input, Button, UncontrolledAlert } from "reactstrap";

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
    register, //Input 요소를 react hook form과 연결해서 검증 규칙 적용 메소드
    handleSubmit, // form을 submit 할때 실행 함수
    getValues, //Input 값을 가져올 수 있는 함수
    reset,
    formState: { errors }, //form state에 관한 정보를 담고 있는 객체
  } = useForm({ mode: "onSubmit" });
  const [errpopupVisible, setErrPopupVisible] = useState(false);

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
      // navigate("/studentManagement/StudentInfo");
      console.log(`/api/students/${rowData._id.$oid}`);
      await axios
        .patch(
          `/api/students/${rowData._id.$oid}`,
          // "https://f12e3ca1-926d-4342-bd7c-a87451995428.mock.pstmn.io/DeleteStudent",
          data
        )
        .then((response) => {
          console.log("server res: " + JSON.stringify(response));
          if (response.data.code == "200") {
            // 성공적으로 추가된 경우
            navigate("/studentManagement/StudentInfo");
            //setPopupVisible(true);
          } else if (response.data.code == "400") {
            // 실패한 경우 처리
            setErrPopupVisible(true);
            setTimeout(() => {
              setErrPopupVisible(false);
            }, 3000);
          } else {
            console.log("어케할까");
          }
        })
        .catch((err) => {
          console.log("student info edit error:" + err);
        });
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
        <UncontrolledAlert color="info" isOpen={errpopupVisible}>
          <b>Failed!</b> SerialNum or ID is already exists.
          <button className="close" onClick={() => setErrPopupVisible(false)}>
            <span aria-hidden="true">&times;</span>
          </button>
        </UncontrolledAlert>

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
                  message: "It does not fit the SN format.",
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
            <label htmlFor="father_phone_num">Father Phone No : </label>
            <input
              style={formItemStyle}
              id="father_phone_num"
              type="text"
              placeholder="Father Phone Number"
              defaultValue={rowData.father_phone_num}
              {...register("father_phone_num")}
            />
          </div>
          <div className="form-control__items" style={formItemStyle}>
            <label htmlFor="mother_phone_num">Mother Phone No : </label>
            <input
              id="mother_phone_num"
              type="text"
              placeholder="Mother Phone Number"
              defaultValue={rowData.mother_phone_num}
              style={formItemStyle}
              {...register("mother_phone_num")}
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
              {...register("id", {
                required: "ID is required.",
                pattern: {
                  message: "It does not fit the ID format.",
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
                  message: "Please enter a password of at least 7 digits.",
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
                required: "Password confirmation required.",
                minLength: {
                  value: 7,
                  message: "Please enter a password of at least 7 digits.",
                },
                validate: {
                  check: (val) => {
                    if (getValues("pw") !== val) {
                      return "Passwords do not match.";
                    }
                  },
                },
              })}
            />
            {errors.passwordConfirm && (
              <small role="alert">{errors.passwordConfirm.message}</small>
            )}
          </div>
          <Button type="submit">Edit</Button>
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
