import { useState } from "react";
import api from "../api";

function Login({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [modoRegistro, setModoRegistro] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setMensaje("");

    if (modoRegistro) {
      // Registro
      api
        .post("/auth/register", { email, password })
        .then(() => {
          setMensaje("Usuario creado. Ya podés iniciar sesión.");
          setModoRegistro(false);
          setPassword("");
        })
        .catch(() => setError("No se pudo registrar (¿el email ya existe?)."));
    } else {
      // Login
      api
        .post("/auth/login", { email, password })
        .then((res) => {
          localStorage.setItem("token", res.data.access_token);
          onLogin();
        })
        .catch(() => setError("Email o contraseña incorrectos."));
    }
  }

  return (
    <section className="login">
      <h2>{modoRegistro ? "Registrarse" : "Iniciar sesión"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="campo">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="campo">
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="guardar">
          {modoRegistro ? "Crear cuenta" : "Entrar"}
        </button>
      </form>

      {error && <p className="estado error">{error}</p>}
      {mensaje && <p className="estado">{mensaje}</p>}

      <p className="cambiar-modo">
        {modoRegistro ? "¿Ya tenés cuenta? " : "¿No tenés cuenta? "}
        <button
          type="button"
          className="enlace"
          onClick={() => {
            setModoRegistro(!modoRegistro);
            setError("");
            setMensaje("");
          }}
        >
          {modoRegistro ? "Iniciar sesión" : "Registrarse"}
        </button>
      </p>
    </section>
  );
}

export default Login;