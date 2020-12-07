import React, { useEffect, useState } from "react";
import "./User.css";
import { auth, auth2, db } from "../../firebase";
import UserTable from "./UserTable";
import { collectIdsAndDocs } from "../../utilities";
import {
  Button,
  Fab,
  MenuItem,
  Modal,
  Select,
  Snackbar,
  TextField,
  Tooltip,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import MuiAlert from "@material-ui/lab/Alert";
import { useStateValue } from "../../DataLayer";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 600,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
  },
}));

function User() {
  const classes = useStyles();
  const [{ user }] = useStateValue();
  const [modalStyle] = useState(getModalStyle);
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const resetFields = () => {
    setFirstname("");
    setLastname("");
    setContact("");
    setAddress("");
    setRole("");
    setEmail("");
    setPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const signedInUser = {
      email: user.email,
      password: user.password,
    };
    auth2
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        const userId = result.user.uid;
        db.collection("users")
          .doc(userId)
          .set(
            {
              firstname,
              lastname,
              address,
              contact,
              role,
              email,
              password,
            },
            { merge: true }
          )
          .then((res) => {
            setOpen(false);
            resetFields();
            auth2.signOut();
            auth
              .signInWithEmailAndPassword(
                signedInUser.email,
                signedInUser.password
              )
              .then((res) => {
                setSnackbarOpen(true);
              });
          });
      })

      .catch((err) => alert(err.message));
  };

  useEffect(() => {
    const unsubscribe = db.collection("users").onSnapshot((snapshot) => {
      setUsers(snapshot.docs.map((doc) => collectIdsAndDocs(doc)));
    });
    return () => {
      unsubscribe();
    };
  }, []);

  console.log("ADMIN", user);

  return (
    <div className="user">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={`${classes.paper} home__modal`}>
          <center>
            <h2 className="home__formHeader">Users Information</h2>
          </center>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="home__addPatientForm"
          >
            <div>
              <TextField
                label="First Name"
                autoFocus
                fullWidth
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required
              />
              <TextField
                label="Last Name"
                fullWidth
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
              />
            </div>
            <div>
              <TextField
                label="Address"
                fullWidth
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div>
              <TextField
                label="Contact No."
                fullWidth
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
              />
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                fullWidth
                displayEmpty
                required
              >
                <MenuItem value="" disabled>
                  Select Role
                </MenuItem>
                <MenuItem value={"Admin"}>Admin</MenuItem>
                <MenuItem value={"Nurse"}>Nurse</MenuItem>
                <MenuItem value={"Medtech"}>Medtech</MenuItem>
                <MenuItem value={"Doctor"}>Doctor</MenuItem>
              </Select>
            </div>
            <div>
              <TextField
                label="Email address"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <TextField
                label="Password"
                fullWidth
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
              startIcon={<SaveIcon />}
              fullWidth
              type="submit"
            >
              Save
            </Button>
          </form>
        </div>
      </Modal>

      <UserTable users={users} />
      <Tooltip title="Add Patient" aria-label="add" arrow>
        <Fab
          color="primary"
          aria-label="add"
          className="home__addPatient"
          onClick={handleOpen}
        >
          <AddIcon />
        </Fab>
      </Tooltip>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          User was successfully added!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default User;
