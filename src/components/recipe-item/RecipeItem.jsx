import './styles.css'
import '../recipeDetails.css'
import React from 'react';
import { useState } from 'react';
import RecipeDetails from '../RecipeDetails';

const RecipeItem = (props) => {
    const { id, image, title, addToFavorites } = props;
    const [openModal, setOpenModal] = useState(false);
    return (
        <div key={id} className="recipe-item">
            <div className="example">
                <img src={image} />
                {openModal && <RecipeDetails closeModal={(itClosed)=>{}}/>}
                <div className="content">
                    <div className="text" onClick={() => {
                        console.log('modal has been opened', openModal);
                        setOpenModal(true);
                        console.log('AFTER IT has been opened', openModal);
                    }}>View Recipe</div>


                </div>

            </div>
            <div className='card-title-buttons'>
                <p> {title} </p>
                <button className="addToFaves" type="button" onClick={addToFavorites}> Add to favorites </button>
            </div>
        </div>
    )
}

export default RecipeItem;