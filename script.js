// Select the canvas and set initial dimensions
const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth * 0.9;
canvas.height = window.innerHeight * 0.9;

// -------------------------
// Particle Class
// -------------------------
class Particle {
  constructor(x, y, radius, color, dx, dy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.dx = dx;
    this.dy = dy;
  }

  // Draw particle
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  // Update position and bounce on edges
  update() {
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }
}

// -------------------------
// Stage 2 — Create Multiple Particles
// -------------------------
let particles = [];

// Generate random color
function randomColor() {
  return `hsl(${Math.random() * 360}, 100%, 50%)`;
}

// Create particle array
function createParticles(amount) {
  particles = [];

  for (let i = 0; i < amount; i++) {
    let radius = Math.random() * 10 + 5; // 5–15px
    let x = Math.random() * (canvas.width - radius * 2) + radius;
    let y = Math.random() * (canvas.height - radius * 2) + radius;
    let dx = (Math.random() - 0.5) * 4; // random horizontal speed
    let dy = (Math.random() - 0.5) * 4; // random vertical speed
    let color = randomColor();

    particles.push(new Particle(x, y, radius, color, dx, dy));
  }
}

// Create 100 particles for Stage 2
createParticles(100);

// -------------------------
// Animation Loop
// -------------------------
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => p.update());

  requestAnimationFrame(animate);
}

animate();

// Recalculate canvas size and rebuild particles on window resize
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth * 0.9;
  canvas.height = window.innerHeight * 0.9;
  createParticles(100);
});

