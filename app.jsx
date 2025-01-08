import React, { useState, useEffect } from 'react';

function App() {
  const [balance, setBalance] = useState(10);
  const [wager, setWager] = useState(1);
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameActive, setGameActive] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    let timer;
    if (gameActive && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0) {
      endGame();
    }
    return () => clearTimeout(timer);
  }, [gameActive, timeLeft]);

  const startGame = () => {
    if (balance >= wager) {
      setBalance(balance - wager);
      setGameActive(true);
      setTimeLeft(10);
      setClickCount(0);
    } else {
      alert("Not enough SOL to wager!");
    }
  };

  const endGame = () => {
    setGameActive(false);
    if (clickCount > 20) {
      const winnings = wager * 2;
      setBalance(balance + winnings);
      alert(`You won ${winnings} SOL!`);
    } else {
      alert("You lost the wager. Try again!");
    }
  };

  const handleClick = () => {
    if (gameActive) {
      setClickCount(clickCount + 1);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>SOL Clicker</h1>
      <p>Balance: {balance} SOL</p>
      <p>Wager: 
        <input 
          type="number" 
          value={wager} 
          onChange={(e) => setWager(Math.max(1, parseInt(e.target.value)))}
          min="1"
          max={balance}
        /> SOL
      </p>
      {!gameActive ? (
        <button onClick={startGame}>Start Game</button>
      ) : (
        <>
          <p>Time left: {timeLeft} seconds</p>
          <p>Clicks: {clickCount}</p>
          <button onClick={handleClick} style={{ fontSize: '2em', padding: '20px 40px' }}>
            Click me!
          </button>
        </>
      )}
      <p>Click more than 20 times in 10 seconds to double your wager!</p>
    </div>
  );
}

export default App;
