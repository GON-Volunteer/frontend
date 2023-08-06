import React, { useEffect, useMemo, useState } from "react";
import { useTable, usePagination } from "react-table";

import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios"; // Axios 사용 예시
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import "../../assets/css/DeleteTable.css";
import Radio from "../../components/Radio";
import RadioGroup from "../../components/RadioGroup";

function TeacherDelete() {
  const navigate = useNavigate();
  const handleBackButtonClick = () => {
    navigate("/teacherManagement");
  };
  const [value, setValue] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);

  const fullNameHeaderClass = "fullNameHeader";

  // 체크박스가 체크되었는지 여부를 관리하는 상태
  const [checkedRows, setCheckedRows] = useState([]);

  // 체크박스를 클릭할 때마다 해당 행의 인덱스를 상태에 추가 또는 제거하는 함수
  const handleCheckboxChange = (rowIndex) => {
    if (checkedRows.includes(rowIndex)) {
      setCheckedRows((prev) => prev.filter((index) => index !== rowIndex));
    } else {
      setCheckedRows((prev) => [...prev, rowIndex]);
    }
  };
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
      accessor: "pw",
      Header: "PW",
    },
    {
      accessor: "phone_num",
      Header: "Phone No",
    },
  ];
  const columns = useMemo(() => columnData, []);

  const [studentInfo, setstudentInfo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const [pageSize, setPageSize] = useState(10); //한페이지에 보여줄 페이지개수
  useEffect(() => {
    axios
      .get(
        "https://f12e3ca1-926d-4342-bd7ac-a87451995428.mock.pstmn.io/DeleteTeacher"
      )
      .then((res) => {
        if (Array.isArray(res.data)) {
          //map 사용시 새로운 배열 생성해서
          const resultObj = res.data.map((item) => item);
          setstudentInfo(resultObj);
        } else {
          console.log("데이터가 배열이 아닙니다.");
        }
      });
  }, []);

  //studentInfo에 변경이 있을 때만 업데이트
  const data = useMemo(() => studentInfo, [studentInfo]);
  //student delete
  const handleDelete = async () => {
    // Check if the data array is not empty and the rowIndex is within the valid range

    console.log("rowIndex" + JSON.stringify(data[selectedRow]));
    if (data.length > 0 && selectedRow >= 0 && selectedRow < data.length) {
      console.log("rowIndex" + data[selectedRow]._id);
      try {
        const url = `https://f12e3ca1-926d-4342-bd7c-a87451995428.mock.pstmn.io/delete/${data[selectedRow]._id}`;
        // const res = await axios.delete(url);
        alert("res.data" + url);
      } catch (error) {
        console.error("delete 실패. 에러발생:" + error);
      }
    } else {
      console.log("Invalid rowIndex or data is empty.");
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
    state: { pageIndex, pageCount },
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
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Delete Teacher
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
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
              <button onClick={handleDelete} id="deleteBtn">
                Delete
              </button>
            </tbody>
          </table>
        </div>
        <div>
          <button
            onClick={goToPrevPage}
            id="tableLeftBtn"
            disabled={currentPage === 1}
          >
            {" << "}prev
          </button>
          <button
            id="tableRightBtn"
            onClick={goToNextPage}
            disabled={currentPage === Math.ceil(data.length / pageSize)}
          >
            next{" >> "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TeacherDelete;
