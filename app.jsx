import React, { useState, useEffect, useCallback } from 'react';
import { PublicKey } from '@solana/web3.js';

const CLICK_TOKEN_ADDRESS = new PublicKey('5SstYYuiJPiBYBuWZHJipjtv2JUvXSahWG3wuUiapump');

function App() {
  const [wagerAmount, setWagerAmount] = useState(0.01);
  const [wagerType, setWagerType] = useState('SOL');
  const [isWaiting, setIsWaiting] = useState(false);
  const [gameState, setGameState] = useState('idle');
  const [player1Clicks, setPlayer1Clicks] = useState(0);
  const [player2Clicks, setPlayer2Clicks] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isConnected, setIsConnected] = useState(false);
  const [balance, setBalance] = useState(1); // Initial balance for demonstration

  const handleConnect = () => {
    setIsConnected(true);
  };

  const handleWager = () => {
    if (balance < wagerAmount) {
      alert("Insufficient balance!");
      return;
    }
    setIsWaiting(true);
    // Simulate waiting for an opponent
    setTimeout(() => {
      setIsWaiting(false);
      startGame();
    }, 2000);
  };

  const startGame = useCallback(() => {
    setGameState('playing');
    setPlayer1Clicks(0);
    setPlayer2Clicks(0);
    setTimeLeft(10);
  }, []);

  const handlePlayer1Click = () => {
    if (gameState === 'playing') {
      if (player1Clicks < 18 || timeLeft <= 2) {
        setPlayer1Clicks(prev => prev + 1);
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

        // Simulate player 2 clicks
        if (Math.random() > 0.5) {
          setPlayer2Clicks(prev => (prev < 18 || timeLeft <= 2 ? prev + 1 : prev));
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gameState, timeLeft]);

  useEffect(() => {
    if (player1Clicks >= 20 || player2Clicks >= 20) {
      setGameState('finished');
    }
  }, [player1Clicks, player2Clicks]);

  const handlePayout = () => {
    if (player1Clicks > player2Clicks) {
      setBalance(prev => prev + wagerAmount);
      alert(`You won ${wagerAmount} ${wagerType}!`);
    } else if (player1Clicks < player2Clicks) {
      setBalance(prev => prev - wagerAmount);
      alert(`You lost ${wagerAmount} ${wagerType}.`);
    } else {
      alert("It's a tie! Your wager has been returned.");
    }
    setGameState('idle');
  };

  return (
    <div className="App">
      <h1>Solana Click Game</h1>
      {!isConnected ? (
        <button onClick={handleConnect}>Connect Phantom Wallet</button>
      ) : (
        <>
          <p>Wallet connected (simulated)</p>
          <p>Balance: {balance.toFixed(2)} {wagerType}</p>
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
              <h3>Your clicks: {player1Clicks}</h3>
              <h3>Opponent clicks: {player2Clicks}</h3>
              <button onClick={handlePlayer1Click}>Click!</button>
            </div>
          )}
          {gameState === 'finished' && (
            <div>
              <h2>Game Over!</h2>
              <p>Your clicks: {player1Clicks}</p>
              <p>Opponent clicks: {player2Clicks}</p>
              <p>{player1Clicks > player2Clicks ? 'You win!' : player1Clicks < player2Clicks ? 'You lose!' : 'It\'s a tie!'}</p>
              <button onClick={handlePayout}>Collect Payout</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
