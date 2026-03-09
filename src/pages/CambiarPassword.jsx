import React, { useState } from "react";

function CambiarPassword() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const cambiarPassword = async () => {

    try {

      const respuesta = await fetch("http://127.0.0.1:8000/api/cambiar-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      const data = await respuesta.json();

      alert(data.mensaje || "Contraseña cambiada correctamente");

    } catch (error) {

      console.error(error);
      alert("Error al cambiar la contraseña");

    }

  };

  return (
    <div>

      <h2>Cambiar contraseña</h2>

      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Nueva contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={cambiarPassword}>
        Cambiar contraseña
      </button>

    </div>
  );
}

export default CambiarPassword;