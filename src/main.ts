import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import './style.css'

dayjs.extend(relativeTime)
dayjs.extend(updateLocale)
dayjs.extend(utc)
dayjs.extend(timezone)

// Timezone configuration
const eventTime = dayjs.tz('2024-10-15 14:00:00', 'America/New_York');
let dvd = document.getElementById("dvd");
let gif = document.getElementById("gif");

// Color and movement variables
let x = 0,
  y = 0,
  dirX = 1,
  dirY = 1;
const speed = 2;
const pallete = ["#ff8800", "#e124ff", "#6a19ff", "#ff2188"];
//@ts-expect-error
dvd.style.color = pallete[0];
let prevColorChoiceIndex = 0;
const dvdWidth = dvd?.clientWidth || 0;
const dvdHeight = dvd?.clientHeight || 0;

// Function to get a random new color
function getNewRandomColor() {
  const currentPallete = [...pallete]
  currentPallete.splice(prevColorChoiceIndex, 1)
  const colorChoiceIndex = Math.floor(Math.random() * currentPallete.length);
  prevColorChoiceIndex = colorChoiceIndex < prevColorChoiceIndex ? colorChoiceIndex : colorChoiceIndex + 1;
  const colorChoice = currentPallete[colorChoiceIndex];
  return colorChoice;
}

// Function to format remaining time in "00h:00m:00s"
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
  // Update the countdown text
  //@ts-expect-error
  dvd.innerHTML = `Season 13 Drops in: ${getCountdown()}`;

  // Handle bouncing animation
  const screenHeight = document.body.clientHeight;
  const screenWidth = document.body.clientWidth;

  if (y + dvdHeight >= screenHeight || y < 0) {
    dirY *= -1;
    //@ts-expect-error
    dvd.style.color = getNewRandomColor();
    //@ts-expect-error
    gif.style.filter = `hue-rotate(${Math.random() * 360}deg)`; // Change GIF color effect
  }
  if (x + dvdWidth >= screenWidth || x < 0) {
    dirX *= -1;
    //@ts-expect-error
    dvd.style.color = getNewRandomColor();
    //@ts-expect-error
    gif.style.filter = `hue-rotate(${Math.random() * 360}deg)`; // Change GIF color effect
  }

  x += dirX * speed;
  y += dirY * speed;

  // Update text and GIF positions
  //@ts-expect-error
  dvd.style.left = x + "px";
  //@ts-expect-error
  dvd.style.top = y + "px";
  //@ts-expect-error
  gif.style.left = x + "px"; // Sync GIF with text movement
  //@ts-expect-error
  gif.style.top = y + dvdHeight + 10 + "px"; // Position GIF slightly below the text

  window.requestAnimationFrame(animate);
}

// Start the animation and countdown
window.requestAnimationFrame(animate);

// Ensure the countdown updates every second
setInterval(() => {
  //@ts-expect-error
  dvd.innerHTML = `Season 13 Drops in: ${getCountdown()}`;
}, 1000);