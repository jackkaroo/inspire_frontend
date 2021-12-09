import React from 'react';
import {useEffect, useState} from "react";
import {CircularProgress} from "@material-ui/core";
import ChallengeSubscriptionItem from "../components/ChallengeSubscriptionItem";
import {getSubscriptionsData} from "../services/api";

export default function SubscriptionsPage() {
    const [subscriptionsData, setSubscriptionsData] = useState([]);
    const [loading, setLoading] = useState(false);

    const userId = window.localStorage.getItem('user');

    useEffect(() => {
        setLoading(true)
        getSubscriptionsData(userId)
            .then((data) => {
                console.log(data)
                return setSubscriptionsData(data);
            })
            .catch(() => console.log('Something goes wrong..'))
            .finally(() => setLoading(false))
    }, [userId]);

    return (
        <>
            {loading
                ? (
                    <div className="world-loader">
                        <CircularProgress/>
                    </div>
                )
                : (Array.isArray(subscriptionsData) && subscriptionsData.length) ? subscriptionsData.map(subscription =>
                <ChallengeSubscriptionItem key={subscription.challenge.id} challenge={subscription.challenge} userId={userId}/>)
                    : <h1>You have not subscribed to any challenges yet.</h1>
            }
        </>
    )

}

