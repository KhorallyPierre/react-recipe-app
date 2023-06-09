import './styles.css'
import React from 'react';

const FavoriteItem = (props) => {
    const { id, image, title, removeFromFavorites } = props;
    return (
        <div key={id} className="favorite-item">
            <div className="example">
                <img src={image} alt="image of recipe" />
                <div  className="content">
                    <div class="text">View Recipe</div>
                </div>
            </div>
            <p> {title} </p>

            <button type="button" onClick={removeFromFavorites}> Remove from favorites </button>
        </div>
    )
}

export default FavoriteItem;