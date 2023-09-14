const randomURL = "https://source.unsplash.com/random/"

const container = document.querySelector(".container")
const rows = 5
const imgWidth = 300
const imgHeight = 300

for(let i = 0; i < rows * 3; i++){
    const randomImagen = document.createElement("img")
    randomImagen.src = `${randomURL}${getRandomNum()}x${getRandomNum()}`
    container.appendChild(randomImagen)
}

function getRandomNum() {
    return Math.floor(Math.random() * 10) + 300
}
