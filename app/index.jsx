require("./main.css");

import "array.prototype.findindex";
import React from "react";
import App from "./components/app.jsx"

main();

function main() {
	const app = document.createElement("div");
	document.body.appendChild(app);
	React.render(<App />, app);
}