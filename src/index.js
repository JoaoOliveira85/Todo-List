import { doc } from "prettier";
import { notes } from "./modules/notes.js";
import { createDivs } from "./modules/DOMrender.js";

const noteList = new Array();

notes.create(noteList, "Teste A", "Lorem Ipsum", "2021-01-08", false);
notes.create(noteList, "Teste B", "Lorem Ipsum", "2021-01-08", false);
notes.create(noteList, "Teste C", "Lorem Ipsum", "2021-01-08", false);

const pageContent = document.querySelector("#content");
const noteBoard = document.createElement("div");
noteBoard.id = "noteBoard";
pageContent.appendChild(noteBoard);

const drawNote = (note) => {
	const newNote = document.createElement("div");
	newNote.id = `note${note.id}`;
	newNote.className = "notes";
	noteBoard.appendChild(newNote);
	createDivs(
		newNote,
		"div",
		3,
		[`note${note.id}header`, `note${note.id}body`, `note${note.id}footer`],
		"noteElement noteHeader"
	);
	// !const newNoteHeader = document.createElement("div");
	// !newNoteHeader.id = "noteHeader";
	// !newNote.appendChild(newNoteHeader);
	// !const noteTitle = document.createElement("div");
	// !const deleteNote = document.createElement("div");

	createDivs(
		document.querySelector(`#note${note.id}header`),
		"div",
		2,
		[`note${note.id}title`, `delete${note.id}note`],
		"noteHeaderElement"
	);
	document.querySelector(`#note${note.id}title`).textContent = `${note.title}`;
	document.querySelector(`#delete${note.id}note`).textContent = "X";

	document
		.querySelector(`#delete${note.id}note`)
		.addEventListener("click", () => {
			notes.remove(noteList, note.id);
			render();
		});
	// }
	// !deleteNote.className = "deleteNote";
	// !newNoteHeader.appendChild(noteTitle);
	// !newNoteHeader.appendChild(deleteNote);

	// const noteBody = document.createElement("div");
	// newNote.appendChild(noteBody);
	// const descText = document.createElement("div");
	// descText.innerText = note.description;
	// descText.className = "noteDescription";
	// noteBody.appendChild(descText);

	// const noteFooter = document.createElement("div");
	// noteBody.appendChild(noteFooter);
	// const noteDate = document.createElement("div");
	// noteDate.id = "noteDate";
	// noteDate.innerText = `${note.dueDate}`;
	// const noteStatus = document.createElement("div");
	// noteStatus.id = "NoteStatus";
	// noteStatus.innerText = `${note.status === true ? "OK" : "NOK"}`;
	// noteFooter.appendChild(noteDate);
	// noteFooter.appendChild(noteStatus);
};

const render = () => {
	while (noteBoard.firstChild) {
		noteBoard.removeChild(noteBoard.firstChild);
	}
	noteList.map((note) => {
		drawNote(note);
	});
};

render();
