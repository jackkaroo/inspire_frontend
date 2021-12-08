import React from 'react';
import {useEffect, useState} from "react";
import {Button, CircularProgress} from "@material-ui/core";
import followers from '../assets/images/people_alt.png';
import avatar from '../assets/images/avatar.png';
import {useHistory} from "react-router-dom";
import {getChallengesData, getFollowingsData, getUserData, postChallenge} from "../services/api";
import AddNewChallengeModal from "../components/AddNewChallengeModal";
import ChallengeItem from "../components/ChallengeItem";

export default function UserPage() {
  const [userData, setUserData] = useState({});
  const [followingData, setFollowingData] = useState([]);
  const [challengesData, setChallengesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const history = useHistory();

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
      return alert('Enter valid values');
    }

    postChallenge( { title: values.title, description: values.desc })
      .then(data => {
        if (!data && !data.ok) {
          throw new Error("HTTP status " + data.errors);
        }
          getChallengesData(userId)
            .then((data) => {
              return setChallengesData(data);
            })
            .catch(() => console.log('Something goes wrong..'))

          handleClose();
      })
      .catch(() => console.log('Something goes wrong..'));
  };

  useEffect(() => {
    setLoading(true);
    getUserData(userId)
      .then((data) => {
        return setUserData(data);
      })
      .catch(() => console.log('Something goes wrong..'))
      .finally(() => setLoading(false));
  }, [userId]);

  useEffect(() => {
    getFollowingsData(userId)
      .then((data) => {
        return setFollowingData(data);
      })
      .catch(() => console.log('Something goes wrong..'))
  }, [userId]);

  useEffect(() => {
    getChallengesData(userId)
      .then((data) => {
        return setChallengesData(data);
      })
      .catch(() => console.log('Something goes wrong..'))
  }, [userId]);

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      history.push("/login")
    }
  },[history]);

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
                  <div className="flex"><img src={followers} alt="" className="user_followers"/>
                    Followings: {followingData.length}
                  </div>
                </div>
              </div>
              <div className="add_challenge_button">
                <Button variant="contained" color="primary" onClick={handleOpen}>Add new challenge</Button>
              </div>
              <AddNewChallengeModal
                handleClose={handleClose}
                handleChange={handleChange}
                values={values}
                submitAnswer={submitAnswer}
                open={open}
                challengeType='subchallenge'
              />
            </div>
            <hr/>
            {
              Array.isArray(challengesData) && challengesData.length > 0 && challengesData.map((challenge) =>
                <ChallengeItem key={challenge.id} challenge={challenge} userId={userId}/>)
            }
          </div>
        )
      }
    </>
  )
}

