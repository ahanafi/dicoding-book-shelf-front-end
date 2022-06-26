import { composeBookObject, updateDataToStorage, book, books } from './storage.js';

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
    
    clearForm();
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
    const container = document.createElement(`article`);
    container.setAttribute('class', 'book_item');

    
    const titleTag = document.createElement('h3');
    titleTag.textContent = book.title;
    
    const authorTag = document.createElement('p');
    authorTag.textContent = `Penulis: ${book.author}`;
    
    const yearTag = document.createElement('p');
    yearTag.textContent = `Tahun: ${book.year}`;
    
    const bookDataContainer = document.createElement('div');
    bookDataContainer.setAttribute('class', 'book_data');
    bookDataContainer.append(
        titleTag, authorTag, yearTag
    );


    const containerButton = document.createElement('div');
    containerButton.setAttribute('class', 'action');

    const button = book.isComplete ? createIncompleteButton() : createCompleteButton();

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
const createButton = (classList, text, icon, eventListener) => {
    const button = document.createElement('button');
    button.setAttribute('class', classList);
    
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
const createCompleteButton = () => {
    return createButton('btn-complete', 'Mark as Complete', '&times;', alert);
}

/**
 * Create incomplete button
 * @returns {string}
 */
const createIncompleteButton = () => {
    return createButton('btn-incomplete', 'Mark as Incomplete', '&check;', alert);
}

export {
    addBook, showBookForm, refreshBookShelfData
}