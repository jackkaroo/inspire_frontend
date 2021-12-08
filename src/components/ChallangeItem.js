import React from 'react';
import like from '../assets/images/like.png';



export default function ChallengeItem({}) {
  return (
    <div className="challenge_wrapper">
      <div className="challenge_flex">
        <div>Challenge 1</div>
        <div>
          <img src={like} alt="" className="challenge_icon" />
          11.7k
        </div>
      </div>
      <div className="challenge_date">45 minutes ago </div>
      <div className="challenge_sub">10 subchallenges</div>
    </div>
  )
}
