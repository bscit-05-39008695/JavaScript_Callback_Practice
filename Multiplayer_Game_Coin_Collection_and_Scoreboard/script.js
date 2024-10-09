function collectCoin(player, callback) {
    // Simulate network latency
    setTimeout(() => {
        // Randomize points between 1 and 10
        const points = Math.floor(Math.random() * 10) + 1;

        // Random chance for validation failure (10% chance)
        const validationFailed = Math.random() < 0.1;

        if (validationFailed) {
            console.log(`Coin collection failed for ${player.playerName}. No points earned.`);
            callback(player); // Notify callback without updating score
            return;
        }

        // Update player's score
        player.score += points;
        console.log(`${player.playerName} collected a coin and earned ${points} points!`);

        // Log the current total score
        console.log(`${player.playerName}'s total score: ${player.score}`);

        // Check if player has won
        if (player.score > 50) {
            console.log(`${player.playerName} has won the game!`);
            callback(player, true); // Notify callback of win
        } else {
            callback(player); // Notify callback without win
        }
    }, 2000); // 2 seconds delay
}

// Test cases
collectCoin({ playerName: "Player 1", score: 0 }, function(updatedPlayer) {
    console.log(updatedPlayer.score); // Expected: A number between 1 and 10
});

collectCoin({ playerName: "Player 2", score: 40 }, function(updatedPlayer) {
    console.log(updatedPlayer.score); // Expected: A number between 41 and 50
});

collectCoin({ playerName: "Player 3", score: 49 }, function(updatedPlayer) {
    console.log(updatedPlayer.score); // Expected: A number between 50 and 59, and possibly win message
});
