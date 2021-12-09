import React, {useEffect, useState} from 'react';
import like from '../assets/images/like.png';
import {
  getLikesByChallenge,
  getMilestonesData,
  postMilestone,
} from "../services/api";
import {getDate} from "../utils/functions";
import {Button} from "@material-ui/core";
import AddMilestoneModal from "./modals/AddMilestoneModal";
import MilestoneItem from "./MilestoneItem";

export default function SubchallengeItem({subchallenge}) {
  const [likes, setLikes] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [subOpen, setSubOpen] = React.useState(false);
  const [milestonesData, setMilestonesData] = React.useState(false);

  const [values, setValues] = useState({
    text: '',
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClickSub = () => {
    setSubOpen(!subOpen);
  }

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const submitAnswer = () => {
    if (!values.text) {
      return alert('Enter valid values');
    }

    postMilestone( { text: values.text, challengeId: parseFloat(subchallenge.id) })
      .then(data => {
        if (!data && !data.ok) {
          throw new Error("HTTP status " + data.errors);
        }
        getMilestonesData(subchallenge.id)
          .then((data) => {
            return setMilestonesData(data);
          })
          .catch(() => console.log('Something goes wrong..'))

        handleClose();
      })
      .catch(() => console.log('Something goes wrong..'));
  };

  useEffect(() => {
    getLikesByChallenge(subchallenge.id)
      .then((data) => {
        if(Array.isArray(data)) return setLikes(data);
      })
      .catch(() => console.log('Something goes wrong..'))
  }, [subchallenge.id]);

  useEffect(() => {
    getMilestonesData(subchallenge.id)
      .then((data) => {
        return setMilestonesData(data);
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
          <Button variant="outlined" size="small" color="primary" onClick={handleOpen}>New milestone</Button>
          <AddMilestoneModal
            handleClose={handleClose}
            handleChange={handleChange}
            values={values}
            submitAnswer={submitAnswer}
            open={open}
          />
        </div>
      </div>
      <div className="challenge_date">{getDate(subchallenge.createdAt)} ago</div>
      <div className="challenge_posts" onClick={handleClickSub}><i>{Array.isArray(milestonesData) && milestonesData.length || 0} milestones</i></div>

      {
        subOpen &&
        <div>
          {
            Array.isArray(milestonesData) && milestonesData.map((milestone) => <MilestoneItem milestone={milestone} key={milestone.id}/>)
          }
        </div>
      }
    </div>
  )
}
