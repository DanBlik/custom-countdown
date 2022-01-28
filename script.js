const datePicker = document.getElementById('date-picker')
const countdownForm = document.getElementById('countdownForm')
const inputContainer = document.getElementById('input-container')

const countdownEl = document.getElementById('countdown')
const countdownElTitle = document.getElementById('countdown-title')
const countdownBtn = document.getElementById('countdown-button')
const timeElements = document.querySelectorAll('span')

const completeEl = document.getElementById('complete')
const completeElInfo = document.getElementById('complete-info')
const completeBtn = document.getElementById('complete-button')

let countdownTitle = ''
let countdownDate = ''
let countdownValue = new Date()
let countdownActive
let savedCountdown

const second = 1000
const minute = second * 60
const hour = minute * 60
const day = hour * 24

const today = new Date().toISOString().split('T')[0]
datePicker.setAttribute('min', today)

function countdownFormSubmited (e) {
  e.preventDefault()
  countdownTitle = e.srcElement[0].value
  countdownDate = e.srcElement[1].value
  countdownValue = new Date(countdownDate).getTime()

  const savedCountdown = {
    title: countdownTitle,
    date: countdownDate,
  }

  window.localStorage.setItem('countdownData', JSON.stringify(savedCountdown))

  console.log(countdownTitle, countdownDate, countdownValue);
  updateDOM()
}

function updateDOM() {
  countdownActive = setInterval(() => {
    const now = new Date().getTime()
    const distance = countdownValue - now

    const days = Math.floor(distance / day)
    const hours = Math.floor((distance % day) / hour)
    const minutes = Math.floor((distance % hour) / minute)
    const seconds = Math.floor((distance % minute) / second)

    inputContainer.hidden = true

    if (distance <= 0) {
      countdownEl.hidden = true
      clearInterval(countdownActive)
      completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`
      completeEl.hidden = false
    } else {
      countdownElTitle.textContent = countdownTitle
      timeElements[0].textContent = days
      timeElements[1].textContent = hours
      timeElements[2].textContent = minutes
      timeElements[3].textContent = seconds
      completeEl.hidden = true
      countdownEl.hidden = false
    }
  }, second)
}

function reset () {
  countdownEl.hidden = true
  completeEl.hidden = true
  inputContainer.hidden = false

  clearInterval(countdownActive)
  countdownTitle = ''
  countdownDate = ''
  window.localStorage.removeItem('countdownData')
}

function restoreDateFromLocalStorage () {
  const localData = window.localStorage.getItem('countdownData')
  if (localData) {
    inputContainer.hidden = true

    savedCountdown= JSON.parse(localData)
    countdownTitle = savedCountdown.title
    countdownDate = savedCountdown.date
    countdownValue = new Date(countdownDate).getTime()
    updateDOM()
  }
}

// Listeners
countdownForm.addEventListener('submit', countdownFormSubmited)
countdownBtn.addEventListener('click', reset)
completeBtn.addEventListener('click', reset)

restoreDateFromLocalStorage()