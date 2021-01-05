import { notes } from "./notes.js";
import { noteList } from "../noteList.js";

const createDivs = (place, type, quantity, id, className) => {
	for (let i = 0; i < quantity; i++) {
		const newDiv = document.createElement(`${type}`);

		if (id != "") {
			newDiv.id = id[i];
		}

		if (className != "") {
			newDiv.className = className;
		}
		place.appendChild(newDiv);
	}
};

const drawNote = (note, noteBoard) => {
	const newNote = document.createElement("div");
	newNote.id = `note${note.id}`;
	newNote.className = "notes";
	if (note.type === "newNote") {
		newNote.className = newNote.className + " " + "newNote";
	}
	noteBoard.appendChild(newNote);
	createDivs(
		newNote,
		"div",
		3,
		[`note${note.id}header`, `note${note.id}body`, `note${note.id}footer`],
		"noteElement"
	);

	document.querySelector(`#note${note.id}header`).className += " noteHeader";
	document.querySelector(`#note${note.id}body`).className += " noteBody";
	createDivs(
		document.querySelector(`#note${note.id}header`),
		"div",
		2,
		[`note${note.id}title`, `delete${note.id}note`],
		"noteHeaderElement"
	);
	const titleInput = document.createElement("input");
	titleInput.type = "text";
	titleInput.className = "titleInput" + " " + "inputField";
	titleInput.defaultValue = `${note.title}`;
	if (note.type != "newNote") {
		titleInput.addEventListener("keyup", () => {
			if (
				document.querySelector(`#note${note.id}`).classList[
					document.querySelector(`#note${note.id}`).classList.length - 1
				] != "unsaved"
			) {
				document.querySelector(`#note${note.id}`).classList.add("unsaved");
			}
			const timer = window.setTimeout(() => {
				notes.update(
					noteList,
					note.id,
					titleInput.value,
					descriptionInput.value,
					dateInput.valueAsNumber,
					note.status
				);
				document.querySelector(`#note${note.id}`).classList.remove("unsaved");
			}, 1000);
			titleInput.addEventListener("keyup", () => {
				window.clearTimeout(timer);
			});
		});
	}
	document.querySelector(`#note${note.id}title`).appendChild(titleInput);
	document.querySelector(`#delete${note.id}note`).textContent = "X";
	document.querySelector(`#delete${note.id}note`).className =
		document.querySelector(`#delete${note.id}note`).className +
		" " +
		"deleteNote";
	if (note.type != "newNote") {
		document
			.querySelector(`#delete${note.id}note`)
			.addEventListener("click", () => {
				notes.remove(noteList, note.id);
				render(document.querySelector("#noteBoard"), noteList);
			});
	}
	createDivs(
		document.querySelector(`#note${note.id}body`),
		"div",
		1,
		[`note${note.id}description`],
		"noteDescription"
	);

	const descriptionInput = document.createElement("textarea");
	descriptionInput.className = "descriptionInput" + " " + "inputField";
	descriptionInput.defaultValue = `${note.description}`;
	if (note.type != "newNote") {
		descriptionInput.addEventListener("keyup", () => {
			if (
				document.querySelector(`#note${note.id}`).classList[
					document.querySelector(`#note${note.id}`).classList.length - 1
				] != "unsaved"
			) {
				document.querySelector(`#note${note.id}`).classList.add("unsaved");
			}
			const timer = window.setTimeout(() => {
				notes.update(
					noteList,
					note.id,
					titleInput.value,
					descriptionInput.value,
					dateInput.valueAsNumber,
					note.status
				);
				document.querySelector(`#note${note.id}`).classList.remove("unsaved");
			}, 1000);
			descriptionInput.addEventListener("keyup", () => {
				window.clearTimeout(timer);
			});
		});
	}
	document
		.querySelector(`#note${note.id}description`)
		.appendChild(descriptionInput);

	document.querySelector(`#note${note.id}footer`).className += " noteFooter";

	createDivs(
		document.querySelector(`#note${note.id}footer`),
		"div",
		2,
		[`note${note.id}date`, `note${note.id}status`],
		"noteFooterElements"
	);

	const dateInput = document.createElement("input");
	dateInput.className = "dateInput" + " " + "inputField";
	dateInput.type = "date";
	dateInput.valueAsNumber = parseInt(note.dueDate);
	if (note.type != "newNote") {
		dateInput.addEventListener("focusout", () => {
			notes.update(
				noteList,
				note.id,
				titleInput.value,
				descriptionInput.value,
				dateInput.valueAsNumber,
				note.status
			);
		});
	}
	document.querySelector(`#note${note.id}date`).appendChild(dateInput);
	document.querySelector(`#note${note.id}status`).innerText = `${
		note.status === true ? "🗹" : "☐"
	}`;
	if (note.type != "newNote") {
		document
			.querySelector(`#note${note.id}status`)
			.addEventListener("click", () => {
				note.status = !note.status;
				notes.update(
					noteList,
					note.id,
					titleInput.value,
					descriptionInput.value,
					dateInput.valueAsNumber,
					note.status
				);
				render(document.querySelector("#noteBoard"), noteList);
			});
	}
	document.querySelector(`#note${note.id}status`).className =
		document.querySelector(`#note${note.id}status`).className +
		" " +
		"noteStatus";
	if (note.type === "newNote") {
		const addButton = document.createElement("button");
		addButton.innerText = "Add";
		addButton.addEventListener("click", () => {
			notes.create(
				noteList,
				titleInput.value,
				descriptionInput.value,
				dateInput.valueAsNumber,
				note.status,
				"ToDo"
			);
			render(document.querySelector("#noteBoard"), noteList);
		});
		document.querySelector(`#note${note.id}body`).appendChild(addButton);
	}
};

const render = (noteBoard, noteList) => {
	while (noteBoard.firstChild) {
		noteBoard.removeChild(noteBoard.firstChild);
	}
	noteList.map((note) => {
		drawNote(note, noteBoard);
	});
};

export { createDivs, drawNote, render };
