import React from 'react';
import {useEffect, useState} from "react";
import {CircularProgress} from "@material-ui/core";
import ChallengeSubscriptionItem from "../components/ChallengeSubscriptionItem";
import {getSubscriptionsData, unsubscribe} from "../services/api";

export default function SubscriptionsPage() {
    const [subscriptionsData, setSubscriptionsData] = useState([]);
    const [loading, setLoading] = useState(false);

    const userId = window.localStorage.getItem('user');

    const sendUnsubscribe = (challengeId) => {
        unsubscribe(challengeId)
          .then((data) => {
              getSubscriptionsData(userId)
                .then((data) => {
                    return setSubscriptionsData(data);
                })
                .catch(() => console.log('Something goes wrong..'))
                .finally(() => setLoading(false))
          })
          .catch(() => console.log('Something goes wrong..'))
          .finally(() => setLoading(false))
    }

    useEffect(() => {
        setLoading(true)
        getSubscriptionsData(userId)
            .then((data) => {
                return setSubscriptionsData(data);
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
                      <div className="title">My subscriptions</div>
                      <hr/>
                      <div>
                          {(subscriptionsData && subscriptionsData.length) ? subscriptionsData.map(subscription =>
                              <ChallengeSubscriptionItem key={subscription.challenge.id} sendUnsubscribe={sendUnsubscribe}
                                                         challenge={subscription.challenge} subscription={subscription} userId={userId}/>)
                            : <h1>You have not subscribed to any challenges yet.</h1>
                          }
                      </div>
                  </div>
              )
            }
        </>
    )

}

