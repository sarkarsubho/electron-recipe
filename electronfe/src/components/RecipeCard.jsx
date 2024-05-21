import React from "react";
import { Card, Button } from "react-bootstrap";

const RecipeCard = ({ recipe, onEdit, onDelete }) => {
  return (
    <Card
      style={{
        width: "18rem",
        border: "2px solid lightgray",
        borderRadius: "8px",
      }}
    >
      <Card.Body>
        <img src={recipe.image} width={"100%"} style={{
            borderRadius: "8px",
        }} alt="recipe img" />
        <h2>{recipe.title}</h2>
        <Card.Text
          style={{
            textAlign: "center",
          }}
        >
          Ingredients: {recipe.ingredients.join(", ")}
          <br />
          Cuisine: {recipe.cuisine}
        </Card.Text>
        <div style={{
            display:"flex",
            justifyContent:"center",
            gap:"10px",
            padding: "0 20px"
        }}>
          <Button variant="primary" style={{
            flexGrow:1
          }} onClick={() => onEdit(recipe)}>
            Edit
          </Button>{" "}
          <Button
            variant="error"
            style={{
              color: "white",
              background: "red",
              flexGrow:1
            }}
            onClick={() => onDelete(recipe._id)}
          >
            Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default RecipeCard;
