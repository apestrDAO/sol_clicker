import React, { useState, useEffect } from 'react';

const Lobby = ({ lobbyId, lobbyName, startGame, onLeaveLobby }) => {
  const [players, setPlayers] = useState([]);
  const [highestWager, setHighestWager] = useState(0);
  const [countdown, setCountdown] = useState(60);
  const [wagers, setWagers] = useState([]);
  const [currentWager, setCurrentWager] = useState('');

  // Simulated effect to add players (replace with actual socket logic later)
  useEffect(() => {
    const timer = setInterval(() => {
      if (players.length < 2) {
        const newPlayer = { 
          id: Math.random().toString(36).substr(2, 9),
          name: `Player ${players.length + 1}`
        };
        setPlayers(prev => [...prev, newPlayer]);
      } else {
        clearInterval(timer);
      }
    }, 2000);

    return () => clearInterval(timer);
  }, [players]);

  // Simulated countdown for high stakes lobby
  useEffect(() => {
    if (lobbyId === 3) {
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            // Reset countdown and clear wagers when time is up
            setWagers([]);
            setHighestWager(0);
            return 60;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [lobbyId]);

  const submitWager = () => {
    if (currentWager && lobbyId === 3) {
      const wagerAmount = parseFloat(currentWager);
      if (wagerAmount > highestWager) {
        setHighestWager(wagerAmount);
      }
      setWagers(prev => [...prev, { player: `Player ${players.length}`, amount: wagerAmount }]);
      setCurrentWager('');
    }
  };

  return (
    <div className="lobby">
      <h2>{lobbyName}</h2>
      <button onClick={onLeaveLobby} className="return-button">Return to Main Page</button>
      <p>Players: {players.length}/2</p>
      {lobbyId === 3 && (
        <div className="high-stakes-lobby">
          <p>Highest Wager: {highestWager} SOL</p>
          <p>Time Remaining: {countdown}s</p>
          <input 
            type="number" 
            placeholder="Enter wager amount" 
            value={currentWager}
            onChange={(e) => setCurrentWager(e.target.value)}
            min="0"
            step="0.01"
          />
          <button onClick={submitWager}>Submit Wager</button>
          <div className="wager-list">
            <h3>Submitted Wagers:</h3>
            {wagers.length > 0 ? (
              <ul>
                {wagers.map((wager, index) => (
                  <li key={index}>{wager.player}: {wager.amount} SOL</li>
                ))}
              </ul>
            ) : (
              <p>No wagers submitted yet.</p>
            )}
          </div>
        </div>
      )}
      {players.length === 2 && (
        <button onClick={() => startGame(players[1].id)}>Start Game</button>
      )}
    </div>
  );
};

export default Lobby;
