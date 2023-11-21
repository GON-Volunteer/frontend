import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import "../../assets/css/Home.css";
import { Button } from "reactstrap";

import AppShell from "./AppShell";
import AppShellAdmin from "../Admin/AppShellAdmin";
import AppShellTeacher from "../Teacher/AppShellTeacher";
import AnnouncementList from "./AnnouncementList.js";

const Home = () => {
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
  const access_token = process.env.REACT_APP_GOOGLE_ACCESS_TOKEN;
  const navigate = useNavigate();
  const goAncList = (e) => {
    e.preventDefault();
    navigate("/Announcement-Page");
  };
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
            dateTime: "2023-12-03T10:00:00", 
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
  // useEffect(() => {

  // }, []);
  const goGoogleCalendar = () => {
    // 구글 캘린더 링크로 이동하는 URL
    const googleCalendarLink = "https://calendar.google.com";

    // 새 창에서 구글 캘린더 링크 열기
    window.open(googleCalendarLink, "_blank");
  };

  return (
    <div className="Home-container">
      {user.account === 1 ? (
        <AppShellTeacher />
      ) : user.account === 0 ? (
        <AppShellAdmin />
      ) : (
        <AppShell />
      )}

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
              click: handleAddEvent,
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
        <Button size="sm" id="moreBtn" color="info" onClick={goAncList}>
          More
        </Button>
      </div>
      <div id="simple_announce">
        <AnnouncementList />
      </div>
    </div>
  );
};
export default Home;
