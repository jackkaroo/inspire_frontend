import React, {useEffect, useState} from 'react';
import like from '../assets/images/like.png';
import {getSubchallengesData, getLikesByChallenge} from "../services/api";
import {useHistory} from "react-router-dom";
import {getDate} from "../utils/functions";

export default function ChallengeItem({challenge}) {
  const [subchallengeData, setSubchallengeData] = useState([]);
  const [likes, setLikes] = useState([]);
  const history = useHistory();


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
    <div className="challenge_wrapper" onClick={() => history.push(`/challenge/${challenge.id}`)}>
      <div className="challenge_flex">
        <div>{challenge.title}</div>
        <div className="flex">
          <img src={like} alt="" className="challenge_icon" />
          <div>{likes.length}</div>
        </div>
      </div>
      <div className="challenge_date">{getDate(challenge.createdAt)} ago</div>
      <div className="challenge_description">{challenge.description}</div>
      <div className="challenge_sub">{subchallengeData.length} subchallenges</div>
    </div>
  )
}
