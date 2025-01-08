I've updated the game to include the option to wager either SOL or the new $CLICK coin. Here are the key changes and how the game works now:
Added a new state variable clickBalance to track the $CLICK balance.
Modified the connectWallet function to simulate both SOL and $CLICK balances.
Added a dropdown menu to select the wager currency (SOL or CLICK).
Updated the startGame and endGame functions to handle both currencies.
Modified the UI to display both SOL and $CLICK balances.

Here's how to play the updated game:
Connect the simulated Phantom wallet.
You'll see both your SOL and $CLICK balances.
Set your wager amount and select the currency (SOL or CLICK) from the dropdown.
Click "Start Game" to begin.
Each player clicks their respective button as fast as they can.
The first player to reach 20 clicks within 10 seconds wins.
If a player reaches 18 clicks before 8 seconds have passed, they must wait until the 8-second mark to continue clicking.
If no player reaches 20 clicks within 10 seconds, the game ends in a draw, and the wager is returned.
The winner receives double the wagered amount in the chosen currency.
The game now supports wagering with either SOL or $CLICK, giving players more flexibility in how they want to play. The core gameplay mechanics remain the same, but players can now choose which currency they want to use for their wagers.
