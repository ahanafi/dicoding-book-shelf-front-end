let books = [];

let book = {
    id: '',
    title: '',
    author: '',
    year: '',
    isComplete: false
};

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

const updateDataToStorage = () => {
    if (isSupportStorage()) {
        saveData();
    }
}

const composeBookObject = (title, author, year, isComplete) => {
    book.id = new Date().getUTCMilliseconds();
    book.title = title;
    book.author = author;
    book.year = year;
    book.isComplete = isComplete;
    return book;
}

const findBook = (bookId) => books.filter(book => book.id === bookId);

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
    book,
    composeBookObject,
    isSupportStorage,
    saveData,
    loadDataFromStorage,
    updateDataToStorage,
    findBook,
    findBookIndex
}