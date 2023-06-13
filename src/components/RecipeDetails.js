import React from "react";
import "./recipeDetails.css"

function RecipeDetails(props) {
     const {closeModal} = props;
   
    return (
        <div className="detailsBackground" onClick={() => closeModal(false)} >
            <div className='detailsContainer'>
                <div className="titleCloseBtn">
                    <button onClick={() => closeModal(false)} className='detailsButton'> X </button>
                </div>
               
                <div className='title'> 
                    <h2> Ingredients</h2>
                </div>
                <div className='body'>  
                 <p> list of ingredients</p>
                </div>
                <div className='footer'>
                   <button onClick={() => closeModal(false)} id="cancelBtn"> Close </button>    
                 </div>
            </div>

        </div>
    );
}

export default RecipeDetails;