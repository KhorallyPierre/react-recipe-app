import './styles.css'
import React from 'react';

const FavoriteItem = (props) => {
    const { id, image, title, removeFromFavorites, onViewRecipeClick } = props;
    return (
        <div key={id} className="favorite-item">
            <div className="example">
                <img src={image} alt="image of recipe" />
                <div  className="content">
                    <button class="text" onClick={onViewRecipeClick }>View Recipe</button>
                </div>
            </div>
            <p> {title} </p>

            <button type="button" onClick={removeFromFavorites}> Remove from favorites </button>
        </div>
    )
}

export default FavoriteItem;