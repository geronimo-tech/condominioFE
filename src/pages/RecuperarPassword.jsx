import React, { useState } from "react";

function RecuperarPassword() {

  const [email, setEmail] = useState("");

  const enviarCodigo = async () => {
    try {

      const respuesta = await fetch("http://127.0.0.1:8000/api/recuperar-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email
        })
      });

      const data = await respuesta.json();

      alert(data.mensaje || "Código enviado al correo");

    } catch (error) {
      console.error(error);
      alert("Error al enviar el código");
    }
  };

  return (
    <div>

      <h2>Recuperar contraseña</h2>

      <input
        type="email"
        placeholder="Ingresa tu correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <button onClick={enviarCodigo}>
        Enviar código
      </button>

    </div>
  );
}

export default RecuperarPassword;