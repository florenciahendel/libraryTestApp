const inputs = document.querySelectorAll('input'),
    btnLogin = document.getElementById('login');

function validateRegex(e, input) {
    let regEx = /[A-Za-z0-9]/;
    !regEx.test(input) && e.preventDefault();
}

inputs.forEach(item => {
    item.addEventListener('keypress', (e) => {
        validateRegex(e, e.key);
    })
})

function validateUser(usersDB, username, pass) {
    let found = usersDB.find((userDB) => userDB.name == username);

    if (!found) {
        return false;
    } else {
        if (found.pass != pass) {
            return false;
        } else {
            return found;
        }
    }
}

async function fetchDB() {
    let database = await fetch('./data/usersDatabase.json');
    let users = await database.json();
    let data = validateUser(users, userInput.value, passwordInput.value);
    if (!data) {
        alert('Usuario y/o password inválido');
    } else {
        sessionStorage.setItem('role', data.role);
        window.location.href = 'app.html';
    }
}

btnLogin.addEventListener('click', (e) => {
    e.preventDefault();

    if (!userInput.value || !passwordInput.value) {
        alert('Usuario y/o password inválido');
    } else {
        fetchDB();
    }
});
