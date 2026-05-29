import { useState } from "react";
import { authApi } from "./api/productApi";

function LoginForm({ onSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const { token } = await authApi.login(username, password);
      localStorage.setItem("jwt", token);
      onSuccess();
    } catch (err) {
      setError(
        err.response?.status === 401
          ? "Credențiale invalide"
          : err.message
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Autentificare</h2>
      <label>
        Utilizator
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoFocus
          required
        />
      </label>
      <label>
        Parolă
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      {error && <p className="status status-error">{error}</p>}
      <button type="submit" disabled={submitting}>
        {submitting ? "Se conectează..." : "Loghează-te"}
      </button>
    </form>
  );
}

export default LoginForm;
