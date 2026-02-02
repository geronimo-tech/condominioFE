import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/notifications")
      .then(res => setNotifications(res.data));
  }, []);

  return (
    <div>
      <h2>Notificaciones</h2>

      {notifications.map(n => (
        <Link key={n.id} to={`/notifications/${n.id}`}>
          <div style={{ borderBottom: "1px solid #444", padding: 10 }}>
            <strong>{n.title}</strong>
            <p>{n.body}</p>
            <small>{n.type}</small>
          </div>
        </Link>
      ))}
    </div>
  );
}
