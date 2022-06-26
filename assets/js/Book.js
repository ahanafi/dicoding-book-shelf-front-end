class Book {
    constructor(title, author, year, isComplete) {
        this.id = new Date().getMilliseconds();
        this.title = title;
        this.author = author;
        this.year = year;
        this.isComplete = isComplete;
    }
}

export default Book;