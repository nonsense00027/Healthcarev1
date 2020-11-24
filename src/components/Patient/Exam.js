import React, { useState, memo } from "react";
import "./Exam.css";
import { useParams } from "react-router-dom";
import empty from "../../img/empty.svg";
import { Button, List, Modal } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { makeStyles } from "@material-ui/core/styles";
import { useStateValue } from "../../DataLayer";
import { ExamsLists } from "./ExamsLists";
import { ExamsToTake } from "./ExamsToTake";

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
    width: 500,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  root: {
    minWidth: 275,
    width: 320,
    margin: 10,
    backgroundColor: "#f6f6f6",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

export const Exam = memo(({ examsToTake }) => {
  const { patientId } = useParams();
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [{ exams }, dispatch] = useStateValue();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log("Exams rendered");

  return (
    <div className="exam">
      {examsToTake.length < 1 ? (
        <div className="exam__empty">
          <img src={empty} alt="empty data" className="exam__emptyIcon" />
          <center>
            <h5>Tests/Exams to be taken is empty</h5>
          </center>
        </div>
      ) : (
        <ExamsToTake examsToTake={examsToTake} />
      )}
      <Button
        variant="contained"
        color="default"
        startIcon={<AddCircleIcon />}
        className="exam__addButton"
        onClick={handleOpen}
      >
        Add/Remove Test
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={`${classes.paper} exam__modal`}>
          <List component="nav" aria-label="main mailbox folders">
            <ExamsLists
              exams={exams}
              patientId={patientId}
              examsToTake={examsToTake}
            />
          </List>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            className="exam__doneButton"
            onClick={handleClose}
          >
            Done
          </Button>
        </div>
      </Modal>
    </div>
  );
});
