const express = require("express");
const cors = require("cors");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Temporary in-memory data (instead of DB)
let recipes = [
  { id: 1, title: "Pasta", ingredients: "Noodles, Sauce", rating: 4.5 },
  { id: 2, title: "Salad", ingredients: "Lettuce, Tomato", rating: 3.8 },
];

// ✅ Get all recipes
app.get("/api/recipes", (req, res) => {
  res.json(recipes);
});

// ✅ Get one recipe by ID
app.get("/api/recipes/:id", (req, res) => {
  const recipe = recipes.find(r => r.id === parseInt(req.params.id));
  if (!recipe) {
    return res.status(404).json({ error: "Recipe not found" });
  }
  res.json(recipe);
});

// ✅ Add a new recipe
app.post("/api/recipes", (req, res) => {
  const { title, ingredients, rating } = req.body;
  const newRecipe = { id: recipes.length + 1, title, ingredients, rating };
  recipes.push(newRecipe);
  res.status(201).json(newRecipe);
});

// ✅ Update recipe
app.put("/api/recipes/:id", (req, res) => {
  const recipe = recipes.find(r => r.id === parseInt(req.params.id));
  if (!recipe) {
    return res.status(404).json({ error: "Recipe not found" });
  }
  const { title, ingredients, rating } = req.body;
  recipe.title = title ?? recipe.title;
  recipe.ingredients = ingredients ?? recipe.ingredients;
  recipe.rating = rating ?? recipe.rating;
  res.json(recipe);
});

// ✅ Delete recipe
app.delete("/api/recipes/:id", (req, res) => {
  recipes = recipes.filter(r => r.id !== parseInt(req.params.id));
  res.json({ message: "Recipe deleted" });
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
