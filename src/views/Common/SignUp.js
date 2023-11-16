import React, { useState, useEffect, useRef, Component } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, UncontrolledAlert } from "reactstrap";
//css
import "../../assets/css/SignUp.css";



function SignUp (){
    const url = "http://localhost:5000";
    
    const formItemStyle = {
        margin: "5px",
      };
      const redBorderStyle = {
        margin: "10px",
        border: "2px solid orange",
      };
    
      const {
        register, //input 요소를 react hook form과 연결해서 검증 규칙 적용 메소드
        handleSubmit, // form을 submit 할때 실행 함수
        reset,
        getValues, //input 값을 가져올 수 있는 함수
        formState: { errors }, //form state에 관한 정보를 담고 있는 객체
      } = useForm({ mode: "onSubmit" });
    
      //server에 form data 전송 코드 작성하기
      // const onSubmit = (data) => console.log(data);
      const [loading, setLoading] = useState(false);
      const navigate = useNavigate();
      const [errpopupVisible, setErrPopupVisible] = useState(false);
      const [popupVisible, setPopupVisible] = useState(false);
    //   const handleBackButtonClick = () => {
    //     navigate("/studentManagement");
    //   };
    const handleBackButtonClick = () => {
      navigate("/login");
    };
    const LoginFunc = () => { //회원가입
      navigate("/Login");
    };
      const [isIdError, setIsIdError] = useState(false);
      const [isSNError, setIsSNError] = useState(false);
      const onSubmit = async (data) => {
        if (loading) return;
        setLoading(true);
        try {
          const response=null; //edit
          data["account"] = 2;
          console.log(data);

          if(selectedOption === 'studentForm'){
            response = await axios.post(
              `${process.env.REACT_APP_BASE_URL}/api/students/`,
              // "https://4ece099f-93aa-44bb-a61a-5b0fa04f47ac.mock.pstmn.io/AddStudent",
              data
            );
          }else{
            response = await axios.post(
              `${process.env.REACT_APP_BASE_URL}/api/teachers/`,
              data
            );
          }
    
          console.log("서버 응답:");
          console.log(response.data.code);
          if (response.data.code === "200") {
            // 성공적으로 추가된 경우
    
            setPopupVisible(true); //here
            setTimeout(() => {
              setPopupVisible(false);
            }, 3000);
            setIsIdError(false);
            setIsSNError(false);
            reset();
            setLoading(false);
            LoginFunc();
          } else if (response.data.code == "408") {
            // 실패한 경우 처리
            setErrPopupVisible(true);
            setTimeout(() => {
              setErrPopupVisible(false);
            }, 4000);
            setIsIdError(true); // ID 에러 상태 설정
            setLoading(false);
          } else if (response.data.code == "409") {
            setErrPopupVisible(true);
            setTimeout(() => {
              setErrPopupVisible(false);
            }, 4000);
            setIsSNError(true);
            setLoading(false);
          } else if (response.data.code == "410") {
            setErrPopupVisible(true);
            setTimeout(() => {
              setErrPopupVisible(false);
            }, 4000);
            setIsSNError(true);
            setIsIdError(true);
            setLoading(false);
          } else {
            console.log("어케할까");
            setLoading(false);
          }
        } catch (error) {
          console.error("Error sending data to server:", error);
          setLoading(false);
          // 요청이 실패했을 경우, 예외 처리를 하거나 에러 메시지를 표시하도록 처리합니다.
        }
      };
      const [selectedOption, setSelectedOption] = useState('studentForm');

      const handleRadioChange = (event) => {
        setSelectedOption(event.target.value);
      };
    return (
      
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
                <Typography
                  style={{
                    fontWeight: "bold",
                    fontFamily: "Copperplate, sans-serif",
                    fontSize: "17px",
                  }}
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1 }}
                >
                  Add Account
                </Typography>
              </Toolbar>
            </AppBar>
            
          </div>
          
          <div className="checkAccount">
          <input type="radio" name="account" value="studentForm" checked={selectedOption === 'studentForm'} onChange={handleRadioChange}/>
              <span class="up">Student</span>
              &nbsp;&nbsp;
          <input type="radio" name="account" value="teacherForm" checked={selectedOption === 'teacherForm'} onChange={handleRadioChange}/>
              <span class="up">Teacher</span>
          </div>
{/* ---------------------------------------------student-------------------------------------------------- */}
      {selectedOption === 'studentForm' && (
        <div className="Student">
         
          <div className="popup-container">
            <UncontrolledAlert color="danger" isOpen={errpopupVisible}>
              <b>Failed!</b> SerialNum or ID is already exists. X
              <button className="close" onClick={() => setErrPopupVisible(false)}>
                <span aria-hidden="true">&times;</span>
              </button>
            </UncontrolledAlert>
            <UncontrolledAlert color="info" isOpen={popupVisible}>
              <b>Success!</b> Student info edited successfully! X
              <button className="close" onClick={() => setPopupVisible(false)}>
                <span aria-hidden="true">&times;</span>
              </button>
            </UncontrolledAlert>
          </div>
    
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control__items" style={formItemStyle}>
              <label htmlFor="s_n">S.N : </label>
              <input
                id="s_n"
                type="text"
                placeholder="Serial_Number"
                style={isSNError ? redBorderStyle : formItemStyle}
                {...register("s_n", {
                  required: "Serial number is required.",
                })}
                onChange={() => {
                  if (isSNError) {
                    setIsSNError(false); // Clear the error state when the input value changes
                  }
                }}
                pattern="[0-9]*"
                title="Please enter only numbers."
              />
            </div>
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
              <label htmlFor="father_phone_num">Father Phone No : </label>
              <input
                style={formItemStyle}
                id="father_phone_num"
                type="text"
                placeholder="Father Phone Number"
                {...register("father_phone_num")}
              />
            </div>
            <div className="form-control__items" style={formItemStyle}>
              <label htmlFor="mother_phone_num">Mother Phone No : </label>
              <input
                id="mother_phone_num"
                type="text"
                placeholder="Mother Phone Number"
                style={formItemStyle}
                {...register("mother_phone_num")}
              />
            </div>
            <div className="form-control__items" style={formItemStyle}>
              <label htmlFor="guardians_phone_num">Guardians Phone No : </label>
              <input
                id="guardians_phone_num"
                type="text"
                placeholder="guardians Phone Number"
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
                style={isIdError ? redBorderStyle : formItemStyle}
                // input의 기본 config를 작성
                {...register("id", {
                  required: "ID is required.",
                  pattern: {
                    message: "It doesn't fit the ID format.",
                  },
                })}
                onChange={() => {
                  if (isIdError) {
                    setIsIdError(false); // Clear the error state when the input value changes
                  }
                }}
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
                    message: "Enter at least 7 digits.",
                  },
                })}
              />
            </div>
            <div className="form-control__items" style={formItemStyle}>
              <label htmlFor="passwordConfirm">Re-type PW:</label>
              <input
                style={formItemStyle}
                id="pw"
                type="password"
                placeholder="password"
                {...register("passwordConfirm", {
                  required: "Fill in the blanks.",
                  minLength: {
                    value: 7,
                    message: "Enter at least 7 digits.",
                  },
                  validate: {
                    check: (val) => {
                      if (getValues("pw") !== val) {
                        return "Password do not match.";
                      }
                    },
                  },
                })}
              />
              {errors.passwordConfirm && (
                <small role="alert">{errors.passwordConfirm.message}</small>
              )}
            </div>
            <Button id="add_btn" type="submit">
              create
            </Button>
          </form>
        </div>
      )}
{/* ---------------------------------------------teacher-------------------------------------------------- */}
    
