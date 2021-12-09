import {API_URL} from "../index";

export const getUserData = async (userId) => {
  const url = `${API_URL}/users/${userId}`;
  const data = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + localStorage.getItem('token')
    },
  });
  return data.json();
};

export const getFollowingsData = async (userId) => {
  const url = `${API_URL}/followings?whoId=${userId}`;
  const data = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + localStorage.getItem('token')
    },
  });
  return data.json();
};

export const getChallengesData = async (userId) => {
  const url = `${API_URL}/challenges?userId=${userId}&parentId=null`;
  const data = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + localStorage.getItem('token')
    },
  });
  return data.json();
};

export const getChallenge = async (challengeId) => {
  const url = `${API_URL}/challenges/${challengeId}`;
  const data = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + localStorage.getItem('token')
    },
  });
  return data.json();
};

export const postChallenge = async (data = {}) => {
  const url = `${API_URL}/challenges`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + localStorage.getItem('token')
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export const postSubchallenge = async (data = {}) => {
  const url = `${API_URL}/challenges`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + localStorage.getItem('token')
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export const getSubchallengesData = async (challengeId) => {
  const url = `${API_URL}/challenges?parentId=${challengeId}`;
  const data = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + localStorage.getItem('token')
    },
  });
  return data.json();
};

export const unfollow = async (whomId) => {
  const url = `${API_URL}/followings/${whomId}`;
  const data = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + localStorage.getItem('token')
    },
  });
  return data.json();
}

export const unsubscribe = async (challengeId) => {
  const url = `${API_URL}/subscriptions/${challengeId}`;
  const data = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + localStorage.getItem('token')
    },
  });
  return data.json();
}

export const getSubscriptionsData = async (userId) => {
  const url = `${API_URL}/subscriptions?userId=${userId}`;
  const data = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + localStorage.getItem('token')
    },
  });
  return data.json();
}

export const getLikesByChallenge = async (challengeId) => {
  const url = `${API_URL}/likes/${challengeId}`;
  const data = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + localStorage.getItem('token')
    },
  });
  return data.json();
}


export const postMilestone = async (data = {}) => {
  const url = `${API_URL}/milestones`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + localStorage.getItem('token')
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export const getMilestonesData = async (challengeId) => {
  const url = `${API_URL}/milestones?challengeId=${challengeId}`;
  const data = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + localStorage.getItem('token')
    },
  });
  return data.json();
};
