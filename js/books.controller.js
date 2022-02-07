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
    const strImgHTML = `<img src="${book.imgUrl}" alt="book by ${book.name}"></img>`
    elReadModal.querySelector('.img-container').innerHTML = strImgHTML
    elReadModal.querySelector('.price-container span').innerText = book.price
    elReadModal.classList.add('open-modal')
    renderProperty(book)
}

function renderProperty(book) {
    const elProperty = document.querySelector('.property-container')
    const strHTML = `
                <button class="minus" onclick="onPropBtn(this, ${book.id})">-</button>
                <span class="property">${book.property}</span>
                <button class="plus" onclick="onPropBtn(this, ${book.id})">+</button>`
    elProperty.innerHTML = strHTML
}

function onCloseModal() {
   const elModal = document.querySelector('.open-modal')
   elModal.classList.remove('open-modal')

}

function onPropBtn(el, bookId) {
    const book = getBookById(bookId)
    const operator = el.innerText
    if (operator === '+') {
        if (book.property === 10) return
    } else if (book.property === 0) return
    var updateBook = setProperty(operator, bookId)
    renderProperty(updateBook)
}