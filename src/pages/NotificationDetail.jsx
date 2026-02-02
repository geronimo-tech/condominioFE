import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function NotificationDetail() {
  const { id } = useParams();
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/notifications/${id}`)
      .then(res => setNotification(res.data));
  }, [id]);

  if (!notification) return <p>Cargando...</p>;

  return (
    <div>
      <h2>{notification.title}</h2>
      <p>{notification.body}</p>
      <strong>Tipo: {notification.type}</strong>
    </div>
  );
}
