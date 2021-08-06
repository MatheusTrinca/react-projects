import React, { useState, useEffect } from 'react';
import data from './data';
import Article from './Article';

function App() {
  const getStorageTheme = () => {
    let theme = 'light-theme';
    if (localStorage.getItem('theme')) {
      theme = localStorage.getItem('theme');
    }
    return theme;
  };

  const [theme, setTheme] = useState(getStorageTheme);

  useEffect(() => {
    document.documentElement.classList = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    if (theme === 'light-theme') {
      setTheme('dark-theme');
    } else {
      setTheme('light-theme');
    }
  };

  return (
    <main>
      <nav>
        <div className="nav-center">
          <h1>Overreacted</h1>
          <button onClick={toggleTheme} className="btn">
            toggle
          </button>
        </div>
      </nav>
      <section className="articles">
        {data.map(item => (
          <Article key={item.id} {...item} />
        ))}
      </section>
    </main>
  );
}

export default App;
