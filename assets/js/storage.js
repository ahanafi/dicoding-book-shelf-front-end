import Book from './Book.js';

let books = [];

const STORAGE_KEY = 'BOOKSHELF_DATA';

/**
* Check supported Localstorage
* @returns boolean
*/
const isSupportStorage = () => typeof (Storage) !== undefined;

/**
* Save book data to localstorage
* @returns void
*/
const saveData = () => {
    const parsedData = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsedData);
    document.dispatchEvent(new Event('ondatasaved'));
}

/**
* Load data from local storage if exist
* @returns void
*/
const loadDataFromStorage = () => {
    const bookData = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (bookData !== null) {
        books = bookData;
    }

    document.dispatchEvent(new Event('ondataloaded'));
}

/**
 * Update data to localStorage
 */
const updateDataToStorage = () => {
    if (isSupportStorage()) {
        saveData();
    }
}

/**
 * Create book object
 * @param {string} title 
 * @param {string} author 
 * @param {integer} year 
 * @param {boolean} isComplete 
 * @returns {Object} book
 */
const composeBookObject = (title, author, year, isComplete) => new Book(title, author, year, isComplete);

/**
 * Filter array `books` by bookId
 * @param {integer} bookId 
 * @returns {array} of books
 */
const findBook = (bookId) => books.filter(book => book.id === bookId);

/**
 * Find index of book by bookID
 * @param {integer} bookId 
 * @returns index
 */
const findBookIndex = (bookId) => {
    let index = 0;
    for (const book of books) {
        if (book.id === bookId)
            return index;
        index++;
    }

    return -1;
}

export {
    books,
    composeBookObject,
    isSupportStorage,
    saveData,
    loadDataFromStorage,
    updateDataToStorage,
    findBook,
    findBookIndex
}