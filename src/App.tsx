import React, { useEffect, useState } from "react";
import axios from "axios";
import * as moment from "moment";

import { Footer, NavBar, ProfileCover, Modal, UserList } from "./components";
import { User, listUsersURL } from "./Global";
import "./App.scss";

function App() {
  const [shownUsers, setShownUsers] = useState<User[]>();
  const [users, setUsers] = useState<User[]>();

  const [targetUser, setTargetUser] = useState<User | undefined>();

  const [query, setQuery] = useState<string>();

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (!users) return;

    const newShownUsers = users.filter((user) => {
      const createdOn = moment(user.created_on).format("D MMM Y");

      return (
        user.full_name.includes(query) ||
        user.gender.includes(query) ||
        user.country.includes(query) ||
        user.email.includes(query) ||
        createdOn.includes(query)
      );
    });

    setShownUsers(newShownUsers);
  }, [query]);

  function fetchUsers() {
    setUsers(undefined);
    setShownUsers(undefined);

    axios
      .get(listUsersURL)
      .then(function (response) {
        const results = response.data.results;
        const preparedUsers = results.map((d, index) => {
          return {
            id: d.id.value || index,
            full_name: d.name.first.concat(" ", d.name.last),
            email: d.email,
            gender: d.gender,
            country: d.location.country,
            created_on: d.registered.date,
          };
        });

        setUsers(preparedUsers);
        setShownUsers(preparedUsers);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function handleTargetedUser(user: User | undefined) {
    setTargetUser(user);
  }

  function prepDLList() {
    return (
      <dl className="userDetail">
        <dt>Date</dt>
        <dd>{moment(targetUser.created_on).format("D MMM Y")}</dd>
        <dt>Status</dt>
        <dd>Inactive</dd>
        <dt>Gender</dt>
        <dd className="gender">{targetUser.gender}</dd>
        <dt>Country</dt>
        <dd>{targetUser.country}</dd>
        <dt>Email</dt>
        <dd>{targetUser.email}</dd>
      </dl>
    );
  }

  return (
    <>
      <NavBar />
      <ProfileCover />
      <div className="container">
        <div className="searchWrapper">
          <input
            type="text"
            className="searchBox"
            placeholder="Search query goes here!"
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
        </div>
        {shownUsers ? (
          <UserList users={shownUsers} handleRowOnClick={handleTargetedUser} />
        ) : (
          <p className="loading">Fetching data. Please wait.</p>
        )}
        <Footer handleRefreshOnClick={fetchUsers} />
        {targetUser && (
          <Modal
            title={targetUser.full_name}
            handleCloseOnClick={handleTargetedUser}
            content={prepDLList()}
          />
        )}
      </div>
    </>
  );
}

export default App;
