let grid = document.getElementById('grid')

const grid_rows = 5
const grid_cols = 6

var wordList = [
  /*	'bingo',
	'dizzy',
	'equip',
	'patio',*/
  'juice',
]

let randIndex = Math.floor(Math.random() * wordList.length)
let key = wordList[randIndex]
console.log('key is', key)

let currentAttempt = ''
let attempts = ['money', 'spain', 'train', 'justi']

function createGrid() {
  for (let i = 0; i < grid_cols; i++) {
    let row = document.createElement('div')
    for (let i = 0; i < grid_rows; i++) {
      let cell = document.createElement('div')
      cell.className = 'cell'
      cell.textContent = 'T'
      row.appendChild(cell)
    }
    grid.appendChild(row)
  }
}

createGrid()

function updateGrid() {
  let row = grid.firstChild
  for (let attempt of attempts) {
    drawPastAttempt(row, attempt)
    row = row.nextSibling
  }
  drawCurrentAttempt(row, currentAttempt)
  row = row.nextSibling
}

function drawPastAttempt(row, attempt) {
  for (let i = 0; i < 5; i++) {
    let cell = row.children[i]
    cell.textContent = attempt[i]
    cell.style.backgroundColor = drawBgColor(attempt, i)
  }
}

function drawCurrentAttempt(row, attempt) {
  for (let i = 0; i < 5; i++) {
    let cell = row.children[i]
    cell.textContent = attempt[i] ?? ''
  }
}

function drawBgColor(attempt, index) {
  let correctLetter = key[index]
  let guessedLetter = attempt[index]

  if (guessedLetter === correctLetter) {
    return '#538d4e'
  } else if (key.indexOf(guessedLetter) === -1) {
    return '#3a3a3c'
  } else {
    return '#b49f3a'
  }
}

updateGrid()
