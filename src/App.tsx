import React, { useEffect, useState } from "react";
import axios from "axios";
import * as moment from "moment";

import {
  Footer,
  NavBar,
  ProfileCover,
  Modal,
  UserList,
  SearchBar,
} from "./components";
import { User, listUsersURL } from "./Global";
import "./App.scss";

function App() {
  // Users that are currently displayed. Use for filtering purposes
  const [shownUsers, setShownUsers] = useState<User[]>();
  // All users fetched from API
  const [users, setUsers] = useState<User[]>();
  // Targeted user to be displayed on modal
  const [targetUser, setTargetUser] = useState<User | undefined>();
  // For searchBox
  const [query, setQuery] = useState<string>();

  useEffect(() => {
    fetchUsers();
  }, []);

  // Perform users filter when query provided
  // Convert all query and data to lower case then
  // Filter by full_name, gender, country, email and createdOn
  useEffect(() => {
    if (!users) return;

    if (query.length === 0) {
      setShownUsers(users);
      return;
    }

    const lowerCaseQuery = query.toLowerCase();

    const newShownUsers = users.filter((user) => {
      const createdOn = moment(user.created_on).format("D MMM Y");

      return (
        user.full_name.toLowerCase().includes(lowerCaseQuery) ||
        user.gender.toLowerCase().includes(lowerCaseQuery) ||
        user.country.toLowerCase().includes(lowerCaseQuery) ||
        user.email.toLowerCase().includes(lowerCaseQuery) ||
        createdOn.toLowerCase().includes(lowerCaseQuery)
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

  function handleSearchBarQueryChange(query: string) {
    setQuery(query);
  }

  // Generate description list for modal
  function prepDescriptionList() {
    return (
      <dl className="descriptionList">
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
        <SearchBar handleQueryOnChange={handleSearchBarQueryChange} />
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
            content={prepDescriptionList()}
          />
        )}
      </div>
    </>
  );
}

export default App;
