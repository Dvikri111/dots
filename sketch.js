var font;
var vehicles = [];
let fontSize = 180;
let words = ['CODES', 'SPORTS', 'YOU'];
let item = 0;

function preload() {
  font = loadFont('D:/dots/Best School Font by Kelik (7NTypes).otf'); // Pastikan nama file font sesuai
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  createWord(words[item]);
}

function createWord(word) {
  vehicles = [];

  // Hitung batas teks untuk tahu ukurannya
  let bounds = font.textBounds(word, 0, 0, fontSize);

  // Hitung posisi tengah secara horizontal dan vertikal
  let x = (width - bounds.w) / 2 - bounds.x;
  let y = (height + bounds.h) / 2 - bounds.y;

  // Ambil titik-titik huruf dari posisi tengah
  let points = font.textToPoints(word, x, y, fontSize, {
    sampleFactor: 0.25
  });

  for (let i = 0; i < points.length; i++) {
    let pt = points[i];
    let vehicle = new Vehicle(pt.x, pt.y);
    vehicles.push(vehicle);
  }
}

function draw() {
  background(0);
  for (let i = 0; i < vehicles.length; i++) {
    let v = vehicles[i];
    v.behaviors();
    v.update();
    v.show();
  }
}

function mousePressed() {
  item = (item + 1) % words.length;
  createWord(words[item]);
}
