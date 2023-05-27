import "./style.css";

const canves = document.createElement("canvas");
canves.width = window.innerWidth;
canves.height = window.innerHeight;
canves.id = 'text_perticle'
document.getElementById("app").appendChild(canves);
const ctx =  canves.getContext('2d')

let perticlleArr = [];

const mouse = {
  x:null,
  y:null,
  redius:150
};

window.addEventListener('mousemove',(e)=>{
  mouse.x=e.x
  mouse.y=e.y
})

// ctx.font = '30px Verdana'
// ctx.fillStyle = 'white'
// ctx.fillText('A',0,30)
// const data = ctx.getImageData(0,0,100,100)

class Perticle {
  constructor(x,y){
    this.x = x
    this.y = y
    this.size = 1
    this.baseX = this.x
    this.baseY = this.y
    this.density = (Math.random() * 30) +1
  }
  draw(){
    ctx.fillStyle ='blue'
    ctx.beginPath()
    ctx.arc(this.x,this.y,this.size,0,Math.PI * 2)
    ctx.closePath()
    ctx.fill()
  }
  update(){
    let dx = mouse.x - this.x
    let dy = mouse.y - this.y
    let distence = Math.sqrt(dx*dx+dy*dy)
    let fdx = dx/distence
    let fdy = dy/distence 
    let maxdistence = mouse.redius
    let force = (maxdistence - distence)/ maxdistence
    let directionX = fdx * force * this.density
    let directiony = fdy * force * this.density
    if (distence < 300) {
      this.x -= directionX
      this.y -= directiony
    }else{
      if (this.x !== this.baseX) {
        dx = this.x - this.baseX
        this.x -= dx/10
      }
      if (this.y !== this.baseY) {
        dy = this.y - this.baseY
        this.y -= dy/10
      }
    }
  }
}
function init(params) {
  perticlleArr = []
  for (let index = 0; index < 1000; index++) {
  let x= Math.random() * canves.width
  let y = Math.random() * canves.height
  perticlleArr.push(new Perticle(x,y))
  }
}
init()
console.log(perticlleArr);
function animate(params) {
  ctx.clearRect(0,0,canves.width,canves.height)
  perticlleArr.map(i=>{
    perticlleArr[perticlleArr.indexOf(i)].draw()
    perticlleArr[perticlleArr.indexOf(i)].update()
  })
  requestAnimationFrame(animate)
}
animate()