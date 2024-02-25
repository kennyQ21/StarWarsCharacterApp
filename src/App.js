import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // State for characters, selected character, homeworld, added date, loading, and error
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [homeworld, setHomeworld] = useState(null);
  const [addedDate, setAddedDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // State for pagination
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);

  // Fetch characters from the API
  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://swapi.dev/api/people/?page=${page}`);
        setCharacters(response.data.results);
        setNextPage(response.data.next);
        setPrevPage(response.data.previous);
      } catch (error) {
        setError('Error fetching characters:', error);
      }
      setLoading(false);
    };

    fetchCharacters();
  }, [page]);

  // Fetch homeworld when a character is selected
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

  // Handle character click
  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
    setAddedDate(getAddedDate());
  };

  // Handle close modal
  const handleCloseModal = () => {
    setSelectedCharacter(null);
  };

  // Function to get the added date
  const getAddedDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    return dd + '-' + mm + '-' + yyyy;
  };

  // Handle next page
  const handleNextPage = () => {
    setPage(page + 1);
  };

  // Handle previous page
  const handlePrevPage = () => {
    setPage(page - 1);
  };

  return (
    <div className="App">
      <h1>Star Wars Characters</h1>
      {/* Loading and error handling */}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {/* Character grid */}
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
      {/* Pagination */}
      <div className="pagination">
        {prevPage && <button onClick={handlePrevPage}>Previous</button>}
        {nextPage && <button onClick={handleNextPage}>Next</button>}
      </div>
      {/* Selected character modal */}
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
            <p>Added Date: {addedDate}</p>
            {/* Homeworld info */}
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
