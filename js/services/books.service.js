'use strict'

const STORAGE_KEY = 'booksDB'

var gBooks
_creatBooks()
console.log(gBooks);


function getBooks() {
    return gBooks
}

function _creatBooks() {
    var books = loadFromStorage(STORAGE_KEY)
    if (!books || !books.length) {
        books = [
            _creatBook('Bereshit', 10),
            _creatBook('Shmot', 15),
            _creatBook('Vaykra', 20),
            _creatBook('Book', 10)
        ]
    }
    gBooks = books
    _saveBooksToStorage()
}

function _creatBook(name, price) {
    const book = {
        id: getRandomIntInclusive(0, 10000),
        name,
        price,
        imgUrl: `../images/${name}.jpg`,
        rating: 0
    }
    return book
}

function removeBook(bookId) {
    const bookIdx = gBooks.findIndex(book => book.id === bookId)
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage()
}

function getBookById(bookId) {
    var book = gBooks.find(book => book.id === bookId)
    return book
}

function addBook(name, price) {
    const newBook = _creatBook(name, price)
    gBooks.unshift(newBook)
    _saveBooksToStorage()
}

function updateBook(bookId, newPrice){
    var book = getBookById(bookId)
    book.price = newPrice
    _saveBooksToStorage()
}

function setRating(operator, bookId){
    var book = getBookById(bookId)
    book.rating += (operator==='+')? 1: -1;
    _saveBooksToStorage()
    return book
}















function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}