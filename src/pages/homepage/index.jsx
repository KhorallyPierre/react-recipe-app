import Search from "../../components/search";
import { useState } from "react";
import "./styles.css";
import RecipeItem from "../../components/recipe-item";
import FavoriteItem from "../../components/favorite-item";
import React from "react";
import { useEffect } from "react";
import { useReducer } from "react";
import { useCallback } from "react";

const dummydata = "dummydata";

const reducer = (state, action) => {
  switch (action.type) {
    case "filterFavorites":
      return {
        ...state,
        filteredValue: action.value,
      };
    default:
      return state;
  }
};
const initialState = {
  filteredValue: " ",
};
const Homepage = () => {
  //loading state
  const [loadingState, setLoadingState] = useState(false);
  // save results that we recieve from api
  const [recipes, setRecipes] = useState([]);

  //favorites data state
  const [favorites, setFavorites] = useState([]);

  // checking state for api to clear search bar

  const [apiCalledSuccess, setApiCalledSuccess] = useState(false);

  // use reducer functionality

  const [filteredState, dispatch] = useReducer(reducer, initialState);

  const getDataFromSearchComponent = (getData) => {
    // keep the loading state as true before we are calling the api
    setLoadingState(true);
    console.log(getData, "getData");

    //calling api for food data

    async function getRecipes() {
      const apiResponse = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=5a889f5e8d314bbda815babf720da808&query=${getData}`
      );
      const result = await apiResponse.json();
      const { results } = result;

      if (results && results.length > 0) {
        //set the loading state as false again to get data
        setLoadingState(false);
        /// set the recipes state
        setRecipes(results);
        // when api results are provided
        setApiCalledSuccess(true);
      }
    }
    getRecipes();
  };
  
  const addToFavorites = (getCurrentRecipeItem) => {
    let copyFavorites = [...favorites];

    const index = copyFavorites.findIndex(
      (item) => item.id === getCurrentRecipeItem.id
    );
    if (index === -1) {
      copyFavorites.push(getCurrentRecipeItem);
      setFavorites(copyFavorites);
      //save the favorites in local storage
      localStorage.setItem("favorites", JSON.stringify(copyFavorites));
    } else {
      alert("Pst.. item already in favorites");
    }
  };

  const removeFromFavorites = (getCurrentId) => {
    let copyFavorites = [...favorites];

    copyFavorites = copyFavorites.filter((item) => item.id !== getCurrentId);

    setFavorites(copyFavorites);
    localStorage.setItem("favorites", JSON.stringify(copyFavorites));
  };

  useEffect(() => {
    const extractFavoritesFromLocalStorageOnPageLoad = JSON.parse(
      localStorage.getItem("favorites")
    );
    if (extractFavoritesFromLocalStorageOnPageLoad != null){
      setFavorites(extractFavoritesFromLocalStorageOnPageLoad);
    }
    
  }, []);

  // filter through favorites
console.log(favorites, "faves")
  const filteredFavoritesItems = favorites.filter((item) =>
    item.title.toLowerCase().includes(filteredState.filteredValue)
  );

  const renderRecipes = useCallback(() => {
    if (recipes && recipes.length > 0) {
      recipes.map((item) => (
        <RecipeItem
          addToFavorites={() => addToFavorites(item)}
          id={item.id}
          image={item.image}
          title={item.title}
        />
      ));
    }
  }, [recipes, addToFavorites]);

  return (
    <div className="homepage">
      <Search
        getDataFromSearchComponent={getDataFromSearchComponent}
        dummydatacopy={dummydata}
        apiCalledSuccess={apiCalledSuccess}
        setApiCalledSuccess={setApiCalledSuccess}
      />
      {/* show favorite items */}

      <div className="favorites-wrapper">
        <h1 className="favorites-title"> Favorites</h1>
        <div className="search-favorites">
          <input
            name="searchfavorites"
            value={filteredState.filteredValue}
            placeholder="Search Favorites"
            onChange={(event) =>
              dispatch({ type: "filterFavorites", value: event.target.value })
            }
          />
        </div>
        <div className="favorites">
          {filteredFavoritesItems && favorites.length > 0
            ? filteredFavoritesItems.map((item) => (
                <FavoriteItem
                  removeFromFavorites={() => removeFromFavorites(item.id)}
                  id={item.id}
                  image={item.image}
                  title={item.title}
                />
              ))
            : null}
        </div>
      </div>
      {/* {show loading state} */}

      {loadingState && (
        <div className="loading"> Loading Recipes... please wait </div>
      )}

      {/* {show loading state} */}

      {/* {map through all the recipes} */}

      <div className="items">
        {renderRecipes()}
        {/* {recipes && recipes.length > 0
          ? recipes.map((item) => (
              <RecipeItem
                addToFavorites={() => addToFavorites(item)}
                id={item.id}
                image={item.image}
                title={item.title}
              />
            ))
          : null} */}
      </div>
    </div>
  );
};

export default Homepage;
