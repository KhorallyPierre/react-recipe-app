import React, {useState} from 'react';

function recipeDetails() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <button onClick={() => setIsOpen(true)}>
                View Recipe Details
            </button>

            {isOpen && (
                <div>
                    <div>
                        <span>Ingredients </span>
                        <span> Instructions </span>
                    </div>
                    <button onClick={()=> setIsOpen(false)}> Close </button>
                </div>
            )}
        </div>
    );
}

export default recipeDetails;