const fs = require('fs');
const { displayMealPlan } = require('./ui');

let mealPlan = {};

// Create a new meal plan
export function createMealPlan() {
    console.log("Enter your meal plan for the week:");

    // Collect meal plan details for each day of the week
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    for (const day of days) {
        console.log(`\nMeal Plan for ${day}:`);
        const breakfast = readlineSync.question('Breakfast: ');
        const lunch = readlineSync.question('Lunch: ');
        const dinner = readlineSync.question('Dinner: ');
        
        mealPlan[day] = { breakfast, lunch, dinner };
    }

    saveMealPlan();
}

// View the current meal plan
export function viewMealPlan() {
    console.log("Current Meal Plan:");
    for (const [day, meals] of Object.entries(mealPlan)) {
        console.log(`${day}: Breakfast: ${meals.breakfast}, Lunch: ${meals.lunch}, Dinner: ${meals.dinner}`);
    }
}

// Save the current meal plan to a JSON file
export function saveMealPlan() {
    fs.writeFileSync('./data/recipeData.json', JSON.stringify(mealPlan), 'utf8');
}

// Load the saved meal plan if it exists
export function loadMealPlan() {
    if (fs.existsSync('./data/recipeData.json')) {
        const data = fs.readFileSync('./data/recipeData.json', 'utf8');
        mealPlan = JSON.parse(data);
    }
}

module.exports = { createMealPlan, viewMealPlan, saveMealPlan, loadMealPlan };
