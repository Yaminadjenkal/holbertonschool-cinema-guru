import './components.css';

export default function Activity({ activity }) {
  return (
    <li className="activity-item">
      <p>{activity?.activity || 'Activity details unavailable'}</p>
    </li>
  );
}
