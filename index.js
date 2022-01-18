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

let currentAttempt = 'prest'
let attempts = ['jusen', 'wowze']

createGrid()
updateGrid()

window.addEventListener('keydown', handleKeyInput)

function createGrid() {
  for (let i = 0; i < grid_cols; i++) {
    let row = document.createElement('div')
    for (let i = 0; i < grid_rows; i++) {
      let cell = document.createElement('div')
      cell.className = 'cell'
      row.appendChild(cell)
    }
    grid.appendChild(row)
  }
}

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

function handleKeyInput(e) {
  let letter = e.key.toLowerCase()
  if (letter == 'enter') {
    if (currentAttempt.length != 5) {
      alert('Not enough letters')
      return
    }

    if (!wordList.include(currentAttempt)) {
      alert('Guess not in word list')
      return
    }
    attempts.push(currentAttempt)
    currentAttempt = ''
  } else if (letter == 'backspace') {
    currentAttempt = currentAttempt.slice(0, currentAttempt.length - 1)
  } else if (/[a-z]/.test(letter)) {
    if (currentAttempt.length < 5) {
      currentAttempt += letter
    }
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
