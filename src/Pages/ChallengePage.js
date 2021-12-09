import React, {useEffect, useState} from 'react';
import {Button} from "@material-ui/core";
import AddNewChallengeModal from "../components/modals/AddNewChallengeModal";
import {
    getChallenge,
    getLikesByChallenge,
    getSubchallengesData, postSubchallenge,
} from "../services/api";
import {getDate} from "../utils/functions";
import SubchallengeItem from "../components/SubchallengeItem";
import like from "../assets/images/like.png";

export default function ChallengePage() {
    const [open, setOpen] = React.useState(false);
    const [challengeData, setChallengeData] = React.useState(false);
    const [subchallengesData, setSubchallengesData] = React.useState(false);
    const [likes, setLikes] = useState([]);

    const [values, setValues] = useState({
        text: '',
        desc: '',
    });

    const url = new URL(window.location.href);
    const challengeId = url.pathname.substring(11);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const submitAnswer = () => {
        if (!values.title || !values.desc) {
            return alert('Enter valid values');
        }

        postSubchallenge( { title: values.title, description: values.desc, parentId: parseFloat(challengeId) })
            .then(data => {
                if (!data && !data.ok) {
                    throw new Error("HTTP status " + data.errors);
                }
                getSubchallengesData(challengeId)
                    .then((data) => {
                        return setSubchallengesData(data);
                    })
                    .catch(() => console.log('Something goes wrong..'))

                handleClose();
            })
            .catch(() => console.log('Something goes wrong..'));
    };

    useEffect(() => {
        getChallenge(challengeId)
            .then((data) => {
                return setChallengeData(data);
            })
            .catch(() => console.log('Something goes wrong..'))
    }, [challengeId]);

    useEffect(() => {
        getSubchallengesData(challengeId)
            .then((data) => {
                return setSubchallengesData(data);
            })
            .catch(() => console.log('Something goes wrong..'))
    }, [challengeId]);

    useEffect(() => {
        getLikesByChallenge(challengeId)
            .then((data) => {
                if(Array.isArray(data)) return setLikes(data);
            })
            .catch(() => console.log('Something goes wrong..'))
    }, [challengeId]);

    return (
        <div className="challenge_page_wrapper">
            <div className="challenge_page_header">
                <div>
                    <div className="challeng_name_wrapper">
                        <div className="challeng_name">{challengeData.title}</div>
                        <div className="flex">
                            <img src={like} alt="" className="challenge_icon" />
                            <div>{likes.length}</div>
                        </div>
                    </div>
                    <div className="challeng_date">{getDate(challengeData.createdAt)}</div>
                    <div className="challeng_desc">{challengeData.description}</div>
                </div>
                <div className="add_challenge_button">
                    <Button variant="contained" color="primary" onClick={handleOpen}>Add new subchallenge</Button>
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
                Array.isArray(subchallengesData) &&
                subchallengesData.length > 0 &&
                subchallengesData.map((subchallenge) => <SubchallengeItem subchallenge={subchallenge} key={subchallenge.id} />)}
        </div>
    )
}