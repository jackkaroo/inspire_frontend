import React from 'react';
import {useEffect, useState} from "react";
import {Button, CircularProgress, Input, InputLabel, Modal} from "@material-ui/core";
import followers from '../assets/images/people_alt.png';
import avatar from '../assets/images/avatar.png';
import ChallengeItem from "../components/ChallengeItem";
import {API_URL} from "../index";
import ChallengeSubscriptionItem from "../components/ChallengeSubscriptionItem";

const getSubscriptionsData = async (userId) => {
    const url = `${API_URL}/subscriptions?userId=${userId}`;
    const data = await fetch(url);
    return data.json();
}

const getUserData = async (userId) => {
    const url = `${API_URL}/users/${userId}`;
    const data = await fetch(url);
    return data.json();
};


const getChallengesData = async (userId) => {
    const url = `${API_URL}/challenges?userId=${userId}&&parentId=null`;
    const data = await fetch(url);
    return data.json();
};

const postChallenge = async (data = {}) => {
    const url = `${API_URL}/challenges`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });
    return response.json();
}

export default function SubscriptionsPage() {
    const [userData, setUserData] = useState({});
    const [subscriptionsData, setSubscriptionsData] = useState([]);
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
        getSubscriptionsData(userId)
            .then((data) => {
                return setSubscriptionsData(data);
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
                : (subscriptionsData && subscriptionsData.length) ? subscriptionsData.map(subscription =>
                <ChallengeSubscriptionItem key={subscription.challenge.id} challenge={subscription.challenge} userId={userId}/>)
                    : <h1>You have not subscribed to any challenges yet.</h1>
            }
        </>
    )

}

