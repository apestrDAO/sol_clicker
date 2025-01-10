import React from 'react';

const LobbyNavigation = ({ lobbies, currentIndex, onNavigate }) => {
  return (
    <div className="lobby-navigation">
      <button onClick={() => onNavigate('back')}>&lt; Back</button>
      <span>{lobbies[currentIndex].name}</span>
      <button onClick={() => onNavigate('forward')}>Forward &gt;</button>
    </div>
  );
};

export default LobbyNavigation;
