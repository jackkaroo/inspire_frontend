import React, {useEffect, useState} from 'react';
import like from '../assets/images/like.png';
import {API_URL} from "../index";

const unsubscribe = async (challengeId) => {
    const url = `${API_URL}/subscriptions/${challengeId}`;
    const data = await fetch(url, {
        method: 'DELETE'
    });
    return data.json();
}

const getDate = (dateCreated) => {
    const date1 = new Date(dateCreated);
    const date2 = new Date();

    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 1) {
        return Math.ceil(diffTime / (1000 * 60 * 60)) + ' hours ';
    }

    return diffDays + ' days ';
}

export default function ChallengeSubscriptionItem({challenge}) {
    const sendUnsubscribe = async () => {
        await unsubscribe(challenge.id)
    }

    return (
        <div className="challenge_wrapper">
            <div className="challenge_flex">
                <div>{challenge.title}</div>
                <div>
                    <button onClick={sendUnsubscribe}>Unsubscribe</button>
                </div>
            </div>
            <div className="challenge_date">{getDate(challenge.createdAt)} ago</div>
            <div className="challenge_description">{challenge.description}</div>
        </div>
    )
}
