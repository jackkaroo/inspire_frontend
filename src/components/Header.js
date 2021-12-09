import React from 'react';
import {useHistory} from "react-router-dom";

export default function Header() {
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    history.push("/login");
  }

  return (
    <div className="header">
      {
        localStorage.getItem("user") &&
        <ul className="header_list">
          <li><a href="/user">My page</a></li>
          <li><a href="/feed">Feed</a></li>
          <li><a href="/my-followings">Followings</a></li>
          <li><a href="/my-subscriptions">Subscriptions</a></li>
          <li><a onClick={logout}>Log out</a></li>
        </ul>
      }
    </div>
  )
}
