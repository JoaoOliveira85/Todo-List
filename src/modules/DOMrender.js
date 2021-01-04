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

export { createDivs };
