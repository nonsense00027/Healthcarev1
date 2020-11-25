import React, { useState, useEffect } from "react";
import "./PatientsTable.css";
import { makeStyles } from "@material-ui/core/styles";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  withStyles,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../../DataLayer";
import { db } from "../../firebase";
import { types } from "../../Reducer";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";

const columns = [
  { id: "lastname", label: "Last Name", minWidth: 120 },
  { id: "firstname", label: "First Name", minWidth: 120 },
  {
    id: "age",
    label: "Age",
    minWidth: 50,
  },
  {
    id: "contact",
    label: "Contact No.",
    minWidth: 100,
  },
  {
    id: "address",
    label: "Address",
    minWidth: 170,
  },
];

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontSize: "15px",
    fontWeight: "600",
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 1000,
  },
});

function PatientsTable() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const history = useHistory();
  const [{ patients }, dispatch] = useStateValue();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClick = (id) => {
    history.push(`/patients/${id}`);
  };

  useEffect(() => {
    db.collection("patients").onSnapshot((snapshot) => {
      dispatch({
        type: types.GET_PATIENTS,
        payload: snapshot.docs,
      });
    });
  }, []);

  console.log("HISTORY", history);
  return (
    <div className="patientsTable">
      <center>
        <h1 className="patientsTable__title">Patients Record</h1>
      </center>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <StyledTableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </StyledTableCell>
                ))}
                <StyledTableCell key="actions" style={{ minWidth: 50 }}>
                  Actions
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patients
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <StyledTableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.id}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                      <TableCell key={row.id} align="left">
                        <IconButton onClick={() => handleClick(row.id)}>
                          <OpenInNewIcon />
                        </IconButton>
                      </TableCell>
                    </StyledTableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 15, 25]}
          component="div"
          count={patients.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default PatientsTable;
