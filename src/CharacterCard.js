// CharacterCard.js
const React = require('react');

const CharacterCard = ({ character, onClick }) => {
  return (
    <div className="character-card" onClick={onClick}>
      <img src={`https://picsum.photos/200?random=${Math.random()}`} alt="" />
      <h3>{character.name}</h3>
      {/* Add species-based color here */}
    </div>
  );
};

module.exports = CharacterCard;
