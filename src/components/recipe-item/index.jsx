import './styles.css'
import React from 'react';

const RecipeItem = (props) =>{
    const {id,image, title, addToFavorites} = props;
 return (
    <div key={id} className="recipe-item">
        <div>
            <img src={image} alt="image of recipe" />
        </div>
        <p> {title} </p>

        <button className="addToFaves" type="button" onClick={addToFavorites}> Add to favorites </button>
    </div>
 )
}

export default RecipeItem;