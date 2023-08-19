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
function AssignStdInCourse() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    grade: "",
    section: "",
    batch: "",
    subject_id: "",
    teacher: "",
  });

  const [selectedRow, setSelectedRow] = useState(null);

  const [teachers, setTeachers] = useState([]);
  const handleSubjectChange = (event, row) => {
    const { value } = event.target;

    setCourseInfo((prevCourseInfo) => {
      const updatedCourseInfo = [...prevCourseInfo];
      updatedCourseInfo[row.index] = {
        ...updatedCourseInfo[row.index],
        teacher: value,
      };
      return updatedCourseInfo;
    });
  };

  const firstTableColumns = [
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
    {
      accessor: "teachers",
      Header: "teacher",
    },
  ];
  const TeacherData = [];
  const columns = useMemo(() => firstTableColumns, []);
  const [courseInfo, setCourseInfo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const [pageSize, setPageSize] = useState(5);
  const [inputValue, setInputValue] = useState("");
  const [registerCourseInfo, setRegisterCourseInfo] = useState([]);
  const handleRadioChange = (rowIndex) => {
    setSelectedRow(rowIndex);
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
      .get("/api/courses/")
      .then((res) => {
        console.log("res.data??" + res.data);
        if (Array.isArray(res.data.course)) {
          //map 사용시 새로운 배열 생성해서
          console.log(res.data.course);
          const resultObj = res.data.course.map((item) => item);
          setCourseInfo(resultObj);
        } else {
          console.log("SubManagement::데이터가 배열이 아닙니다.");
        }
      })
      .catch((Err) => {
        console.log(Err);
      });
  }

  useEffect(() => {
    axios
      .get(
        // "https://4ece099f-93aa-44bb-a61a-5b0fa04f47ac.mock.pstmn.io/CourseList"
        "api/courses/"
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.course && Array.isArray(res.data.course)) {
          setRegisterCourseInfo(res.data.course);
        } else {
          console.log("데이터가 배열이 아닙니다.");
        }
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
      {/* <div style={{ fontWeight: "bold", fontSize: "30px" }}>
        Assign Teacher in Course
      </div> */}
      <div id="table">
        <h4 id="subListTitle">Course List</h4>
        <div>
          <hr style={{ width: "100%", borderTop: "1px solid black" }} />
        </div>
        <div>
          <table {...getTableProps()} id="courseListTable">
            {" "}
            <tbody {...getTableBodyProps()} id="tbody">
              {headerGroups.map((header) => (
                <tr {...header.getHeaderGroupProps()} id="headerRow">
                  {header.headers.map((col) => (
                    <th {...col.getHeaderProps()} id="headerCell">
                      {col.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}

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
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default AssignStdInCourse;
