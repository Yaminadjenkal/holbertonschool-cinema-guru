import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './navigation.css';
import Activity from '../Activity';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHeart, faClock, faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function SideBar() {
  const [selected, setSelected] = useState('home');
  const [small, setSmall] = useState(true);
  const [activities, setActivities] = useState([]);
  const [showActivities, setShowActivities] = useState(false);

  const navigate = useNavigate();

  const setPage = (pageName) => {
    setSelected(pageName.toLowerCase());
    if (pageName === 'Home') {
      navigate('/home');
    } else if (pageName === 'Favorites') {
      navigate('/favorites');
    } else if (pageName === 'Watch Later') {
      navigate('/watchlater');
    }
  };

  useEffect(() => {
    axios
      .get('/api/activity')
      .then((response) => {
        setActivities(response.data);
      })
      .catch((error) => {
        console.error('Error fetching activities:', error);
      });
  }, []);

  return (
    <nav className={`sidebar ${small ? 'small' : ''}`}>
      <div className="sidebar-toggle" onClick={() => setSmall(!small)}>
        <FontAwesomeIcon icon={small ? faArrowRight : faArrowLeft} />
      </div>

      <ul className="sidebar-navigation">
        <li
          className={selected === 'home' ? 'active' : ''}
          onClick={() => setPage('Home')}
        >
          <FontAwesomeIcon icon={faHome} />
          {!small && <span>Home</span>}
        </li>
        <li
          className={selected === 'favorites' ? 'active' : ''}
          onClick={() => setPage('Favorites')}
        >
          <FontAwesomeIcon icon={faHeart} />
          {!small && <span>Favorites</span>}
        </li>
        <li
          className={selected === 'watch later' || selected === 'watchlater' ? 'active' : ''}
          onClick={() => setPage('Watch Later')}
        >
          <FontAwesomeIcon icon={faClock} />
          {!small && <span>Watch Later</span>}
        </li>
      </ul>

      {!small && (
        <div className="sidebar-activities">
          <div
            className="activities-header"
            onClick={() => setShowActivities(!showActivities)}
          >
            <h3>Latest Activities</h3>
          </div>
          {showActivities && (
            <ul className="activity-list">
              {activities.slice(0, 10).map((activity, index) => (
                <Activity key={activity.id || index} activity={activity} />
              ))}
            </ul>
          )}
        </div>
      )}
    </nav>
  );
}
