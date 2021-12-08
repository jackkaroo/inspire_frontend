import React, {useEffect, useState} from 'react';
import like from '../assets/images/like.png';
import {getLikesByChallenge} from "../services/api";
import {getDate} from "../utils/functions";
import {Button} from "@material-ui/core";

export default function SubchallengeItem({subchallenge}) {
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    getLikesByChallenge(subchallenge.id)
      .then((data) => {
        if(Array.isArray(data)) return setLikes(data);
      })
      .catch(() => console.log('Something goes wrong..'))
  }, [subchallenge.id]);

  return (
    <div className="subchallenge_wrapper">
      <div className="challenge_flex">
        <div>{subchallenge.title}</div>
        <div className="flex">
          <img src={like} alt="" className="challenge_icon" />
          <div className="subchallenge_likes">{likes.length}</div>
          <Button variant="outlined" size="small" color="primary">New post</Button>
        </div>
      </div>
      <div className="challenge_date">{getDate(subchallenge.createdAt)} ago</div>
    </div>
  )
}
