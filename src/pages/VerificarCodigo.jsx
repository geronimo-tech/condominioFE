import React, { useState } from "react";

function VerificarCodigo() {

  const [email, setEmail] = useState("");
  const [codigo, setCodigo] = useState("");

  const verificarCodigo = async () => {

    try {

      const respuesta = await fetch("http://127.0.0.1:8000/api/verificar-codigo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          codigo: codigo
        })
      });

      const data = await respuesta.json();

      alert(data.mensaje);

    } catch (error) {

      console.error(error);
      alert("Error al verificar el código");

    }

  };

  return (
    <div>

      <h2>Verificar código</h2>

      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Código"
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)}
      />

      <br /><br />

      <button onClick={verificarCodigo}>
        Verificar código
      </button>

    </div>
  );
}

export default VerificarCodigo;