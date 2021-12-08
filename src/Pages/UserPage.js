import React from 'react';
import {useEffect, useState} from "react";
import {Button, CircularProgress, Input, InputLabel, Modal} from "@material-ui/core";
import followers from '../assets/images/people_alt.png';
import avatar from '../assets/images/avatar.png';
import ChallengeItem from "../components/ChallangeItem";
import {API_URL} from "../index";

const getUserData = async (userId) => {
  const url = `${API_URL}/users/${userId}`;
  const data = await fetch(url);
  return data.json();
};

const getFollowingsData = async (userId) => {
  const url = `${API_URL}/followings?whoId=${userId}`;
  const data = await fetch(url);
  return data.json();
};

const getChallengesData = async (userId) => {
  const url = `${API_URL}/challenges?userId=${userId}&&parentId=null`;
  const data = await fetch(url);
  return data.json();
};

const postChallenge = async (data = {}) => {
  const url = `${API_URL}/challenges`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export default function UserPage() {
  const [userData, setUserData] = useState({});
  const [followingData, setFollowingData] = useState([]);
  const [challengesData, setChallengesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = useState({
    title: '',
    desc: '',
  });

  const userId = window.localStorage.getItem('user');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const submitAnswer = () => {
    if (!values.title || !values.desc) {
      return alert('Enter valid');
    }

    postChallenge( { title: values.title, description: values.desc })
      .then(data => {
        console.log(data);
      });

    handleClose();
  };

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

  useEffect(() => {
    getChallengesData(userId)
      .then((data) => {
        return setChallengesData(data);
      })
      .catch(() => console.log('Something goes wrong..'))
  }, [challengesData]);

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
                <Button variant="contained" color="primary" onClick={handleOpen}>Add new challenge</Button>
              </div>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <div className="modal_wrapper">
                  <h1>Add new challenge</h1>
                  <InputLabel htmlFor="standard-adornment-email" className='label'>Enter challenge title</InputLabel>
                  <Input
                    id="standard-adornment-email"
                    type='text'
                    value={values.email}
                    onChange={handleChange('title')}
                    className='input'
                  />
                  <InputLabel htmlFor="standard-adornment-email" className='label'>Enter challenge description</InputLabel>
                  <Input
                    id="standard-adornment-email"
                    type='text'
                    value={values.email}
                    onChange={handleChange('desc')}
                    className='input'
                  />
                  <div className="flex">
                    <Button variant="contained" color="primary" onClick={submitAnswer}>Add challenge</Button>
                    <Button variant="outlined" color="secondary" onClick={handleClose}>Close</Button>
                  </div>
                </div>
              </Modal>
            </div>
            <hr/>
            {
              challengesData && challengesData.map((challenge) =>
                <ChallengeItem key={challenge.id} challenge={challenge} userId={userId} />)
            }
          </div>
        )
      }
    </>
  )
}

