import React, { useEffect, useMemo, useState } from "react";
import { useTable, usePagination } from "react-table";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios"; // Axios 사용 예시
import { useNavigate, Link } from "react-router-dom";
import "../../assets/css/Home.css";
import styles from "../../assets/css/Table.module.css";
function AnnouncementList({ article1 }) {
  const today = new Date();
  console.log(today);
  const url = "http://localhost:5000";
  const navigate = useNavigate();
  const handleBackButtonClick = () => {
    navigate("/StudentManagement");
  };
  const fullNameHeaderClass = "fullNameHeader";

  //accessor와 받아오는 data keyname이 같아야함
  const columnData = [
    {
      accessor: "posting_id",
      Header: "No",
    },
    {
      accessor: "full_name",
      Header: "Name",
    },
    {
      accessor: "title",
      Header: "Title",
      headerClassName: fullNameHeaderClass,
      //페이지 내용 이동 함수
      Cell: ({ cell: { value }, row: { original } }) => (
        <Link to={`/articles/${original.posting_id}`}>
          {" "}
          <span style={{ color: "rgb(12, 35, 180)" }}>{value}</span>
        </Link>
      ),
    },
    {
      accessor: "publish_date",
      Header: "Date",
      Cell: ({ cell: { value } }) => {
        // check if value is an object and has key $date
        if (typeof value === "object" && value.hasOwnProperty("$date")) {
          const date = new Date(value.$date);

          return date.toLocaleString(undefined, {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
            timeZone: "UTC", // 'UTC'로 설정하거나 원하는 시간대를 지정하십시오.
          });
        }
        return value;
      },
    },
  ];
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
    onReadPosting();
  };
  const columns = useMemo(() => columnData, []);

  const [article, setArticle] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const [pageSize, setPageSize] = useState(); //한페이지에 보여줄 페이지개수
  useEffect(() => {
    onReadPosting();
    handleWindowResize(); // 초기 설정
    window.addEventListener("resize", handleWindowResize);
    // 컴포넌트가 마운트되었을 때 초기 데이터 로딩
    onReadPosting();

    // 컴포넌트가 언마운트될 때 등록된 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  const data = useMemo(() => article, [article]);
  // console.log("data?:" + JSON.stringify(data));
  // 현재 페이지에 해당하는 데이터를 가져오는 함수
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
  };

  // [READ] 게시글 DB에서 불러오기 핸들러
  const onReadPosting = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/articles`)
      .then((res) => {
        console.log("[READ] 게시글 목록 Reloading");
        console.log(typeof res.data);
        if (res.data && Array.isArray(res.data.list)) {
          //map 사용시 새로운 배열 생성해서
          const resultObj = res.data.list.map((item) => item);
          setArticle(resultObj);
        } else {
          console.log("데이터가 배열이 아닙니다.");
        }
      })
      .catch(() => {
        alert("[READ] response (x)");
      });
  };
  //onReadPosting();
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
  const pageCount = Math.ceil(data.length / pageSize);
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
        <table id="table" className={styles.custom_table} {...getTableProps()}>
          <thead className={styles.custom_thead}>
            {headerGroups.map((header) => (
              <tr
                className={styles.custom_tr}
                {...header.getHeaderGroupProps()}
              >
                {header.headers.map((col) => (
                  <th {...col.getHeaderProps()}>{col.render("Header")}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr
                  className={styles.custom_tr}
                  id="rowFont"
                  {...row.getRowProps()}
                >
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        maxWidth: "0",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div>
          <div className="pagination-container">
            <div className="pagination-wrapper">
              <Pagination
                className="pagination justify-content-center"
                listClassName="justify-content-center"
                aria-label="Page navigation example"
              >
                <PaginationItem disabled={currentPage === 1}>
                  <PaginationLink previous href="#" onClick={goToPrevPage} />
                </PaginationItem>
                {Array.from({ length: pageCount }, (_, index) => (
                  <PaginationItem
                    key={index}
                    active={index + 1 === currentPage}
                  >
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
      </div>
    </div>
  );
}

export default AnnouncementList;
