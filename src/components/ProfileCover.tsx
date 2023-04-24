import React from "react";
import SendIcon from "@mui/icons-material/Send";
import AddIcon from "@mui/icons-material/Add";

import avatar from "../images/Avatar.png";
import "./ProfileCover.scss";

export function ProfileCover() {
  return (
    <div className="profileCover">
      <div className="profileWrapper">
        <div className="pictureWrapper">
          <img src={avatar} className="avatar" />
        </div>
        <div className="infoWrapper">
          <div className="contentWrapper">
            <h1 className="fullname">John Doe</h1>
            <div className="lastOnline">Last online: 2 days ago</div>
          </div>
        </div>
        <div className="actionWrapper">
          <button className="primary">
            <SendIcon className="icon" />
            Send Message
          </button>
          <button className="secondary">
            <AddIcon className="icon" />
            Add Friends
          </button>
        </div>
      </div>
      <div className="whitespace"></div>
    </div>
  );
}
