import { notes } from "./modules/notes.js";

let noteList;

if (localStorage.getItem("noteList") != null) {
	noteList = JSON.parse(localStorage.getItem("noteList"));
} else {
	noteList = new Array();
	notes.create(
		noteList,
		"Create new note",
		"Note description",
		Date.now(),
		false,
		"newNote"
	);
	localStorage.setItem("noteList", JSON.stringify(noteList));
}

export { noteList };
