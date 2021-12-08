const users = [
  {
    "id": 1,
    "email": "katya@gmail.com",
    "password": "ipz-4"
  }
]

export const authorizeUser = (email, password) => {
  const user = users.find(user => user.email === email);
  if (user && user.password === password) {
    window.localStorage.setItem('user', user.id)
    return true;
  }
  return false;
}
