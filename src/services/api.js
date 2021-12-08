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

export const getSubchallengesData = async (userId, challengeId) => {
  const url = `${API_URL}/challenges?userId=${userId}&&parentId=${challengeId}`;
  const data = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + localStorage.getItem('token')
    },
  });
  return data.json();
};
