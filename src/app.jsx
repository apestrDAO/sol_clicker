import React, { useState, useEffect } from 'react';
import Lobby from './components/Lobby';
import Game from './components/Game';
import WalletSelector from './components/WalletSelector';
import LobbyNavigation from './components/LobbyNavigation';
import './App.css';

const App = () => {
  const [connected, setConnected] = useState(false);
  const [wallet, setWallet] = useState(null);
  const [lobby, setLobby] = useState(null);
  const [game, setGame] = useState(null);
  const [currentLobbyIndex, setCurrentLobbyIndex] = useState(0);

  const lobbies = [
    { id: 1, name: '0.01 SOL Lobby' },
    { id: 2, name: '0.1 SOL Lobby' },
    { id: 3, name: 'High Stakes Lobby' },
  ];

  const connectWallet = (selectedWallet) => {
    // Simulate a wallet balance
    const mockBalance = (Math.random() * 10).toFixed(2);
    setWallet({ ...selectedWallet, balance: mockBalance });
    setConnected(true);
  };

  const disconnectWallet = () => {
    setWallet(null);
    setConnected(false);
    setLobby(null);
    setGame(null);
    setCurrentLobbyIndex(0);
  };

  const joinLobby = (lobbyId) => {
    setLobby(lobbyId);
  };

  const leaveLobby = () => {
    setLobby(null);
    setGame(null);
  };

  const startGame = (opponent) => {
    setGame({ opponent });
  };

  const endGame = () => {
    setGame(null);
  };

  const navigateLobby = (direction) => {
    if (direction === 'back') {
      setCurrentLobbyIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : lobbies.length - 1));
    } else if (direction === 'forward') {
      setCurrentLobbyIndex((prevIndex) => (prevIndex < lobbies.length - 1 ? prevIndex + 1 : 0));
    }
  };

  return (
    <div className="App">
      <h1>SolClicker</h1>
      {!connected ? (
        <WalletSelector onConnect={connectWallet} />
      ) : (
        <div>
          <div className="wallet-info">
            <p>Connected: {wallet.name}</p>
            <p>Address: {wallet.address}</p>
            <p>Balance: {wallet.balance} SOL</p>
            <button onClick={disconnectWallet}>Disconnect</button>
          </div>
          {lobby ? (
            game ? (
              <Game 
                game={game} 
                wallet={wallet} 
                onEndGame={endGame}
              />
            ) : (
              <Lobby 
                lobbyId={lobby} 
                startGame={startGame} 
                onLeaveLobby={leaveLobby}
                lobbyName={lobbies.find(l => l.id === lobby).name}
              />
            )
          ) : (
            <div className="lobby-selection">
              <LobbyNavigation
                lobbies={lobbies}
                currentIndex={currentLobbyIndex}
                onNavigate={navigateLobby}
              />
              <button onClick={() => joinLobby(lobbies[currentLobbyIndex].id)}>
                Join {lobbies[currentLobbyIndex].name}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
