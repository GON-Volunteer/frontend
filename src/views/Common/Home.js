import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import "../../assets/css/Modal.module.css";
import { Button } from "reactstrap";

import AppShell from "./AppShell";
import AppShellAdmin from "../Admin/AppShellAdmin";
import AppShellTeacher from "../Teacher/AppShellTeacher";
import AnnouncementList from "./AnnouncementList.js";
import MiniAnnouncement from "./MiniAnnounceList";
import TimePickerModal from "../../components/TimePickerModal";
import { convertDateFormat, convertTimeFormat } from "../../utils/DateUtils";
import dayjs from "dayjs";

import styles from "../../assets/css/Modal.module.css";
import { DatePicker } from "@mui/x-date-pickers";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import TextField from "@mui/material/TextField";
import Textarea from "@mui/joy/Textarea";

import { MultiInputTimeRangeField } from "@mui/x-date-pickers-pro";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
const Home = () => {
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
  const access_token = process.env.REACT_APP_GOOGLE_ACCESS_TOKEN;
  const navigate = useNavigate();
  const [dateValue, setDateValue] = useState();
  const [startTimeValue, setStartTimeValue] = useState();
  const [endTimeValue, setEndTimeValue] = useState();
  const [titleValue, setTitleValue] = useState("");
  const [contentsValue, setContentsValue] = useState("");

  const handleTitleChange = (event) => {
    setTitleValue(event.target.value);
  };

  const handleContentsChange = (event) => {
    setContentsValue(event.target.value);
  };

  const goAnnouncecList = (e) => {
    e.preventDefault();
    navigate("/Announcement-Page");
  };
  const [modalOpen, setModalOpen] = useState(false);

  const user = useSelector((state) => state.user);
  const apiUrl =
    "https://www.googleapis.com/calendar/v3/calendars/gofn2023@gmail.com/events";
  const handleAddEvent = async () => {
    try {
      // Google Calendar API에 요청 보내기
      const response = await axios.post(
        apiUrl,
        {
          summary: "Sample Event",
          description: "A sample event added using axios",
          start: {
            dateTime: "2023-12-03T12:00:00",
            timeZone: "Asia/Seoul",
          },
          end: {
            dateTime: "2023-12-03T12:00:00", // 종료 일시
            timeZone: "Asia/Seoul", // 사용자의 시간대로 변경
          },
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`, // 여기에 Google Calendar API에 대한 액세스 토큰을 넣어야 합니다.
          },
        }
      );

      // 성공적으로 이벤트가 추가되었을 때의 처리
      console.log("Event added successfully:", response.data);
    } catch (error) {
      // 오류 처리
      console.error("Error adding event:", error.response.data);
    }
  };

  const goGoogleCalendar = () => {
    // 구글 캘린더 링크로 이동하는 URL
    const googleCalendarLink = "https://calendar.google.com";

    // 새 창에서 구글 캘린더 링크 열기
    window.open(googleCalendarLink, "_blank");
  };
  const registerEvent = async () => {
    const startDate =
      convertDateFormat(dateValue) + convertTimeFormat(startTimeValue);
    const endDate =
      convertDateFormat(dateValue) + convertTimeFormat(endTimeValue);
    console.log("startDate" + startDate);
    console.log("endDate" + endDate);

    try {
      // Google Calendar API에 요청 보내기
      const response = await axios.post(
        apiUrl,
        {
          summary: titleValue,
          description: contentsValue,
          start: {
            dateTime: startDate,
            timeZone: "Asia/Seoul",
          },
          end: {
            dateTime: endDate, // 종료 일시
            timeZone: "Asia/Seoul", // 사용자의 시간대로 변경
          },
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`, // 여기에 Google Calendar API에 대한 액세스 토큰을 넣어야 합니다.
          },
        }
      );

      // 성공적으로 이벤트가 추가되었을 때의 처리
      console.log("Event added successfully:", response.data);
    } catch (error) {
      // 오류 처리
      console.error("Error adding event:", error.response.data);
    }
  };
  const ModalComponent = React.memo(() => {
    const handleTitleChange = (event) => {
      setTitleValue(event.target.value);
    };

    const handleContentsChange = (event) => {
      setContentsValue(event.target.value);
    };
    return (
      <div className={styles.modal_container}>
        <div
          className={styles.modal_content}
          // ref={modalBackground}
          // onClick={(e) => {
          //   if (e.target === modalBackground.current) {
          //     setModalOpen(false);
          //   }
          // }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoItem label="Date">
              <DatePicker
                value={dateValue}
                onChange={(newValue) => {
                  setDateValue(newValue);

                  // console.log(convertDateFormat(newValue));
                }}
              />
            </DemoItem>
            <DemoItem label="Start Time">
              <TimeField
                defaultValue={dayjs(
                  `${convertDateFormat(dateValue)}` + "T00:00"
                )}
                value={startTimeValue}
                onChange={(newValue) => {
                  console.log(
                    "defaultVal:" + `${convertDateFormat(dateValue)}` + "T00:00"
                  );
                  console.log(convertTimeFormat(newValue));
                  setStartTimeValue(newValue);
                }}
              />
            </DemoItem>
            <DemoItem label="End Time">
              <TimeField
                defaultValue={dayjs(
                  `${convertDateFormat(dateValue)}` + "T00:00"
                )}
                value={endTimeValue}
                onChange={(newValue) => {
                  console.log(
                    "defaultVal:" + `${convertDateFormat(dateValue)}` + "T00:00"
                  );
                  setEndTimeValue(newValue);
                }}
              />
            </DemoItem>
            <DemoItem label="Title">
              <TextField
                required
                id="outlined-required"
                value={titleValue}
                onChange={handleTitleChange}
              />
            </DemoItem>

            <DemoItem label="Contents">
              <Textarea
                className={styles.customTextarea}
                placeholder="Type anything…"
                value={contentsValue}
                onChange={handleContentsChange}
              />
            </DemoItem>

            <Button
              className={`${styles.modal_btn} ${styles.close_btn}`}
              size="sm"
              color="info"
              onClick={registerEvent}
            >
              Register
            </Button>
            <Button
              className={`${styles.modal_btn} ${styles.close_btn}`}
              size="sm"
              color="alert"
              onClick={() => setModalOpen(false)}
            >
              close
            </Button>

            <DemoContainer
              components={[
                "DateField",
                "TimeField",
                "DateTimeField",
                "MultiInputDateTimeRangeField",
                "MultiInputTimeRangeField",
                "MultiInputDateTimeRangeField",
              ]}
            ></DemoContainer>
          </LocalizationProvider>
        </div>
      </div>
    );
  });
  return (
    <div className="Home-container">
      {user.account === 1 ? (
        <AppShellTeacher />
      ) : user.account === 0 ? (
        <AppShellAdmin />
      ) : (
        <AppShell />
      )}
      <div>{modalOpen && <ModalComponent />}</div>
      <div id="myCalendar">
        <FullCalendar
          plugins={[dayGridPlugin, googleCalendarPlugin]}
          initialView="dayGridMonth"
          googleCalendarApiKey={apiKey}
          events={{
            googleCalendarId: "gofn2023@gmail.com",
          }}
          eventDisplay={"block"}
          eventTextColor={"#fff"}
          eventColor={"#0343CB"}
          height={"auto"}
          width={"100%"}
          // Toolbar
          headerToolbar={{
            left: "prev,next", // Display today, prev, and next buttons
            center: "title", // Display the title in the center of the header
            right: user.account === 0 ? "addButton" : "", // Display the custom "Add" button on the right side for account === 1
          }}
          customButtons={{
            // Define the custom "Add" button
            addButton: {
              text: "Add", // Button text
              click: () => {
                setModalOpen(true);
              },
            },
          }}
        />
      </div>

      <div id="simple_announce_div">
        <p
          style={{
            fontFamily: "Copperplate, sans-serif",
            fontSize: "20px",
          }}
          id="title"
        >
          Announcement
        </p>
        <Button size="sm" id="moreBtn" color="info" onClick={goAnnouncecList}>
          More
        </Button>
      </div>
      <div id="simple_announce">
        <MiniAnnouncement />
      </div>
    </div>
  );
};
export default Home;
