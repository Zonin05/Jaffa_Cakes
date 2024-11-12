const fs = require('fs');
const readline = require('readline');

// Define Initial Variables
let todoList = []; // Array to hold the list of to-do items
const filePath = 'todoList.json'; // Path to the file where tasks will be stored

// Create readline interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Simulate a basic console UI
function displayUI() {
    console.clear();
    console.log("To-Do List App");
    console.log("1. Add Task");
    console.log("2. Mark Task as Completed");
    console.log("3. Delete Task");
    console.log("4. View All Tasks");
    console.log("5. Filter Tasks (completed/pending/all)");
    console.log("6. Exit");
    console.log("\nChoose an option (1-6): ");
}

// Function to add a new task
function addTask() {
    rl.question("Enter task text: ", (taskText) => {
        if (taskText === '') {
            console.log("Task cannot be empty.");
            promptUserAction();
            return;
        }

        const newTask = { text: taskText, completed: false }; // Create task object
        todoList.push(newTask); // Add task to todoList
        saveTasksToFile(); // Save to file
        console.log("Task added.");
        promptUserAction(); // Return to prompt
    });
}

// Function to toggle the completion status of a task
function toggleComplete() {
    rl.question("Enter task number to mark as completed: ", (taskIndex) => {
        taskIndex = parseInt(taskIndex);
        if (isNaN(taskIndex) || taskIndex < 1 || taskIndex > todoList.length) {
            console.log("Invalid task number.");
            promptUserAction();
            return;
        }

        todoList[taskIndex - 1].completed = true; // Mark as completed
        saveTasksToFile();
        console.log("Task marked as completed.");
        promptUserAction(); // Return to prompt
    });
}

// Function to delete a task
function deleteTask() {
    rl.question("Enter task number to delete: ", (taskIndex) => {
        taskIndex = parseInt(taskIndex);
        if (isNaN(taskIndex) || taskIndex < 1 || taskIndex > todoList.length) {
            console.log("Invalid task number.");
            promptUserAction();
            return;
        }

        todoList.splice(taskIndex - 1, 1); // Remove task from todoList
        saveTasksToFile();
        console.log("Task deleted.");
        promptUserAction(); // Return to prompt
    });
}

// Function to view all tasks
function viewTasks() {
    console.log("\n--- All Tasks ---");
    if (todoList.length === 0) {
        console.log("No tasks found.");
    } else {
        todoList.forEach((task, index) => {
            const status = task.completed ? "Completed" : "Pending";
            console.log(`${index + 1}. ${task.text} - ${status}`);
        });
    }
    promptUserAction(); // Return to prompt
}

// Function to filter tasks
function filterTasks() {
    rl.question("Enter filter criteria (completed/pending/all): ", (filter) => {
        console.log("\n--- Filtered Tasks ---");

        const filteredTasks = todoList.filter(task => {
            if (filter === 'completed') return task.completed;
            if (filter === 'pending') return !task.completed;
            return true; // For 'all' and invalid input
        });

        if (filteredTasks.length === 0) {
            console.log("No tasks match the filter.");
        } else {
            filteredTasks.forEach((task, index) => {
                const status = task.completed ? "Completed" : "Pending";
                console.log(`${index + 1}. ${task.text} - ${status}`);
            });
        }
        promptUserAction(); // Return to prompt
    });
}

// Function to save tasks to a file
function saveTasksToFile() {
    fs.writeFileSync(filePath, JSON.stringify(todoList), 'utf8');
}

// Function to load tasks from a file
function loadTasksFromFile() {
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf8');
        todoList = JSON.parse(data);
    }
}

// Prompt user for an action
function promptUserAction() {
    displayUI();
    rl.question("Enter your choice (1-6): ", (action) => {
        switch(action) {
            case '1':
                addTask();
                break;
            case '2':
                toggleComplete();
                break;
            case '3':
                deleteTask();
                break;
            case '4':
                viewTasks();
                break;
            case '5':
                filterTasks();
                break;
            case '6':
                console.log("Exiting... Goodbye!");
                rl.close();
                return;
            default:
                console.log("Invalid choice. Please try again.");
                promptUserAction(); // Ask again if input is invalid
        }
    });
}

// Initialization
loadTasksFromFile();
promptUserAction();
