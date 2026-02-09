import { useEffect, useState, useRef, createRef } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./App.css";

function App() {
  // LOGIN
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  // SESIÓN
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  // TRANSICIONES
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  // NOTIFICACIONES
  const [notifications, setNotifications] = useState([]);
  const [hasNew, setHasNew] = useState(false);

  // REFS (OBLIGATORIO EN REACT 18)
  const loadingRef = useRef(null);
  const alertRef = useRef(null);
  const nodeRefs = useRef({});

  // LOGIN (PETICIÓN HTTP + TRANSICIONES)
  const login = async () => {
    setLoading(true);
    setShowAlert(false);

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
    } catch {
      setMsg("Error en login");
    } finally {
      setLoading(false);
      setShowAlert(true);
    }
  };

  // SIMULACIÓN DE NOTIFICACIONES
  useEffect(() => {
    if (!user) return;

    const timer = setTimeout(() => {
      const nueva = {
        id: Date.now(),
        tipo: "Multa",
        mensaje: "Tienes una multa pendiente"
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
    setHasNew(false);
  };

  return (
    <div className="container">
      {!user ? (
        <>
          <h1>Login Condominio</h1>

          <input
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={login} disabled={loading}>
            Entrar
          </button>

          {/* LOADING */}
          <CSSTransition
            in={loading}
            timeout={300}
            classNames="fade"
            unmountOnExit
            nodeRef={loadingRef}
          >
            <p ref={loadingRef} className="loading">
              Cargando...
            </p>
          </CSSTransition>

          {/* ALERTA */}
          <CSSTransition
            in={showAlert}
            timeout={300}
            classNames="alert"
            unmountOnExit
            nodeRef={alertRef}
          >
            <p ref={alertRef} className="alert-box">
              {msg}
            </p>
          </CSSTransition>
        </>
      ) : (
        <>
          <h2>Panel principal</h2>

          <button className={hasNew ? "bell new" : "bell"}>
            🔔 {hasNew ? "Nueva notificación" : "Notificaciones"}
          </button>

          <TransitionGroup component="ul" className="notificaciones">
            {notifications.map((n) => {
              if (!nodeRefs.current[n.id]) {
                nodeRefs.current[n.id] = createRef();
              }

              return (
                <CSSTransition
                  key={n.id}
                  timeout={300}
                  classNames="item"
                  nodeRef={nodeRefs.current[n.id]}
                >
                  <li
                    ref={nodeRefs.current[n.id]}
                    onClick={() => setHasNew(false)}
                  >
                    [{n.tipo}] {n.mensaje}
                  </li>
                </CSSTransition>
              );
            })}
          </TransitionGroup>

          <button onClick={logout}>Cerrar sesión</button>
        </>
      )}
    </div>
  );
}

export default App;
