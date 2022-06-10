import { addBook, showBookForm, refreshBookShelfData } from './dom.js';
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

  if (isSupportStorage()) {
    loadDataFromStorage();
  }
});

document.addEventListener('ondatasaved', () => alert('Bookshelf saved!'));

document.addEventListener('ondataloaded', () => refreshBookShelfData());