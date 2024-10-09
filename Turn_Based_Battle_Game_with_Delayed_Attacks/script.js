function turnBasedBattle(players, callback) {
    const player1 = { ...players.player1 }; // Spread operator to create a copy
    const player2 = { ...players.player2 }; // Spread operator to create a copy

    function attack(attacker, defender) {
        // Randomize damage between 1 and 20
        let damage = Math.floor(Math.random() * 20) + 1;

        // 10% chance for a critical hit (double damage)
        if (Math.random() < 0.1) {
            damage *= 2;
            console.log(`${attacker.name} lands a critical hit!`);
        }

        console.log(`${attacker.name} attacks ${defender.name} for ${damage} damage!`);

        // Simulate delay for the attack
        setTimeout(() => {
            defender.health -= damage;
            console.log(`${defender.name}'s health: ${defender.health}`);

            // Check if the defender is defeated
            if (defender.health <= 0) {
                console.log(`${defender.name} has been defeated! ${attacker.name} wins!`);
                callback(attacker.name);
            } else {
                // Check for desperation mode
                if (defender.health < 20) {
                    console.log(`${defender.name} is in desperation mode!`);
                }
                // Switch turns
                attack(defender, attacker);
            }
        }, 1500); // 1.5 seconds delay
    }

    // Start the battle
    attack(player1, player2);
}

// Test cases
turnBasedBattle({ player1: { name: "Player 1", health: 100 }, player2: { name: "Player 2", health: 100 } }, function(winner) {
    console.log(`Winner: ${winner}`); // Expected: "Player 1" or "Player 2" based on random damage
});

turnBasedBattle({ player1: { name: "Player 1", health: 20 }, player2: { name: "Player 2", health: 100 } }, function(winner) {
    console.log(`Winner: ${winner}`); // Expected: "Player 2"
});
