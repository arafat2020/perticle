use wasm_bindgen::prelude::*;
use web_sys::CanvasRenderingContext2d;

#[wasm_bindgen]
pub struct Particle {
    x: f64,
    y: f64,
    base_x: f64,
    base_y: f64,
    size: f64,
    density: f64,
}

#[wasm_bindgen]
impl Particle {
    #[wasm_bindgen(constructor)]
    pub fn new(x: f64, y: f64) -> Particle {
        Particle {
            x,
            y,
            base_x: x,
            base_y: y,
            size: 1.0,
            density: (js_sys::Math::random() * 30.0) + 1.0,
        }
    }

    pub fn draw(&self, ctx: &CanvasRenderingContext2d) {
        ctx.set_fill_style(&JsValue::from_str("blue"));
        ctx.begin_path();
        ctx.arc(self.x, self.y, self.size, 0.0, std::f64::consts::PI * 2.0).unwrap();
        ctx.close_path();
        ctx.fill();
    }

    pub fn update(&mut self, mouse_x: f64, mouse_y: f64, radius: f64) {
        let dx = mouse_x - self.x;
        let dy = mouse_y - self.y;
        let distance = (dx * dx + dy * dy).sqrt();
        let fdx = dx / distance;
        let fdy = dy / distance;
        let max_distance = radius;
        let force = (max_distance - distance) / max_distance;
        let direction_x = fdx * force * self.density;
        let direction_y = fdy * force * self.density;

        if distance < radius {
            self.x -= direction_x;
            self.y -= direction_y;
        } else {
            let dx_to_base = self.x - self.base_x;
            let dy_to_base = self.y - self.base_y;

            if self.x != self.base_x {
                self.x -= dx_to_base / 10.0;
            }
            if self.y != self.base_y {
                self.y -= dy_to_base / 10.0;
            }
        }
    }
}

#[wasm_bindgen]
pub fn init_particles(count: usize, width: f64, height: f64) -> Vec<Particle> {
    let mut particles = Vec::new();
    for _ in 0..count {
        let x = js_sys::Math::random() * width;
        let y = js_sys::Math::random() * height;
        particles.push(Particle::new(x, y));
    }
    particles
}
