import { Connection, Keypair, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import * as dotenv from 'dotenv';
import promptSync from 'prompt-sync';

dotenv.config();
const prompt = promptSync();

const NETWORK = 'https://api.devnet.solana.com';
const connection = new Connection(NETWORK);

const playerPrivateKey = process.env.PLAYER_PRIVATE_KEY.split(',').map(Number);
const playerKeypair = Keypair.fromSecretKey(new Uint8Array(playerPrivateKey));

const houseKeypair = Keypair.generate();

async function airdropSol(address, amount) {
  const airdropSignature = await connection.requestAirdrop(address, amount * LAMPORTS_PER_SOL);
  await connection.confirmTransaction(airdropSignature);
}

async function getBalance(address) {
  return await connection.getBalance(address) / LAMPORTS_PER_SOL;
}

async function transferSol(from, to, amount) {
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: from.publicKey,
      toPubkey: to.publicKey,
      lamports: amount * LAMPORTS_PER_SOL
    })
  );

  const signature = await connection.sendTransaction(transaction, [from]);
  await connection.confirmTransaction(signature);
}

async function playGame(bet) {
  console.log('Playing the game...');
  const randomNumber = Math.random();
  if (randomNumber > 0.5) {
    console.log('You won!');
    await transferSol(houseKeypair, playerKeypair, bet * 2);
    return true;
  } else {
    console.log('You lost.');
    return false;
  }
}

async function main() {
  console.log('Welcome to the Solana Wagering Game!');

  // Airdrop some SOL to the player and house for testing
  await airdropSol(playerKeypair.publicKey, 2);
  await airdropSol(houseKeypair.publicKey, 10);

  while (true) {
    console.log(`\nYour balance: ${await getBalance(playerKeypair.publicKey)} SOL`);
    console.log(`House balance: ${await getBalance(houseKeypair.publicKey)} SOL`);

    const betAmount = parseFloat(prompt('Enter your bet amount (in SOL): '));

    if (isNaN(betAmount) || betAmount <= 0) {
      console.log('Invalid bet amount. Please try again.');
      continue;
    }

    const playerBalance = await getBalance(playerKeypair.publicKey);
    if (betAmount > playerBalance) {
      console.log('Insufficient funds. Please enter a lower amount.');
      continue;
    }

    await transferSol(playerKeypair, houseKeypair, betAmount);

    const won = await playGame(betAmount);

    if (!won) {
      console.log(`You lost ${betAmount} SOL.`);
    } else {
      console.log(`You won ${betAmount} SOL!`);
    }

    const playAgain = prompt('Do you want to play again? (y/n): ').toLowerCase();
    if (playAgain !== 'y') {
      break;
    }
  }

  console.log('Thanks for playing!');
}

main().catch(console.error);
