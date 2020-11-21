import React, { useState, useEffect } from "react";
import "./Exam.css";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import { collectIdsAndDocs } from "../../utilities";
import empty from "../../img/empty.svg";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  List,
  ListItem,
  Modal,
  Typography,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import SendIcon from "@material-ui/icons/Send";
import { makeStyles } from "@material-ui/core/styles";
import { useStateValue } from "../../DataLayer";

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

function Exam() {
  const { patientId } = useParams();
  const [examsToTake, setExamsToTake] = useState([]);
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

  const isAdded = (id) => {
    const added = examsToTake.filter((item) => item.id === id);
    return added.length > 0;
  };

  const handleAdd = (data) => {
    const newExam = {
      name: data.name,
      status: false,
    };
    db.collection("patients")
      .doc(patientId)
      .collection("exams")
      .doc(data.id)
      .set(newExam, { merge: true });
  };

  useEffect(() => {
    db.collection("patients")
      .doc(patientId)
      .collection("exams")
      .where("status", "==", false)
      .onSnapshot((snapshot) => {
        setExamsToTake(snapshot.docs.map((doc) => collectIdsAndDocs(doc)));
      });
  }, [patientId]);

  console.log(examsToTake);

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
        <div className="exam__lists">
          {examsToTake.map((exam) => (
            <Card className={classes.root}>
              <CardContent>
                <Typography variant="h6" component="h2">
                  {exam.name}
                </Typography>
                <Typography variant="body2" component="p">
                  Dr. Michael L. Tan
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">
                  Add Result
                  <SendIcon className="exam__addResultIcon" />
                </Button>
              </CardActions>
            </Card>
          ))}
        </div>
      )}
      <Button
        variant="contained"
        color="default"
        startIcon={<AddCircleIcon />}
        className="exam__addButton"
        onClick={handleOpen}
      >
        Add Test/Exam
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <List component="nav" aria-label="main mailbox folders">
            {exams.map((exam) => (
              <ListItem key={exam.id} button className="exam__list">
                {exam.name}
                {isAdded(exam.id) ? (
                  <IconButton className="exam__iconButton">
                    <CancelIcon className="exam__cancelIcon" />
                  </IconButton>
                ) : (
                  <IconButton
                    className="exam__iconButton"
                    onClick={() => handleAdd(exam)}
                  >
                    <CheckCircleIcon className="exam__listIcon" />
                  </IconButton>
                )}
              </ListItem>
            ))}
          </List>
        </div>
      </Modal>
    </div>
  );
}

export default Exam;
