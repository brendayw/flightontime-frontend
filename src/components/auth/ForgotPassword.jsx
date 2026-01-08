// src/pages/ForgotPassword.jsx
import { useState } from "react";
import useAuth from "../auth/useAuth";

const ForgotPassword = () => {
  const { forgotPassword, error } = useAuth();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const msg = await forgotPassword({ email });
    if (msg) setMessage(msg);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Recuperar contraseña</h2>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
      <input type="email" onChange={(e) => setEmail(e.target.value)} />
      <button>Enviar</button>
    </form>
  );
};

export default ForgotPassword;