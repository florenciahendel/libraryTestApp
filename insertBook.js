const bookForm = document.getElementById('newBookForm'),
    idInput = document.getElementById('bookId'),
    bookName = document.getElementById('inputBookName'),
    bookAuthor = document.getElementById('inputBookAuthor'),
    bookPublisher = document.getElementById('inputBookPublisher'),
    bookType = document.getElementById('selectBookType'),
    bookState = document.getElementById('bookState'),
    saveBookBtn = document.getElementById('saveBookBtn'),
    cancelBookBtn = document.getElementById('cancelBookBtn'),
    confirmCancellationBtn = document.getElementById('confirmCancellationBtn'),
    insertionModalDOM = document.getElementById('bookInsertionModal'),
    dismissModalDOM = document.getElementById('confirmCancellation'),
    insertionModal = new bootstrap.Modal(insertionModalDOM),
    dismissModal = new bootstrap.Modal(dismissModalDOM);

let bookCatalog = JSON.parse(localStorage.getItem('bookCatalog')) || [];
let idCounter = localStorage.getItem('bookCounter') || 0;

//Mostrar botón de acción de acuerdo al rol de ususario
let userRole = sessionStorage.getItem('role');
const roleBtn = document.getElementsByClassName(userRole);
setTimeout(() => {
    roleBtn[0].classList.remove('d-none');
}, 10);

//Autoincrementar Id libro
roleBtn[0].addEventListener('click', () => {
    idInput.value = idCounter + 1;
});

//Validar caracteres alfanuméricos
function validateRegex(e, input) {
    let regEx = /[A-ZÁ-Ýa-zá-ý0-9\s\u00f1\u00d1]/;
    !regEx.test(input) && e.preventDefault();
}

//Constructor objetos Book
class Book {
    constructor(id, name, author, publisher, type) {
        this.id = id;
        this.name = name;
        this.author = author;
        this.publisher = publisher;
        this.type = type;
        this.state = 'ACTIVE';
    }
}

function addErrorColor(el) {
    el.classList.add('is-invalid');
}

function removeErrorColor(el) {
    el.classList.remove('is-invalid');
}

function validateCharExtension(input, maxLength) {
    if (input.value.length > maxLength || input.value.length == 0) {
        addErrorColor(input);
        return false;
    } else {
        removeErrorColor(input);
        return true;
    }
}

saveBookBtn.addEventListener('click', () => {
    let validName = validateCharExtension(bookName, 100);
    let validAuthor = validateCharExtension(bookAuthor, 100);
    let validPublisher = validateCharExtension(bookPublisher, 50);
    if (validName && validAuthor && validPublisher) {
        let book = new Book(
            idInput.value,
            bookName.value,
            bookAuthor.value,
            bookPublisher.value,
            bookType.value
        );

        bookCatalog.push(book);
        idCounter++;
        localStorage.setItem('bookCounter', idCounter);
        localStorage.setItem('bookCatalog', JSON.stringify(bookCatalog));
        alert('El ejemplar ha sido dado de alta');
        insertionModal.hide();
        bookForm.reset();
    }
});

confirmCancellationBtn.addEventListener('click', () => {
    insertionModal.hide();
    dismissModal.hide();
    bookForm.reset();
    removeErrorColor(bookName);
    removeErrorColor(bookAuthor);
    removeErrorColor(bookPublisher);
});
