import Notebook from './classes.js'

// if (!localStorage.showNotebooks) {
//     localStorage.showNotebooks = 0;
// }

// function showEditArr() {
//     let arr = [];
//     notesArr().forEach(() => arr.push(false));
//     return arr;
// }


// const newNotebookName;
// editedNotebookName: '',
// showNotebooks: Boolean(Number(localStorage.showNotebooks)),
// showEditOptions: showEditArr(),
// notebooks: notesArr()


// deleteNotebook(event) {
//     let arr = notesArr();
//     arr.splice(event.target.id,1);
//     if (arr.length == 0) {
//         localStorage.showNotebooks = 0;
//         this.showNotebooks = 0;
//     }
//     localStorage.notebooks = arr.join();
//     this.notebooks = notesArr();
//     this.editedNotebookName = '';
// }

// editNotebook(event) {
//     let arr = showEditArr();
//     let arr2 = notesArr();

//     arr[event.target.id] = true;
//     this.editedNotebookName = arr2[event.target.id];
//     this.showEditOptions = arr;
// }

// changeName(event) {
//     if(!this.editedNotebookName.trim()) {
//         this.showEditOptions = false;
//     } else {
//         let arr = notesArr();
//         arr[event.target.id] = this.editedNotebookName;
//         localStorage.notebooks = arr.join();
//         this.notebooks = notesArr();
//         this.showEditOptions = false;
//         this.editedNotebookName = '';
//     }
// }

/******************* LocalStorage Initialization ***********************/

if (!localStorage.notebooks) {
    localStorage.notebooks = '';
}

/******************* Variables & Constants ***********************/

const PATH = window.location.pathname;
const CREATE = "/pages/new-note.html";
const HOME = "/index.html";
const newnoteInput = document.getElementById('inp-create');
const noNotes = document.getElementById('no-notes');
const notesList = document.getElementById('notes-list');
const btnCreate = document.getElementById('btn-create');
const btnCreateHome = document.getElementById('btn-create-home');
const btnDeleteAll = document.getElementById('btn-delete-all');
const modalDeleteAll = document.getElementById('modal-delete-all');
const modalAddChapter = document.getElementById('modal-add-chapter');
const modalEmptyNoteName = document.getElementById('modal-empty-note-name');
const modalYes = document.getElementsByClassName('modal-yes')[0];
const modalNo = document.getElementsByClassName('modal-no')[0];
const modalOk = document.getElementsByClassName('modal-ok')[0];
let notes = notesArr().join();

/******************* Path Specific Code ***********************/

document.getElementsByTagName('main')[0].style.opacity = '1';
if (PATH == HOME || PATH == '/') {
    updateNotesList();
    if (notes) {
        noNotes.style.display = 'none';
        notesList.style.display = 'grid';
    } else {
        noNotes.style.display = 'flex';
        notesList.style.display = 'none';
        btnCreateHome.style.display = 'none';
        btnDeleteAll.style.display = 'none';
    }
    btnDeleteAll.addEventListener("click", () => displayModal(modalDeleteAll));
    document.addEventListener("keydown", keyShorcuts);
} else if (PATH == CREATE) {
    btnCreate.addEventListener("click", () => {
        if (newnoteInput.value)
            displayModal(modalAddChapter);
        else
            displayModal(modalEmptyNoteName);
    });
    newnoteInput.addEventListener("keypress", addNoteOnEnter);
}

/************* Functions **************/

function clearStorage() {
    localStorage.clear();
    localStorage.notebooks = '';
}

function addNote() {
    let n = new Notebook(newnoteInput.value);
    if (!localStorage.notebooks) {
        localStorage.notebooks = n.name;
    } else {
        localStorage.notebooks = localStorage.notebooks + `,${n.name}`;
    }
}

function notesArr() {
    return localStorage.notebooks.split(',');
}

function addNoteOnEnter(e) {
    if (e.target.id == 'btn-create' || e.keyCode == 13) {
        btnCreate.click();
    }
}

function keyShorcuts(e) {
    if (e.code == 'KeyN' && e.shiftKey) {
        btnCreateHome.click();
    } else if (e.code == 'KeyD' && e.shiftKey) {
        btnDeleteAll.click();
    }
}

function updateNotesList() {
    notesArr().forEach((v, i) => {
        let div = document.createElement("div");
        div.className = 'note';
        div.textContent = v;
        notesList.appendChild(div);
    })
}

function displayModal(modal) {
    let elList = '.modal-box, .modal-box .btnWarn, .modal-box p, .modal-box div';
    document.body.style.overflow = 'hidden';
    modal.style.visibility = 'visible';
    modal.style.display = 'flex';
    modal.style.opacity = '1';

    modal.addEventListener("click", (e) => {
        if (!e.target.matches(elList)) {
            modal.style.visibility = 'hidden'
            modal.style.opacity = '0'
        }
    });

    modalYes.addEventListener("click", () => {
        if (PATH == HOME || PATH == '/') {
            clearStorage();
        } else if (PATH == CREATE) {
            console.log('he wants a new chapter!')
        }
        modal.style.visibility = 'hidden';
        modal.style.opacity = '0'
        document.body.style.overflow = null;
    });

    modalNo.addEventListener("click", (e) => {
        if (PATH == CREATE) {
            addNote();
        }
        modal.style.visibility = 'hidden';
        modal.style.opacity = '0'
        document.body.style.overflow = null;
    });

    if (PATH == CREATE)
        modalOk.addEventListener("click", (e) => {
            modal.style.visibility = 'hidden';
            modal.style.opacity = '0'
            document.body.style.overflow = null;
        });
}















