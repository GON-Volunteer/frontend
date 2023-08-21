import React, { useEffect, useMemo, useState } from "react";
import { useTable, usePagination } from "react-table";
import { FormGroup, Label, Input, Button, UncontrolledAlert } from "reactstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios"; // Axios 사용 예시
import { useSelector } from "react-redux";
import AppShellAdmin from "../Admin/AppShellAdmin";
import "../../assets/css/ChangePassword.css";
function ChangePassword() {
  const {
    register, //input 요소를 react hook form과 연결해서 검증 규칙 적용 메소드
    handleSubmit, // form을 submit 할때 실행 함수
    getValues, //input 값을 가져올 수 있는 함수
    reset,
    formState: { errors }, //form state에 관한 정보를 담고 있는 객체
  } = useForm({ mode: "onSubmit" });
  const formItemStyle = {
    margin: "5px",
  };
  const [errpopupVisible, setErrPopupVisible] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const _id = useSelector((state) => state.user._id);
  const onSubmit = async (data) => {
    const requestData = {
      current_password: data.current_password,
      new_password: data.new_password,
    };
    console.log(JSON.stringify(requestData));
    try {
      console.log("request data:" + JSON.stringify(requestData));
      console.log(`/api/password/${_id}`);

      const response = await axios.patch(`/api/password/${_id}`, requestData);

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
  };
  return (
    <div>
      <div>
        <AppShellAdmin />
      </div>
      <h4 id="subListTitle">Change Password</h4>
      <UncontrolledAlert color="info" isOpen={errpopupVisible}>
        <b>Failed! Current password does not match </b>
        <utton className="close" onClick={() => setErrPopupVisible(false)}>
          <span aria-hidden="true">&times;</span>
        </utton>
      </UncontrolledAlert>
      <UncontrolledAlert color="info" isOpen={popupVisible}>
        <b>Success!</b>
        <button className="close" onClick={() => setPopupVisible(false)}>
          <span aria-hidden="true">&times;</span>
        </button>
      </UncontrolledAlert>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control__items" style={formItemStyle}>
          <label htmlFor="current_password">Current Password : </label>
          <input
            style={formItemStyle}
            id="current_password"
            type="password"
            placeholder="current_password"
            {...register("current_password", {
              required: "Put in your current password.",
            })}
          />
        </div>
        <div className="form-control__items" style={formItemStyle}>
          <label htmlFor="new_password">New PW : </label>
          <input
            id="new_password"
            type="password"
            placeholder="new_password"
            style={formItemStyle}
            {...register("new_password", {
              required: "Put in your new password.",
              minLength: {
                value: 7,
                message: "7자리 이상 비밀번호를 입력하세요.",
              },
            })}
          />
          {/* {errors.password && (
            <s small role="alert">{errors.password.message}</s>
          )} */}
        </div>
        <div className="form-control__items" style={formItemStyle}>
          <label htmlFor="passwordConfirm">Re-type New PW:</label>
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
                  if (!val) {
                    return "비밀번호 확인 필수.";
                  }
                  if (val !== getValues("new_password")) {
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
      </form>
      <Button type="submit" onClick={handleSubmit(onSubmit)}>
        change password
      </Button>
    </div>
  );
}
export default ChangePassword;
