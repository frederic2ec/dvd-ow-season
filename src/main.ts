import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import './style.css'

let x = 0,
  y = 0,
  dirX = 1,
  dirY = 1;
const speed = 2;
const pallete = ["#ff8800", "#e124ff", "#6a19ff", "#ff2188"];
let dvd = document.getElementById("dvd");
//@ts-expect-error
dvd.style.color = pallete[0];
let prevColorChoiceIndex = 0;
const dvdWidth = dvd?.clientWidth || 0;
const dvdHeight = dvd?.clientHeight || 0;

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
dayjs.extend(timezone)
dayjs.extend(utc)

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

const eventTime = dayjs.tz('2024-09-17 14:00:00', 'America/New_York');

function getCountdown() {
  const now = dayjs().tz('America/New_York');
  const diff = eventTime.diff(now);

  if (diff <= 0) {
    return "00h:00m:00s";
  }

  const hours = Math.floor(diff / (1000 * 60 * 60)).toString().padStart(2, '0');
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
  const seconds = Math.floor((diff % (1000 * 60)) / 1000).toString().padStart(2, '0');
  return `${hours}h:${minutes}m:${seconds}s`;
}


function animate() {
  //@ts-expect-error
  dvd.innerHTML = `Midseseason patch in: ${getCountdown()}`;

  const screenHeight = document.body.clientHeight;
  const screenWidth = document.body.clientWidth;

  if (y + dvdHeight >= screenHeight || y < 0) {
    dirY *= -1;
    //@ts-expect-error
    dvd.style.color = getNewRandomColor();
  }
  if (x + dvdWidth >= screenWidth || x < 0) {
    dirX *= -1;
    //@ts-expect-error
    dvd.style.color = getNewRandomColor();
  }
  x += dirX * speed;
  y += dirY * speed;
  //@ts-expect-error
  dvd.style.left = x + "px";
  //@ts-expect-error
  dvd.style.top = y + "px";
  window.requestAnimationFrame(animate);
}

window.requestAnimationFrame(animate);
