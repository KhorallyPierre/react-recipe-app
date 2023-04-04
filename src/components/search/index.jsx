import { useState } from "react";
import "./styles.css";
import React from "react";
import { useEffect } from "react";

// state management:
//usestate hook allows values to be changed whenever we want
// values get stored as a state variable to be passed in
//userReducer is used to manage complex state (will be covered later)

const Search = (props) => {
  const { getDataFromSearchComponent, apiCalledSuccess, setApiCalledSuccess } =
    props;
  console.log(props);
  // input value is initual value of input, setInputValue is a function
  const [inputValue, setInputValue] = useState(""); //initial value of state, which is an empty string for a search bar

  const handleInputValue = (event) => {
    const { value } = event.target;
    //set the updated stateß
    setInputValue(value);
  };
  console.log(inputValue);

  const handleSubmit = (event) => {
    event.preventDefault();
    //this is where the data from search component get passed in to homepage component
    getDataFromSearchComponent(inputValue);
  };
  useEffect(() => {
    if (apiCalledSuccess) {
      setInputValue("");
      setApiCalledSuccess(false);
    }
  }, [apiCalledSuccess]);

  return (
    <form onSubmit={handleSubmit} className="Search">
      <input
        name="search"
        onChange={handleInputValue}
        value={inputValue}
        placeholder="What's for dinner?"
      />
      <button type="submit"> Search </button>
    </form>
  );
};

export default Search;
