let userLogin = document.getElementById('userLogin');
let btnEnter = document.getElementById('btnEnter');
let compilatore = document.getElementById('compilatore');
let btnExit = document.getElementById('btnExit');
let btnInvio = document.getElementById('btnInvio');
const input1 = document.getElementById('input1');
const input2 = document.getElementById('input2');
let list = document.getElementById("list");
let listContainer = document.getElementById("listContainer");

// Funzione per ottenere i messaggi salvati per un utente
function getUserMessages(username) {
    return JSON.parse(localStorage.getItem(username)) || [];
}

// Funzione per caricare i messaggi dell'utente corrente
function loadUserMessages() {
    let username = localStorage.getItem("login");
    let userMessages = getUserMessages(username);

    list.innerHTML = "";
    userMessages.forEach(messageObject => {
        let newListItems = document.createElement("li");
        newListItems.textContent = `${messageObject.author} (${messageObject.timestamp}): ${messageObject.text}`;
        list.appendChild(newListItems);
    });
}

// Funzione per salvare un messaggio per l'utente corrente
function saveUserMessage(messaggio) {
    let username = localStorage.getItem("login");
    let userMessages = getUserMessages(username);

    let messageObject = {
        text: messaggio,
        author: username,
        timestamp: new Date().toLocaleString(),
    };

    userMessages.push(messageObject);

    localStorage.setItem(username, JSON.stringify(userMessages)); // questo passaggio mi permette di salavare i messaggi in maniera persistente 
}

function onClickLogin() {
    userLogin.style.visibility = 'hidden';
    compilatore.style.visibility = 'visible';
    localStorage.setItem("login", input1.value); // da qui ottengo "username"


    loadUserMessages();
}

function onClickLogout() {
    compilatore.style.visibility = 'hidden';
    userLogin.style.visibility = 'visible';
}

function aggiungi() {
    let taskName = input2.value;
    let newListItems = document.createElement("li");
    newListItems.textContent = taskName;
    list.appendChild(newListItems);
    input2.value = "";


    saveUserMessage(taskName);
    loadUserMessages();
}

document.addEventListener("DOMContentLoaded", () => {
    const isLogged = localStorage.getItem("login");
    if (isLogged) onClickLogin();
});

btnEnter.addEventListener('click', onClickLogin);
btnExit.addEventListener('click', onClickLogout);
btnInvio.addEventListener("click", aggiungi);
