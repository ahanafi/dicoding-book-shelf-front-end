import { createBook, updateDataToStorage, book, books } from './storage.js';

const INCOMPLETED_BOOK_ID = 'incompleteBookshelfList';
const COMPLETED_BOOK_ID = 'completeBookshelfList';
const BOOK_ID = 'bookId';

/**
 * Toggle (show-hide) book form
 * @param  boolean
 * @return void
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
 * @return void
 */
const addBook = () => {
    const title = document.querySelector('#inputBookTitle').value;
    const author = document.querySelector('#inputBookAuthor').value;
    const year = document.querySelector('#inputBookYear').value;
    const isComplete = document.querySelector('#inputBookIsComplete').value;

    const book = createBook(author, title, year, isComplete);
    books.push(book);

    const completedBooksContainer = document.getElementById(COMPLETED_BOOK_ID);
    const incompleteBooksContainr = document.getElementById(INCOMPLETED_BOOK_ID);
    const newBook = generateBookItem(title, author, year, isComplete);

    if (isComplete) {
        completedBooksContainer.append(newBook);
    } else {
        incompleteBooksContainr.append(newBook);
    }

    updateDataToStorage();
}

/**
 * Refresh books
 * @return void
 */
const refreshBookShelfData = () => {
    const completedBooksContainer = document.getElementById(COMPLETED_BOOK_ID);
    const incompleteBooksContainr = document.getElementById(INCOMPLETED_BOOK_ID);

    for (const book of books) {
        // const newBook = createBook(book.title, book.author, book.year, book.isComplete);
        const newBook = generateBookItem(book.title, book.author, book.year, book.isComplete);
        newBook[BOOK_ID] = book.id;

        if (book.isComplete) {
            completedBooksContainer.append(newBook);
        } else {
            incompleteBooksContainr.append(newBook);
        }
    }
}

/**
 * Generate book elements
 * @param {string} title 
 * @param {string} author 
 * @param {integer} year 
 * @param {boolean} isComplete
 * @return {string|element}
 */
const generateBookItem = (title, author, year, isComplete) => {
    const articleTag = document.createElement(`article`);
    articleTag.setAttribute('class', 'book_item');

    const titleTag = document.createElement('h3');
    titleTag.textContent = title;

    const authorTag = document.createElement('p');
    authorTag.textContent = `Penulis: ${author}`;

    const yearTag = document.createElement('p');
    yearTag.textContent = `Tahun: ${year}`;

    const containerButton = document.createElement('div');
    containerButton.setAttribute('class', 'action');

    const greenButton = createButton('green', 'Selesai dibaca', alert);
    const redButton = createButton('red', 'Belum selesai dibaca', alert);

    // Append buttons to container button
    containerButton.append(greenButton, redButton);

    // Append all elements to container
    articleTag.append(titleTag, authorTag, yearTag, containerButton);

    return articleTag;
}

/**
 * create button
 * @param  {string} classList     class list of button
 * @param  {string} eventListener name of listener function
 * @return {string|element}       button
 */
const createButton = (classList, text, eventListener) => {
    const button = document.createElement('button');
    button.setAttribute('class', classList);
    button.textContent = text;
    button.addEventListener('click', (evt) => {
        eventListener(evt);
        evt.stopPropagation();
    });
    return button;
}


export {
    addBook, showBookForm, refreshBookShelfData
}