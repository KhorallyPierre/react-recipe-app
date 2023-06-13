import React from "react";
import { useState } from "react";
import { useEffect } from 'react';
import "./recipeDetails.css"

function RecipeDetails(props) {
    const { closeModal, itemId } = props;
    const [ingredients, setIngredients] = useState([])
    const getRecipeIngredientsByID = () => {
        

console.log('id', itemId)
        async function getIngredients(id) {
            // /get recipe information api
            const apiResponse = await fetch(
                `https://api.spoonacular.com/recipes/${id}/information?apiKey=5a889f5e8d314bbda815babf720da808&`
            );
            const result = await apiResponse.json();
           
          
          
            if (result) {
                setIngredients(result.extendedIngredients)
            }
        }

        getIngredients(itemId);
        
    };
    //modify to only make a request once 
    getRecipeIngredientsByID()
    console.log('ingredients', ingredients)

    return (
        <div className="detailsBackground" >
            <div className='detailsContainer'>
                <div className="titleCloseBtn">
                    <button onClick={() => closeModal(false)} className='detailsButton'> X </button>
                </div>

                <div className='title'>
                    <h2> Ingredients</h2>
                </div>
                <div className='body'>
                    <p> return ingredients here after api is called</p>
                </div>
                <div className='footer'>
                    <button onClick={() => closeModal(false)} id="cancelBtn"> Close </button>
                </div>
            </div>

        </div>
    );
}

export default RecipeDetails;