// Import the stuff we need to build the app
import express from "express";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";

// This part helps us get __dirname since it's not built into ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize our Express app
const app = express();
const port = 3000; // You can change this to any port you want

// Set up the public folder so we can use CSS, images, etc.
app.use(express.static(path.join(__dirname, "public")));

// Tell Express we want to use EJS for rendering our HTML
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Route for the homepage
app.get("/", async (req, res) => {
  try {
    // Hitting the JokeAPI to get a random joke (only single-line ones)
    const jokeApiUrl = "https://v2.jokeapi.dev/joke/Any?type=single";
    const jokeResponse = await axios.get(jokeApiUrl);

    // Grab the joke from the API response
    const randomJoke = jokeResponse.data.joke;

    // Send the joke to the EJS template to show on the page
    res.render("index", { joke: randomJoke });
  } catch (error) {
    // If the API doesn't respond or something goes wrong, show this instead
    res.render("index", { joke: "Couldn't fetch a joke this time — maybe the internet’s out of jokes today 😅" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is live! Check it out at http://localhost:${port}`);
});
