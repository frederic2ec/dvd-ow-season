import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import './style.css';

// Extend dayjs with plugins
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
dayjs.extend(utc);
dayjs.extend(timezone);

// Timezone configuration
const eventTime = dayjs.tz('2024-12-21 16:00:00', 'America/New_York');

// DOM elements
let dvd = document.getElementById('dvd');
let gif = document.getElementById('gif');
let dvd2 = document.getElementById('dvd-2');
let gif2 = document.getElementById('gif-2');

// Color and movement variables
let x1 = 0,
  y1 = 0,
  dirX1 = 1,
  dirY1 = 1;
let x2 = 0, y2 = 0, dirX2 = 1, dirY2 = 1;

// Initial direction and starting position for the second animation
const speed = 2;
const pallete = ['#ff8800', '#e124ff', '#6a19ff', '#ff2188'];
let prevColorChoiceIndex = 0;

const dvdWidth = dvd?.clientWidth || 0;
const dvdHeight = dvd?.clientHeight || 0;
const dvd2Width = dvd2?.clientWidth || 0;
const dvd2Height = dvd2?.clientHeight || 0;

// Set initial position for animate2 (bottom-right corner)
const screenWidth = document.body.clientWidth;
const screenHeight = document.body.clientHeight;
x2 = screenWidth - dvd2Width - 100;
y2 = screenHeight - dvd2Height - 100;
dirX2 = -1; // Reverse direction
dirY2 = -1; // Reverse direction

// Function to get a random new color
function getNewRandomColor() {
  const currentPallete = [...pallete];
  currentPallete.splice(prevColorChoiceIndex, 1);
  const colorChoiceIndex = Math.floor(Math.random() * currentPallete.length);
  prevColorChoiceIndex = colorChoiceIndex < prevColorChoiceIndex ? colorChoiceIndex : colorChoiceIndex + 1;
  return currentPallete[colorChoiceIndex];
}

// Function to format remaining time in "00h:00m:00s"
function getCountdown() {
  const now = dayjs().tz('America/New_York');
  const diff = eventTime.diff(now);

  if (diff <= 0) {
    return '00h:00m:00s';
  }

  const hours = Math.floor(diff / (1000 * 60 * 60)).toString().padStart(2, '0');
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
  const seconds = Math.floor((diff % (1000 * 60)) / 1000).toString().padStart(2, '0');
  return `${hours}h:${minutes}m:${seconds}s`;
}

// Animation function for the first element
function animate() {
  // Update the countdown text
  //@ts-expect-error
  dvd.innerHTML = `Streamer Giveaway: ${getCountdown()}`;

  // Handle bouncing animation
  const screenHeight = document.body.clientHeight;
  const screenWidth = document.body.clientWidth;

  if (y1 + dvdHeight >= screenHeight || y1 < 0) {
    dirY1 *= -1;
    //@ts-expect-error
    dvd.style.color = getNewRandomColor();
    //@ts-expect-error
    gif.style.filter = `hue-rotate(${Math.random() * 360}deg)`; // Change GIF color effect
  }
  if (x1 + dvdWidth >= screenWidth || x1 < 0) {
    dirX1 *= -1;
    //@ts-expect-error
    dvd.style.color = getNewRandomColor();
    //@ts-expect-error
    gif.style.filter = `hue-rotate(${Math.random() * 360}deg)`; // Change GIF color effect
  }

  x1 += dirX1 * speed;
  y1 += dirY1 * speed;

  // Update text and GIF positions
  //@ts-expect-error
  dvd.style.left = x1 + 'px';
  //@ts-expect-error
  dvd.style.top = y1 + 'px';
  //@ts-expect-error
  gif.style.left = x1 + 'px'; // Sync GIF with text movement
  //@ts-expect-error
  gif.style.top = y1 + dvdHeight + 10 + 'px'; // Position GIF slightly below the text

  window.requestAnimationFrame(animate);
}

// Animation function for the second element
function animate2() {
  // Update the countdown text
  //@ts-expect-error
  dvd2.innerHTML = `Streamer Giveaway: ${getCountdown()}`;

  // Handle bouncing animation
  const screenHeight = document.body.clientHeight;
  const screenWidth = document.body.clientWidth;

  if (y2 + dvd2Height >= screenHeight || y2 < 0) {
    dirY2 *= -1;
    //@ts-expect-error
    dvd2.style.color = getNewRandomColor();
    //@ts-expect-error
    gif2.style.filter = `hue-rotate(${Math.random() * 360}deg)`; // Change GIF color effect
  }
  if (x2 + dvd2Width >= screenWidth || x2 < 0) {
    dirX2 *= -1;
    //@ts-expect-error
    dvd2.style.color = getNewRandomColor();
    //@ts-expect-error
    gif2.style.filter = `hue-rotate(${Math.random() * 360}deg)`; // Change GIF color effect
  }

  x2 += dirX2 * speed; // Reverse direction
  y2 += dirY2 * speed; // Reverse direction

  // Update text and GIF positions
  //@ts-expect-error
  dvd2.style.left = x2 + 'px';
  //@ts-expect-error
  dvd2.style.top = y2 + 'px';
  //@ts-expect-error
  gif2.style.left = x2 + 'px'; // Sync GIF with text movement
  //@ts-expect-error
  gif2.style.top = y2 + dvd2Height + 10 + 'px'; // Position GIF slightly below the text

  window.requestAnimationFrame(animate2);
}

// Start the animations
window.requestAnimationFrame(animate);
window.requestAnimationFrame(animate2);

// Ensure the countdown updates every second
setInterval(() => {
  //@ts-expect-error
  dvd.innerHTML = `Streamer Giveaway: ${getCountdown()}`;
  //@ts-expect-error
  dvd2.innerHTML = `Streamer Giveaway: ${getCountdown()}`;
}, 1000);
