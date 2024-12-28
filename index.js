import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 4000;

const blogs = [
  {
    recipename: "Chocolate Cake",
    imgurl: "https://www.hersheyland.com/content/dam/hersheyland/en-us/recipes/recipe-images/2-hersheys-perfectly-chocolate-chocolate-cake-recipe-hero.jpg",
    recipe: "A delicious and moist chocolate cake recipe.",
  },
  {
    recipename: "Spaghetti Bolognese",
    imgurl: "https://www.kitchensanctuary.com/wp-content/uploads/2019/09/Spaghetti-Bolognese-square-FS-0204.jpg",
    recipe: "To make spaghetti bolognese, start by heating some olive oil in a large pan over medium heat. Once the oil is hot, add finely chopped onions and garlic, cooking them until softened and fragrant. Then, add minced beef and cook until browned, breaking it apart with a spoon. Next, stir in grated carrots and celery, cooking for a few more minutes until the vegetables soften.Once the vegetables are cooked, pour in a can of crushed tomatoes and add a splash of red wine if desired, then season with salt, pepper, and a pinch of dried oregano. Stir everything together, ensuring the sauce is well mixed. Lower the heat and let the sauce simmer for at least 30 minutes, stirring occasionally. If the sauce thickens too much, add a bit of water to reach your desired consistency. While the sauce is simmering, cook the spaghetti according to the package instructions in salted boiling water. Drain the pasta once it's al dente, reserving a bit of the pasta water. When the sauce is ready, toss the cooked spaghetti with the bolognese sauce, adding a bit of the pasta water to help combine everything. Serve the dish with freshly grated Parmesan cheese on top, and enjoy!",
  },
];

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

app.get("/allBlogs", (req, res) => {
  console.log(blogs)
  res.render("blogsPage.ejs", { blogs: blogs });
});

app.get("/newBlog", (req, res) => {
  res.render("newBlog.ejs");
});

app.post("/addBlog",(req,res)=>{
  const {recipename,imgurl,recipe} = req.body;
  
  blogs.push({recipename,imgurl,recipe})
  console.log(blogs.imgurl)
  res.redirect("/allBlogs")
})

app.get("/recipe/:id", (req, res) => {
  const id = req.params.id;
  const recipe = blogs[id]; 
  
  if (recipe) {
    res.render("recipe", {
      recipename: recipe.recipename,
      imgurl: recipe.imgurl,
      recipe: recipe.recipe,
    });
  } else {
    res.status(404).send("Recipe not found");
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
