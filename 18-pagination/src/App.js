import React, { useState, useEffect } from 'react';
import { useFetch } from './useFetch';
import Follower from './Follower';
function App() {
  const { data, loading } = useFetch();
  const [page, setPage] = useState(0);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    if (loading) return;
    setFollowers(data[page]);
  }, [page, data, loading]);

  const handlePrev = () => {
    let prevPage = page - 1;
    if (prevPage < 0) {
      prevPage = data.length - 1;
    }
    setPage(prevPage);
  };
  const handleNext = () => {
    let nextPage = page + 1;
    if (nextPage > data.length - 1) {
      nextPage = 0;
    }
    setPage(nextPage);
  };

  const handlePage = index => {
    setPage(index);
  };

  return (
    <main>
      <div className="section-title">
        <h1>{loading ? 'Loading...' : 'Pagination'}</h1>
        <div className="underline"></div>
      </div>
      <section className="followers">
        <div className="container">
          {followers.map(follower => (
            <Follower key={follower.id} {...follower} />
          ))}
        </div>
        {!loading && (
          <div className="btn-container">
            <button className="prev-btn" onClick={handlePrev}>
              prev
            </button>
            {data.map((_, index) => (
              <button
                className={`page-btn ${index === page && 'active-btn'}`}
                onClick={() => handlePage(index)}
              >
                {index + 1}
              </button>
            ))}
            <button className="next-btn" onClick={handleNext}>
              next
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
