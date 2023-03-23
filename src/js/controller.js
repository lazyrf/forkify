import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";

// import icons from '../img/icons.svg'; // Parcel 1
// import icons from 'url:../img/icons.svg'; // Parcel 2
import 'core-js/stable'; // polyfill everything else
import 'regenerator-runtime/runtime'; // polyfill async/await

// console.log(icons); // http://localhost:1234/icons.dfd7a6db.svg?1679457050731

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function() {
    try {
        const id = window.location.hash.slice(1);
        if (!id) {
            return ;
        }

        recipeView.renderSpinner();

        // 1) Loading recipe
        await model.loadRecipe(id);

        // 2) Rendering recipe
        recipeView.render(model.state.recipe);
    } catch (err) {
        recipeView.renderError();
    }
};

const controlSearchResults = async function() {
    try {
        resultsView.renderSpinner();

        // 1) Get search query
        const query = searchView.getQuery();
        if (!query) {
            return ;
        }

        // 2) Load search results
        await model.loadSearchResults(query);

        // 3) Render result
        resultsView.render(model.state.search.results);
    } catch (err) {
        console.log(err);
    }
};

const init = function() {
    recipeView.addHandlerRender(controlRecipes);
    searchView.addHandlerRender(controlSearchResults);
};
init();
