import { useEffect, useState } from "react";
import echo from "../echo";
import axios from "axios";

export default function NotificationButton({ onClick }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/notifications")
      .then(res => {
        const unread = res.data.filter(n => !n.read).length;
        setCount(unread);
      });

    echo.channel("notifications")
      .listen(".notification.created", () => {
        setCount(prev => prev + 1);
      });

    return () => echo.leave("notifications");
  }, []);

  return (
    <button onClick={onClick} style={{ position: "relative" }}>
      🔔
      {count > 0 && (
        <span style={{
          position: "absolute",
          top: -5,
          right: -5,
          background: "red",
          color: "white",
          borderRadius: "50%",
          padding: "2px 6px",
          fontSize: "12px"
        }}>
          {count}
        </span>
      )}
    </button>
  );
}
