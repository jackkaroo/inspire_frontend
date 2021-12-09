import React from 'react';

export default function Header() {
  return (
    <div className="header">
      {
        localStorage.getItem("user") &&
        <ul className="header_list">
          <li><a href="/user">My page</a></li>
          <li><a href="/feed">Feed</a></li>
          <li><a href="/my-followings">Followings</a></li>
          <li><a href="/my-subscriptions">Subscriptions</a></li>
        </ul>
      }
    </div>
  )
}
