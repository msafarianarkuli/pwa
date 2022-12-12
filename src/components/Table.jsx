import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users/1/posts')
      .then((result) => {
        result.json().then((resp) => {
          setData(resp);
          localStorage.setItem('posts', JSON.stringify(resp));
        });
      })
      .catch((err) => {
        console.log(err);
        const posts = localStorage.getItem('posts');
        console.log(posts);
        setData(JSON.parse(posts));
      });
  }, []);

  return (
    <div className="App">
      <table>
        <thead>
          <th>id</th>
          <th>title</th>
          <th>body</th>
        </thead>
        <tbody>
          {data.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.body}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
