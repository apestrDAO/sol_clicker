I've made the following changes to show submitted highest wagers from players in the high stakes lobby:

Updated the Lobby component
Updated for App
Added styles for the high stakes lobby section and the wager list
These changes implement a system to display submitted wagers in the high stakes lobby. Here's how it works:
In the high stakes lobby (Lobby 3), players can enter a wager amount and submit it.
When a wager is submitted, it's added to the list of wagers and displayed.
If the submitted wager is higher than the current highest wager, it becomes the new highest wager.
The list of wagers is displayed below the wager submission form.
When the countdown timer resets (every 60 seconds), the wager list and highest wager are cleared.
To test these changes(using a webcontainer on your browser for now):
Run the development server: npm run dev
Open the application in your browser
Connect a wallet and join the high stakes lobby (Lobby 3)
Enter a wager amount and click "Submit Wager"
You should see your wager appear in the list below

![Screen Shot 2025-01-09 at 10 30 05 PM](https://github.com/user-attachments/assets/f1e8fbad-a988-40cf-9d42-bfb1e0d0a732)
