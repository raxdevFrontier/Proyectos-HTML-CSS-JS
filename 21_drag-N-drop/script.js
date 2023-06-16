const fill = document.querySelector(".fill")
const empties = document.querySelectorAll(".empty")

fill.addEventListener("dragstart", dragStart)
fill.addEventListener("dragend", dragEnd)

/*Hi ha 2 maneres de fer-ho, un amb el forEach() y l'altre la que següent: */
for (const empty of empties) {
	empty.addEventListener("dragover", dragOver)
	empty.addEventListener("dragenter", dragEnter)
	empty.addEventListener("dragleave", dragLeave)
	empty.addEventListener("drop", dragDrop)
}

function dragStart() {
	// console.log("drag Start")
	this.className += " hold"
	/*La linia 20 ens permet donar un nom de classe que no te estils de manera que quan fem un dragStart es perdin el estils de la caixa y sembli que surt la imagtge del lloc.
    el motiu pel qual es fa servir un setTimeout() amb un temps de 0s es per asegurar que s'executi primer la linia anterior y despres la següent sinó seria tant rapida la execuscio que no podriem fer res perque perdriem tots els estils al donarli la classe sense estils*/
	setTimeout(() => (this.className = "invisible"), 0)
}
function dragEnd() {
	// console.log("drag End")
	this.className = "fill"
}
function dragOver(e) {
	// console.log("drag Over")
	e.preventDefault()
}
function dragEnter(e) {
	// console.log("drag Enter")
	e.preventDefault()
	this.className += " hovered"
}
function dragLeave() {
	// console.log("drag Leave")
	this.className = "empty"
}
function dragDrop() {
	// console.log("drag Drop")
	this.className = "empty"
	this.append(fill)
}
