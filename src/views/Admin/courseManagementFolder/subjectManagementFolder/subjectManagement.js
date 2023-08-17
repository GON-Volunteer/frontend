import React, { useEffect, useMemo, useState } from "react";
import { useTable, usePagination } from "react-table";
import { Button, UncontrolledAlert } from "reactstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios"; // Axios 사용 예시
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import "../../../../assets/css/SubList.css";
export default function SubjectManagement() {
  const navigate = useNavigate();
  const handleBackButtonClick = () => {
    navigate("/courseManagement");
  };
  const handleNext = () => {
    navigate("/courseManagement/subjectManagement/courseRegister");
  };
  const [selectedRow, setSelectedRow] = useState(null);

  const columnData = [
    {
      accessor: "name",
      Header: "subject",
    },
  ];
  const columns = useMemo(() => columnData, []);
  const [subjectInfo, setSubjectInfo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const [pageSize, setPageSize] = useState(5);
  const [inputValue, setInputValue] = useState("");

  const handleRadioChange = (rowIndex) => {
    setSelectedRow(rowIndex);
  };
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  async function showSubList() {
    axios
      .get("/api/subjects/")
      .then((res) => {
        console.log("res.data??" + res.data);
        if (Array.isArray(res.data)) {
          //map 사용시 새로운 배열 생성해서
          console.log(res.data);
          const resultObj = res.data.map((item) => item);
          setSubjectInfo(resultObj);
        } else {
          console.log("SubManagement::데이터가 배열이 아닙니다.");
        }
      })
      .catch((Err) => {
        console.log(Err);
      });
  }
  const [isElective, setIsElective] = useState(false);
  const [errpopupVisible, setErrPopupVisible] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const handleElectiveButtonClick = (value) => {
    setIsElective(value);
    console.log(isElective + "?");
  };
  const handleCreate = async () => {
    const data = {
      name: inputValue,
      is_elective_subject: isElective,
    };

    try {
      console.log(data);
      const response = await axios.post("/api/subjects/", data);
      console.log("서버 응답:");
      console.log(response.data);
      // 서버의 응답 데이터를 확인하거나 다른 작업을 수행하시면 됩니다.
      if (response.data.code == "200") {
        setPopupVisible(true);
        showSubList();
      } else if (response.data.code == "400") {
        setErrPopupVisible(true);
      }
    } catch (error) {
      console.error("Error sending new Subject data to server:", error);
    }
  };
  const handleDelete = async () => {
    console.log("rowIndex" + JSON.stringify(data[selectedRow]));
    if (data.length > 0 && selectedRow >= 0 && selectedRow < data.length) {
      console.log("rowIndex" + data[selectedRow]._id);
      try {
        const url = `/api/subjects/${data[selectedRow]._id}`;
        // const res = await axios.delete(url);
        alert("res.data" + url);
        showSubList();
      } catch (error) {
        console.error("delete 실패. 에러발생:" + error);
      }
    } else {
      console.log("Invalid rowIndex or data is empty.");
    }
  };

  useEffect(() => {
    axios
      .get("/api/subjects/")
      .then((res) => {
        console.log(res.data);
        if (Array.isArray(res.data)) {
          console.log("res.data??" + res.data);
          const resultObj = res.data.map((item) => item);
          setSubjectInfo(res.data);
        } else if (typeof res.data === "string") {
          // 객체를 배열로 변환
          const dataArray = Object.values(res.data);
          setSubjectInfo(dataArray);
        } else {
          console.log("데이터가 배열이 아닙니다.");
        }
      })
      .catch((Err) => {
        console.log(Err);
      });
    // async function fetchData() {
    //   try {
    //     const response = await axios.get("/api/subjects/");
    //     const subjects = response.data.subject;
    //     console.log(subjects);
    //     setSubjectInfo(subjects);
    //     setData(subjects); // 데이터를 받아온 후 data 배열 업데이트
    //   } catch (error) {
    //     console.log("API 요청에 실패하였습니다.", error);
    //   }
    // }

    // fetchData(); // 데이터 가져오기
    // SetSubList();
    // 데이터를 받아온 후 data 배열 업데이트
  }, []);
  const data = useMemo(() => subjectInfo, [subjectInfo]);
  //data = useMemo(() => subjectInfo, [subjectInfo]);
  const getCurrentPageData = () => {
    if (data) {
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      return data.slice(startIndex, endIndex);
    }
    return [];
  };

  // 현재 페이지에 해당하는 데이터를 가져옵니다.
  const currentPageData = useMemo(
    () => getCurrentPageData(),
    [data, currentPage]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data: currentPageData,
        initialState: { pageIndex: 0, pageSize },
      },
      usePagination
    );
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
              Subject Management
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
      <UncontrolledAlert color="info" isOpen={errpopupVisible}>
        <b>Failed!</b> Same subject exists.
        <button className="close" onClick={() => setErrPopupVisible(false)}>
          <span aria-hidden="true">&times;</span>
        </button>
      </UncontrolledAlert>
      <UncontrolledAlert color="info" isOpen={popupVisible}>
        <b>Success!</b> New subject created successfully!
        <button className="close" onClick={() => setPopupVisible(false)}>
          <span aria-hidden="true">&times;</span>
        </button>
      </UncontrolledAlert>
      <div id="table">
        <table {...getTableProps()}>
          {" "}
          <h4 id="subListTitle">Subject List</h4>
          <div>
            <hr style={{ width: "100%", borderTop: "1px solid black" }} />
          </div>
          <div id="tbodyContainer">
            <tbody {...getTableBodyProps()} id="tbody">
              {rows.map((row, rowIndex) => {
                prepareRow(row);
                const isRowSelected = rowIndex === selectedRow;
                return (
                  <tr
                    key={rowIndex}
                    id="rowFont"
                    {...row.getRowProps()}
                    style={{
                      background: isRowSelected ? "skyblue" : "none",
                    }}
                    onClick={() => handleRadioChange(rowIndex)}
                  >
                    <td>
                      <input
                        id="radioBtn"
                        type="radio"
                        checked={isRowSelected}
                        onClick={() => handleRadioChange(rowIndex)}
                      />
                      {/* <input
                        type="checkbox"
                        checked={isRowChecked}
                        onChange={() => handleCheckboxChange(rowIndex)}
                      /> */}
                    </td>

                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </div>
        </table>
      </div>
      <Button color="info" onClick={handleDelete} id="deleteBtn">
        Delete
      </Button>
      <h4 id="newSubTitle">Create a new subject</h4>
      <div>
        <hr style={{ width: "100%", borderTop: "1px solid black" }} />
      </div>
      <div id="secondaryContainer" style={{ display: "flex" }}>
        <div id="newSubDiv" style={{ flex: 1, marginRight: "10px" }}>
          <p>subject name</p>
          <input
            id="subjectInput"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Subject Name"
          />
        </div>

        <div id="isElectiveDiv" style={{ flex: 0.6 }}>
          <p>Is elective subject?</p>
          <Button
            value="true"
            className={isElective === true ? "btnSelect" : "btnDefault"}
            onClick={() => handleElectiveButtonClick(true)}
          >
            Y
          </Button>
          <Button
            value="false"
            className={isElective === false ? "btnSelect" : "btnDefault"}
            onClick={() => handleElectiveButtonClick(false)}
          >
            N
          </Button>
        </div>
      </div>

      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginRight: "20px",
          }}
        >
          <Button color="info" onClick={handleCreate} id="createBtn">
            Create
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginRight: "20px",
          }}
        >
          <Button color="info" onClick={handleNext} id="nextBtn">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
