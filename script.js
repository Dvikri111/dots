const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

const fontSize = 180;
const words = ["CODES","SPORTS","YOU"];
let item = 0;
let points = [];

function getTextPoints(text) {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = 'pink';
  ctx.font = `${fontSize}px Georgia`;
  ctx.fillText(text, 100, height / 2);

  const imageData = ctx.getImageData(0, 0, width, height).data;
  const points = [];

  for (let y = 0; y < height; y += 4) {
    for (let x = 0; x < width; x += 4) {
      const index = (y * width + x) * 4;
      if (imageData[index + 3] > 128) {
        points.push({ x, y });
      }
    }
  }

  return points;
}

function createWord(word) {
  points = getTextPoints(word).map(pt => new Vehicle(pt.x, pt.y));
}

class Vehicle {
  constructor(x, y) {
    this.target = { x, y };
    this.pos = { x: Math.random() * width, y: Math.random() * height };
    this.vel = { x: Math.random() * 2 - 1, y: Math.random() * 2 - 1 };
  }

  update() {
    const dx = this.target.x - this.pos.x;
    const dy = this.target.y - this.pos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const speed = Math.min(distance / 10, 5);
    this.pos.x += (dx / distance) * speed;
    this.pos.y += (dy / distance) * speed;
  }

  draw() {
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, 2, 0, Math.PI * 2);
    ctx.fill();
  }
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  for (let point of points) {
    point.update();
    point.draw();
  }
  requestAnimationFrame(animate);
}

function init() {
  createWord(words[item]);
  animate();
}

window.addEventListener('keydown', (event) => {
  if (event.key === ' ') {
    item = (item + 1) % words.length;
    createWord(words[item]);
  }
});

window.addEventListener('resize', () => {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  createWord(words[item]);
});

init();
