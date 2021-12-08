import React from 'react';
import {useEffect, useState} from "react";
import {Button, CircularProgress, Input, InputLabel, Modal} from "@material-ui/core";
import followers from '../assets/images/people_alt.png';
import avatar from '../assets/images/avatar.png';
import ChallengeItem from "../components/ChallengeItem";
import {API_URL} from "../index";
import ChallengeSubscriptionItem from "../components/ChallengeSubscriptionItem";
import UserFollowingItem from "../components/UserFollowingItem";

const getFollowingsData = async (userId) => {
    const url = `${API_URL}/followings?whoId=${userId}`;
    const data = await fetch(url);
    return data.json();
};

export default function FollowingsPage() {
    const [userData, setUserData] = useState({});
    const [followingsData, setFollowingsData] = useState([]);
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
        setValues({...values, [prop]: event.target.value});
    };

    useEffect(() => {
        getFollowingsData(userId)
            .then((data) => {
                return setFollowingsData(data);
            })
            .catch(() => console.log('Something goes wrong..'))
    }, []);

    return (
        <>
            {loading
                ? (
                    <div className="world-loader">
                        <CircularProgress/>
                    </div>
                )
                : (followingsData && followingsData.length) ? followingsData.map(following =>
                        <UserFollowingItem props={{whom:following.whom, whomId:following.whomId}} userId={userId}/>)
                    : <h1>You have not subscribed to any challenges yet.</h1>
            }
        </>
    )

}

