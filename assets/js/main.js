import { addBook, showBookForm, refreshBookShelfData, searchBook } from './dom.js';
import { isSupportStorage, loadDataFromStorage } from './storage.js'

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#inputBook');
    form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        addBook();
    });

    const addBookBtn = document.querySelector('#addBook');
    addBookBtn.addEventListener('click', () => showBookForm(true));

    const closeBtn = document.querySelector('.close');
    closeBtn.addEventListener('click', () => showBookForm(false));

    // Search
    const inputSearch = document.querySelector('#searchBookTitle');
    inputSearch.addEventListener('keyup', function() {
        searchBook(this.value.toString().toLowerCase());
    });

    if (isSupportStorage()) {
        loadDataFromStorage();
    }
});

document.addEventListener('ondatasaved', () => console.log('Bookshelf saved!'));

document.addEventListener('ondataloaded', () => refreshBookShelfData());