import React, { useState, useEffect, useCallback } from 'react';
import { PublicKey } from '@solana/web3.js';

const CLICK_TOKEN_ADDRESS = new PublicKey('5SstYYuiJPiBYBuWZHJipjtv2JUvXSahWG3wuUiapump');

function App() {
  const [wagerAmount, setWagerAmount] = useState(0.01);
  const [wagerType, setWagerType] = useState('SOL');
  const [isWaiting, setIsWaiting] = useState(false);
  const [gameState, setGameState] = useState('idle');
  const [clicks, setClicks] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [opponentClicks, setOpponentClicks] = useState(0);
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = () => {
    setIsConnected(true);
  };

  const handleWager = () => {
    setIsWaiting(true);
    // Simulate waiting for an opponent
    setTimeout(() => {
      setIsWaiting(false);
      startGame();
    }, 2000);
  };

  const startGame = useCallback(() => {
    setGameState('playing');
    setClicks(0);
    setOpponentClicks(0);
    setTimeLeft(10);
  }, []);

  const handleClick = () => {
    if (gameState === 'playing') {
      if (clicks < 18 || timeLeft <= 2) {
        setClicks(prev => prev + 1);
      }
    }
  };

  useEffect(() => {
    if (gameState === 'playing') {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setGameState('finished');
            return 0;
          }
          return prev - 1;
        });

        // Simulate opponent clicks
        if (Math.random() > 0.5) {
          setOpponentClicks(prev => (prev < 18 || timeLeft <= 2 ? prev + 1 : prev));
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gameState, timeLeft]);

  useEffect(() => {
    if (clicks >= 20 || opponentClicks >= 20) {
      setGameState('finished');
    }
  }, [clicks, opponentClicks]);

  return (
    <div className="App">
      <h1>Solana Click Game</h1>
      {!isConnected ? (
        <button onClick={handleConnect}>Connect Phantom Wallet</button>
      ) : (
        <>
          <p>Wallet connected (simulated)</p>
          {gameState === 'idle' && (
            <>
              <div>
                <label>
                  Wager Amount:
                  <input
                    type="number"
                    value={wagerAmount}
                    onChange={(e) => setWagerAmount(parseFloat(e.target.value))}
                    min="0.01"
                    step="0.01"
                  />
                </label>
              </div>
              <div>
                <label>
                  Wager Type:
                  <select value={wagerType} onChange={(e) => setWagerType(e.target.value)}>
                    <option value="SOL">SOL</option>
                    <option value="CLICK">$CLICK</option>
                  </select>
                </label>
              </div>
              <button onClick={handleWager} disabled={isWaiting}>
                {isWaiting ? 'Waiting for opponent...' : 'Place Wager'}
              </button>
            </>
          )}
          {gameState === 'playing' && (
            <div>
              <h2>Time left: {timeLeft}</h2>
              <h3>Your clicks: {clicks}</h3>
              <h3>Opponent clicks: {opponentClicks}</h3>
              <button onClick={handleClick}>Click!</button>
            </div>
          )}
          {gameState === 'finished' && (
            <div>
              <h2>Game Over!</h2>
              <p>Your clicks: {clicks}</p>
              <p>Opponent clicks: {opponentClicks}</p>
              <p>{clicks > opponentClicks ? 'You win!' : clicks < opponentClicks ? 'You lose!' : 'It\'s a tie!'}</p>
              <button onClick={startGame}>Play Again</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
