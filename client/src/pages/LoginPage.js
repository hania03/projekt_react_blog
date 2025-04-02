import {useContext, useState} from "react";
import {Navigate} from "react-router-dom";
import {UserContext} from "../UserContext";

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const { setUserInfo } = useContext(UserContext);
    const [error, setError] = useState(null);
  
    async function login(ev) {
      ev.preventDefault();
      if (!username || !password) {
        setError('Proszę wypełnić wszystkie pola');
        return;
      }
  
      try {
        const response = await fetch('http://localhost:4000/login', {
          method: 'POST',
          body: JSON.stringify({ username, password }),
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });
  
        if (response.ok) {
          const userInfo = await response.json();
          setUserInfo(userInfo);
          setRedirect(true);
        } else {
          setError('Nieprawidłowe dane logowania');
        }
      } catch (error) {
        setError('Wystąpił błąd podczas logowania');
      }
    }
  
    if (redirect) {
      return <Navigate to={'/'} />;
    }
  
    return (
      <form className="login" onSubmit={login}>
        <h1>Zaloguj się</h1>
        {error && <div className="error">{error}</div>}
        <input
          type="text"
          placeholder="Nazwa użytkownika"
          value={username}
          onChange={ev => setUsername(ev.target.value)}
        />
        <input
          type="password"
          placeholder="Hasło"
          value={password}
          onChange={ev => setPassword(ev.target.value)}
        />
        <button>Zaloguj się</button>
      </form>
    );
  }
  