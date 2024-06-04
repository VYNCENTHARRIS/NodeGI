const fs = require('fs'); // Import the File System module

// Read the content of the planets.txt file
fs.readFile('planets.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Sorry error reading the file:', err); // Handle errors
        return;
    }
    // Split the data by commas to get an array of planets
    const planets = data.split(', ');
    // Print each planet to the console forEach Easier than a Loop
    planets.forEach(planet => console.log(planet));
});
