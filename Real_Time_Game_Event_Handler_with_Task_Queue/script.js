function gameEventQueue(events, callback) {
    let currentIndex = 0;

    function executeNextEvent() {
        if (currentIndex >= events.length) {
            console.log("All events processed.");
            return;
        }

        const event = events[currentIndex];

        console.log(`Starting event: ${event.name}`);

        // Simulate a delay for the event
        const timeoutDuration = 5000; // 5 seconds timeout for the event
        const eventPromise = new Promise((resolve) => {
            setTimeout(() => {
                // Random failure for the "collectLoot" event
                if (event.name === "collectLoot") {
                    if (Math.random() < 0.2) {
                        resolve("Loot collection failed due to random failure"); // Indicate failure
                    } else {
                        resolve("Loot collected successfully"); // Indicate success
                    }
                } else {
                    resolve(`${event.name} completed successfully!`);
                }
            }, 2000); // Each event takes 2 seconds
        });

        // Create a timeout promise
        const timeoutPromise = new Promise((resolve) => {
            setTimeout(() => {
                resolve("Timed-out event, moving to next"); // Indicate timeout
            }, timeoutDuration);
        });

        // Wait for either the event to complete or timeout
        Promise.race([eventPromise, timeoutPromise]).then((result) => {
            console.log(result);
            // Move to the next event regardless of the outcome
            currentIndex++;
            executeNextEvent();
        });
    }

    executeNextEvent(); // Start processing events
}

// Define event objects
const encounterEnemy = { name: "encounterEnemy" };
const defeatEnemy = { name: "defeatEnemy" };
const collectLoot = { name: "collectLoot" };

// Test cases
gameEventQueue([encounterEnemy, defeatEnemy, collectLoot], function(result) {
    console.log(result); // Expected: "Loot collected successfully"
});

gameEventQueue([encounterEnemy, defeatEnemy, collectLoot], function(result) {
    console.log(result); // Expected: "Loot collection failed due to random failure"
});

gameEventQueue([encounterEnemy, defeatEnemy, collectLoot], function(result) {
    console.log(result); // Expected: "Timed-out event, moving to next"
});
