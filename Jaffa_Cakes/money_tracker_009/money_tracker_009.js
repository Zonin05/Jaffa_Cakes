const readline = require('readline');

// Global Variables
let income = 0; // Total income
let expenses = 0; // Total expenses
let categories = {}; // Categories for expenses

// Create readline interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Utility Functions
function displayMenu() {
    console.clear();
    console.log("Money Tracker 009");
    console.log("1. Add Income");
    console.log("2. Add Expense");
    console.log("3. View Balance");
    console.log("4. View Categorized Spending");
    console.log("5. Exit");
    console.log("\nChoose an option (1-5): ");
}

function promptUserAction() {
    displayMenu();
    rl.question("Enter your choice (1-5): ", (action) => {
        switch(action) {
            case '1':
                addIncome();
                break;
            case '2':
                addExpense();
                break;
            case '3':
                viewBalance();
                break;
            case '4':
                viewCategorizedSpending();
                break;
            case '5':
                console.log("Exiting... Goodbye!");
                rl.close();
                return;
            default:
                console.log("Invalid choice. Please try again.");
                promptUserAction(); // Ask again if input is invalid
        }
    });
}

// Core Functions

// Function to add income
function addIncome() {
    rl.question("Enter income amount: $", (amount) => {
        amount = parseFloat(amount);
        if (isNaN(amount) || amount <= 0) {
            console.log("Invalid amount. Please enter a valid income.");
            promptUserAction();
            return;
        }
        income += amount;
        console.log(`Income added: $${amount}`);
        promptUserAction();
    });
}

// Function to add an expense
function addExpense() {
    rl.question("Enter expense amount: $", (amount) => {
        amount = parseFloat(amount);
        if (isNaN(amount) || amount <= 0) {
            console.log("Invalid amount. Please enter a valid expense.");
            promptUserAction();
            return;
        }
        
        rl.question("Enter expense category (e.g., Food, Transportation): ", (category) => {
            category = category.trim();
            if (!category) {
                console.log("Category cannot be empty.");
                promptUserAction();
                return;
            }

            expenses += amount;
            if (!categories[category]) {
                categories[category] = 0;
            }
            categories[category] += amount; // Add the expense to the specified category
            console.log(`Expense added: $${amount} in ${category} category`);
            promptUserAction();
        });
    });
}

// Function to view the balance
function viewBalance() {
    let balance = income - expenses;
    console.log(`\n Balance`);
    console.log(`Total Income: $${income}`);
    console.log(`Total Expenses: $${expenses}`);
    console.log(`Balance: $${balance}`);
    promptUserAction();
}

// Function to view categorized spending
function viewCategorizedSpending() {
    console.log("\nCategorized Spending");
    if (Object.keys(categories).length === 0) {
        console.log("No expenses recorded in any category.");
    } else {
        for (let category in categories) {
            console.log(`${category}: $${categories[category]}`);
        }
    }
    promptUserAction();
}

// Main Program (Initialization)
promptUserAction();
