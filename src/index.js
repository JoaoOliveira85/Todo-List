// eslint-disable-next-line no-unused-vars
import { doc } from "prettier";
import { createDivs, render } from "./modules/DOMrender.js";
import { noteList } from "./noteList.js";

createDivs(
	document.querySelector("#content"),
	"div",
	2,
	["noteBoard", "completed"],
	""
);

render(document.querySelector("#noteBoard"), noteList);
