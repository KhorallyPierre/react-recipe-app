import { useState } from "react";
import "./homepage.css";
import RecipeItem from "../../components/recipe-item/RecipeItem";
import React from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import Search from '../../components/search/Search.jsx'

const dummydata = "dummydata";


const initialState = {
  filteredValue: "",
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


  const getDataFromSearchComponent = (getData) => {
    // keep the loading state as true before calling the api
    setLoadingState(true);


    //calling api for food data

    async function getRecipes() {

      const apiResponse = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=5a889f5e8d314bbda815babf720da808&query=${getData}`
      );

      const result = await apiResponse.json();
      const { results } = result;

      if (results) {
        
        /// set the recipes state
        setRecipes(results);
        // when api results are provided
        setApiCalledSuccess(true);
        //set the loading state as false again to get data
        setLoadingState(false);
      } else {
        // create a recipe not found component to be rendered
        // <notFound/>
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
      alert("added to favorites")
    } else {
      alert("Pst.. item already in favorites");
    }
  };



  useEffect(() => {
    const extractFavoritesFromLocalStorageOnPageLoad = JSON.parse(
      localStorage.getItem("favorites")
    );
    if (extractFavoritesFromLocalStorageOnPageLoad != null) {
      setFavorites(extractFavoritesFromLocalStorageOnPageLoad);
    }
  }, []);

 

  const renderRecipes = useCallback(() => {
    
    if (recipes && recipes.length > 0) {

      let recipeItems = recipes.map((recipeItem) => (
        <RecipeItem
        
          addToFavorites={() => addToFavorites(recipeItem)}
          id={recipeItem.id}
          image={recipeItem.image}
          title={recipeItem.title}
      

        />
      ));
      console.log('recipe results', recipeItems)
      return recipeItems;
    } else if (recipes.length === 0 && apiCalledSuccess) {

   
    } else {
      // return (<h1>{JSON.stringify(recipes)}</h1>)
    }

  }
    // ,[recipes, addToFavorites]
  );
  // const openRecipeDetails = (selectedRecipeItem) => {
  //   console.log('recipe details', openRecipeDetails)
  //   console.log('selected recipe item', selectedRecipeItem)
  //   return <RecipeDetails/>
 
  //  }


 
  return (
    
    <div className="homepage">
      <div className="socialLinks" id="socialLinks"> 
       <a href="https://www.facebook.com/groups/1520825128207154/"> <img className="icons" src="images/icons8-facebook-64.png" width="36" height="36" alt=""/>  </a>
       <a href="https://www.instagram.com/simplyrecipes/?hl=en/"> <img className="icons" src="images/icons8-instagram-64.png" width="36" height="36" alt=""/>  </a> 
       <a href="https://www.pinterest.com/natashaskitchen/the-most-popular-recipes-on-pinterest//"> <img className="icons" src="images/icons8-pinterest-64.png" width="36" height="36" alt=""/>  </a> 
       <a href="https://www.youtube.com/@EssenRezepte"> <img className="icons" src="images/icons8-youtube-64.png" width="36" height="36" alt=""/>  </a>  
      </div>
      <div className="my-favorite-recipes-button-container" ><a href="/favorites"> <button className="favoritesButton" id="favoritesButton"> My Favorite Recipes </button> </a> </div>
     
      <div className="searchbarBackground">
        <div className="title-input-container">
          <h1 className="homepage-title"> Find a Recipe</h1>
          <Search
            getDataFromSearchComponent={getDataFromSearchComponent}
            dummydatacopy={dummydata}
            apiCalledSuccess={apiCalledSuccess}
            setApiCalledSuccess={setApiCalledSuccess}
          />
        </div>
       
      </div>


      {/* {show loading state} */}

      {loadingState &&(
        <div className="loading"> Loading Recipes... please wait </div>
      )}


      {/* {map through all the recipes} */}

      <div className="items">
        
        {renderRecipes()}
         {recipes && recipes.length > 0
          ? recipes.map((item) => (
              <RecipeItem
                addToFavorites={() => addToFavorites(item)}
                id={item.id}
                image={item.image}
                title={item.title}
              />
            ))
          : null } 
      </div>
        {apiCalledSuccess && (<h1>bleh</h1>)}
    </div>
  );
};


export default Homepage;
