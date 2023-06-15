import React from "react";
import { useState } from "react";
import { useEffect } from 'react';
import "./recipeDetails.css"

function RecipeDetails(props) {
    const { closeModal, itemId } = props;
    // loading state
    const [loadingState, setLoadingState] = useState(true)
    // save results being recieved from API
    const [ingredients, setIngredients] = useState([])



    const getRecipeIngredientsByID = () => {


        console.log('id', itemId)
        async function getIngredients(id) {

            const apiResponse = await fetch(
                `https://api.spoonacular.com/recipes/${id}/information?apiKey=5a889f5e8d314bbda815babf720da808&`
            );
            const result = await apiResponse.json();



            if (result) {
                console.log(result.oneIngredient, 'ingredient name result')
                //setLoadState as false again
                setLoadingState(false)
                //set the recipe state (done below, I think)
                let listOfIngredients = ''
                result.extendedIngredients.forEach(objectInArray => {
                    listOfIngredients = listOfIngredients + ',' + objectInArray.name
                });
                setIngredients(listOfIngredients.split(','))

            }
        }

        if (loadingState) { getIngredients(itemId); }

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

                    {ingredients.map((element, i) =>
                        //    key tag is needed when mapping inside of jsx (so that ingredients dont get confused with one another)
                        <span key={i}> {i ? '🍴' : ''} {element}  </span>
                    )}
                </div>
                <div className='footer'>
                    <button onClick={() => closeModal(false)} id="cancelBtn"> Close </button>
                </div>
            </div>

        </div>
    );
}

export default RecipeDetails;