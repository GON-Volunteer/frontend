import React, { useEffect, useMemo, useState } from "react";
import { useTable, usePagination } from "react-table";

import axios from "axios"; // Axios 사용 예시
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

import { Button, UncontrolledAlert } from "reactstrap";

function CourseDelete() {
  const navigate = useNavigate();
  const handleBackButtonClick = () => {
    navigate("/courseManagement");
  };

  const [selectedRow, setSelectedRow] = useState(null);

  const fullNameHeaderClass = "fullNameHeader";

  //radio를 클릭하면 인덱스 받아오기
  const handleRadioChange = (rowIndex) => {
    setSelectedRow(rowIndex);
  };

  //accessor와 받아오는 data keyname이 같아야함
  const columnData = [
    {
      accessor: "batch",
      Header: "",
      headerClassName: fullNameHeaderClass,
    },
    {
      accessor: "grade",
      Header: "grade",
    },
    {
      accessor: "section",
      Header: "section",
    },
    {
      accessor: "subject_name",
      Header: "subject",
    },
    {
      accessor: "is_elective_subject",
      Header: "Elective",
    },
  ];
  const columns = useMemo(() => columnData, []);

  const [courseInfo, setCourseInfo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const [pageSize, setPageSize] = useState(10); //한페이지에 보여줄 페이지개수
  const [errpopupVisible, setErrPopupVisible] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  async function showTchList() {
    axios.get("/api/courses/").then((res) => {
      if (Array.isArray(res.data) && res.data.length > 0) {
        const courses = res.data;
        setCourseInfo(courses);
      } else {
        console.log("데이터가 배열이 아닙니다.");
      }
    });
  }
  useEffect(() => {
    axios.get("/api/courses/").then((res) => {
      if (Array.isArray(res.data) && res.data.length > 0) {
        const courses = res.data;
        setCourseInfo(courses);
      } else {
        console.log("데이터가 배열이 아닙니다.");
      }
    });
  }, []);
  const handleDelete = async () => {
    console.log("rowIndex" + JSON.stringify(data[selectedRow]));
    if (data.length > 0 && selectedRow >= 0 && selectedRow < data.length) {
      try {
        const url = `/api/courses/${data[selectedRow]._id}`;
        await axios
          .delete(url)
          .then((res) => {
            console.log("삭제 성공", JSON.stringify(res.data));
            if (res.data.code === "200") {
              // 성공적으로 추가된 경우
              setPopupVisible(true);

              setTimeout(() => {
                setPopupVisible(false);
              }, 3000);
            } else if (res.data.code == "400") {
              // 실패한 경우 처리
              setErrPopupVisible(true);
              setTimeout(() => {
                setErrPopupVisible(false);
              }, 3000);
            } else {
              //유효하지않은 요청입니다.
              console.log("어케할까");
            }
            showTchList();
          })
          .catch((err) => {
            console.error("delete 실패. 에러발생:" + err);
          });
      } catch (error) {
        console.error("delete 실패. 에러발생:" + error);
      }
    } else {
      console.log("Invalid rowIndex or data is empty.");
    }
  };

  //studentInfo에 변경이 있을 때만 업데이트
  const data = useMemo(() => courseInfo, [courseInfo]);
  //student delete

  // 현재 페이지에 해당하는 데이터를 가져오는 함수
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
  };

  // 다음 페이지로 이동하는 함수
  const goToNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  // 이전 페이지로 이동하는 함수
  const goToPrevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  // 현재 페이지에 해당하는 데이터를 가져옵니다.
  const currentPageData = useMemo(
    () => getCurrentPageData(),
    [data, currentPage]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data: currentPageData,
      initialState: { pageIndex: 0, pageSize },
    },
    usePagination
  );
  const pageCount = Math.ceil(data.length / pageSize);
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
              Delete Teacher
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
      <UncontrolledAlert color="info" isOpen={errpopupVisible}>
        <b>Failed!</b> Failed to delete student information.
        <button className="close" onClick={() => setErrPopupVisible(false)}>
          <span aria-hidden="true">&times;</span>
        </button>
      </UncontrolledAlert>
      <UncontrolledAlert color="info" isOpen={popupVisible}>
        <b>Success!</b>
        Successful deletion of student information
        <button className="close" onClick={() => setPopupVisible(false)}>
          <span aria-hidden="true">&times;</span>
        </button>
      </UncontrolledAlert>
      <div>
        <div id="table">
          <table {...getTableProps()}>
            {" "}
            <thead>
              {headerGroups.map((header) => (
                <tr {...header.getHeaderGroupProps()}>
                  <th>Check</th>
                  {header.headers.map((col) => (
                    <th
                      {...col.getHeaderProps()}
                      className={
                        col.Header === "Full Name" ? fullNameHeaderClass : ""
                      }
                    >
                      {col.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
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
              <Button onClick={handleDelete} id="deleteBtn">
                Delete
              </Button>
            </tbody>
          </table>
        </div>
        <div>
          <Pagination
            className="pagination justify-content-center"
            listClassName="justify-content-center"
            aria-label="Page navigation example"
          >
            <PaginationItem disabled={currentPage === 1}>
              <PaginationLink previous href="#" onClick={goToPrevPage} />
            </PaginationItem>
            {Array.from({ length: pageCount }, (_, index) => (
              <PaginationItem key={index} active={index + 1 === currentPage}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(index + 1);
                  }}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem disabled={currentPage === pageCount}>
              <PaginationLink next onClick={goToNextPage} />
            </PaginationItem>
          </Pagination>
        </div>
      </div>
    </div>
  );
}

export default CourseDelete;
