'use strict'

function onInit() {
    renderBooks()
}

function renderBooks() {
    const books = getBooks()
    var strHTMLs = books.map(book => {
        return `<tr class="book">
                    <td class="id-td">${book.id}</td>
                    <td class="title-td">${book.name}</td>
                    <td class="price-td">${book.price}</td>
                    <td class="button-td read">
                        <button onclick="onReadBook(${book.id})">Read</button>
                    </td>
                    <td class="button-td update">
                        <button onclick="onUpdateBook(${book.id})">Update</button>
                    </td>
                    <td class="button-td delete">
                        <button onclick="onRemoveBook(${book.id})">Delete</button>
                    </td>
                </tr>`
    })
    document.querySelector('.books-container').innerHTML = strHTMLs.join('')
}

function onRemoveBook(bookId) {
    removeBook(bookId)
    renderBooks()
}

function onAddBook() {
    const name = prompt('Enter book name')
    if (name) {
        const price = +prompt('Enter price')
        if (price) {
            addBook(name, price)
            renderBooks()
        }
    }
}

function onUpdateBook(bookId) {
    const book = getBookById(bookId)
    const elUpdateModal = document.querySelector('.update-modal')
    elUpdateModal.querySelector('h3').innerText = book.name
    renderUpdateModalBtn (bookId)
    elUpdateModal.classList.add('open-modal')
}

function renderUpdateModalBtn (bookId) {
    const elUpdateModal = document.querySelector('.update-btn-container')
    elUpdateModal.innerHTML = `<button onclick="onUpdateModal(${bookId})">
                                Update
                                </button>`
}

function onUpdateModal(bookId) {
    const elPrice = document.querySelector('input[name=update-price]')
    const newPrice = elPrice.value
    if (newPrice) {
        updateBook(bookId, newPrice)
        renderBooks()
        elPrice.value = ''
    }
    onCloseModal()
}

function onReadBook(bookId) {
    const book = getBookById(bookId)
    const elReadModal = document.querySelector('.read-modal')
    elReadModal.querySelector('h3').innerText = book.name
    elReadModal.querySelector('img').src = book.imgUrl
    elReadModal.querySelector('img').alt = `book by ${book.name}`
    elReadModal.querySelector('.price-container span').innerText = book.price
    elReadModal.classList.add('open-modal')
    renderRating(book)
}

function renderRating(book) {
    const elRating = document.querySelector('.rating-container')
    const strHTML = `
                <button class="minus" onclick="onRateBtn(this, ${book.id})">-</button>
                <span class="rating">${book.rating}</span>
                <button class="plus" onclick="onRateBtn(this, ${book.id})">+</button>`
    elRating.innerHTML = strHTML
}

function onCloseModal() {
   const elModal = document.querySelector('.open-modal')
   elModal.classList.remove('open-modal')

}

function onRateBtn(el, bookId) {
    const book = getBookById(bookId)
    const operator = el.innerText
    if (operator === '+') {
        if (book.rating === 10) return
    } else if (book.rating === 0) return
    var updateBook = setRating(operator, bookId)
    renderRating(updateBook)
}