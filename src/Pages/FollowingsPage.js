import React from 'react';
import {useEffect, useState} from "react";
import {CircularProgress, Container} from "@material-ui/core";
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
                console.log(data)
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
                :
                    (Array.isArray(followingsData) && followingsData.length) ? followingsData.map(f =>
                        <UserFollowingItem props={{whom: f.whom, whomId: f.whomId}} userId={userId}/>)
                    : <h1>You don't have any followings.</h1>
            }
        </>
    )

}

