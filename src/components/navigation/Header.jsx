import './navigation.css';
import { FontAwesomeIcon } from '@fontawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

export default function Header({ userUsername, setIsLoggedIn }) {
  const logout = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
  };

  return (
    <nav className="header-nav">
      <div className="header-brand">
        <h2>Cinema Guru</h2>
      </div>
      <div className="header-user">
        <img src="https://picsum.photos/100/100" alt="User Avatar" />
        <p>Welcome, {userUsername}</p>
        <span className="logout-span" onClick={logout}>
          <FontAwesomeIcon icon={faSignOutAlt} />
          Logout
        </span>
      </div>
    </nav>
  );
}
