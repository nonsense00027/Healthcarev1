import React, { useState } from "react";
import "./Header.css";
import AccountCircle from "@material-ui/icons/AccountCircle";
import {
  Avatar,
  Container,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { auth } from "../firebase";
import { useStateValue } from "../DataLayer";
import logo from "../img/BlueDrive.png";
import { useHistory } from "react-router-dom";

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [{ user }] = useStateValue();
  const history = useHistory();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    auth.signOut();
  };

  console.log("header user", user);

  return (
    <div className="header">
      <Container className="header__content">
        <img
          src={logo}
          className="header__logo"
          onClick={() => history.push("/")}
        />
        {/* <IconButton edge="end" aria-label="account of current user">
        <AccountCircle />
      </IconButton> */}
        <div className="header__user">
          <h6>
            Hello, <span> {user.firstname} </span>{" "}
          </h6>
          <IconButton onClick={handleClick}>
            <Avatar src="nonsense" alt="nonsense" className="header__avatar" />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </Container>
    </div>
  );
}

export default Header;
