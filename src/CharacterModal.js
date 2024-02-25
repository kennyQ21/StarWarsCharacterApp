// CharacterModal.js
const React = require('react');
const { useState, useEffect } = require('react');
const axios = require('axios');

const CharacterModal = ({ character, onClose }) => {
  const [homeworld, setHomeworld] = useState(null);

  useEffect(() => {
    const fetchHomeworld = async () => {
      const response = await axios.get(character.homeworld);
      setHomeworld(response.data);
    };

    fetchHomeworld();
  }, [character.homeworld]);

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{character.name}</h2>
        <p>Height: {character.height} meters</p>
        <p>Mass: {character.mass} kg</p>
        <p>Date Added: {character.created}</p>
        <p>Films: {character.films.length}</p>
        <p>Birth Year: {character.birth_year}</p>
        {homeworld && (
          <div>
            <h3>Homeworld</h3>
            <p>Name: {homeworld.name}</p>
            <p>Terrain: {homeworld.terrain}</p>
            <p>Climate: {homeworld.climate}</p>
            <p>Residents: {homeworld.residents.length}</p>
          </div>
        )}
      </div>
    </div>
  );
};

module.exports = CharacterModal;
