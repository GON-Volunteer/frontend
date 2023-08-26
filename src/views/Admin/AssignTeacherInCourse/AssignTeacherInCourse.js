import React, { useEffect, useMemo, useState, useRef } from "react";
import { useTable, usePagination } from "react-table";
import { Input, Button, UncontrolledAlert } from "reactstrap";

import axios from "axios"; // Axios 사용 예시

import { useNavigate } from "react-router-dom";
import "../../../assets/css/AssignTeacher.css";
import AppShellAdmin from "../AppShellAdmin";
function AssignTeacherInCourse() {
  const [formData, setFormData] = useState({
    teacher1_id: "",
    teacher2_id: "",
  });

  const [teachers, setTeachers] = useState([]);
  const outerDivRef = useRef(null);
  const handleTeacherChange = (event, row, isSecondTeacher) => {
    const { name, value } = event.target;

    console.log("teacherid?" + event.target.value);
    // console.log("teacher?" + teachers);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setCourseInfo((prevCourseInfo) => {
      const updatedCourseInfo = [...prevCourseInfo];
      const rowIndex = row.index;
      updatedCourseInfo[rowIndex] = {
        ...updatedCourseInfo[rowIndex],
        [isSecondTeacher ? "teacher2" : "teacher"]: value,
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
      accessor: "subject_name",
      Header: "subject",
    },
    {
      accessor: "teacher_name",
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
      accessor: "subject_name",
      Header: "subject",
    },
    {
      accessor: "teachers", // 현재 "teacher" 컬럼
      Header: "teacher",
    },
  ];
  const renderTeacher1Options = () => {
    return teachers.map((teacher) => (
      <option key={teacher.full_name} value={teacher._id}>
        {teacher.full_name}
      </option>
    ));
  };

  const columns = useMemo(() => firstTableColumns, []);
  const secondcolumns = useMemo(() => secondTableColumns, []);
  const [courseInfo, setCourseInfo] = useState([]);

  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const [pageSize, setPageSize] = useState(5);
  const [registerCourseInfo, setRegisterCourseInfo] = useState([]);
  const [selectedRow, setSelectedRow] = useState();
  const [selectedSecondRow, setSelectedSecondRow] = useState();

  const handleRowClick = (rowIndex) => {
    setSelectedRow(rowIndex);
    console.log(selectedRow);
    setSelectedSecondRow(null);
  };
  const handleSecondSelectRow = (rowIndex) => {
    console.log(rowIndex);

    setSelectedSecondRow(rowIndex);
    setSelectedRow(null);
    console.log("selectedSecondRow" + selectedSecondRow);
  };
  const handleOuterDivClick = (event) => {
    if (outerDivRef.current && !outerDivRef.current.contains(event.target)) {
      // 최상위 div 외부를 클릭한 경우에만 선택 초기화
      // setSelectedRow();
      // setSelectedSecondRow();
      // setFormData({
      //   teacher1_id: "",
      //   teacher2_id: "",
      // });
    }
  };

  const sectionOptions = [];
  for (
    let i = "a", idx = 0;
    idx < 6;
    i = String.fromCharCode(i.charCodeAt(0) + 1), idx++
  ) {
    sectionOptions.push(i);
  }
  async function showNonAssignCourseList() {
    axios
      .get(
        // "https://4ece099f-93aa-44bb-a61a-5b0fa04f47ac.mock.pstmn.io/AssignCourse"
        "/api/courses/not-assigned"
      )
      .then((courseRes) => {
        console.log("non assign response" + JSON.stringify(courseRes.data));
        if (courseRes.data && Array.isArray(courseRes.data)) {
          setCourseInfo(courseRes.data);
        } else {
          console.log("데이터가 배열이 아닙니다.");
        }
      });
  }
  async function showAssignedCourseList() {
    axios
      .get("/api/courses/assigned")
      .then((res) => {
        console.log("assigned res.data??" + JSON.stringify(res.data));
        if (Array.isArray(res.data)) {
          //map 사용시 새로운 배열 생성해서

          const resultObj = res.data.map((item) => item);
          setRegisterCourseInfo(resultObj);
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
  const [errorTeacherpopupVisible, setErrorTeacherpopupVisible] =
    useState(false);
  const handleCreate = async () => {
    if (formData.teacher1_id == formData.teacher2_id) {
      setErrorTeacherpopupVisible(true);
      setTimeout(() => {
        setErrorTeacherpopupVisible(false);
      }, 3000);
    } else {
      const teacherIdArr = [formData.teacher1_id, formData.teacher2_id];
      const transformedVal = teacherIdArr.map((val) => ({
        _id: val,
      }));

      const requestData = {
        teachers: transformedVal,
        course_id: courseInfo[selectedRow]._id,
      };
      // setFormData({
      //   teacher1_id: "",
      //   teacher2_id: "",
      // });
      setSelectedRow();
      // data["teachers"] = inputValue;
      // const selectedRowData = data[selectedRow]._id;
      // data["course_id"] = selectedRowData;
      try {
        console.log("request data:" + JSON.stringify(requestData));
        const response = await axios.post("/api/assign/teacher", requestData);
        console.log("create이후 서버 응답:");
        console.log(JSON.stringify(response.data));
        // 서버의 응답 데이터를 확인하거나 다른 작업을 수행하시면 됩니다.
        if (response.data.code == "200") {
          console.log("??enter?");
          showNonAssignCourseList();
          showAssignedCourseList();

          setPopupVisible(true);
          setTimeout(() => {
            setPopupVisible(false);
          }, 3000);
        } else if (response.data.code == "400") {
          setErrPopupVisible(true);
          setTimeout(() => {
            setErrPopupVisible(false);
          }, 3000);
          setFormData({
            teacher1_id: "",
            teacher2_id: "",
          });
        }
      } catch (error) {
        console.error("Error sending new Subject data to server:", error);
      }
    }
  };
  const handleDelete = async () => {
    console.log(
      "rowIndex" +
        selectedSecondRow +
        " ?" +
        JSON.stringify(registerCourseInfo[selectedSecondRow])
    );
    if (
      registerCourseInfo.length > 0 &&
      selectedSecondRow >= 0 &&
      selectedSecondRow < registerCourseInfo.length
    ) {
      console.log("rowIndex" + registerCourseInfo[selectedSecondRow]);
      try {
        const url = `/api/assign/teacher/${registerCourseInfo[selectedSecondRow]._id}`;
        const res = await axios.delete(url);

        showAssignedCourseList();
        showNonAssignCourseList();
      } catch (error) {
        console.error("delete 실패. 에러발생:" + error);
      }
    } else {
      console.log("Invalid rowIndex or data is empty.");
    }
  };

  useEffect(() => {
    const handleDocumentClick = (event) => {
      handleOuterDivClick(event);
    };

    document.addEventListener("mousedown", handleDocumentClick);

    const fetchData = async () => {
      try {
        const [registerCourseRes, courseRes, teachersRes] = await Promise.all([
          axios.get(
            // "https://4ece099f-93aa-44bb-a61a-5b0fa04f47ac.mock.pstmn.io/AssignCourse"
            "/api/courses/assigned"
          ),
          axios.get(
            // "https://4ece099f-93aa-44bb-a61a-5b0fa04f47ac.mock.pstmn.io/CourseList"
            "api/courses/not-assigned"
          ),
          axios.get("/api/teachers/"),
        ]);

        if (registerCourseRes.data && Array.isArray(registerCourseRes.data)) {
          console.log("second table:" + JSON.stringify(registerCourseRes.data));
          setRegisterCourseInfo(registerCourseRes.data);
        } else {
          console.log("assigned 티쳐 완료 data:데이터가 배열이 아닙니다.");
          console.log(JSON.stringify(registerCourseRes.data));
        }

        if (courseRes.data && Array.isArray(courseRes.data)) {
          console.log("first table?" + JSON.stringify(courseRes));
          setCourseInfo(courseRes.data);
        } else {
          console.log("first table?" + JSON.stringify(courseRes));
          console.log("데이터가 배열이 아닙니다.");
        }

        if (Array.isArray(teachersRes.data) && teachersRes.data.length > 0) {
          const teachers = teachersRes.data;
          setTeachers(teachers);
          console.log("teacherinfo" + JSON.stringify(teachers));
        } else {
          console.log("teacherinfo" + JSON.stringify(teachers));
          console.log("데이터가 배열이 아닙니다.");
        }
        // await new Promise((resolve) => setTimeout(resolve, API_DELAY_MS));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      return () => {
        document.removeEventListener("mousedown", handleDocumentClick);
      };
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
      <UncontrolledAlert color="info" isOpen={errpopupVisible}>
        <b>Failed!</b> Same course exists.
        <button className="close" onClick={() => setErrPopupVisible(false)}>
          <span aria-hidden="true">&times;</span>
        </button>
      </UncontrolledAlert>
      <UncontrolledAlert color="info" isOpen={popupVisible}>
        <b>Success!</b> New course created successfully!
        <button className="close" onClick={() => setPopupVisible(false)}>
          <span aria-hidden="true">&times;</span>
        </button>
      </UncontrolledAlert>
      <UncontrolledAlert color="info" isOpen={errorTeacherpopupVisible}>
        <b>Failed!</b> You assigned the same teacher. Please check.
        <button
          className="close"
          onClick={() => errorTeacherpopupVisible(false)}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </UncontrolledAlert>
      <div id="table" ref={outerDivRef}>
        <h4 id="subListTitle">Assign Teacher</h4>
        <div>
          <hr style={{ width: "100%", borderTop: "1px solid black" }} />
        </div>
        <div>
          {headerGroups.map((header) => (
            <tr {...header.getHeaderGroupProps()} id="headerRow">
              {header.headers.map((col) => (
                <th {...col.getHeaderProps()} id="headerCell">
                  {col.render("Header")}
                </th>
              ))}
            </tr>
          ))}
          <table {...getTableProps()} id="courseListTable">
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
                    onClick={() => handleRowClick(rowIndex)}
                  >
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()} id="dataCell">
                        {cell.render("Cell")}
                      </td>
                    ))}
                    <td>
                      <div
                        style={{
                          display: "flex",
                          gap: "10px", // 드롭다운 박스 사이의 간격
                          alignItems: "center", // 세로 중앙 정렬
                          // 기타 스타일 속성
                        }}
                      >
                        <Input
                          type="select"
                          name="teacher1_id"
                          id={`inputTeacher-${row.index}`}
                          value={isRowSelected ? row.original.teache1_id : ""}
                          onChange={(event) => handleTeacherChange(event, row)}
                        >
                          <option value="">-- Select Teacher --</option>
                          {renderTeacher1Options()}
                        </Input>
                        <Input
                          type="select"
                          name="teacher2_id" // 두 번째 드롭다운 상자의 이름
                          id={`inputTeacher2-${row.index}`}
                          value={
                            isRowSelected ? row.original.teache2_id : "null"
                          }
                          onChange={(event) =>
                            handleTeacherChange(event, row, true)
                          } // 두 번째 드롭다운 상자에 대한 핸들러
                        >
                          <option value="">-- Select Teacher --</option>
                          {renderTeacher1Options()}
                        </Input>
                      </div>
                    </td>
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
          {secondTableHeaderGroups.map((header) => (
            <tr {...header.getHeaderGroupProps()} id="headerRow">
              {header.headers.map((col) => (
                <th {...col.getHeaderProps()} id="headerCell">
                  {col.render("Header")}
                </th>
              ))}
            </tr>
          ))}
          <table {...getSecondTableProps()}>
            {" "}
            <tbody {...getSecondTableBodyProps()} id="tbody">
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
