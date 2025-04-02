import {useEffect, useState} from "react";
import {Navigate, useParams} from "react-router-dom";
import Editor from "../Editor";

export default function EditPost() {
  const {id} = useParams();
  const [title,setTitle] = useState('');
  const [summary,setSummary] = useState('');
  const [content,setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect,setRedirect] = useState(false);

  useEffect(() => {
    fetch('http://localhost:4000/post/'+id)
      .then(response => {
        response.json().then(postInfo => {
          setTitle(postInfo.title);
          setContent(postInfo.content);
          setSummary(postInfo.summary);
        });
      });
  }, [id]);

  async function updatePost(ev) {
    ev.preventDefault();
  
    // Walidacja pól formularza
    if (!title || !summary || !content) {
      alert('Proszę wypełnić wszystkie pola formularza.');
      return;
    }
  
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('id', id);
    if (files?.[0]) {
      data.set('file', files?.[0]);
    }
  
    try {
      const response = await fetch('http://localhost:4000/post', {
        method: 'PUT',
        body: data,
        credentials: 'include',
      });
  
      if (response.ok) {
        // Pomyślnie zaktualizowano post
        setRedirect(true);
      } else {
        // Obsługa błędu
        const errorMessage = await response.text();
        alert(`Wystąpił błąd podczas aktualizacji posta: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Wystąpił błąd:', error);
      alert('Wystąpił błąd podczas aktualizacji posta. Spróbuj ponownie później.');
    }
  }
  

  if (redirect) {
    return <Navigate to={'/post/'+id} />
  }

  return (
    <form onSubmit={updatePost}>
      <input type="title"
             placeholder={'Nazwa'}
             value={title}
             onChange={ev => setTitle(ev.target.value)} />
      <input type="summary"
             placeholder={'Opis'}
             value={summary}
             onChange={ev => setSummary(ev.target.value)} />
      <input type="file"
             onChange={ev => setFiles(ev.target.files)} />
      <Editor onChange={setContent} value={content} />
      <button style={{marginTop:'5px'}}>Zaktualizuj post</button>
    </form>
  );
}