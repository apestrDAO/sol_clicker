import React, { useState, useEffect } from 'react';

const Game = ({ game, wallet, onEndGame }) => {
  const [clicks, setClicks] = useState(0);
  const [time, setTime] = useState(10);
  const [gameState, setGameState] = useState('countdown');
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    let timer;
    if (gameState === 'countdown') {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            clearInterval(timer);
            setGameState('playing');
            return 0;
          }
          return prevCountdown - 1;
        });
      }, 1000);
    } else if (gameState === 'playing') {
      timer = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            setGameState('ended');
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [gameState]);

  const handleClick = () => {
    if (gameState === 'playing') {
      if (
        (clicks < 15 || time <= 6) &&
        (clicks < 28 || time <= 2)
      ) {
        setClicks((prevClicks) => prevClicks + 1);
        // Here you would typically emit a 'click' event to the server
        // socket.emit('click', { clicks: clicks + 1, time });
      }
    }
  };

  return (
    <div className="game">
      <h2>Game</h2>
      <p>Opponent: {game.opponent}</p>
      {gameState === 'countdown' && (
        <div>
          <p>Game starting in: {countdown}s</p>
          <p>Get ready!</p>
        </div>
      )}
      {gameState !== 'countdown' && (
        <div>
          <p>Time: {time}s</p>
          <p>Clicks: {clicks}</p>
          <button onClick={handleClick} disabled={gameState !== 'playing'}>
            Click!
          </button>
        </div>
      )}
      {gameState === 'ended' && (
        <div>
          <p>Game Over!</p>
          <p>Final Score: {clicks} clicks</p>
          <button onClick={onEndGame} className="return-button">
            Return to Lobby
          </button>
        </div>
      )}
    </div>
  );
};

export default Game;
