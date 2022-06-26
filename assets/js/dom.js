import { composeBookObject, updateDataToStorage, books, findBook } from './storage.js';
import { getValue } from './utils.js';

const INCOMPLETED_BOOK_ID = 'incompleteBookshelfList';
const COMPLETED_BOOK_ID = 'completeBookshelfList';
const BOOK_ID = 'bookId';

// Input Element
const formInputBook = document.querySelector('#inputBook');
const inputTitle = document.querySelector('#inputBookTitle');
const inputAuthor = document.querySelector('#inputBookAuthor');
const inputYear = document.querySelector('#inputBookYear');
const inputIsComplete = document.querySelector('#inputBookIsComplete');

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
 * Reset all form input
 * @returns void
 */
const clearForm = () => formInputBook.reset();

/**
 * Add book
 * @return void
 */
const addBook = () => {
    const book = composeBookObject(
        inputTitle.value,
        inputAuthor.value,
        inputYear.value,
        inputIsComplete.checked
    );

    books.push(book);

    const completedBooksContainer = document.getElementById(COMPLETED_BOOK_ID);
    const incompleteBooksContainr = document.getElementById(INCOMPLETED_BOOK_ID);
    const newBook = generateBookItem(book);

    if (book.isComplete) {
        completedBooksContainer.append(newBook);
    } else {
        incompleteBooksContainr.append(newBook);
    }
    
    updateDataToStorage();
    clearForm();
}

/**
 * Refresh books
 * @return void
 */
const refreshBookShelfData = () => {
    const completedBooksContainer = document.getElementById(COMPLETED_BOOK_ID);
    const incompleteBooksContainr = document.getElementById(INCOMPLETED_BOOK_ID);

    for (const book of books) {
        const newBook = generateBookItem(book);
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
const generateBookItem = (book) => {
    const bookId = book.id;
    const container = document.createElement(`article`);
    container.setAttribute('class', 'book_item');
    container.setAttribute('id', bookId);
    
    const titleTag = document.createElement('h3');
    titleTag.setAttribute('class', 'book_title');
    titleTag.textContent = book.title;
    
    const authorTag = document.createElement('p');
    authorTag.setAttribute('class', 'book_author');
    authorTag.textContent = `Author: ${book.author}`;
    
    const yearTag = document.createElement('p');
    yearTag.setAttribute('class', 'book_year');
    yearTag.textContent = `Year: ${book.year}`;
    
    const bookDataContainer = document.createElement('div');
    bookDataContainer.setAttribute('class', 'book_data');
    bookDataContainer.append(
        titleTag, authorTag, yearTag
    );

    const containerButton = document.createElement('div');
    containerButton.setAttribute('class', 'action');

    const button = book.isComplete ? createIncompleteButton(bookId) : createCompleteButton(bookId);

    // Append buttons to container button
    containerButton.append(button);

    // Append all elements to container
    container.append(bookDataContainer, containerButton);

    return container;
}

/**
 * create button
 * @param  {string} classList     class list of button
 * @param  {string} eventListener name of listener function
 * @return {string|element}       button
 */
const createButton = (classList, id, text, icon, eventListener) => {
    const button = document.createElement('button');
    button.setAttribute('class', classList);
    button.setAttribute('data-target', id);
    
    // Icon
    const spanIcon = document.createElement('span');
    spanIcon.setAttribute('class', 'btn-icon');
    spanIcon.innerHTML = icon;

    button.append(spanIcon, text);

    button.addEventListener('click', (evt) => {
        eventListener(evt);
        evt.stopPropagation();
    });
    return button;
}

/**
 * Create compltete button
 * @returns {string}
 */
const createCompleteButton = (bookId) => {
    return createButton(
        'btn-complete',
        bookId,
        'Mark as Complete',
        '&check;',
        () => updateBookStatus(bookId)
    );
}

/**
 * Create incomplete button
 * @returns {string}
 */
const createIncompleteButton = (bookId) => {
    return createButton(
        'btn-incomplete',
        bookId,
        'Mark as Incomplete',
        '&times;',
        () => updateBookStatus(bookId, false)
    );
}

/**
 * Set book item as completed read
 * @param {integer} bookId 
 */
const updateBookStatus = (bookId, completed = true) => {
    const identifier = completed ? COMPLETED_BOOK_ID : INCOMPLETED_BOOK_ID;
    const bookListContainer = document.getElementById(identifier);
    const bookItem = document.getElementById(bookId);
    
    const book = findBook(bookId)[0];
    book.isComplete = completed;

    const newBook = generateBookItem(book);

    bookListContainer.append(newBook);
    bookItem.remove();

    updateDataToStorage();
}

export {
    addBook, showBookForm, refreshBookShelfData
}