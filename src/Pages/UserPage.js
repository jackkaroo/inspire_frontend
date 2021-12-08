import React from 'react';
import {useEffect, useState} from "react";
import {Button, CircularProgress} from "@material-ui/core";
import followers from '../assets/images/people_alt.png';
import avatar from '../assets/images/avatar.png';
import ChallengeItem from "../components/ChallangeItem";
const API_URL = 'http://192.168.31.110:3000';

const getUserData = async (userId) => {
  const url = `${API_URL}/users/${userId}`;
  console.log(API_URL);
  console.log(url);
  const data = await fetch(url);
  return data.json();
};

const getFollowingsData = async (userId) => {
  const url = `${API_URL}/followings?whoId=${userId}`;
  const data = await fetch(url);
  return data.json();
};

export default function UserPage() {
  const [userData, setUserData] = useState({});
  const [followingData, setFollowingData] = useState({});
  const [loading, setLoading] = useState(false);

  const userId = window.localStorage.getItem('user');

  useEffect(() => {
    setLoading(true);
    getUserData(userId)
      .then((data) => {
        return setUserData(data);
      })
      .catch(() => console.log('Something goes wrong..'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    getFollowingsData(userId)
      .then((data) => {
        return setFollowingData(data);
      })
      .catch(() => console.log('Something goes wrong..'))
  }, []);

  return (
    <>
      {loading
        ? (
          <div className="world-loader">
            <CircularProgress/>
          </div>
        )
        : userData && (
          <div className="user_wrapper">
            <div className="user_header">
              <div className="flex">
                <div><img src={avatar} alt="" className="user_avatar"/></div>
                <div>
                  <div className="user_name">{userData.name}</div>
                  <div className="flex"><img src={followers} alt="" className="user_followers"/> Followings: 0</div>
                </div>
              </div>
              <div className="add_challenge_button">
                <Button variant="contained" color="primary">Add new challenge</Button>
              </div>
            </div>
            <hr/>
            <ChallengeItem />
            <ChallengeItem />
            <ChallengeItem />
            <ChallengeItem />
          </div>
        )
      }
    </>
  )
}

