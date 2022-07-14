import Sounds from "./sounds.js"

export default function Timer({minutesDisplay,secondsDisplay,resetControls}) {

    let timerTimeOut
    let minutes = Number(minutesDisplay.textContent)

    function uptadeDisplay(newMinutes, seconds) {
        newMinutes = newMinutes === undefined ? minutes : newMinutes
        seconds = seconds === undefined ? 0 : seconds
        minutesDisplay.textContent = String(newMinutes).padStart(2, "0")
        secondsDisplay.textContent = String(seconds).padStart(2, "0")
    }

    function reset() {
        uptadeDisplay(minutes, 0)
        clearTimeout(timerTimeOut)
    }

    function countDown() {
        timerTimeOut = setTimeout(function () {
            let seconds = Number(secondsDisplay.textContent)
            let minutes = Number(minutesDisplay.textContent)
            let isFinished = minutes <= 0 && seconds <=0

            uptadeDisplay(minutes, 0)
            if (isFinished) {
                resetControls()
                uptadeDisplay()
                Sounds().timeEnd()
                return
            }

            if (seconds <= 0) {
                seconds = 60
                --minutes

            }
            uptadeDisplay(minutes, String(seconds - 1))

            //rodar de novo a função
            countDown()
        }, 1000)
    }

    function updateMinutes(newMinutes) {
        minutes = newMinutes
      }

    function hold(){
        clearTimeout(timerTimeOut) // Pausar o contador
    }

    return {
        countDown,
        reset,
        uptadeDisplay,
        updateMinutes,
        hold
    }
}