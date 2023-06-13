import React from "react";
import "./favorites.css";
import { useState } from "react";
import { useEffect } from "react";
import { useReducer } from "react";
import { useCallback } from "react";
import RecipeItem from "../../components/recipe-item/RecipeItem";
import RecipeDetails from "../../components/RecipeDetails";
import FavoriteItem from '../../components/favorite-item/FavoriteItem.jsx';



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
  filteredValue: "",
};
const Favorites = () => {

  // open modal
  const [openModal, setCloseModal] = useState(false)
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

    //calling api for food data

    async function getRecipes() {
      const apiResponse = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=5a889f5e8d314bbda815babf720da808&query=${getData}`
      );

      const result = await apiResponse.json();
      const { results } = result;

      if (results) {
        //set the loading state as false again to get data

        /// set the recipes state
        setRecipes(results);
        // when api results are provided
        setApiCalledSuccess(true);
        setLoadingState(false);
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
    if (extractFavoritesFromLocalStorageOnPageLoad != null) {
      setFavorites(extractFavoritesFromLocalStorageOnPageLoad);
    }
  }, []);

  // filter through favorites

  const filteredFavoritesItems = favorites.filter((item) =>
    item.title.toLowerCase().includes(filteredState.filteredValue)
  );

  const renderRecipes = useCallback(
    () => {
      console.log("renderRecipes", recipes);
      if (recipes && recipes.length > 0) {
        let recipeItems = recipes.map((recipeItem) => (
          <RecipeItem
            onViewRecipeClick={() => RecipeDetails(recipeItem)}
            addToFavorites={() => addToFavorites(recipeItem)}
            id={recipeItem.id}
            image={recipeItem.image}
            title={recipeItem.title}
          />
        ));
        return recipeItems;
      }
    }
    // ,[recipes, addToFavorites]

  );



  return (
    <div className="favespage">
      {/* show favorite items */}
      <div href="/">
        {" "}
        <div className="socialLinks" id="socialLinks">
          <a href="https://www.facebook.com/groups/1520825128207154/"> <img className="icons" src="images/icons8-facebook-64.png" width="36" height="36" alt="" />  </a>
          <a href="https://www.instagram.com/simplyrecipes/?hl=en/"> <img className="icons" src="images/icons8-instagram-64.png" width="36" height="36" alt="" />  </a>
          <a href="https://www.pinterest.com/natashaskitchen/the-most-popular-recipes-on-pinterest//"> <img className="icons" src="images/icons8-pinterest-64.png" width="36" height="36" alt="" />  </a>
          <a href="https://www.youtube.com/@EssenRezepte"> <img className="icons" src="images/icons8-youtube-64.png" width="36" height="36" alt="" />  </a>
        </div>
        <div className="my-favorite-recipes-button-container"> <a href="/"> <button className="favoritesButton" id="homeButton"> Home</button>  </a> </div>{" "}
      </div>
      <div className="favorites-wrapper">
        <div className="faves-search-background">
          <form className="search-favorites">
            <h1 className="favorites-title"> Your Favorites</h1>
            <div className="inputContainer">
              <input
                name="searchfavorites"
                value={filteredState.filteredValue}
                placeholder="search though favorites"
                onChange={(event) => {
                  dispatch({
                    type: "filterFavorites",
                    value: event.target.value,
                  });
                }}
              />
              <button className="searchButton" type="submit">
                Search
              </button>
            
            </div>
          </form>
        </div>

        <div className="favorites">
          {filteredFavoritesItems && favorites.length > 0
            ? filteredFavoritesItems.map((recipeItem) => (
              <FavoriteItem
                onViewRecipeClick={() => {
                  RecipeDetails(recipeItem)
                }}
                removeFromFavorites={() => { removeFromFavorites(recipeItem.id) }}
                id={recipeItem.id}
                image={recipeItem.image}
                title={recipeItem.title}
              />
            ))
            : <h1> You don't have favorite recipes (yet)</h1>}
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

      </div>
    </div>
  );

};

export default Favorites;
