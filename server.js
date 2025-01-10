import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { Connection, PublicKey, Transaction } from '@solana/web3.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

const lobbies = {
  1: { wager: 0.01, players: [] },
  2: { wager: 0.1, players: [] },
  3: { wager: 0, players: [], highestWager: 0, countdown: 60 }
};

const games = {};

const connection = new Connection('https://api.mainnet-beta.solana.com');

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('joinLobby', ({ lobbyId, walletAddress }) => {
    const lobby = lobbies[lobbyId];
    if (lobby) {
      lobby.players.push({ id: socket.id, walletAddress });
      socket.join(`lobby-${lobbyId}`);
      io.to(`lobby-${lobbyId}`).emit('playerJoined', { id: socket.id, walletAddress });

      if (lobby.players.length === 2 && lobbyId !== 3) {
        startGame(lobbyId);
      }
    }
  });

  socket.on('submitWager', ({ lobbyId, amount }) => {
    if (lobbyId === 3) {
      const lobby = lobbies[3];
      if (amount > lobby.highestWager) {
        lobby.highestWager = amount;
        io.to('lobby-3').emit('highestWagerUpdated', amount);
      }
    }
  });

  socket.on('click', ({ clicks, time }) => {
    // Handle click logic
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
    // Remove player from lobby
  });
});

function startGame(lobbyId) {
  const lobby = lobbies[lobbyId];
  const gameId = `game-${Date.now()}`;
  games[gameId] = {
    players: lobby.players,
    wager: lobby.wager,
    clicks: { [lobby.players[0].id]: 0, [lobby.players[1].id]: 0 },
    startTime: Date.now()
  };

  lobby.players.forEach(player => {
    io.to(player.id).emit('gameStart', gameId);
  });

  lobby.players = [];
}

async function handleGameEnd(gameId) {
  const game = games[gameId];
  const winner = game.clicks[game.players[0].id] > game.clicks[game.players[1].id] ? game.players[0] : game.players[1];

  // Transfer funds from escrow to winner
  // This is a placeholder and should be replaced with actual Solana transaction logic
  const transaction = new Transaction().add(
    // Add transfer instruction here
  );

  const signature = await connection.sendTransaction(transaction, [/* Add necessary signers */]);
  await connection.confirmTransaction(signature);

  io.to(gameId).emit('gameEnd', { winner: winner.id, signature });

  delete games[gameId];
}

server.listen(3001, () => {
  console.log('Server is running on port 3001');
});
