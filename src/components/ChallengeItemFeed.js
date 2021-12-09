import React, {useEffect, useState} from 'react';
import like from '../assets/images/like.png';
import {getSubchallengesData, getLikesByChallenge, postSubscribeToChallenge, postFollow} from "../services/api";
import {useHistory} from "react-router-dom";
import {getDate} from "../utils/functions";
import {Button} from "@material-ui/core";

export default function ChallengeItemFeed({challenge}) {
  const [subchallengeData, setSubchallengeData] = useState([]);
  const [likes, setLikes] = useState([]);


  const subscribeToChallenge = () => {
    console.log(challenge)

    postSubscribeToChallenge({challengeId: challenge.id})
      .then((data) => {
        return alert('Subscribed!');
      })
      .catch(() => console.log('Something goes wrong..'))

    postFollow({whomId: parseFloat(challenge.userId)})
      .then((data) => {
        return data;
      })
      .catch(() => console.log('Something goes wrong..'))
  }

  useEffect(() => {
    getSubchallengesData(challenge.id)
      .then((data) => {
        return setSubchallengeData(data);
      })
      .catch(() => console.log('Something goes wrong..'))
  }, [challenge.id]);

  useEffect(() => {
    getLikesByChallenge(challenge.id)
      .then((data) => {
        if(Array.isArray(data)) return setLikes(data);
      })
      .catch(() => console.log('Something goes wrong..'))
  }, [challenge.id]);

  return (
    <div className="challenge_wrapper">
      <div className="challenge_flex">
        <div>{challenge.title}</div>
        <div className="flex">
          <img src={like} alt="" className="challenge_icon" />
          <div className="likes_length">{likes.length}</div>
          <Button variant="outlined" size="small" color="primary" onClick={subscribeToChallenge}>Subscribe</Button>
        </div>
      </div>
      <div className="challenge_date">{getDate(challenge.createdAt)} ago</div>
      <div className="challenge_description">{challenge.description}</div>
      <div className="challenge_sub">{subchallengeData.length} subchallenges</div>
    </div>
  )
}
