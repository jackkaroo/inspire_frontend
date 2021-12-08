import {API_URL} from "../index";

export const authorizeUser = async (data) => {
  const url = `${API_URL}/login`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

export const createUser = async (data) => {
  const url = `${API_URL}/register`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  });

  return response.json();
}
