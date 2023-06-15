import "./styles.css";
import "../recipeDetails.css";
import React from "react";
import { useState } from "react";
import RecipeDetails from "../RecipeDetails";

const RecipeItem = (props) => {
  const { id, image, title, addToFavorites } = props;
  const [openModal, setOpenModal] = useState(false);
  
  return (
    <div key={id} className="recipe-item">
      <div className="example">
        <img src={image} />
        {openModal && <RecipeDetails itemId={id} closeModal={setOpenModal} />}
        <div className="content">
          <div
            className="text"
            onClick={() => {
              console.log('id before being passed');
              setOpenModal(true);
            
            }}
          >
            Ingredient List
          </div>
        </div>
      </div>
      <div className="card-title-buttons">
        <br/>
        <p> {title} </p>
        <br/>
        <button className="addToFaves" type="button" onClick={addToFavorites}>
          {" "}
          Add to favorites{" "}
        </button>
      </div>
    </div>
  );
};

export default RecipeItem;
