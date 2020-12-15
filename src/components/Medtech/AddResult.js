import React, { useState } from "react";
import "../css/TopicUpload.css";
import firebase from "firebase";
import { db, storage } from "../../firebase";
import { Button, IconButton, TextField } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import { useParams } from "react-router-dom";

function AddResult() {
  const { examId } = useParams();
  const [result, setResult] = useState("");
  const [details, setDetails] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
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
              .collection("exams")
              .doc(examId)
              .set(
                {
                  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                  details: details,
                  imageUrl: url,
                  result: result,
                },
                { merge: true }
              )
              .then((result) => {
                setProgress(0);
                setDetails("");
                setResult("");
                setImage(null);
                alert("Result uploaded successfully");
              })
              .catch((err) => alert(`${err.message}`));
          });
      }
    );
  };
  return (
    <div className="topicUpload">
      <progress className="topicUpload__progress" value={progress} max="100" />
      {/* <textarea onChange={(e) => setCaption(e.target.value)}></textarea> */}
      {/* <input
        className="topicUpload__caption"
        type="text"
        placeholder="Enter a caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      /> */}
      <TextField
        label="Result"
        fullWidth
        value={result}
        onChange={(e) => setResult(e.target.value)}
      />
      <TextField
        label="Details"
        fullWidth
        multiline
        rowsMax={6}
        value={details}
        onChange={(e) => setDetails(e.target.value)}
      />
      <input type="file" onChange={handleChange} />
      <Button
        className="topicUpload__uploadButton"
        onClick={handleUpload}
        variant="contained"
        color="primary"
      >
        Upload
      </Button>
    </div>
  );
}

export default AddResult;
