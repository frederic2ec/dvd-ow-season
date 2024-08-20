import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'
import './style.css'

let x = 0,
  y = 0,
  dirX = 1,
  dirY = 1;
const speed = 2;
const pallete = ["#ff8800", "#e124ff", "#6a19ff", "#ff2188"];
let dvd = document.getElementById("dvd");
dvd.style.color = pallete[0];
let prevColorChoiceIndex = 0;
let black = document.getElementById("black");
const dvdWidth = dvd.clientWidth;
const dvdHeight = dvd.clientHeight;

function getNewRandomColor() {
  const currentPallete = [...pallete]
  currentPallete.splice(prevColorChoiceIndex, 1)
  const colorChoiceIndex = Math.floor(Math.random() * currentPallete.length);
  prevColorChoiceIndex = colorChoiceIndex < prevColorChoiceIndex ? colorChoiceIndex : colorChoiceIndex + 1;
  const colorChoice = currentPallete[colorChoiceIndex];
  return colorChoice;
}

dayjs.extend(relativeTime)
dayjs.extend(updateLocale)

dayjs.updateLocale('en', {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: 'a few seconds',
    m: "a minute",
    mm: "%d minutes",
    h: "an hour",
    hh: "%d hours",
    d: "a day",
    dd: "%d days",
    M: "a month",
    MM: "%d months",
    y: "a year",
    yy: "%d years"
  }
})

const text = `Season 12 Drops : ${dayjs('2024-08-20 14:00:00').fromNow(true)}`

function animate() {
  dvd.innerHTML = text
  const screenHeight = document.body.clientHeight;
  const screenWidth = document.body.clientWidth;

  if (y + dvdHeight >= screenHeight || y < 0) {
    dirY *= -1;
    dvd.style.color = getNewRandomColor();
  }
  if (x + dvdWidth >= screenWidth || x < 0) {
    dirX *= -1;

    dvd.style.color = getNewRandomColor();
  }
  x += dirX * speed;
  y += dirY * speed;
  dvd.style.left = x + "px";
  dvd.style.top = y + "px";
  window.requestAnimationFrame(animate);
}

window.requestAnimationFrame(animate);
