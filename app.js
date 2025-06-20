// Import required modules
import express from "express";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";

// Get the current file path and directory name (since __dirname is not available in ES Modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize the Express app
const app = express();

// Set the port the server will listen on
const port = 3000;

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, "public")));

// Set the view engine to EJS for rendering HTML templates
app.set("view engine", "ejs");

// Set the views directory
app.set("views", path.join(__dirname, "views"));

// Define the root route ("/") to fetch and display a joke
app.get("/", async (req, res) => {
  try {
    // API URL to fetch a random joke
    const apiURL = "https://v2.jokeapi.dev/joke/Any?type=single";

    // Fetch the joke using Axios
    const response = await axios.get(apiURL);

    // Extract the joke from the response
    const joke = response.data.joke;

    // Render the index.ejs page with the joke
    res.render("index", { joke });
  } catch (err) {
    // If there's an error, show a fallback joke message
    res.render("index", { joke: "Failed to load a joke. Please try again." });
  }
});

// Start the server and listen on the defined port
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
