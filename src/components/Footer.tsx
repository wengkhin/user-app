import React from "react";
import RefreshIcon from "@mui/icons-material/Refresh";

import "./Footer.scss";

interface FooterProps {
  handleRefreshOnClick: () => void;
}

export function Footer(props: FooterProps) {
  const { handleRefreshOnClick } = props;

  return (
    <div className="footer">
      <button className="secondary" onClick={() => handleRefreshOnClick()}>
        <RefreshIcon className="icon" />
        Refresh
      </button>
    </div>
  );
}
