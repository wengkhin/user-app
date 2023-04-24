import React from "react";

import { User } from "../Global";
import "./Modal.scss";

interface ModalProps {
  title: string;
  content: React.ReactNode;
  handleCloseOnClick: (user: User | undefined) => void;
}

export function Modal(props: ModalProps) {
  const { title, content, handleCloseOnClick } = props;

  return (
    <div className="modalOverlay">
      <div className="modal">
        <div className="header">
          <div className="title">
            <h1>{title}</h1>
          </div>
          <div className="exit">
            <span
              className="exitButton"
              onClick={() => handleCloseOnClick(undefined)}
            >
              x
            </span>
          </div>
        </div>
        {content}
      </div>
    </div>
  );
}
