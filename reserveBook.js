const searchBtn = document.getElementById("search"),
    bookInfo = document.getElementById('selectedBookInfo'),
    confirmReservationBtn = document.getElementById('confirmReservationBtn'),
    reservationModalDOM = document.getElementById('bookReservationModal'),
    closeModalDOM = document.getElementById('confirmReservation'),
    reservationModal = new bootstrap.Modal(reservationModalDOM),
    closeModal = new bootstrap.Modal(closeModalDOM),
    closeModalTitle = document.getElementById('closeModalTitle'),
    goBackBtn = document.getElementById('goBack'),
    IdToSearch = document.getElementById('inputCodeSearch');


function validateBookId(booksDB, bookId) {
    let found = booksDB.find((booksDB) => booksDB.id == bookId);
    if (!found) {
        return false;
    } else {
        return found;
    }
}
async function fetchDB() {
    let database = await fetch('./data/booksDatabase.json');
    let books = await database.json();
    let data = validateBookId(books, IdToSearch.value);
    if (!data) {
        closeModalTitle.textContent = 'Error';
        bookInfo.innerHTML = `ID inválido`;
        confirmReservationBtn.classList.add('d-none')
    } else {
        closeModalTitle.textContent = 'Reservar ejemplar';
        confirmReservationBtn.classList.remove('d-none')
        if (data.stock == 0) {
            bookInfo.innerHTML = `
                    <h3>${data.name}</h3>
                    <p><strong>Id:</strong> ${data.id}</p>
                    <p><strong>Autor:</strong> ${data.author}</p>
                    <p><strong>Editorial:</strong> ${data.publisher}</p>
                    <p><strong>Tipo:</strong> ${data.type}</p>
                    <p><strong>Estado:</strong> ${data.state}</p>
                    <p><strong>Stock:</strong> ${data.stock}</p>
                    <p><strong>NO DISPONIBLE</strong></p>`;
        } else {
            bookInfo.innerHTML = `
                <h3>${data.name}</h3>
                <p><strong>Id:</strong> ${data.id}</p>
                <p><strong>Autor:</strong> ${data.author}</p>
                <p><strong>Editorial:</strong> ${data.publisher}</p>
                <p><strong>Tipo:</strong> ${data.type}</p>
                <p><strong>Estado:</strong> ${data.state}</p>
                <p><strong>Stock:</strong> ${data.stock}</p>`;
        }
        reservationModal.hide();
        IdToSearch.value = '';

    }

}

searchBtn.addEventListener('click', (e) => {
    if (!IdToSearch.value) {
        closeModalTitle.textContent = 'Error';
        bookInfo.innerHTML = `Agregar un ID`;
        confirmReservationBtn.classList.add('d-none')
    } else {
        fetchDB();
    }

});

confirmReservationBtn.addEventListener('click', () => {
    reservationModal.hide();
    closeModal.hide();
    alert('Reserva exitosa');
    IdToSearch.value = '';
});


goBackBtn.addEventListener('click', () => {
    reservationModal.hide();
})