let interactionQueue = [];
let timer = null;

function trackInteraction(action, callback) {
    // Define messages for each action
    const messages = {
        "click": "User clicked on button",
        "page view": "User viewed the page"
    };

    // Push the corresponding message to the queue
    interactionQueue.push(messages[action]);

    // If there isn't an active timer, set one
    if (!timer) {
        timer = setTimeout(() => {
            // After 3 seconds, call the callback with the interactions
            callback(interactionQueue);
            // Log the interactions that have been sent
            console.log("Interactions sent:", interactionQueue);
            
            // Clear the queue and reset the timer
            interactionQueue = [];
            timer = null;
        }, 3000);
    }
}

// Example usage
trackInteraction("click", function(data) {
    console.log(data); // Logs all interactions after 3 seconds
});
trackInteraction("page view", function(data) {
    console.log(data); // Logs all interactions after 3 seconds
});
trackInteraction("click", function(data) {
    console.log(data); // Logs all interactions after 3 seconds
});
trackInteraction("page view", function(data) {
    console.log(data); // Logs all interactions after 3 seconds
});
