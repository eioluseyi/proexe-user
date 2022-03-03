import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  removeUser,
  resetSelectedUser,
  setSelectedUser
} from "../redux/user";
import { createData } from "../helpers";
import { Link } from "react-router-dom";
import orderBy from "lodash.orderby";
import { FaSort } from "react-icons/fa";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ConfirmAlert from "./ConfirmAlert";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.action.hover
    // color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:last-child td, &:last-child th": {
    border: 0
  }
}));

export default function UserTable() {
  const { users } = useSelector((state) => state.users);

  const rows = users.map(({ name, username, email, city, ...rest }) =>
    createData(rest?.id ?? null, name, username, email, city)
  );
  const [sortOrder, setSortOrder] = React.useState(null);

  const data = orderBy(rows, ["username"], [sortOrder]);

  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = React.useState(false);
  const [cb, setCb] = React.useState(() => {});

  const sortBy = (dir) => {
    setSortOrder(dir);
    setAnchorEl(null);
  };

  const dispatch = useDispatch();

  React.useEffect(() => {
    !users.length && dispatch(fetchUsers());
    dispatch(resetSelectedUser());
  }, [users, dispatch]);

  const confirmDelete = (fn) => {
    setIsConfirmDeleteOpen(true);
    setCb(fn);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <ConfirmAlert
        callback={cb}
        open={isConfirmDeleteOpen}
        handleClose={() => setIsConfirmDeleteOpen(false)}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 600 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>id</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>
                Username
                <IconButton aria-label="sort" onClick={openMenu}>
                  <FaSort />
                </IconButton>
                <Menu
                  id="demo-positioned-menu"
                  aria-labelledby="demo-positioned-button"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left"
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left"
                  }}
                >
                  <MenuItem onClick={() => sortBy("asc")}>Ascending</MenuItem>
                  <MenuItem onClick={() => sortBy("desc")}>Descending</MenuItem>
                </Menu>
              </StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>City</StyledTableCell>
              <StyledTableCell>Edit</StyledTableCell>
              <StyledTableCell>Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.id}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell>{row.username}</StyledTableCell>
                <StyledTableCell>{row.email}</StyledTableCell>
                <StyledTableCell>{row.city}</StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    component={Link}
                    onClick={() => dispatch(setSelectedUser(row))}
                    variant="contained"
                    color="warning"
                    to="/form"
                  >
                    edit
                  </Button>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() =>
                      confirmDelete(() => dispatch(removeUser(row.id)))
                    }
                  >
                    delete
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
