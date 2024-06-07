import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import Image from "../Assets/Images/surveylisting.svg";
import { axiosPrivate } from "../../api/axios";
import Paginations from "../Pagination/Pagination";
import Table from "react-bootstrap/Table";
import { Col, Row } from "react-bootstrap";
import { FiFilter } from "react-icons/fi";
import { BiReset } from "react-icons/bi";
import SpinnerLoader from "../Spinner/Spinner";
import { TableCell, TableRow } from "@mui/material";
window.Buffer = window.Buffer || require("buffer").Buffer;
const Jiratable = () => {
  const [pagesize, setPagesize] = useState(10);
  const [nextPage, setNextPage] = useState(1);
  const [data, setData] = useState([]);
  const [data_length, setData_Length] = useState();
  const [show, setShow] = useState(false);
  const [filter_status, setFilter_status] = useState();
  const [loaderState, setLoaderState] = useState(true);
  const getPageSize = (size) => {
    setPagesize(size);
  };
  const handlePageChnage = (pagesize) => {
    setNextPage(pagesize + 1);
  };

  useEffect(() => {
    CallJiraApi(filter_status);
    // eslint-disable-next-line
  }, [pagesize, nextPage]);
  const CallJiraApi = async (status) => {
    console.log(filter_status, "filter_statusfilter_status");

    let jqlQuery;
    if (status === undefined) {
      jqlQuery = `search?maxResults=${pagesize}&startAt=${nextPage}`;
    } else {
      jqlQuery = `search?status=${status}&maxResults=${pagesize}&startAt=${nextPage}`;
    }
    setLoaderState(true);
    try {
      const response = await axiosPrivate.get(jqlQuery);
      console.log(response, "resssss");
      setData(response.data.issues);
      setData_Length(response.data.total);
    } catch (err) {
      if (err.response) {
        alert(`Error ${err.response.status} `);
      } else if (err.request) {
        // The request was made but no response was received
        console.error("Network Error:", err.message);
        alert("Error: Network error. Please check your internet connection.");
      } else {
        alert(`Error: ${err.message}`);
      }
    }
    setLoaderState(false);
  };
  return (
    <>
      <div className="top_container">
        <div className="main_container ">
          <div className="user_serachboxSupply">
            <div style={{ float: "left" }}>
              <h3 className="tableHeading">
                <img src={Image} className="headingIcons" alt="" /> Jira Table
                Detail
              </h3>
            </div>

            <FiFilter
              className="IconColr"
              onClick={() => {
                setShow(!show);
              }}
            />
          </div>

          <hr />
          {show ? (
            <Row className="filterbox">
              <Col lg={6} md={6} xs={11} className="">
                <select
                  id="addPredefinedstyle"
                  className="form-select"
                  defaultValue={filter_status}
                  onChange={(end) => {
                    CallJiraApi(end.target.value);
                    setFilter_status(end.target.value);
                  }}
                >
                  <option value="" disabled selected>
                    select one option
                  </option>
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </Col>

              <Col lg={2} md={3} xs={12} className="col">
                <BiReset
                  size={30}
                  onClick={() => {
                    setShow(!show);
                    setFilter_status(filter_status);
                    CallJiraApi();
                  }}
                />
              </Col>
              <></>
            </Row>
          ) : null}
          <div className="mainContent mainContent2">
            {loaderState === false ? (
              <>
                <div className="table_container">
                  <Table className="customTable">
                    <thead className="">
                      <TableRow>
                        <TableCell className="theadfont">Issue key</TableCell>
                        <TableCell className="theadfont">Summary</TableCell>
                        <TableCell className="theadfont">Issue type</TableCell>
                        <TableCell className="theadfont">Status</TableCell>
                        <TableCell className="theadfont">Assignee</TableCell>
                      </TableRow>
                    </thead>
                    <tbody>
                      {data.map((itemlist, index) => (
                        <>
                          <tr>
                            <td>{itemlist.key}</td>
                            <td>{itemlist?.fields?.summary}</td>
                            <td>{itemlist?.fields?.issuetype?.name}</td>
                            <td>{itemlist.fields?.status?.name}</td>
                            <td>{itemlist?.fields?.assignee?.displayName}</td>
                          </tr>
                        </>
                      ))}
                    </tbody>
                  </Table>
                  <Paginations
                    userlist={data_length}
                    getPageSize={getPageSize}
                    handlePageChnage={handlePageChnage}
                    page={nextPage}
                    pagesize={pagesize}
                  />
                </div>
              </>
            ) : (
              <SpinnerLoader />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Jiratable;
