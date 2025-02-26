import React, { useEffect, useMemo, useState } from "react";
import { useTable, usePagination } from "react-table";
import { Input, Button, UncontrolledAlert } from "reactstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios"; // Axios 사용 예시
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import styles from "../../../assets/css/Table.module.css";

import "../../../assets/css/DeleteTable.css";
// import Radio from "../../../components/Radio";
// import RadioGroup from "../../../components/RadioGroup";

function StudentDelete() {
  const navigate = useNavigate();
  const handleBackButtonClick = () => {
    navigate("/StudentManagement");
  };
  const [selectedRow, setSelectedRow] = useState(null);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [loading, setLoading] = useState(false);
  const fullNameHeaderClass = "fullNameHeader";
  //radio를 클릭하면 인덱스 받아오기
  const handleRadioChange = (rowIndex) => {
    setSelectedRow(rowIndex);
  };
  async function showStdList() {
    axios
      .get(
        `${BASE_URL}/api/students/`
        // "https://4ece099f-93aa-44bb-a61a-5b0fa04f47ac.mock.pstmn.io/StudentList"
      )
      .then((res) => {
        if (Array.isArray(res.data)) {
          //map 사용시 새로운 배열 생성해서
          console.log(res.data);
          const students = res.data.filter(
            (student) => student.id !== "gonStudent"
          );
          setstudentInfo(students);
        } else {
          console.log("데이터가 배열이 아닙니다.");
        }
      });
  }
  //accessor와 받아오는 data keyname이 같아야함
  const columnData = [
    {
      accessor: "s_n",
      Header: "S.N.",
    },
    {
      accessor: "full_name",
      Header: "Full Name",
      headerClassName: fullNameHeaderClass,
    },
    {
      accessor: "id",
      Header: "ID",
    },

    {
      accessor: "phone_num",
      Header: "Phone No",
    },
    {
      accessor: "father_phone_num",
      Header: "Father No",
    },
    {
      accessor: "mother_phone_num",
      Header: "Mother No",
    },
    {
      accessor: "guardians_phone_num",
      Header: "Guardians No",
    },
  ];
  const columns = useMemo(() => columnData, []);

  const [studentInfo, setstudentInfo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const [pageSize, setPageSize] = useState(6); //한페이지에 보여줄 페이지개수
  const onReadStudentInfo = async () => {
    axios
      .get(
        `${BASE_URL}/api/students/`
        // "https://4ece099f-93aa-44bb-a61a-5b0fa04f47ac.mock.pstmn.io/StudentList"
      )
      .then((res) => {
        if (Array.isArray(res.data)) {
          //map 사용시 새로운 배열 생성해서
          console.log(res.data);
          const students = res.data.filter(
            (student) => student.id !== "gonStudent"
          );
          setstudentInfo(students);
        } else {
          console.log("데이터가 배열이 아닙니다.");
        }
      });
  };
  const handleWindowResize = () => {
    const windowHeight = window.innerHeight;
    if (windowHeight < 600) {
      console.log("windowHeight:", windowHeight);
      setPageSize(7);
    } else if (windowHeight >= 600 && windowHeight < 700) {
      setPageSize(8);
    } else if (windowHeight >= 700 && windowHeight < 800) {
      console.log("windowHeight:", windowHeight);
      setPageSize(10);
    } else if (windowHeight >= 800 && windowHeight < 900) {
      setPageSize(12);
    } else if (windowHeight >= 900 && windowHeight < 1000) {
      console.log("windowHeight:", windowHeight);
      setPageSize(14);
    } else {
      setPageSize(16);
    }
    onReadStudentInfo();
  };
  useEffect(() => {
    onReadStudentInfo();
    handleWindowResize(); // 초기 설정
    window.addEventListener("resize", handleWindowResize);
    onReadStudentInfo();
    // 컴포넌트가 언마운트될 때 등록된 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  //studentInfo에 변경이 있을 때만 업데이트
  const data = useMemo(() => studentInfo, [studentInfo]);
  //student delete
  const [errpopupVisible, setErrPopupVisible] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const handleDelete = async () => {
    if (loading) return;
    setLoading(true);
    console.log("rowIndex" + JSON.stringify(data[selectedRow]));
    if (selectedRow >= 0) {
      const url = `${BASE_URL}/api/students/${data[selectedRow]._id.$oid}`;
      axios
        .delete(url)
        .then((res) => {
          console.log("삭제 성공", JSON.stringify(res.data));
          if (res.data.code === "200") {
            // 성공적으로 추가된 경우
            setPopupVisible(true);
            setTimeout(() => {
              setPopupVisible(false);
            }, 3000);
            setLoading(false);
          } else if (res.data.code == "400") {
            // 실패한 경우 처리
            setErrPopupVisible(true);
            setTimeout(() => {
              setErrPopupVisible(false);
            }, 3000);
            setLoading(false);
          } else {
            //유효하지않은 요청입니다.
            console.log("어케할까");
            setLoading(false);
          }
          showStdList();
        })
        .catch((err) => {
          console.error("delete 실패. 에러발생:" + err);
          setLoading(false);
        });
    } else {
      console.log("Invalid rowIndex or data is empty.");
      setLoading(false);
    }
  };

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
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // 현재 페이지에 해당하는 데이터를 가져옵니다.
  const currentPageData = useMemo(
    () => getCurrentPageData(),
    [data, currentPage]
  );
  const pageCount = Math.ceil(data.length / pageSize);
  const itemsPerPage = 5; // 한 페이지당 아이템 수
  const startPage =
    Math.floor((currentPage - 1) / itemsPerPage) * itemsPerPage + 1;
  const endPage = Math.min(startPage + itemsPerPage - 1, pageCount);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
  } = useTable(
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
              Delete Student
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
      <div className="popup-container">
        <UncontrolledAlert color="danger" isOpen={errpopupVisible}>
          <b>Failed!</b> Failed to delete student information. X
          <button className="close" onClick={() => setErrPopupVisible(false)}>
            <span aria-hidden="true">&times;</span>
          </button>
        </UncontrolledAlert>
        <UncontrolledAlert color="info" isOpen={popupVisible}>
          <b>Success!</b>
          Successful deletion of student information! X
          <button className="close" onClick={() => setPopupVisible(false)}>
            <span aria-hidden="true">&times;</span>
          </button>
        </UncontrolledAlert>
      </div>
      <div>
        <div id="table">
          <table className={styles.custom_table} {...getTableProps()}>
            {" "}
            <thead className={styles.custom_thead}>
              {headerGroups.map((header) => (
                <tr
                  className={styles.custom_tr}
                  {...header.getHeaderGroupProps()}
                >
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
                    className={styles.custom_tr}
                    key={rowIndex}
                    id="rowFont"
                    {...row.getRowProps()}
                    style={{
                      background: isRowSelected ? "skyblue" : "none",
                    }}
                    onClick={() => handleRadioChange(rowIndex)}
                  >
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div id="pagination-nav">
          <div className="pagination-container">
            <Button
              disabled={!(selectedRow >= 0) | (selectedRow === null)}
              onClick={handleDelete}
              id="rightBtn"
            >
              Delete
            </Button>
            <div className="pagination-wrapper">
              <Pagination
                className="pagination justify-content-center"
                listClassName="justify-content-center"
                aria-label="Page navigation example"
              >
                <PaginationItem>
                  <PaginationLink previous href="#" onClick={goToPrevPage} />
                </PaginationItem>
                {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
                  <PaginationItem
                    key={startPage + index}
                    active={startPage + index === currentPage}
                  >
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(startPage + index);
                      }}
                    >
                      {startPage + index}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem disabled={currentPage === pageCount}>
                  <PaginationLink next href="#" onClick={goToNextPage} />
                </PaginationItem>
              </Pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDelete;
