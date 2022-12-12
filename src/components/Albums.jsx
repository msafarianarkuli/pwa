import React, { useEffect, useState } from 'react';

const Users = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users/1/posts')
      .then((result) => {
        result.json().then((resp) => {
          setData(resp);
          //   localStorage.setItem('posts', JSON.stringify(resp));
        });
      })
      .catch((err) => {
        // console.log(err);
        // const posts = localStorage.getItem('posts');
        // console.log(posts);
        // setData(JSON.parse(posts));
      });
  }, []);
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
          </tr>
        </thead>
        <tbody>
          {data.map((album) => (
            <tr key={album.id}>
              <th>{album.id}</th>
              <td>{album.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Users;
