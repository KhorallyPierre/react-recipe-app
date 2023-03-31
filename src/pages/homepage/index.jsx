import Search from "../../components/search";
import { useState } from "react";
import "./styles.css";
import RecipeItem from "../../components/recipe-item";
import React from "react";

const dummydata = "dummydata";

const Homepage = () => {
  //loading state
  const [loadingState, setLoadingState] = useState(false);
  // save results that we recieve from api
  const [recipes, setRecipes] = useState([]);

  //favorites data state
  const[favorites,setFavorites] = useState([])
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
      }
      console.log(result);
    }
    getRecipes();
  };

  const addToFavorites = (getCurrentRecipeItem) => {
    let copyFavorites = [...favorites];

    const index =copyFavorites.findIndex(item => item.id === getCurrentRecipeItem.id)
    if(index === -1){
        copyFavorites.push(getCurrentRecipeItem)
        setFavorites(copyFavorites)
        
    }else{
        alert('Pst.. item already in favorites')
    }
  };

  console.log(loadingState, recipes, "loadingState, recipes");
  return (
    <div className="homepage">
      <Search
        getDataFromSearchComponent={getDataFromSearchComponent}
        dummydatacopy={dummydata}
      />

      {/* {show loading state} */}

      {loadingState && (
        <div className="loading"> Loading Recipes... please wait </div>
      )}

      {/* {show loading state} */}

      {/* {map through all the recipes} */}

      <div className="items">
        {recipes && recipes.length > 0
          ? recipes.map((item) => (
              <RecipeItem
                addToFavorites={() => addToFavorites(item)}
                id={item.id}
                image={item.image}
                title={item.title}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default Homepage;
