import './styles.css'
import React from 'react';

const RecipeItem = (props) => {
    const { id, image, title, addToFavorites, openRecipeDetails } = props;
    return (
        <div key={id} className="recipe-item">
            <div className="example">
                <img  src={image} alt="image of recipe" />
                <div className="content">
                    <div className="text">View Recipe</div>
                </div>
            </div>
            <div className='card-title-buttons'>
                <p> {title} </p>
                {/* <br/>
        <button id="addToFaves" type="button" onClick={openDetails}> View recipe </button> 
        <br/>  */}
                <br />

                <button className="addToFaves" type="button" onClick={addToFavorites}> Add to favorites </button>
            </div>
        </div>
    )
}

export default RecipeItem;