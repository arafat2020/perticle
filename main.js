import init, { Particle, init_particles } from './rust/pkg/rust';
import "./style.css";

let canvas = document.createElement("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.getElementById("app").appendChild(canvas);
const ctx = canvas.getContext("2d");

let particles = [];
let mouse = { x: null, y: null, radius: 150 };

// Mouse movement listener
window.addEventListener('mousemove', (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

// Load and initialize WebAssembly
async function run() {
  await init();
  particles = init_particles(1000, canvas.width, canvas.height);

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particles.length; i++) {
      particles[i].draw(ctx);
      particles[i].update(mouse.x, mouse.y, mouse.radius);
    }
    
    requestAnimationFrame(animate);
  }

  animate();
}

run();
