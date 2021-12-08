import React from 'react';
import {useEffect, useState} from "react";
import {CircularProgress} from "@material-ui/core";
import UserFollowingItem from "../components/UserFollowingItem";
import {getFollowingsData} from "../services/api";

export default function FollowingsPage() {
    const [followingsData, setFollowingsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const userId = window.localStorage.getItem('user');


    useEffect(() => {
        setLoading(true)
        getFollowingsData(userId)
            .then((data) => {
                return setFollowingsData(data);
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
                : (followingsData && followingsData.length) ? followingsData.map(following =>
                        <UserFollowingItem props={{whom:following.whom, whomId:following.whomId}} userId={userId}/>)
                    : <h1>You have not subscribed to any challenges yet.</h1>
            }
        </>
    )

}

