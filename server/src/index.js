const express = require("express");
const { body, validationResult } = require("express-validator");
const {
  generateToken,
  login,
  register,
} = require("./controllers/auth.controller");
var cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const recipeController = require("./controllers/reciepe.controller");
// const userController = require("./controllers/user.controller");

// const productController=require("./controllers/product.controller");
// const cartController=require("./controllers/cart.controller");
const connect = require("./config/db");

// app.use("/products",productController);
// app.use("/cart",cartController);
// app.use("/todo", todoController);


// register

app.post(
  "/register",
  body("name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Name cannot be Empty")
    .isLength({ min: 3 })
    .withMessage("name should contain alleaste 3 charecter"),
  body("email").isEmail().withMessage("Please enter a valid emailId !"),
  body("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password should not be empty"),

  register
);

// Login
app.post(
  "/login",
  body("email").isEmail().withMessage("Please enter a valid email address"),
  body("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password should not be empty !"),
  login
);

// default route
app.use("/recipe", recipeController);
app.use("/", (req, res) => {
  res
    .status(200)
    .send(
      `<h3 style="color:green;font-size:26px;margin:20px auto;">Welcome toRecipe API</h3>`
    );
});


app.listen(process.env.PORT || 8080, async function () {
  try {
    await connect();
    console.log(`server is running on port ${process.env.PORT}`);
  } catch (er) {
    console.log(er);
  }
});

module.exports = app;
