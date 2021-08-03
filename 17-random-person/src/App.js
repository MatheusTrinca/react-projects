import React, { useState, useEffect } from 'react';
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from 'react-icons/fa';

const url = 'https://randomuser.me/api/';
const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg';

function App() {
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState(null);
  const [title, setTitle] = useState('name');
  const [value, setValue] = useState('');

  const getPerson = async () => {
    const response = await fetch(url);
    const data = await response.json();
    const person = data.results[0];
    const { phone, email } = person;
    const { first, last } = person.name;
    const {
      street: { number, name },
    } = person.location;
    const { age } = person.dob;
    const { password } = person.login;
    const { large: image } = person.picture;
    const newPerson = {
      image,
      name: `${first} ${last}`,
      email,
      age,
      street: `${number} ${name}`,
      phone,
      password,
    };
    setPerson(newPerson);
    setValue(newPerson.name);
    setLoading(false);
  };

  useEffect(() => {
    getPerson();
  }, []);

  const handleValue = e => {
    if (e.target.classList.contains('icon')) {
      const newValue = e.target.dataset.label;
      setTitle(newValue);
      setValue(person[newValue]);
    }
  };

  return (
    <main>
      <div className="block bcg-black"></div>
      <div className="block">
        <div className="container">
          <img
            src={person ? person.image : defaultImage}
            alt="User"
            className="user-img"
          />
          <p className="user-title">My {title} is</p>
          <p className="user-value">{value}</p>
          {!loading && (
            <div className="values-list">
              <button
                className="icon"
                data-label="name"
                onMouseOver={handleValue}
              >
                <FaUser />
              </button>
              <button
                className="icon"
                data-label="email"
                onMouseOver={handleValue}
              >
                <FaEnvelopeOpen />
              </button>
              <button
                className="icon"
                data-label="age"
                onMouseOver={handleValue}
              >
                <FaCalendarTimes />
              </button>
              <button
                className="icon"
                data-label="street"
                onMouseOver={handleValue}
              >
                <FaMap />
              </button>
              <button
                className="icon"
                data-label="phone"
                onMouseOver={handleValue}
              >
                <FaPhone />
              </button>
              <button
                className="icon"
                data-label="password"
                onMouseOver={handleValue}
              >
                <FaLock />
              </button>
            </div>
          )}
          <button className="btn" onClick={getPerson}>
            {loading ? 'Loading...' : 'Random Person'}
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
