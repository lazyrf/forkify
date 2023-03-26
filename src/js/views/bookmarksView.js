import View from "./view.js";
import icons from 'url:../../img/icons.svg'; // Parcel 2

class BookmarksView extends View {
    _parentEl = document.querySelector(".bookmarks__list");
    _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)';
    _message = "";

    _generateMarkup() {
        return this._data.map(this._generateMarkupPreivew).join('');
    }

    _generateMarkupPreivew(result) {
        const id = window.location.hash.slice(1);

        return `
         <li class="preview">
            <a class="preview__link ${result.id === id ? 'preview__link--active' : ''}" href="#${result.id}">
              <figure class="preview__fig">
                <img src="${result.image}" alt="Test" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${result.title}</h4>
                <p class="preview__publisher">${result.publisher}</p>
              </div>
            </a>
          </li>
        `;
    }
}

export default new BookmarksView();
