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
    recipe: "To make a chocolate cake, start by preheating your oven to 350°F (175°C) and greasing and flouring two round cake pans. In a bowl, sift together 1 and 3/4 cups of all-purpose flour, 1 and 1/2 cups of granulated sugar, 3/4 cup of unsweetened cocoa powder, 1 and 1/2 teaspoons of baking powder, 1 and 1/2 teaspoons of baking soda, and a pinch of salt. In a separate bowl, whisk together 2 large eggs, 1 cup of whole milk, 1/2 cup of vegetable oil, and 2 teaspoons of vanilla extract. Gradually add the wet ingredients to the dry ingredients, mixing until combined. Stir in 1 cup of boiling water, which will make the batter thin. Pour the batter evenly into the prepared pans and bake for about 30 to 35 minutes, or until a toothpick inserted in the center comes out clean. Once the cakes are done, let them cool in the pans for 10 minutes, then transfer them to a wire rack to cool completely. For the frosting, beat 1/2 cup of softened butter with 1/4 cup of cocoa powder, then gradually add powdered sugar, 1/4 cup at a time, along with 1/4 cup of milk and 1 teaspoon of vanilla extract. Once the frosting is smooth and fluffy, spread it between the layers and over the top of the cake. Enjoy your homemade chocolate cake!",
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
