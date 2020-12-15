import React from "react";
import "./ResultItem.css";
import { Avatar } from "@material-ui/core";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import NearMeIcon from "@material-ui/icons/NearMe";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import { ExpandMoreOutlined } from "@material-ui/icons";

function ResultItem({ result }) {
  return (
    // <div>{result.name}</div>
    <div className="post">
      <div className="post__header">
        <div className="post__headerInfo">
          <h3>{result.name}</h3>
          <p>{result.timestamp?.toDate().toString()}</p>
        </div>
      </div>
      <div className="post__caption">
        <p>
          <strong>Result:</strong> {result.result}
        </p>
        <p>
          <strong>Details: </strong> {result.details}
        </p>
        <p>
          <strong>Medtech: </strong> {result.medtech.firstname}{" "}
          {result.medtech.lastname}
        </p>
      </div>
      {result.imageUrl && (
        <div className="post__image">
          <img src={result.imageUrl} alt="" />
        </div>
      )}
    </div>
  );
}

export default ResultItem;
