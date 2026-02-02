import { useEffect, useState } from "react";

function App() {
  // LOGIN
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  // SESIÓN
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  // NOTIFICACIONES
  const [notifications, setNotifications] = useState([]);
  const [hasNew, setHasNew] = useState(false);

  // LOGIN
  const login = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setUser(data.user);
      setMsg(`Bienvenido ${data.user.name} (${data.user.role})`);
    } catch (e) {
      setMsg("Error en login");
    }
  };

  // SIMULACIÓN DE WEBSOCKET (luego se conecta a Laravel Reverb)
  useEffect(() => {
    if (!user) return;

    const timer = setTimeout(() => {
      const nueva = {
        id: Date.now(),
        tipo: "Multa",
        mensaje: "Tienes una multa pendiente",
        url: "/multas/1"
      };

      setNotifications((prev) => [nueva, ...prev]);
      setHasNew(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, [user]);

  // LOGOUT
  const logout = () => {
    localStorage.clear();
    setUser(null);
    setNotifications([]);
  };

  // VER NOTIFICACIÓN
  const openNotification = (n) => {
    alert(`Abrir detalle: ${n.tipo}`);
    setHasNew(false);
  };

  return (
    <div style={{ padding: "2rem" }}>
      {!user ? (
        <>
          <h1>Login Condominio</h1>

          <input
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br /><br />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br /><br />

          <button onClick={login}>Entrar</button>

          <p>{msg}</p>
        </>
      ) : (
        <>
          <h2>Panel principal</h2>

          {/* BOTÓN NOTIFICACIONES */}
          <button
            style={{
              background: hasNew ? "red" : "gray",
              color: "white",
              padding: "10px",
              borderRadius: "5px"
            }}
          >
            🔔 {hasNew ? "Nueva notificación" : "Notificaciones"}
          </button>

          <ul>
            {notifications.map((n) => (
              <li
                key={n.id}
                style={{ cursor: "pointer" }}
                onClick={() => openNotification(n)}
              >
                [{n.tipo}] {n.mensaje}
              </li>
            ))}
          </ul>

          <button onClick={logout}>Cerrar sesión</button>
        </>
      )}
    </div>
  );
}

export default App;
