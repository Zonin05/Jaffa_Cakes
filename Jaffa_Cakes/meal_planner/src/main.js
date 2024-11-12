import readlineSync from 'readline-sync';  // Use 'import' for readline-sync
import { promptUserAction } from './ui.js'; // Adjusted to ES module
import { createMealPlan, viewMealPlan } from './mealPlanner.js';

// Start the app
function main() {
    // Load saved meal plan if it exists
    loadMealPlan();

    // Start the program loop
    promptUserAction();
}

main();
