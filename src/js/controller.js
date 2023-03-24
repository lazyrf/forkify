import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";

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
        // resultsView.render(model.state.search.results);
        resultsView.render(model.getSearchResultsPage());

        // 4) Render initial pagination button
        paginationView.render(model.state.search);
    } catch (err) {
        console.log(err);
    }
};

const controlPagination = function(page) {
    // 1) Render NEW result
    resultsView.render(model.getSearchResultsPage(page));
    // 2) Render NEW initial pagination button
    paginationView.render(model.state.search);
};

const controlServings = function(newServings) {
    // Update the recipe servings (in state)
    model.updateServings(newServings);

    // Update the view
    recipeView.render(model.state.recipe);
};

const init = function() {
    recipeView.addHandlerRender(controlRecipes);
    recipeView.addHandlerUpdateServings(controlServings);
    searchView.addHandlerRender(controlSearchResults);
    paginationView.addHandlerRender(controlPagination);
};
init();
