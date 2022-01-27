const datePicker = document.getElementById('date-picker')
const countdownForm = document.getElementById('countdownForm')
const inputContainer = document.getElementById('input-container')

const countdownEl = document.getElementById('countdown')
const coundownElTitle = document.getElementById('countdown-title')
const countdownBtn = document.getElementById('countdown-button')
const timeElements = document.querySelectorAll('span')

let coundownTitle = ''
let countdownDate = ''
let coundownValue = Date
let coundownActive

const second = 1000
const minute = second * 60
const hour = minute * 60
const day = hour * 24

const today = new Date().toISOString().split('T')[0]
datePicker.setAttribute('min', today)

// Listeners
countdownForm.addEventListener('submit', countdownFormSubmited)
countdownBtn.addEventListener('click', reset)

function countdownFormSubmited (e) {
  e.preventDefault()
  coundownTitle = e.srcElement[0].value
  coundownDate = e.srcElement[1].value
  coundownValue = new Date(coundownDate).getTime()
  console.log(coundownTitle, coundownDate, coundownValue);
  updateDOM()
}

function updateDOM() {
  coundownActive = setInterval(() => {
    const now = new Date().getTime()
    const distance = coundownValue - now

    const days = Math.floor(distance / day)
    const hours = Math.floor((distance % day) / hour)
    const minutes = Math.floor((distance % hour) / minute)
    const seconds = Math.floor((distance % minute) / second)

    coundownElTitle.textContent = coundownTitle
    timeElements[0].textContent = days
    timeElements[1].textContent = hours
    timeElements[2].textContent = minutes
    timeElements[3].textContent = seconds

    inputContainer.hidden = true
    countdownEl.hidden = false
  }, second)
}

function reset () {
  countdownEl.hidden = true
  inputContainer.hidden = false

  clearInterval(coundownActive)
  coundownTitle = ''
  countdownDate = ''
}