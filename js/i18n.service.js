'use strict'

const gLangs = {
    en: 'en',
    he: 'he',
}
var gCurrLangs = gLangs.en

const gTrans = {
    'main-title': {
        en: 'Welcome to my bookshop!',
        he: 'ברוך הבא לחנות הספרים שלי!',
    },
    'add-book': {
        en: 'Add new book',
        he: 'הוסף ספר',
    },
    'id': {
        en: 'Id',
        he: 'מק"ט',
    },
    'title': {
        en: 'Title',
        he: 'כותר',
    },
    'price': {
        en: 'Price',
        he: 'מחיר',
    },
    'actions': {
        en: 'Actions',
        he: 'פעולות',
    },
    'read': {
        en: 'Read',
        he: 'קרא',
    },
    'update': {
        en: 'Update',
        he: 'עדכן',
    },
    'delete': {
        en: 'Delete',
        he: 'מחק',
    },
    'close': {
        en: 'Close',
        he: 'סגור',
    },
    'update-price-placeholder': {
        en: 'Update price',
        he: 'עדכן מחיר',
    },
    'ok': {
        en: 'Ok',
        he: 'אישור',
    },
}

function setLang(lang) {
    gCurrLangs = gLangs[lang]
}

function getTrans(transKey) {
    return gTrans[transKey][gCurrLangs]
}

// function getTrans(transKey) {
//     var keyTrans = gTrans[transKey]
//     if (!keyTrans) return 'UNKNOWN'

//     var txt = keyTrans[gCurrLang]
//     if (!txt) txt = keyTrans.en

//     return txt
// }

// function doTrans() {
//     var els = document.querySelectorAll('[data-trans]')
//     els.forEach((el) => {
//         // console.dir(el)
//         var transKey = el.dataset.trans
//         var txt = getTrans(transKey)
//         if (el.nodeName === 'INPUT') {
//             // el.setAttribute('placeholder', txt)
//             //THE SAME!
//             el.placeholder = txt
//         } else el.innerText = txt
//     })
// }

// function setLang(lang) {
//     gCurrLang = lang;
// }

function formatNumOlder(num) {
    return num.toLocaleString('es')
}

function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num);
}

function formatCurrency(num) {
    var options = {
        en: 'USD',
        he: 'ILS',
    }
    return new Intl.NumberFormat('he-IL', { style: 'currency', currency: options[gCurrLangs] }).format(num);
}

function formatDate(time) {

    var options = {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: true,
    };

    return new Intl.DateTimeFormat(gCurrLang, options).format(time);
}

function kmToMiles(km) {
    return km / 1.609;
}