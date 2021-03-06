class Note {
	constructor(id, title, description, dueDate, status, type) {
		(this.id = id),
			(this.title = title),
			(this.description = description),
			(this.dueDate = dueDate),
			(this.status = status),
			(this.type = type);
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

const notes = {
	create: function (list, title, description, dueDate, status, type) {
		list.pop();
		list.push(
			new Note(
				parseInt(`${list.length + 1}`),
				title,
				description,
				dueDate,
				status,
				type
			)
		);
		if (list[list.length - 1].type != "newNote") {
			list.push(
				new Note(
					parseInt(`${list.length + 1}`),
					"Create new Note",
					"New Note Description",
					Date.now(),
					false,
					"newNote"
				)
			);
		}
		localStorage.setItem("noteList", JSON.stringify(list));
	},
	remove: function (list, id) {
		list.splice(
			list.indexOf(
				list.find((item) => {
					return item.id == id;
				})
			),
			1
		);
		localStorage.setItem("noteList", JSON.stringify(list));
	},
	update: function (list, id, title, description, dueDate, status) {
		const item = list.find((item) => {
			return item.id === id;
		});
		item.title = title;
		item.description = description;
		item.dueDate = dueDate;
		item.status = status;

		localStorage.setItem("noteList", JSON.stringify(list));
	},
};

export { notes };
