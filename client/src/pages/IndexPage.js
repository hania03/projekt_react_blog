import Post from "../Post";
import {useEffect, useState} from "react";

export default function IndexPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      fetch('http://localhost:4000/post')
        .then(response => {
          if (!response.ok) {
            throw new Error('Nie udało się pobrać danych z serwera.');
          }
          return response.json();
        })
        .then(posts => {
          setPosts(posts);
          setLoading(false);
        })
        .catch(error => {
          setError(error.message);
          setLoading(false);
        });
    }, []);
  
    if (loading) {
      return <div>Ładowanie...</div>;
    }
  
    if (error) {
      return <div>Błąd: {error}</div>;
    }
  
    return (
      <>
        {posts.length > 0 ? (
          posts.map(post => <Post key={post._id} {...post} />)
        ) : (
          <div>Brak postów do wyświetlenia.</div>
        )}
      </>
    );
  }
  