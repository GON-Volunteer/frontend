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

  const [formData, setFormData] = useState({
    grade: "",
    section: "",
    batch: "",
    subject_id: "",
    teacher: "",
  });

  const [selectedRow, setSelectedRow] = useState(null);

  const [selectedSecondRow, setSelectedSecondRow] = useState(null);
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
  const secondTableColumns = [
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
      accessor: "teacher",
      Header: "teacher",
    },
  ];
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
      Cell: ({ row }) => (
        <Input
          type="select"
          name="teacher"
          id={`inputTeacher-${row.index}`}
          value={row.original.teacher}
          onChange={(event) => handleSubjectChange(event, row)}
        >
          <option value="">-- 선생님 선택 --</option>
          {teachers.map((teacher) => (
            <option key={teacher.full_name} value={teacher.full_name}>
              {teacher.full_name}
            </option>
          ))}
        </Input>
      ),
    },
  ];
  const TeacherData = [];
  const columns = useMemo(() => firstTableColumns, []);
  const secondcolumns = useMemo(() => secondTableColumns, []);
  const [courseInfo, setCourseInfo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const [pageSize, setPageSize] = useState(5);
  const [inputValue, setInputValue] = useState("");
  const [registerCourseInfo, setRegisterCourseInfo] = useState([]);
  const handleRadioChange = (rowIndex) => {
    setSelectedRow(rowIndex);
  };
  const handleSecondSelectRow = (rowIndex) => {
    setSelectedSecondRow(rowIndex);
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
  const [isElective, setIsElective] = useState(false);
  const [errpopupVisible, setErrPopupVisible] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);

  const handleCreate = async () => {
    data["teachers"] = inputValue;
    const selectedRowData = data[selectedRow]._id;
    data["course_id"] = selectedRowData;
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
  const API_DELAY_MS = 1000;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [registerCourseRes, courseRes, teachersRes] = await Promise.all([
          axios.get(
            // "https://4ece099f-93aa-44bb-a61a-5b0fa04f47ac.mock.pstmn.io/AssignCourse"
            "api/courses/"
          ),
          axios.get(
            // "https://4ece099f-93aa-44bb-a61a-5b0fa04f47ac.mock.pstmn.io/CourseList"
            "api/courses/"
          ),
          axios.get("/api/teachers/"),
        ]);

        if (
          registerCourseRes.data.course &&
          Array.isArray(registerCourseRes.data.course)
        ) {
          setRegisterCourseInfo(registerCourseRes.data.course);
        } else {
          console.log("데이터가 배열이 아닙니다.");
          console.log(registerCourseRes.data);
        }

        if (courseRes.data.course && Array.isArray(courseRes.data.course)) {
          setCourseInfo(courseRes.data.course);
        } else {
          console.log("데이터가 배열이 아닙니다.");
        }

        if (Array.isArray(teachersRes.data) && teachersRes.data.length > 0) {
          const teachers = teachersRes.data;
          setTeachers(teachers);
          console.log("teacherinfo" + JSON.stringify(teachers));
        } else {
          console.log("데이터가 배열이 아닙니다.");
        }
        await new Promise((resolve) => setTimeout(resolve, API_DELAY_MS));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
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

  const lowerTableData = useMemo(
    () => registerCourseInfo,
    [registerCourseInfo]
  );
  const getLowerCurrentPageData = () => {
    if (lowerTableData) {
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      return lowerTableData.slice(startIndex, endIndex);
    }
    return [];
  };
  // 현재 페이지에 해당하는 데이터를 가져옵니다.
  const secondCurrentPageData = useMemo(
    () => getLowerCurrentPageData(),
    [data, currentPage]
  );

  const {
    getTableProps: getSecondTableProps,
    getTableBodyProps: getSecondTableBodyProps,
    headerGroups: secondTableHeaderGroups,
    rows: secondTableRows,
    prepareRow: prepareSecondTableRow,
  } = useTable(
    {
      columns: secondcolumns,
      data: secondCurrentPageData, // 두 번째 테이블의 데이터
      initialState: { pageIndex: 0, pageSize }, // 초기 페이지 설정
    },
    usePagination // 페이지네이션 사용
  );
  return (
    <div>
      <AppShellAdmin />
      {/* <div style={{ fontWeight: "bold", fontSize: "30px" }}>
        Assign Teacher in Course
      </div> */}
      <div id="table">
        <h4 id="subListTitle">Assign Teacher</h4>
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
      <Button color="info" onClick={handleCreate} id="createBtn">
        Create
      </Button>

      <div id="table">
        <h4 id="subListTitle">Assign Teacher in Course</h4>
        <div>
          <hr style={{ width: "100%", borderTop: "1px solid black" }} />
        </div>
        <div>
          <table {...getSecondTableProps()}>
            {" "}
            <tbody {...getSecondTableBodyProps()} id="tbody">
              {secondTableHeaderGroups.map((header) => (
                <tr {...header.getHeaderGroupProps()} id="headerRow">
                  {header.headers.map((col) => (
                    <th {...col.getHeaderProps()} id="headerCell">
                      {col.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}

              {secondTableRows.map((row, rowIndex) => {
                prepareSecondTableRow(row);
                const isRowSelected = rowIndex === selectedSecondRow;
                return (
                  <tr
                    key={rowIndex}
                    id="rowFont"
                    {...row.getRowProps()}
                    style={{
                      background: isRowSelected ? "skyblue" : "none",
                    }}
                    onClick={() => handleSecondSelectRow(rowIndex)}
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

      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginRight: "20px",
          }}
        >
          <Button color="info" onClick={handleDelete} id="deleteBtn">
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
export default AssignTeacherInCourse;
