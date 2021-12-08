import React from 'react';
import {unfollow} from "../services/api";

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
