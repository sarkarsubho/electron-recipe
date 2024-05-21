import React, { useContext, useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const Recipes = () => {
  const initState = {
    _id: null,
    title: "",
    description: "",
    category: "",
    ingredients: [],
    image: "",
  };
  const [recipes, setRecipes] = useState([]);
  const { logout } = useContext(AuthContext);
  const [formdata, setFormData] = useState(initState);

  const [formAction, setFormAction] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://electron-recipe.onrender.com/recipe"
      );
      const data = await response.json();
      setRecipes(data);
    };

    fetchData();
  }, []);

  const handleEdit = async (recipe) => {
    console.log(recipe);
    setFormAction("edit");
    setFormData(recipe);
  };

  const handleDelete = async (id) => {
    const response = await fetch(`https://electron-recipe.onrender.com/recipe/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      setRecipes(recipes.filter((recipe) => recipe._id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formAction === "new") {
      axios
        .post(`https://electron-recipe.onrender.com/recipe/post`, { ...formdata })
        .then((res) => {
          console.log(res.data);
          setRecipes([...recipes, res.data]); 
        })
        .catch((er) => {
          console.log(er);
        })
        .finally(() => {
          setFormAction(null);
          setFormData(initState);
        });
    } else {
      axios
        .patch(`https://electron-recipe.onrender.com/recipe/${formdata._id}`, { ...formdata })
        .then((res) => {
          console.log(res.data);
          setRecipes(
            recipes.map((e) => (e._id === res.data._id ? res.data : e))
          );
        })
        .catch((er) => {
          console.log(er);
        })
        .finally(() => {
          setFormAction(null);
          setFormData(initState);
        });
    }
  };

  return (
    <div>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "95vw",
          padding: "0 20px",
          height: "80px",
          background: "white",
        }}
      >
        <h2>Recipe viewer </h2>
        <button
          onClick={() => {
            logout();
          }}
        >
          Logout
        </button>
        <button
          onClick={() => {
            setFormAction("new");
            setFormData(initState);
          }}
        >
          Add New Recipe
        </button>
      </nav>
      {formAction && (
        <div className="container">
          <h2>{formAction === "new" ? "Add new" : "Edit"} Recipe</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Title</label>
              <input
                type="text"
                value={formdata.title}
                onChange={(e) =>
                  setFormData({ ...formdata, title: e.target.value })
                }
              />
            </div>
            <div>
              <label>Description</label>
              <textarea
                value={formdata.description}
                onChange={(e) =>
                  setFormData({ ...formdata, description: e.target.value })
                }
              />
            </div>
            <div>
              <label>Category</label>
              <input
                type="text"
                value={formdata.category}
                onChange={(e) =>
                  setFormData({ ...formdata, category: e.target.value })
                }
              />
            </div>
            <div>
              <label>Ingredients</label>
              <input
                type="text"
                value={formdata.ingredients.join(",")}
                onChange={(e) =>
                  setFormData({
                    ...formdata,
                    ingredients: e.target.value.split(","),
                  })
                }
              />
            </div>
            <div>
              <label>Image</label>
              <input
                type="text"
                value={formdata.image}
                onChange={(e) =>
                  setFormData({ ...formdata, image: e.target.value })
                }
              />
            </div>
            <button type="submit">
              {formAction === "new" ? "Add new" : "Update"} Recipe
            </button>
          </form>
        </div>
      )}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: " repeat( auto-fit, minmax(250px, 1fr) )",
          padding: "20px",
          gap: "20px",
        }}
      >
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            recipe={recipe}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default Recipes;
