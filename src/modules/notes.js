class Note {
	constructor(id, title, description, dueDate, status) {
		(this.id = id),
			(this.title = title),
			(this.description = description),
			(this.dueDate = dueDate),
			(this.status = status);
	}

	changeTitle(newTitle) {
		this.title = newTitle;
	}

	changeDescription(newDescription) {
		this.description = newDescription;
	}

	changeDueDate(newDueDate) {
		this.dewDate = newDueDate;
	}

	changeStatus() {
		this.status = !this.status;
	}
}

const createNote = (list, title, description, dueDate, status) => {
	list.push(
		new Note(
			parseInt(`${list.length + 1}`),
			title,
			description,
			dueDate,
			status
		)
	);
};

const removeNote = (list, id) => {
	list.splice(
		list.indexOf(
			list.find((item) => {
				console.log(`ITEM.ID: ${item.id} ID: ${id}`);
				return item.id == id;
			})
		),
		1
	);
};

const notes = {
	create: function (list, title, description, dueDate, status) {
		createNote(list, title, description, dueDate, status);
	},
	remove: function (list, id) {
		removeNote(list, id);
	},
};

export { notes };
