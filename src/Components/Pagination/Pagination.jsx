import TablePagination from "@mui/material/TablePagination";
// import "./Paginations.css";
import { useEffect, useState } from "react";

const Paginations = (props) => {
  const userdata = props.userlist;

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(props.page - 1);
    setRowsPerPage(props.pagesize);
  }, [props.page, props.pagesize]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    props.handlePageChnage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value));
    props.getPageSize(event.target.value, 0);
  };

  return (
    <>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        sx={{
          ".MuiTablePagination-selectIcon": {
            color: "#1a1a1a",
          },
          ".MuiTouchRipple-root": {
            width: "20px",
            height: "20px",
            marginTop: "10px",
            marginLeft: "10px",
          },
        }}
        component="div"
        count={userdata}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};
export default Paginations;
