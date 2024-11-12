import readlineSync from 'readline-sync';  // Use 'import' for readline-sync
const { createMealPlan, viewMealPlan } = require('./mealPlanner');

// Display the main menu
function displayMainMenu() {
    console.log("---- Recipe Finder and Meal Planner ----");
    console.log("1. Find Recipes");
    console.log("2. Meal Planner");
    console.log("3. View Saved Meal Plan");
    console.log("4. Exit");
    console.log("\nChoose an option (1-4): ");
}

// Prompt user for their action based on input
export function promptUserAction() {
    displayMainMenu();
    const action = readlineSync.question("Enter your choice (1-4): ");

    switch(action) {
        case '1':
            promptForIngredients();
            break;
        case '2':
            createMealPlan();
            break;
        case '3':
            viewMealPlan();
            break;
        case '4':
            console.log("Exiting... Goodbye!");
            process.exit();
            break;
        default:
            console.log("Invalid choice. Please try again.");
            promptUserAction();
    }
}

// Prompt user to input ingredients for finding recipes
function promptForIngredients() {
    const ingredients = readlineSync.question("Enter ingredients (comma-separated): ");
    findRecipes(ingredients);
}

// Display the found recipes
function displayRecipeResults(recipes) {
    if (recipes.length === 0) {
        console.log("No recipes found with the given ingredients.");
        promptUserAction();
        return;
    }

    console.log("\nFound Recipes:");
    recipes.forEach(recipe => {
        console.log(`${recipe.title} - [Full Recipe](${recipe.recipeUrl})`);
    });
    promptUserAction();
}

// Display the current meal plan to the user
function displayMealPlan(mealPlan) {
    console.log("Current Meal Plan:");
    for (const [day, meals] of Object.entries(mealPlan)) {
        console.log(`${day}: Breakfast: ${meals.breakfast}, Lunch: ${meals.lunch}, Dinner: ${meals.dinner}`);
    }
    promptUserAction();
}

module.exports = { displayMainMenu, promptUserAction, displayRecipeResults, displayMealPlan };
