import './styles.css'
import React from 'react';
import RecipeDetails from '../RecipeDetails';
import {useState} from 'react';
import '../recipeDetails.css';

const FavoriteItem = (props) => {
    const { id, image, title, removeFromFavorites} = props;
    const [openModal, setCloseModal] = useState(false)
    return (
        <div key={id} className="favorite-item">
            <div id="example-image" className="example">
                <img src={image} alt="recipe" />
                {openModal && <RecipeDetails closeModal={setCloseModal}/>}
                <div  className="content">
                    <div  className="text" onClick={() => setCloseModal(true)}>Ingredient List</div>
                </div>
            </div>
            <p> {title} </p>

            <button type="button" onClick={removeFromFavorites}> Remove from favorites </button>
            
        </div>
        
    )
    
}


export default FavoriteItem;