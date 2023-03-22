import * as model from "./model.js";
import recipeView from "./views/recipeView.js";

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
        config.log(err);
    }
};

const init = function() {
    recipeView.addHandlerRender(controlRecipes);
};
init();
