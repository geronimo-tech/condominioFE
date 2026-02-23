import { useState } from "react";
import api from "../services/api";

function Register() {
  const [form, setForm] = useState({ name:"", email:"", password:"" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await api.post("/register", form);
    alert(res.data.message);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registro</h2>
      <input placeholder="Nombre" onChange={e=>setForm({...form,name:e.target.value})}/>
      <input placeholder="Email" onChange={e=>setForm({...form,email:e.target.value})}/>
      <input type="password" placeholder="Password" onChange={e=>setForm({...form,password:e.target.value})}/>
      <button>Registrar</button>
    </form>
  );
}

export default Register;