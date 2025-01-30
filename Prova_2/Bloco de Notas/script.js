const addButton = document.querySelector('.add_note');
const noteList = document.querySelector('.note-list');
const notes = JSON.parse(localStorage.getItem("notes")) || [];

if (notes) {
    notes.forEach(note => addNewNote(note.title, note.text));
}

addButton.addEventListener('click', () => addNewNote());

function addNewNote(title = '', text = '') {
    const note = document.createElement('div');
    note.classList.add('note');

    note.innerHTML = `
        <div class="config">
            <label for="title">Título: </label>
            <input type="text" id="title" value="${title}">
            <button class="edit">
                <i class="fas fa-edit"></i>
            </button>
            <button class="delete">
                <i class="fas fa-trash-alt"></i>
            </button>
        </div>

        <div class="main">${text}</div>
        <textarea>${text}</textarea>
    `;

    const editButton = note.querySelector('.edit');
    const deleteButton = note.querySelector('.delete');
    const main = note.querySelector('.main');
    const textArea = note.querySelector('textarea');
    const titleInput = note.querySelector('#title');

    textArea.value = text;
    main.innerHTML = text;
    titleInput.value = title;

    deleteButton.addEventListener('click', () => {
        if (confirm("Tem certeza que deseja excluir esta nota?")) {
            note.remove();
            storage();
        }
    });

    editButton.addEventListener('click', () => {
        note.classList.toggle('expanded');
        const isExpanded = note.classList.contains('expanded');

        if (isExpanded) {
            main.classList.add("hidden");
            textArea.classList.remove("hidden");
            editButton.innerHTML = `<i class="fas fa-save"></i>`;
        } else {
            main.classList.remove("hidden");
            textArea.classList.add("hidden");
            editButton.innerHTML = `<i class="fas fa-edit"></i>`;
        }
    });

    textArea.addEventListener('input', () => {
        main.innerHTML = textArea.value;
        storage();
    });

    titleInput.addEventListener('input', () => {
        storage();
    });

    noteList.appendChild(note);
    storage();
}

function storage() {
    const notesElements = document.querySelectorAll('.note');
    const notes = [];

    notesElements.forEach(note => {
        const title = note.querySelector('#title').value;
        const text = note.querySelector('textarea').value;

        notes.push({ title, text });
    });

    localStorage.setItem('notes', JSON.stringify(notes));
}
