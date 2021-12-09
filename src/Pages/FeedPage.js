import React, {useEffect, useState} from "react";
import {getFeedChallengesData} from "../services/api";
import {CircularProgress} from "@material-ui/core";
import ChallengeItemFeed from "../components/ChallengeItemFeed";


export default function FeedPage() {
    const [challengesData, setChallengesData] = useState([]);
    const [loading, setLoading] = useState(false)

    const userId = window.localStorage.getItem('user');

    useEffect(() => {
        setLoading(true)
        getFeedChallengesData(userId)
          .then((data) => {
              return setChallengesData(data.reverse());
          })
          .catch(() => console.log('Something goes wrong..'))
          .finally(() => setLoading(false))
    }, [userId]);

    return (<>{loading
        ? (
            <div className="world-loader">
                <CircularProgress/>
            </div>
        )
        : (
            <div>
              <div className="title">Feed</div>
              <hr/>
              <div>
                {(Array.isArray(challengesData) && challengesData.length) ? challengesData.map(challenge =>
                    <ChallengeItemFeed key={challenge.id} challenge={challenge} userId={userId}/>)
                  : <h1>You don't have any followings.</h1>
                }
              </div>
            </div>
          )
    }</>)
}
