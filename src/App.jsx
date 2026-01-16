import { useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

 const login = async () => {
  console.log("CLICK LOGIN");

  try {
    const res = await fetch("http://127.0.0.1:8000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    console.log("STATUS:", res.status);

    const data = await res.json();
    console.log("DATA:", data);

    setMsg(`Bienvenido ${data.user.name} (${data.user.role})`);
  } catch (e) {
    console.error(e);
    setMsg("Error en login");
  }
};

  return (
    <div style={{ padding: "2rem" }}>
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

     <button type="button" onClick={login}>
      Entrar
    </button>

      <p>{msg}</p>
    </div>
  );
}

export default App;
