import { useState } from 'react';
import axios from 'axios';
import './auth.css';
import Button from '../../components/general/Button';
import Login from './Login';
import Register from './Register';

export default function Authentication({ setIsLoggedIn, setUserUsername }) {
  const [_switch, set_switch] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignInClick = () => {
    set_switch(true);
  };

  const handleSignUpClick = () => {
    set_switch(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const route = _switch ? '/api/auth/login' : '/api/auth/register';

    axios
      .post(route, { username, password })
      .then((response) => {
        const token = response.data.accessToken;
        if (token) {
          localStorage.setItem('accessToken', token);
        }
        setUserUsername(username);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.error('Authentication error:', error);
      });
  };

  return (
    <div className="auth-container">
      <div className="auth-header">
        <Button label="Sign In" onClick={handleSignInClick} />
        <Button label="Sign Up" onClick={handleSignUpClick} />
      </div>
      <form className="auth-form" onSubmit={handleSubmit}>
        {_switch ? (
          <Login
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
          />
        ) : (
          <Register
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
          />
        )}
      </form>
    </div>
  );
}
