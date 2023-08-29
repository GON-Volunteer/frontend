import React, { useState, useEffect } from "react";
import Posting from "./Posting";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Paper } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import SendIcon from "@mui/icons-material/Send";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import { Row, Col } from "react-bootstrap";
import DeleteIcon from "@mui/icons-material/Delete";
import "../../assets/css/Community.css";
import { storageService } from "../../fBase";
import { v4 as uuidv4 } from "uuid";
import { ref, getDownloadURL, uploadString } from "firebase/storage";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// 글 작성
// [커뮤니티] 컴포넌트
const ArticleCreate = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const url = "http://localhost:5000";
  const [title, setTitle] = useState(""); // 게시글(제목)
  const [posting, setPosting] = useState(""); // 게시글(내용)
  //const [newPosting, setNewPosting] = useState(""); // 새로운 게시글
  const [postings, setPostings] = useState([]); // 게시글 배열
  const [currentPage, setCurrentPage] = useState(0);
  const [attachment, setAttachment] = useState("");
  const isDisabled = !title.trim();
  // 새 게시글 작성 후 글 올리기하면 호출
  useEffect(
    () => {},
    [
      /*newPosting*/
    ]
  );

  // [게시글 제목] 작성 핸들러
  const onTitle = (event) => {
    const {
      target: { value },
    } = event;
    setTitle(value);
  };

  // [게시글 내용] 작성 핸들러
  const onPosting = (event) => {
    const {
      target: { value },
    } = event;
    setPosting(value);
  };

  // [CREATE] 게시글 생성 핸들러
  const onCreatePosting = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";

    if (attachment !== "") {
      const filePath = `${user._id}/${uuidv4()}`;
      const attachmentRef = ref(storageService, filePath);
      const uploadTaskSnapshot = await uploadString(
        attachmentRef,
        attachment,
        "data_url"
      );
      attachmentUrl = await getDownloadURL(uploadTaskSnapshot.ref);
    }

    await axios
      .post(url + "/api/articles/create", {
        method: "POST",
        body: JSON.stringify({
          user_id: user._id,
          title: title,
          content: posting,
          full_name: user.full_name,
          attachmentUrl: attachmentUrl,
        }),
      })
      .then(() => {
        console.log("[CREATE] 새 게시글 생성");
        navigate("/Announcement-page");
        //setNewPosting(posting);
      })
      .catch(() => {
        console.log(url + "/api/articles/create");
        alert("[CREATE] response (x)");
      });

    setPosting("");
    //setAttachment("");
  };

  // [첨부파일] 업로드 핸들러
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    console.log(files[0]);
    const reader = new FileReader();

    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  // [첨부파일] Clear 핸들러
  const onClearAttachment = () => setAttachment(null);

  const handleBackButtonClick = () => {
    navigate("/Announcement-page");
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
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Announcement Create
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
      <Paper
        elevation={0}
        style={{ width: "100%", border: "none", backgroundColor: "#f8f8f8" }}
      >
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Grid container spacing={0}>
              <Paper
                style={{
                  border: "1px solid lightgray ",
                  marginBottom: "15px",
                  borderRadius: "1rem",
                  width: "100%",
                  height: "100%",
                }}
              >
                <Grid item xs={12}>
                  <Grid container spacing={0}>
                    <Grid item xs={12}></Grid>
                    <Grid
                      item
                      xs={12}
                      style={{ borderBottom: "1px solid lightgray" }}
                    >
                      {/* 새글쓰기 타이틀 */}
                      <Row item xs={12}>
                        <Col item xs={11}>
                          <p
                            style={{
                              float: "left",
                              paddingTop: "12px",
                              paddingBottom: "5px",
                              paddingLeft: "20px",
                              margin: "0",
                            }}
                          >
                            New Announcement
                          </p>
                        </Col>
                        <Col
                          item
                          xs={1}
                          style={{
                            float: "right",
                            paddingRight: "3rem",
                          }}
                        >
                          <IconButton
                            style={{
                              color: "#ff8a4e",
                            }}
                            aria-label="create"
                            onClick={onCreatePosting}
                            disabled={isDisabled}
                          >
                            <SendIcon />
                          </IconButton>
                        </Col>
                      </Row>
                    </Grid>
                    <Grid item xs={12}>
                      {/* 새글쓰기 입력란 */}
                      <input
                        type="text"
                        value={title}
                        onChange={onTitle}
                        placeholder="Title"
                        maxLength={100}
                        style={{
                          padding: "16px",
                          width: "100%",
                          height: "50%",
                          border: "1px solid lightgrey",
                        }}
                      ></input>
                      <textarea
                        cols="40"
                        rows="5"
                        type="text"
                        value={posting}
                        onChange={onPosting}
                        placeholder="Content"
                        maxLength={1000}
                        style={{
                          padding: "16px",
                          width: "100%",
                          height: "100%",
                          border: "none",
                        }}
                      ></textarea>
                    </Grid>
                    <Grid item xs={12}>
                      <Row
                        item
                        xs={12}
                        style={{
                          margin: "0",
                          paddingBottom: "1rem",
                          paddingRight: "3rem",
                          float: "right",
                        }}
                      >
                        {/* 파일 첨부 */}
                        <div class="image-upload">
                          <label for="file-input">
                            <input
                              id="file-input"
                              type="file"
                              accept="image/*"
                              onChange={onFileChange}
                              display="none"
                              style={{ visibility: "hidden" }}
                            />
                            <PhotoCameraIcon color="disabled" />
                          </label>
                        </div>
                        {/* 파일 첨부 이미지 미리보기 */}
                        {attachment && (
                          <>
                            <Row
                              item
                              xs={12}
                              style={{ margin: "0", width: "100%" }}
                            >
                              <img
                                src={attachment}
                                width="100%"
                                height="100%"
                              />
                            </Row>
                            <Row item xs={12} style={{ margin: "0" }}>
                              <IconButton
                                style={{
                                  color: "gray",
                                }}
                                aria-label="delete"
                                onClick={onClearAttachment}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Row>
                          </>
                        )}
                      </Row>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
              <Grid item xs={12}></Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default ArticleCreate;
