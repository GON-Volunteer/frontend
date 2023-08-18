import React, { useEffect, useMemo, useState } from "react";
import { useTable, usePagination } from "react-table";
import { FormGroup, Label, Input, Button, UncontrolledAlert } from "reactstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios"; // Axios 사용 예시
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import "../../../assets/css/AssignTeacher.css";
import AppShellAdmin from "../AppShellAdmin";
function AssignTeacherInCourse() {
  const navigate = useNavigate();
  const handleBackButtonClick = () => {
    navigate("/courseManagement");
  };
  const handleNext = () => {
    navigate("/courseManagement/subjectManagement/courseRegister");
  };
  const [formData, setFormData] = useState({
    grade: "",
    section: "",
    batch: "",
    subject_id: "",
  });
  const [selectedRow, setSelectedRow] = useState(null);

  const columnData = [
    {
      accessor: "grade",
      Header: "grade",
    },
    {
      accessor: "section",
      Header: "section",
    },
    {
      accessor: "batch",
      Header: "batch",
    },
    {
      accessor: "subject",
      Header: "subject",
    },
  ];
  const TeacherData = [];
  const columns = useMemo(() => columnData, []);
  const [courseInfo, setCourseInfo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const [pageSize, setPageSize] = useState(5);
  const [inputValue, setInputValue] = useState("");

  const handleRadioChange = (rowIndex) => {
    setSelectedRow(rowIndex);
  };
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const sectionOptions = [];
  for (
    let i = "a", idx = 0;
    idx < 6;
    i = String.fromCharCode(i.charCodeAt(0) + 1), idx++
  ) {
    sectionOptions.push(i);
  }
  async function showCourseList() {
    axios
      .get(
        "https://4ece099f-93aa-44bb-a61a-5b0fa04f47ac.mock.pstmn.io/CourseList"
      )
      //   .get("/api/courses/")
      .then((res) => {
        console.log("res.data??" + res.data);
        if (Array.isArray(res.data)) {
          //map 사용시 새로운 배열 생성해서
          console.log(res.data);
          const resultObj = res.data.map((item) => item);
          setCourseInfo(resultObj);
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
        showCourseList();
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
        showCourseList();
      } catch (error) {
        console.error("delete 실패. 에러발생:" + error);
      }
    } else {
      console.log("Invalid rowIndex or data is empty.");
    }
  };

  useEffect(() => {
    axios
      .get(
        "https://4ece099f-93aa-44bb-a61a-5b0fa04f47ac.mock.pstmn.io/CourseList"
      )
      //   .get("/api/subjects/")
      .then((res) => {
        console.log(res.data);
        if (res.data.course && Array.isArray(res.data.course)) {
          setCourseInfo(res.data.course);
        } else {
          console.log("데이터가 배열이 아닙니다.");
        }
      })
      .catch((Err) => {
        console.log(Err);
      });
  }, []);
  const data = useMemo(() => courseInfo, [courseInfo]);
  //data = useMemo(() => courseInfo, [courseInfo]);
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
      <AppShellAdmin />
      <div style={{ fontWeight: "bold", fontSize: "30px" }}>
        Assign Teacher in Course
      </div>
      <div id="table">
        <h4 id="subListTitle">Assign Teacher</h4>
        <div>
          <hr style={{ width: "100%", borderTop: "1px solid black" }} />
        </div>
        <div>
          <table {...getTableProps()} id="courseListTable">
            {" "}
            <thead>
              {headerGroups.map((header) => (
                <tr {...header.getHeaderGroupProps()} id="headerRow">
                  {header.headers.map((col) => (
                    <th {...col.getHeaderProps()} id="headerCell">
                      {col.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
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
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()} id="dataCell">
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
              <Input
                type="select"
                name="section"
                id="inputState"
                value={formData.section} // 선택한 옵션의 값 formData에 할당
                onChange={handleInputChange}
              >
                <option value="">-- Select Section --</option>
                {sectionOptions.map((option, index) => (
                  <option key={index}>{option}</option>
                ))}
              </Input>
            </tbody>
          </table>
        </div>
      </div>
      <Button color="info" onClick={handleDelete} id="deleteBtn">
        Delete
      </Button>
      <h4 id="newSubTitle">Teacher Assigned course</h4>
      <div>
        <hr style={{ width: "100%", borderTop: "1px solid black" }} />
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
export default AssignTeacherInCourse;
