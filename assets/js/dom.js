import { composeBookObject, updateDataToStorage, books, findBook, findBookIndex } from './storage.js';

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

    const identifier = (book.isComplete) ? COMPLETED_BOOK_ID : INCOMPLETED_BOOK_ID;
    const bookListContainer = document.getElementById(identifier);
    const newBook = generateBookItem(book);

    bookListContainer.append(newBook);

    updateDataToStorage();
    clearForm();
}

/**
 * Refresh books
 * @return void
 */
const refreshBookShelfData = () => {
    for (const book of books) {
        const newBook = generateBookItem(book);
        newBook[BOOK_ID] = book.id;
        
        const identifier = (book.isComplete) ? COMPLETED_BOOK_ID : INCOMPLETED_BOOK_ID;
        const bookListContainer = document.getElementById(identifier);
        bookListContainer.append(newBook);
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
    const buttonRemove = createRemoveButton(bookId);

    // Append buttons to container button
    containerButton.append(button, buttonRemove);

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
        '&#33;',
        () => updateBookStatus(bookId, false)
    );
}

/**
 * Create remove button
 * @param {integer} bookId 
 * @returns {string}
 */
const createRemoveButton = (bookId) => {
    return createButton(
        'btn-remove',
        bookId,
        'Remove item',
        '&times;',
        () => removeBookItem(bookId)
    )
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

/**
 * Remove book from lists
 * @param {integr} bookId 
 */
const removeBookItem = (bookId) => {
    const askConfirm = confirm('Are you sure want to remove this?');
    if (askConfirm) {
        const bookIndex = findBookIndex(bookId);
        const bookItem = document.getElementById(bookId);
        books.splice(bookIndex, 1);
    
        bookItem.remove();
        updateDataToStorage();
    }
    
    return false;
}

/**
 * Search book by title
 * @param {string} keyword 
 */
const searchBook = (keyword) => {
    const bookItems = document.querySelectorAll('.book_item');
    if (keyword !== '') {
        bookItems.forEach(bookItem => {
            const title = bookItem.querySelector('.book_title').textContent.toString().toLowerCase();
            if (title.indexOf(keyword) > -1) {
                bookItem.classList.remove('d-none');
            } else {
                bookItem.classList.add('d-none');
            }
        });
    } else {
        bookItems.forEach(bookItem => bookItem.classList.remove('d-none'));
    }
}

export {
    addBook, showBookForm, refreshBookShelfData, searchBook
}