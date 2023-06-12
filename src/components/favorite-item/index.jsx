import './styles.css'
import React from 'react';

const FavoriteItem = (props) => {
    const { id, image, title, removeFromFavorites} = props;
  
    return (
        <div key={id} className="favorite-item">
            <div id="example-image" className="example">
                <img src={image} alt="recipe" />
                <div  className="content">
                    <text  class="text">View Recipe</text>
                </div>
            </div>
            <p> {title} </p>

            <button type="button" onClick={removeFromFavorites}> Remove from favorites </button>
            
        </div>
        
    )
    
}


export default FavoriteItem;