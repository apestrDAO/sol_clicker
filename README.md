I've made the following changes to show submitted highest wagers from players in the high stakes lobby:

Updated the Lobby component:

Added a new state variable wagers to keep track of submitted wagers.
Added a new state variable currentWager to manage the input field for wager submission.
Modified the submitWager function to add the new wager to the list and update the highest wager if necessary.
Added a new section in the render method to display the list of submitted wagers.
Modified the countdown effect to reset the wagers and highest wager when the timer resets.
Updated the App.css:

Added styles for the high stakes lobby section and the wager list.
These changes implement a system to display submitted wagers in the high stakes lobby. Here's how it works:

In the high stakes lobby (Lobby 3), players can enter a wager amount and submit it.
When a wager is submitted, it's added to the list of wagers and displayed.
If the submitted wager is higher than the current highest wager, it becomes the new highest wager.
The list of wagers is displayed below the wager submission form.
When the countdown timer resets (every 60 seconds), the wager list and highest wager are cleared.
To test these changes:

Run the development server: npm run dev
Open the application in your browser
Connect a wallet and join the high stakes lobby (Lobby 3)
Enter a wager amount and click "Submit Wager"
You should see your wager appear in the list below
Try submitting multiple wagers and see how the list and highest wager update
Wait for the countdown to reset and observe the wagers being cleared

![Screen Shot 2025-01-07 at 11 20 47 PM](https://github.com/user-attachments/assets/a25753d7-4bcd-459f-8c0c-5ea669794dff)
