import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FoodList() {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    axios.get("https://www.themealdb.com/api/json/v1/1/search.php?s=") // all meals
      .then(res => {
        if (res.data.meals) {
          setFoods(res.data.meals); // set meals array
        } else {
          toast.error("No foods found");
        }
      })
      .catch(err => toast.error("Cannot load foods"));
  }, []);

  return (
    <div>
      <h1>Food Menu</h1>
      <ul>
        {foods.map(f => (
          <li key={f.idMeal}>{f.strMeal}</li> // only show name
        ))}
      </ul>
    </div>
  );
}