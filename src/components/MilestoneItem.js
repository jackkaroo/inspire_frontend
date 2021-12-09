import React from 'react';
import {getDate} from "../utils/functions";

export default function MilestoneItem({milestone}) {
  return (
    <div className="milestone_wrapper">
      <div>{milestone.text}</div>
      <div className="challenge_date">{getDate(milestone.createdAt)} ago</div>
    </div>
  )
}
