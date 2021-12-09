import React from 'react';
import {Button} from "@material-ui/core";

export default function UserFollowingItem({props, sendUnfollow}) {
    return (
        <div className="challenge_sub_wrapper">
            <div className="challenge_flex">
                <div>{props.whom.name}</div>
                <div>
                    <Button size="small" variant="contained" color="primary" onClick={() => sendUnfollow(props.whomId)}>Unfollow</Button>
                </div>
            </div>
        </div>
    )
}
