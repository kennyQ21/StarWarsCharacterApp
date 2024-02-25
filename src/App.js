// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import your CSS file for styling

function App() {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [homeworld, setHomeworld] = useState(null);
  const [addedDate, setAddedDate] = useState(null); // State for added date

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get('https://swapi.dev/api/people/');
        setCharacters(response.data.results);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };

    fetchCharacters();
  }, []);

  useEffect(() => {
    const fetchHomeworld = async () => {
      try {
        if (selectedCharacter) {
          const planetId = selectedCharacter.homeworld.split('/').filter(Boolean).pop();
          const response = await axios.get(`https://swapi.dev/api/planets/${planetId}/`);
          setHomeworld(response.data);
        }
      } catch (error) {
        console.error('Error fetching homeworld:', error);
      }
    };

    fetchHomeworld();
  }, [selectedCharacter]);

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
    setAddedDate(getAddedDate()); // Set the added date when a character is clicked
  };

  const handleCloseModal = () => {
    setSelectedCharacter(null);
  };

  // Function to get the added date (simulated)
  const getAddedDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();
    return dd + '-' + mm + '-' + yyyy;
  };

  return (
    <div className="App">
      <h1>Star Wars Characters</h1>
      <div className="character-grid">
        {characters.map((character, index) => (
          <div
            key={index}
            className="character-card"
            onClick={() => handleCharacterClick(character)}
          >
            <img src={`https://picsum.photos/seed/${index}/200/300`} alt="Character" />
            <h3>{character.name}</h3>
          </div>
        ))}
      </div>
      {selectedCharacter && (
        <div className="character-info-overlay" onClick={handleCloseModal}>
          <div className="character-info">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <h2>{selectedCharacter.name}</h2>
            <p>Height: {selectedCharacter.height}</p>
            <p>Mass: {selectedCharacter.mass}</p>
            <p>Gender: {selectedCharacter.gender}</p>
            <p>Number of Films: {selectedCharacter.films.length}</p>
            <p>Birth Year: {selectedCharacter.birth_year}</p>
            <p>Added Date: {addedDate}</p> {/* Display added date */}
            {homeworld && (
              <div>
                <h3>Homeworld</h3>
                <p>Name: {homeworld.name}</p>
                <p>Terrain: {homeworld.terrain}</p>
                <p>Climate: {homeworld.climate}</p>
                <p>Amount of Residents: {homeworld.residents.length}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

