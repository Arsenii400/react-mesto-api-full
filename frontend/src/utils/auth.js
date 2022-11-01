export const base_url = 'http://localhost:3001';

export const register = (password, email) => {
  return fetch(
    `${base_url}/signup`,
    {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ password, email })
    }
  )
    .then((res) => {
      try {
        if (res.status === 200) {
          return res.json();
        }
      } catch (e) {
        return (e)
      }
    })
};

export const authorize = (password, email) => {
  return fetch(
    `${base_url}/signin`,
    {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ password, email })
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        return (data);
      } else {
        return;
      }
    })
}

export const getContent = (token) => {
  return fetch(
    `${base_url}/users/me`,
    {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
}
