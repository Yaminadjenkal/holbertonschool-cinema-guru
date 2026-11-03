import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userUsername, setUserUsername] = useState('');

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      axios
        .post(
          '/api/auth/',
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => {
          setIsLoggedIn(true);
          setUserUsername(response.data.username);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  return (
    <div className="App">
      {isLoggedIn ? (
        <div>Dashboard</div>
      ) : (
        <div>Authentication</div>
      )}
    </div>
  );
}
