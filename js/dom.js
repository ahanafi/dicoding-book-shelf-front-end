import { createBook, updateDataToStorage, book, books } from './storage.js';

const INCOMPLETED_BOOK_IDS = 'incompleteBookshelfList';
const COMPLETED_BOOK_ID = 'completeBookshelfList';
const BOOK_ID = 'bookId';

/**
 * Toggle (show-hide) book form
 */
const showBookForm = (show) => {
  const inputSection = document.querySelector('.input_section');
  if (show) {
    inputSection.classList.remove('d-none');
  } else {
    inputSection.classList.add('d-none');
  }
}

/**
 * Add book
 */
const addBook = () => {
  const title = document.querySelector('#inputBookTitle').value;
  const author = document.querySelector('#inputBookAuthor').value;
  const year = document.querySelector('#inputBookYear').value;
  const isComplete = document.querySelector('#inputBookIsComplete').value;

  const book = createBook(author, title, year, isComplete);
  books.push(book);

  updateDataToStorage();
}

const refreshBookShelfData = () => {
  for (const book of books) {
    const newBook = createBook(book.title, book.author, book.year, book.isComplete);
    newBook[BOOK_ID] = book.id;
  }
}

export {
  addBook, showBookForm, refreshBookShelfData
}