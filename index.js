// Imports the express module for creating the server
const express = require('express');

// Imports the fs (file system) module for reading files with promises
const fs = require('fs').promises;

// Imports a path module so you can actually use paths to get data
const path = require('path');

// Creates the instance for the Express application
const app = express();

//  Port number for where the server will listen for requests 3000, 8001, etc
const port = 3000;

// Middleware to parse JSON bodies in requests
app.use(express.json());
// Use Middleware to ensure that the JSON bodies are parsed/ It does this automatically 
// Essentialy middleware will make sure that the JSON data is formatted in a way like 
//an object so that it can be accessed better


// The _direname(built in with node) Allows you to reference the file that you are going to get the data from which is the JSON.
const employeesFilePath = path.join(__dirname, 'employees.json');

// The empty array will hold the employee data
let employees = [];

// Function to read the employees data from the JSON file
// Async is a Keyword function will return a Promise
// Dont need any parameters which is why () is empty
const readEmployeesData = async () => {
    try {
        // Read the file asynchronously and then take the JSON data into a string utf8
        const data = await fs.readFile(employeesFilePath, 'utf8');
        // Await keyword pause the function untill the Promise is returned
        employees = JSON.parse(data);
        // Parse takes the string and turns it into an object
    } catch (err) {
        // Log an error message if there's an issue reading the file
        console.error('Error reading the file:', err);
    }
};
// You must parse JSON data to convert it from a string into an object. 
// If you do not parse it, you cannot manipulate it or access its properties 
// such as salaries or employee IDs because it would remain a plain string.


// Call the function to read employees data when the server starts
readEmployeesData();

// How you can get all of the employees
// The '/' is basically like the file path. When you look on your computer to grab something 
// it kind of looks like this.
app.get('/employees', (req, res) => {
    // Send the employees data as a JSON response
    res.json(employees);
});


// This is How to grab a employee by their employeeID
app.get('/employees/:employeeID', (req, res) => {
    // Parse the employeeID from the request parameters
    const employeeID = parseInt(req.params.employeeID);
    /*  The req.params property is an object containing properties mapped to the named route “parameters”. 
    For example, if you have the route /student/:id, then the “id” property is available as req.params.id. 
    This object defaults to {}. 
     Syntax:
     req.params */


    // Find the employee with the matching employeeID in the employees array
    const employee = employees.find(emp => emp.employeeID === employeeID);
    // Parameter is named emp(short for employee)
    // The .find method will allow you to search for an element in the array
    // in this case we are searching for the Employee ID

    // If the employee exists, send their data as a JSON response
    if (employee) {
        res.json(employee);
    } else {
        // If the employee is not found, send a 404 status code and an error message
        res.status(404).json({ error: 'Sorry, the employee not found' });
    }
});



// Start the server and listen on the port
app.listen(port, () => {
    // Says the sever is running and were it is running 
    console.log(`Server running at http://localhost:${port}/`);
});


// If you check in the Browser http://localhost:3000/employees Show all 10 of the JSON employee
// http://localhost:3000/employees/1. Will show the JSON object for the SINGLE employee with the Id of 1 