import {
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import React from "react";
import "./Sidebar.css";
import InboxIcon from "@material-ui/icons/Inbox";
import { useStateValue } from "../../DataLayer";

function Sidebar() {
  const [{ user }, dispatch] = useStateValue();
  return (
    <div className="sidebar">
      <div className="admin__info">
        <Avatar src="Admin" className="sidebar__avatar" />
        <h3>{user.firstname}</h3>
        <p>Admin</p>
      </div>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem button selected>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Manage Users" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Tests/Exams" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );
}

export default Sidebar;
