import {Link} from "react-router-dom";
import {useContext, useEffect } from "react";
import {UserContext} from "./UserContext";

export default function Header() {
  const {setUserInfo,userInfo} = useContext(UserContext);
  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, [setUserInfo]);

  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">Bukietowo</Link>
      <nav>
        {username && (
          <>
            <Link to="/create">Utwórz nowy post</Link>
            <button onClick={logout}>Wyloguj ({username})</button>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Zaloguj się</Link>
            <Link to="/register">Załóż konto</Link>
          </>
        )}
      </nav>
    </header>
  );
}