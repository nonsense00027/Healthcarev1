import {
  Button,
  Card,
  CardActions,
  CardContent,
  Modal,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { memo, useState } from "react";
import "./ExamsToTake.css";
import SendIcon from "@material-ui/icons/Send";
import { makeStyles } from "@material-ui/core/styles";
import { useStateValue } from "../../DataLayer";
import SaveIcon from "@material-ui/icons/Save";
import { db, storage } from "../../firebase";
import firebase from "firebase";

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
  root: {
    minWidth: 275,
    width: 320,
    margin: 10,
    backgroundColor: "#f6f6f6",
  },
  paper: {
    position: "absolute",
    width: 600,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
  },
}));

export const ExamsToTake = memo(({ examsToTake, handleSnackbarOpen }) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const [{ user }, dispatch] = useStateValue();

  const [result, setResult] = useState("");
  const [details, setDetails] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [patientId, setPatientId] = useState("");
  const [examId, setExamId] = useState("");
  const [name, setName] = useState("");

  const handleOpen = (id, id2, name) => {
    setOpen(true);
    setPatientId(id);
    setExamId(id2);
    setName(name);
  };

  const handleClose = () => {
    setOpen(false);
    setPatientId("");
    setExamId("");
    setName("");
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    console.log("uploading");
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      //   progress
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      //   error
      (error) => {
        console.log(error);
        alert(error.message);
      },
      //   complete
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("patients")
              .doc(patientId)
              .collection("results")
              .add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                details: details,
                imageUrl: url,
                result: result,
                medtech: user,
                name: name,
              })
              .then((result) => {
                db.collection("patients")
                  .doc(patientId)
                  .collection("exams")
                  .doc(examId)
                  .delete()
                  .then((result) => {
                    setProgress(0);
                    setDetails("");
                    setResult("");
                    setImage(null);
                    handleClose();
                    handleSnackbarOpen();
                  });
              })
              .catch((err) => alert(`${err.message}`));
          });
      }
    );
  };
  console.log("MEDTECH RESULT PATIENT ID", patientId);
  console.log("MEDTECH RESULT EXAM ID", examId);

  return (
    <div className="examsToTake">
      {examsToTake.map((exam) => (
        <Card className={classes.root} key={exam.id}>
          <CardContent>
            <Typography variant="h6" component="h2">
              {exam.name}
            </Typography>
            <Typography variant="body2" component="p">
              Dr. {exam.doctor?.firstname} {exam.doctor?.lastname}
            </Typography>
          </CardContent>
          <CardActions>
            {user.role === "Medtech" && (
              <Button
                size="small"
                onClick={() => handleOpen(exam.patientId, exam.id, exam.name)}
              >
                Add Result
                <SendIcon className="exam__addResultIcon" />
              </Button>
            )}
          </CardActions>
        </Card>
      ))}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={`${classes.paper} home__modal`}>
          <center>
            <h2 className="home__formHeader">Patients Information</h2>
          </center>
          <form
            onSubmit={(e) => handleUpload(e)}
            className="home__addPatientForm"
          >
            <progress
              className="topicUpload__progress"
              value={progress}
              max="100"
            />
            <div>
              <TextField
                label="Result"
                fullWidth
                required
                value={result}
                onChange={(e) => setResult(e.target.value)}
              />
            </div>
            <div>
              <TextField
                label="Details"
                fullWidth
                multiline
                rowsMax={6}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />
            </div>
            <div>
              <input type="file" onChange={handleChange} />
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
    </div>
  );
});
