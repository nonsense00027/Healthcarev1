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

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [{ user }] = useStateValue();

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
        <h5>Our System in Healthcare</h5>
        {/* <IconButton edge="end" aria-label="account of current user">
        <AccountCircle />
      </IconButton> */}
        <div className="header__user">
          <h6>
            Hello, <span>Neil Fred </span>{" "}
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
