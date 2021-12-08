import React, {useEffect, useState} from 'react';
import like from '../assets/images/like.png';
import {API_URL} from "../index";

const unfollow = async (whomId) => {
    const url = `${API_URL}/followings/${whomId}`;
    const data = await fetch(url, {
        method: 'DELETE'
    });
    return data.json();
}

export default function UserFollowingItem({props}) {
    const sendUnfollow = async () => {
        await unfollow(props.whomId)
    }

    return (
        <div className="challenge_wrapper">
            <div className="challenge_flex">
                <div>{props.whom.name}</div>
                <div>
                    <button onClick={sendUnfollow}>Unfollow</button>
                </div>
            </div>
        </div>
    )
}
