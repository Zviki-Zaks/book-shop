'use strict'

function onInit() {
    creatBooks()
    renderBooks()
    const elLang = document.querySelector('[data-select=lang]')
    elLang.addEventListener('change', onSetLang)
}

function renderBooks() {
    const books = getBooks()
    var strHTMLs = books.map(book => {
        var price = formatCurrency(book.price)
        return `<tr class="book">
                    <td class="id-td">${book.id}</td>
                    <td class="title-td">${book.name}</td>
                    <td class="price-td" data="currency">${price}</td>
                    <td class="button-td read">
                        <button data-trans="read" onclick="onReadBook(${book.id})"></button>
                    </td>
                    <td class="button-td update">
                        <button data-trans="update" onclick="onUpdateBook(${book.id})"></button>
                    </td>
                    <td class="button-td delete">
                        <button data-trans="delete" onclick="onRemoveBook(${book.id})"></button>
                    </td>
                </tr>`
    })
    document.querySelector('.books-container').innerHTML = strHTMLs.join('')
    doTrans()
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
    renderUpdateModalBtn(bookId)
    elUpdateModal.classList.add('open-modal')
}

function renderUpdateModalBtn(bookId) {
    const elUpdateModal = document.querySelector('.update-btn-container')
    elUpdateModal.innerHTML = `<button data-trans="update" onclick="onUpdateModal(${bookId})"></button>`
    doTrans()
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
    var price = formatCurrency(book.price)
    const elReadModal = document.querySelector('.read-modal')
    elReadModal.querySelector('h3').innerText = book.name
    elReadModal.querySelector('img').src = book.imgUrl
    elReadModal.querySelector('img').alt = `book by ${book.name}`
    elReadModal.querySelector('.price-container span.price').innerText = price
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

function onSetLang() {
    const lang = this.value
    setLang(lang)
    if (lang === 'he') document.body.classList.toggle('rtl')
    else document.body.classList.toggle('rtl')
    renderBooks()
}

function doTrans() {
    var elsToTrans = document.querySelectorAll('[data-trans]')
    elsToTrans.forEach((el) => {
        var transKey = el.dataset.trans
        var txt = getTrans(transKey)
        if (el.nodeName === 'INPUT') {
            el.placeholder = txt
        } else el.innerText = txt
    })
}

// function renderPrompt(txt) {

//     <div class="alert alert-secondary w-25 p-3 position-absolute top-50 start-50 " role="alert">
//         <label for="exampleFormControlInput1" class="form-label" data-trans="${}"></label>
//         <input type="text" class="form-control w-100 " id="exampleFormControlInput1" data-trans="${}" placeholder="" />
//         <button type="button" class="btn btn-primary mt-2" data-trans="ok"></button>
//     </div>
// }