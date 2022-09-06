"use strict";
var marked;
const addBtn = document.getElementById('add');
const notes = JSON.parse(localStorage.getItem('notes') || '');
if (notes) {
    notes.forEach((note) => addNewNote(note));
}
addBtn.addEventListener('click', () => addNewNote());
function addNewNote(text = '') {
    const note = document.createElement('div');
    note.classList.add('note');
    note.innerHTML = `
    <div class="tools">
        <button class="edit">
            <i class="fas fa-edit"></i>
        </button>
        <button class="delete">
            <i class="fas fa-trash-alt"></i>
        </button>
    </div>
    <div class="main ${text ? '' : 'hidden'}"></div>
    <textarea class="${text ? 'hidden' : ''}"></textarea>
  `;
    const editBtn = note.querySelector('.edit');
    const deleteBtn = note.querySelector('.delete');
    const main = note.querySelector('.main');
    const textArea = note.querySelector('textarea');
    if (textArea !== null) {
        textArea.value = text;
    }
    if (main !== null) {
        main.innerHTML = marked(text);
    }
    deleteBtn === null || deleteBtn === void 0 ? void 0 : deleteBtn.addEventListener('click', () => {
        note.remove();
        updateLS();
    });
    editBtn === null || editBtn === void 0 ? void 0 : editBtn.addEventListener('click', () => {
        main === null || main === void 0 ? void 0 : main.classList.toggle('hidden');
        textArea === null || textArea === void 0 ? void 0 : textArea.classList.toggle('hidden');
    });
    textArea === null || textArea === void 0 ? void 0 : textArea.addEventListener('input', (e) => {
        const value = e.target.value;
        if (main !== null) {
            main.innerHTML = marked(value);
        }
        updateLS();
    });
    document.body.appendChild(note);
}
function updateLS() {
    const notesText = document.querySelectorAll('textarea');
    const notes = [];
    notesText.forEach((note) => notes.push(note.value));
    localStorage.setItem('notes', JSON.stringify(notes));
}
