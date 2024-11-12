const { fetchRecipes } = require('./api');
const { displayRecipeResults } = require('../ui');

// Find recipes based on the ingredients provided by the user
async function findRecipes(ingredients) {
    const recipes = await fetchRecipes(ingredients);
    displayRecipeResults(recipes);
}

module.exports = { findRecipes };
