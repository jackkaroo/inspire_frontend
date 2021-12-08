import React, {useEffect, useState} from 'react';
import like from '../assets/images/like.png';
import {API_URL} from "../index";

const getSubchallengesData = async (userId, challengeId) => {
  const url = `${API_URL}/challenges?userId=${userId}&&parentId=${challengeId}`;
  const data = await fetch(url);
  return data.json();
};

const getDate = (dateCreated) => {
  const date1 = new Date(dateCreated);
  const date2 = new Date();

  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 1) {
    return Math.ceil(diffTime / (1000 * 60 * 60)) + ' hours ';
  }

  return diffDays + ' days ';
}

export default function ChallengeItem({challenge}) {
  const [subchallengeData, setSubchallengeData] = useState([]);

  useEffect(() => {
    getSubchallengesData(challenge.userId, challenge.id)
      .then((data) => {
        return setSubchallengeData(data);
      })
      .catch(() => console.log('Something goes wrong..'))
  }, []);

  return (
    <div className="challenge_wrapper">
      <div className="challenge_flex">
        <div>{challenge.title}</div>
        <div>
          <img src={like} alt="" className="challenge_icon" />
          11.7k
        </div>
      </div>
      <div className="challenge_date">{getDate(challenge.createdAt)} ago</div>
      <div className="challenge_description">{challenge.description}</div>
      <div className="challenge_sub">{subchallengeData.length} subchallenges</div>
    </div>
  )
}
