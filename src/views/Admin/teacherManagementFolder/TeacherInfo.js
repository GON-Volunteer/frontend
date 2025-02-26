import React, { useEffect, useMemo, useState } from "react";
import { useTable, usePagination } from "react-table";

import axios from "axios"; // Axios 사용 예시
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { Button, UncontrolledAlert } from "reactstrap";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import "../../../assets/css/DeleteTable.css";
import styles from "../../../assets/css/Table.module.css";

function TeacherInfo() {
  const navigate = useNavigate();
  const handleBackButtonClick = () => {
    navigate("/teacherManagement");
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
  ];
  const columns = useMemo(() => columnData, []);

  const [teacherInfo, setTeacherInfo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const [pageSize, setPageSize] = useState(); //한페이지에 보여줄 페이지개수
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
    onReadTeachersInfo();
  };
  const onReadTeachersInfo = async () => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/teachers/`).then((res) => {
      // console.log("???" + res);
      if (Array.isArray(res.data)) {
        //map 사용시 새로운 배열 생성해서
        // const resultObj = res.data.map((item) => item);
        // setTeacherInfo(resultObj);
        const teachers = res.data.filter((teacher) => {
          const id = teacher.id;
          return (
            id !== "gonTeacher" && id !== "claschoolnp" && id !== "gonAdmin"
          );
        });
        setTeacherInfo(teachers);
        console.log("teacherinfo" + teachers);
      } else {
        console.log("데이터가 배열이 아닙니다.");
      }
    });
  };
  useEffect(() => {
    onReadTeachersInfo();

    handleWindowResize(); // 초기 설정
    window.addEventListener("resize", handleWindowResize);
    onReadTeachersInfo();
    // 컴포넌트가 언마운트될 때 등록된 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  //teacherInfo 변경이 있을 때만 업데이트
  const data = useMemo(() => teacherInfo, [teacherInfo]);
  //student delete
  const handleEdit = async () => {
    // Check if the data array is not empty and the rowIndex is within the valid range

    console.log("rowIndex" + JSON.stringify(data[selectedRow]));
    const selectedRowData = data[selectedRow];
    navigate("/teacherManagement/teacherinfo/teacherEdit", {
      state: { rowData: selectedRowData },
    });
    // if (data.length > 0 && selectedRow >= 0 && selectedRow < data.length) {
    // } else {
    //   console.log("Invalid rowIndex or data is empty.");
    // }
  };

  // 현재 페이지에 해당하는 데이터를 가져오는 함수
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
  };
  const pageCount = Math.ceil(data.length / pageSize);
  const itemsPerPage = 5; // 한 페이지당 아이템 수
  const startPage =
    Math.floor((currentPage - 1) / itemsPerPage) * itemsPerPage + 1;
  const endPage = Math.min(startPage + itemsPerPage - 1, pageCount);
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
              Edit Teacher Info
            </Typography>
          </Toolbar>
        </AppBar>
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
            <Button onClick={handleEdit} id="rightBtn">
              Edit
            </Button>
            <div className="pagination-wrapper">
              <Pagination
                className="pagination justify-content-center"
                listClassName="justify-content-center"
                aria-label="Page navigation example"
              >
                <PaginationItem disabled={currentPage === 1}>
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

export default TeacherInfo;
