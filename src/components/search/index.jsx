import { useState} from 'react';
import './styles.css';

// state management:
//usestate
// values get sotred as a state variable to be passed in 
//userReducer is used to manage complex state (will be covered later)




const Search = ()=> {
// input value is for input, setINputValue is a function, to return updated state of input
    const [inputValue, setInputValue] = useState('') //initial value of state, which is an empty string
    
    const handleInputValue= (event) => {
        const {value} = event.target;
        //set the updated state
        setInputValue(value)
    }
    console.log(inputValue)

    return (
        <form className="Search">
            <input name="search" onChange={handleInputValue} value={inputValue} placeholder="Search Recipes" id="search"/>
            <button type="submit"> Search </button>
        </form>
    )
}

export default Search;