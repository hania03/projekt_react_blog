import 'react-quill/dist/quill.snow.css';
import {useState} from "react";
import {Navigate} from "react-router-dom";
import Editor from "../Editor";

export default function CreatePost() {
  const [title,setTitle] = useState('');
  const [summary,setSummary] = useState('');
  const [content,setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);
  async function createNewPost(ev) {
    ev.preventDefault();
  
    // Walidacja pól formularza
    if (!title || !summary || !content || !files[0]) {
      alert('Proszę wypełnić wszystkie pola formularza.');
      return;
    }
  
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files[0]);
  
    try {
      const response = await fetch('http://localhost:4000/post', {
        method: 'POST',
        body: data,
        credentials: 'include',
      });
  
      if (response.ok) {
        // Pomyślnie utworzono post
        setRedirect(true);
      } else {
        // Obsługa błędu
        const errorMessage = await response.text();
        alert(`Wystąpił błąd podczas tworzenia posta: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Wystąpił błąd:', error);
      alert('Wystąpił błąd podczas tworzenia posta. Spróbuj ponownie później.');
    }
  }
  

  if (redirect) {
    return <Navigate to={'/'} />
  }
  return (
    <form onSubmit={createNewPost}>
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
      <Editor value={content} onChange={setContent} />
      <button style={{marginTop:'5px'}}>Utwórz post</button>
    </form>
  );
}