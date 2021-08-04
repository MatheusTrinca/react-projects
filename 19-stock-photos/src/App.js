import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import Photo from './Photo';
const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

function App() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);

  const fetchPhotos = async () => {
    setLoading(true);
    let url;
    let queryUrl = `&query=${searchTerm}`;
    let urlPage = `&page=${page}`;

    if (searchTerm) {
      url = `${searchUrl}${clientID}${urlPage}${queryUrl}`;
    } else {
      url = `${mainUrl}${clientID}${urlPage}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (!searchTerm) {
        setPhotos([...photos, ...data]);
      } else if (searchTerm && page === 1) {
        setPhotos([...data.results]);
      } else {
        setPhotos([...photos, ...data.results]);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPhotos();
    //eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    const height = window.addEventListener('scroll', () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.scrollHeight - 2
      ) {
        setPage(oldPage => {
          return oldPage + 1;
        });
      }
    });
    return () => {
      window.removeEventListener(height);
    };
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    fetchPhotos();
  };

  return (
    <main>
      <section className="search">
        <form className="search-form">
          <input
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            type="text"
            className="form-input"
            placeholder="Search"
          />
          <button className="submit-btn" onClick={handleSubmit}>
            <FaSearch />
          </button>
        </form>
      </section>
      <section className="photos">
        <div className="photos-center">
          {photos.map(image => {
            return <Photo key={image.id} {...image} />;
          })}
        </div>
        {loading && <h2 className="loading">Loading...</h2>}
      </section>
    </main>
  );
}

export default App;