{selectedOption === 'teacherForm' && (
    <div className = "teacher">
      {/* <div>
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
            <Typography
              style={{
                fontWeight: "bold",
                fontFamily: "Copperplate, sans-serif",
                fontSize: "17px",
              }}
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Add Teacher
            </Typography>
          </Toolbar>
        </AppBar>
      </div> */}
      <div className="popup-container">
        <UncontrolledAlert
          color="danger"
          onClick={() => setErrPopupVisible(false)}
          isOpen={errpopupVisible}
        >
          <b>Failed!</b> ID is already exists. X
        </UncontrolledAlert>

        <UncontrolledAlert
          onClick={() => setPopupVisible(false)}
          color="info"
          isOpen={popupVisible}
        >
          <b>Success!</b> Teacher registered successfully! X
        </UncontrolledAlert>
      </div>
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
            style={isIdError ? redBorderStyle : formItemStyle}
            // input의 기본 config를 작성
            {...register("id", {
              required: "ID is required.",
              pattern: {
                message: "It doesn't fit the ID format.",
              },
            })}
            onChange={() => {
              if (isIdError) {
                setIsIdError(false); // Clear the error state when the input value changes
              }
            }}
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
                message: "Enter at least 7 digits.",
              },
            })}
          />
        </div>
        <div className="form-control__items" style={formItemStyle}>
          <label htmlFor="passwordConfirm">Re-type PW:</label>
          <input
            style={formItemStyle}
            id="passwordConfirm"
            type="password"
            placeholder="password"
            {...register("passwordConfirm", {
              required: "Fill in the blanks.",
              minLength: {
                value: 7,
                message: "Enter at least 7 digits.",
              },
              validate: {
                check:(val) => {
                  if (getValues("pw") !== val) {
                    return "Password do not match.";
                  }
                },
              },
            })}
            // {…register("passwordConfirm", {
            //   required: "Fill in the blanks.",
            //   minLength: {
            //     value: 7,
            //     message: "Enter at least 7 digits.",
            //   },
            //   validate: {
            //     check:(val) => {
            //       if (getValues("pw") !== val) {
            //         return "Password do not match.";
            //       }
            //     },
            //   },
            // })}
          />
          {errors.passwordConfirm && (
            <small role="alert">{errors.passwordConfirm.message}</small>
          )}
        </div>
        <Button id="add_btn" type="submit">
          create
        </Button>
      </form>
    </div>   
    )}
    </div>
    ); 
    }
  export default SignUp;


//라디오버튼


