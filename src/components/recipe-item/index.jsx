import './styles.css'
import React from 'react';

const RecipeItem = (props) =>{
    const {id,image, title} = props;
 return (
    <div key={id} className="recipe-item">
        <div>
            <img src={image} alt="image of recipe" />
        </div>
        <p> {title} </p>

        <button> Add to favorites </button>
    </div>
 )
}

export default RecipeItem;