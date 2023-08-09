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
import "../../../../assets/css/DeleteTable.css";
export default function SubjectManagement() {
  const navigate = useNavigate();
  const handleBackButtonClick = () => {
    navigate("/courseManagement");
  };
  const [selectedRow, setSelectedRow] = useState(null);
  const handleRadioChange = (rowIndex) => {
    setSelectedRow(rowIndex);
  };

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

  const handleCreate = async (data) => {
    try {
      console.log(data);
      const response = await axios.post(
        "https://4ece099f-93aa-44bb-a61a-5b0fa04f47ac.mock.pstmn.io/AddSubject",
        data
      );
      console.log("서버 응답:");
      console.log(response.data);
      // 서버의 응답 데이터를 확인하거나 다른 작업을 수행하시면 됩니다.
    } catch (error) {
      console.error("Error sending data to server:", error);
    }
  };
  const handleDelete = async () => {
    console.log("rowIndex" + JSON.stringify(data[selectedRow]));
    if (data.length > 0 && selectedRow >= 0 && selectedRow < data.length) {
      console.log("rowIndex" + data[selectedRow]._id);
      try {
        const url = `https://4ece099f-93aa-44bb-a61a-5b0fa04f47ac.mock.pstmn.io/delete/${data[selectedRow]._id}`;
        // const res = await axios.delete(url);
        alert("res.data" + url);
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
        "https://4ece099f-93aa-44bb-a61a-5b0fa04f47ac.mock.pstmn.io/subjectlist"
      )
      .then((res) => {
        console.log(res.data);

        if (
          res.data.hasOwnProperty("subject") &&
          Array.isArray(res.data.subject)
        ) {
          const subjects = res.data.subject;
          setSubjectInfo(subjects);
        } else {
          console.log("데이터가 배열이 아닙니다.");
        }
      })
      .catch((error) => {
        console.log("API 요청에 실패하였습니다.", error);
      });
  }, []);

  const data = useMemo(() => subjectInfo, [subjectInfo]);
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
              Subject Management
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
      <div id="table">
        <table {...getTableProps()}>
          {" "}
          <thead>
            <h4 id="subject_title">Subject list</h4>
            {/* {headerGroups.map((header) => (
              <tr {...header.getHeaderGroupProps()}>
                {header.headers.map((col) => (
                  <th {...col.getHeaderProps()}>{col.render("Header")}</th>
                ))}
              </tr>
            ))} */}
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
            <h4 id="subject_title">Create a new subject</h4>
            <input id="subject_name" type="text" placeholder="Subject Name" />
            <button onClick={handleCreate} id="createBtn">
              Create
            </button>
          </tbody>
        </table>
      </div>
      <div>
        <button onClick={handleCreate} id="nextBtn">
          Next
        </button>
      </div>
    </div>
  );
}
