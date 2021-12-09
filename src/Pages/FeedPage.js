import React, {useEffect, useState} from "react";
import {getFeedChallengesData} from "../services/api";
import {CircularProgress} from "@material-ui/core";
import UserFollowingItem from "../components/UserFollowingItem";
import ChallengeItem from "../components/ChallengeItem";


export default function FeedPage() {
    const [challengesData, setChallengesData] = useState([]);
    const [loading, setLoading] = useState(false)

    const userId = window.localStorage.getItem('user');

    useEffect(() => {
        getFeedChallengesData(userId)
            .then((data) => {
                return setChallengesData(data);
            })
            .catch(() => console.log('Something goes wrong..'))
    }, [userId]);

    return (<>{loading
        ? (
            <div className="world-loader">
                <CircularProgress/>
            </div>
        )
        :
        (Array.isArray(challengesData) && challengesData.length) ? challengesData.map(challenge =>
                <ChallengeItem key={challenge.id} challenge={challenge} userId={userId}/>)
            : <h1>You don't have any followings.</h1>
    }</>)
}