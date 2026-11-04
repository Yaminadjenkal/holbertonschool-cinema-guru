import { useState } from 'react';
import './auth.css';
import Button from '../../components/general/Button';
import Login from './Login';
import Register from './Register';

export default function Authentication({ setIsLoggedIn, setUserUsername }) {
  const [_switch, set_switch] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignInClick = (e) => {
    e.preventDefault();
    set_switch(true);
  };

  const handleSignUpClick = (e) => {
    e.preventDefault();
    set_switch(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-header">
        <Button label="Sign In" onClick={handleSignInClick} />
        <Button label="Sign Up" onClick={handleSignUpClick} />
      </div>
      <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
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
