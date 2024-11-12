import fetch from 'node-fetch';

const API_KEY = 'f990dcd3b56f44d78fd7828f8b0000a2'; // Set up your recipe API key (e.g., Spoonacular, Edamam)
const API_URL = 'https://api.spoonacular.com/recipes/findByIngredients'; // API URL

// Fetch recipes based on ingredients
async function fetchRecipes(ingredients) {
    const url = `${API_URL}?ingredients=${ingredients}&apiKey=${API_KEY}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        // Return a list of recipe details
        return data.map(recipe => ({
            title: recipe.title,
            ingredients: recipe.usedIngredients,
            recipeUrl: `https://www.spoonacular.com/recipes/${recipe.id}`
        }));
    } catch (error) {
        console.error('Error fetching recipes:', error);
        return [];
    }
}

module.exports = { fetchRecipes };
