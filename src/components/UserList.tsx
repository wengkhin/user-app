import React from "react";
import { User } from "../Global";
import * as moment from "moment";
import "./UserList.scss";

interface UserListProps {
  users: User[];
  handleRowOnClick: (user: User | undefined) => void;
}

export function UserList(props: UserListProps) {
  const { users, handleRowOnClick } = props;

  return (
    <div className="dataList">
      <div className="titles">
        <div className="itemsWrapper">
          <div className="item date">Date</div>
          <div className="item name">Name</div>
          <div className="item gender">Gender</div>
          <div className="item country">Country</div>
          <div className="item email">Email</div>
        </div>
      </div>
      <div className="content">
        {users?.map((user) => {
          return (
            <div
              className="row"
              key={user.id}
              onClick={() => handleRowOnClick(user)}
            >
              <div className="itemsWrapper">
                <div className="item date">
                  {moment(user.created_on).format("D MMM Y")}
                </div>
                <div className="item name">{user.full_name}</div>
                <div className="item gender">{user.gender}</div>
                <div className="item country">{user.country}</div>
                <div className="item email">{user.email}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
