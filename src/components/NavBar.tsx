import React from "react";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import logo from "../images/Logo.png";
import "./NavBar.scss";

export function NavBar() {
  return (
    <div className="navbar">
      <div className="logoWrapper">
        <img src={logo} className="logo" />
      </div>
      <div className="actionWrapper">
        <NotificationsNoneOutlinedIcon />
        <SettingsOutlinedIcon />
        <LogoutOutlinedIcon />
      </div>
    </div>
  );
}
