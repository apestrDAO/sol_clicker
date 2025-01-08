import React, { useState, useEffect } from 'react';

function App() {
  const [balance, setBalance] = useState(0);
  const [wager, setWager] = useState(1);
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameActive, setGameActive] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [publicKey, setPublicKey] = useState(null);
  const [player1Clicks, setPlayer1Clicks] = useState(0);
  const [player2Clicks, setPlayer2Clicks] = useState(0);
  const [winner, setWinner] = useState(null);
  const [player1Disabled, setPlayer1Disabled] = useState(false);
  const [player2Disabled, setPlayer2Disabled] = useState(false);

  useEffect(() => {
    let timer;
    if (gameActive && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
        if (timeLeft === 3) { // Enable clicking after 8 seconds (when 2 seconds are left)
          setPlayer1Disabled(false);
          setPlayer2Disabled(false);
        }
      }, 1000);
    } else if (timeLeft === 0) {
      endGame();
    }
    return () => clearTimeout(timer);
  }, [gameActive, timeLeft]);

  useEffect(() => {
    if (player1Clicks >= 20) {
      setWinner('Player 1');
      endGame();
    } else if (player2Clicks >= 20) {
      setWinner('Player 2');
      endGame();
    }
  }, [player1Clicks, player2Clicks]);

  const connectWallet = async () => {
    const simulatedPublicKey = 'SimulatedPhantom' + Math.random().toString(36).substring(2, 15);
    setPublicKey(simulatedPublicKey);
    setWalletConnected(true);
    const simulatedBalance = Math.floor(Math.random() * 100) + 10;
    setBalance(simulatedBalance);
  };

  const startGame = () => {
    if (balance >= wager) {
      setBalance(balance - wager);
      setGameActive(true);
      setTimeLeft(10);
      setPlayer1Clicks(0);
      setPlayer2Clicks(0);
      setWinner(null);
      setPlayer1Disabled(false);
      setPlayer2Disabled(false);
    } else {
      alert("Not enough SOL to wager!");
    }
  };

  const endGame = () => {
    setGameActive(false);
    if (winner) {
      const winnings = wager * 2;
      setBalance(balance + winnings);
      alert(`${winner} won ${winnings} SOL!`);
    } else {
      alert("No winner. The wager has been returned.");
      setBalance(balance + wager);
    }
  };

  const handleClick = (player) => {
    if (gameActive) {
      if (player === 1 && !player1Disabled) {
        setPlayer1Clicks(prev => {
          if (prev === 17 && timeLeft > 2) {
            setPlayer1Disabled(true);
          }
          return prev + 1;
        });
      } else if (player === 2 && !player2Disabled) {
        setPlayer2Clicks(prev => {
          if (prev === 17 && timeLeft > 2) {
            setPlayer2Disabled(true);
          }
          return prev + 1;
        });
      }
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Two-Player SOL Clicker</h1>
      {!walletConnected ? (
        <button onClick={connectWallet}>Connect Phantom Wallet</button>
      ) : (
        <>
          <p>Connected: {publicKey}</p>
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
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <div>
                  <h2>Player 1</h2>
                  <p>Clicks: {player1Clicks}</p>
                  <button 
                    onClick={() => handleClick(1)} 
                    style={{ fontSize: '2em', padding: '20px 40px' }}
                    disabled={player1Disabled}
                  >
                    Click me!
                  </button>
                </div>
                <div>
                  <h2>Player 2</h2>
                  <p>Clicks: {player2Clicks}</p>
                  <button 
                    onClick={() => handleClick(2)} 
                    style={{ fontSize: '2em', padding: '20px 40px' }}
                    disabled={player2Disabled}
                  >
                    Click me!
                  </button>
                </div>
              </div>
            </>
          )}
          <p>First to 20 clicks in 10 seconds wins! You can't pass 18 clicks before 8 seconds.</p>
        </>
      )}
    </div>
  );
}

export default App;
