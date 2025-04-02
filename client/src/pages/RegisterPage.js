import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  async function register(ev) {
    ev.preventDefault();
    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }
    const response = await fetch('http://localhost:4000/register', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      alert('Registration successful');
      <Navigate to={'/login'} />
    } else {
      const data = await response.json();
      setError(data.message || 'Registration failed');
    }
  }

  return (
    <form className="register" onSubmit={register}>
      <h1>Załóż Konto</h1>
      {error && <div className="error">{error}</div>}
      <input type="text"
             placeholder="Nazwa użytkownika"
             value={username}
             onChange={ev => setUsername(ev.target.value)} />
      <input type="password"
             placeholder="Hasło"
             value={password}
             onChange={ev => setPassword(ev.target.value)} />
      <button>Załóż konto</button>
    </form>
  );
}
