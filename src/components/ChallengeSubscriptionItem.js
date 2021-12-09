import React from 'react';
import {unsubscribe} from "../services/api";
import {Button} from "@material-ui/core";

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

export default function ChallengeSubscriptionItem({challenge, subscription, sendUnsubscribe}) {
    return (
        <div className="challenge_sub_wrapper">
            <div className="challenge_flex">
                <div>{challenge.title}</div>
                <div>
                    <Button size="small" variant="contained" color="primary" onClick={() => sendUnsubscribe(subscription.challengeId)}>Unsubscribe</Button>
                </div>
            </div>
        </div>
    )
}
