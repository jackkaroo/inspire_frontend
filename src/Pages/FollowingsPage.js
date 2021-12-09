import React from 'react';
import {useEffect, useState} from "react";
import {CircularProgress} from "@material-ui/core";
import UserFollowingItem from "../components/UserFollowingItem";
import {getFollowingsData, getSubscriptionsData, unfollow, unsubscribe} from "../services/api";
import ChallengeSubscriptionItem from "../components/ChallengeSubscriptionItem";

export default function FollowingsPage() {
    const [followingsData, setFollowingsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const userId = window.localStorage.getItem('user');

    const sendUnfollow = (userId) => {
        unfollow(userId)
          .then((data) => {
              getFollowingsData(userId)
                .then((data) => {
                    return setFollowingsData(data);
                })
                .catch(() => console.log('Something goes wrong..'))
                .finally(() => setLoading(false))
          })
          .catch(() => console.log('Something goes wrong..'))
          .finally(() => setLoading(false))
    }

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
                : (
                <div>
                    <div className="title">My followings</div>
                    <hr/>
                    <div>
                        {(followingsData && followingsData.length) ? followingsData.map(following =>
                            <UserFollowingItem props={{whom:following.whom, whomId:following.whomId}} userId={userId} sendUnfollow={sendUnfollow}/>)
                          : <h1>You have not subscribed to any challenges yet.</h1>
                        }
                    </div>
                </div>
              )
            }
        </>
    )

}

