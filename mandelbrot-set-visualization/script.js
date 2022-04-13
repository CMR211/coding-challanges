drawMandelbrot()

function drawMandelbrot() {
    const NUM_OF_ITERATIONS = 100
    const CANVAS_SIZE = 1000

    const element_main = document.getElementById("main")

    const canvas = createCanvas(CANVAS_SIZE, CANVAS_SIZE)
    drawOnCanvas()

    function createCanvas(w, h) {
        const element_canvas = document.createElement("canvas")
        element_canvas.width = w
        element_canvas.height = h
        element_main.appendChild(element_canvas)
        const canvasContext = element_canvas.getContext("2d")
        return {
            element: element_canvas,
            context: canvasContext,
            width: w,
            height: h,
        }
    }

    function drawOnCanvas() {
        const range = 4
        const multiplier = range / CANVAS_SIZE
        for (let x = 0; x < CANVAS_SIZE; x++) {
            for (let y = 0; y < CANVAS_SIZE; y++) {
                let iterateValue = iterate([x * multiplier - range / 2, y * multiplier - range / 2])
                if (iterateValue === NUM_OF_ITERATIONS) iterateValue = 0
                const rgb = Math.floor((255 / NUM_OF_ITERATIONS) * iterateValue)
                const color = `rgb(${rgb}, ${rgb}, ${rgb})`
                canvas.context.fillStyle = color
                canvas.context.fillRect(x + range, y + range, 1, 1)
            }
        }
    }

    function calculate(z, c) {
        // z = [a, bi]
        // z^2 = (a^2 + 2abi - b^2) => [a^2-b^2, 2abi] => [ z[0]**2 - z[1]**2, 2*z[0]*z[1] ]
        // c = [x, yi] => [c[0], c[1]]
        return [z[0] ** 2 - z[1] ** 2 + c[0], 2 * z[0] * z[1] + c[1]]
    }

    function iterate(complexNumber) {
        let numberOfIterations = 0
        let z = [0, 0]
        for (let i = 0; i < NUM_OF_ITERATIONS; i++) {
            z = calculate(z, complexNumber)
            if (dist(z) > 4) break
            numberOfIterations++
        }
        return numberOfIterations
    }

    function dist(z) {
        return Math.abs(z[0] ** 2 + z[1] ** 2)
    }
}
