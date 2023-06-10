import ReactModal from 'react-modal';
import React, { useState } from 'react';

function RecipeDetails() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <button onClick={() => setIsOpen(true)}>
                View Recipe Details
            </button>
            <ReactModal
                isOpen={isOpen}
                contentLabel="recipe details"
                onRequestClose={() => setIsOpen(false)}
            >
                {isOpen && (
                    <div>
                        <div>
                            {/* // use json to render data */}
                            <span>Ingredients </span>
                            <span> Instructions </span>
                        </div>
                        <button onClick={() => setIsOpen(false)}> Close </button>
                    </div>
                )}
            </ReactModal>
        </div>
    );
}

export default RecipeDetails;