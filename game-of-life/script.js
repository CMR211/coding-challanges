const STROKE_WIDTH = 5
const GRID_SIZE = 20
const CANVAS_WIDTH = 500 
const CANVAS_HEIGHT = 500 
const ANIMATION_SPEED = 200 // milisecons

const CANVAS = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT, "canvas")
const element_counter = document.querySelector("#counter")


let stepCount = 0

beginAnimation()

function beginAnimation(currentState = 0) {
    stepCount++
    element_counter.textContent = stepCount
    // If no grid is given, create one (aka step: 0)
    if (currentState === 0) currentState = createGrid(GRID_SIZE, GRID_SIZE)
    // Calculate next step according to Conway's rules
    const newState = stepState(currentState)
    // Draw next state and iterate
    setTimeout(() => {
        draw(CANVAS, newState)
        beginAnimation(newState)
    }, ANIMATION_SPEED)
}

function draw(canvas, grid) {
    // Constants to determine drawn rectangles dimensions
    const dimX = CANVAS_WIDTH / grid.length
    const dimY = CANVAS_HEIGHT/ grid[0].length
    // Grid vertical and horizontal lines color
    canvas.strokeStyle = "rgb(200,200,200)"
    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid.length; y++) {
            canvas.strokeRect(x * dimX, y * dimY, dimX, dimY)
            if (grid[x][y] === 1) {
                canvas.fillStyle = "rgb(50,50,50)"
                canvas.fillRect(x * dimX + STROKE_WIDTH, y * dimY + STROKE_WIDTH, dimX - 2 * STROKE_WIDTH, dimY - 2 * STROKE_WIDTH)
            } else {
                canvas.fillStyle = "rgb(255,255,255)"
                canvas.fillRect(x * dimX + STROKE_WIDTH, y * dimY + STROKE_WIDTH, dimX - 2 * STROKE_WIDTH, dimY - 2 * STROKE_WIDTH)
            }
        }
    }
}

function createCanvas(w, h, id) {
    const canvasElement = document.createElement("canvas")
    canvasElement.width = w
    canvasElement.height = h
    canvasElement.id = id
    document.getElementById("game").appendChild(canvasElement)
    const canvas = canvasElement.getContext("2d")
    return canvas
}

function stepState(currentState) {
    // Creating new state (filled with zeroes)
    const nextState = createGrid(GRID_SIZE, GRID_SIZE, false)
    // Iterating over current state grid to produce next state grid
    currentState.forEach((row, i) =>
        row.forEach((item, j) => {
            // Dead cell with exactly 3 alive naighbours is born (i.e. becomes alive)
            // else it remains dead
            if (item === 0) {
                if (neighbours(i, j, currentState) === 3) nextState[i][j] = 1
                else nextState[i][j] = 0
            }
            // Alive cell with 2 or 3 alive neighbours continues to be alive
            // otherwise it dies (due to overpopulation or underpopulation)
            if (item === 1) {
                const sum = neighbours(i, j, currentState)
                if (sum === 2 || sum === 3) nextState[i][j] = 1
                else nextState[i][j] = 0
            }
        })
    )
    return nextState
}

function neighbours(x, y, grid) {
    const len = grid.length
    let sum = 0
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (x + i === -1 || y + j === -1 || x + i === len || y + j === len) continue
            else sum += grid[x + i][y + j]
        }
    }
    sum -= grid[x][y]
    return sum
}

function createGrid(columns, rows, random = true) {
    // Error handling
    if (columns < 1 || rows < 1) {
        console.error("Grid dimensions cannot be lower than 1.")
        return
    }
    if (isNaN(columns) || isNaN(rows)) {
        console.error("Grid dimensions must be a numbers.")
        return
    }
    // Create new 2d array
    return createArray(rows).map(i => createArray(columns).map(i => (random ? randomInt(1) : 0)))
}

function createArray(len, inside = 0) {
    return new Array(len).fill(inside)
}

function randomInt(max) {
    return Math.floor(random(max))
}

function random(max) {
    return Math.random() * (max + 1)
}
