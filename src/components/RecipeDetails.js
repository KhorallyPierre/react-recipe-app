import React from "react";
import "./recipeDetails.css"

function RecipeDetails(props) {
    console.log(props, 'props')
    const {setOpenModal} = props;
   
    return (
        <div className="detailsBackground"  >
            <div className='detailsContainer'>
                <div className="titleCloseBtn">
                <button onClick={() => setOpenModal(false)} className='detailsButton'> X </button>
                </div>
               
                <div className='title'> 
                    <h2> Ingredients</h2>
                </div>
                <div className='body'>  
                 <p> list of ingredients</p>
                </div>
                <div className='footer'>
                <button onClick={() => setOpenModal(false)} id="cancelBtn"> Close </button>    
                 </div>
            </div>

        </div>
    );
}

export default RecipeDetails;