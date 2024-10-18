//let x = []; let y = []
//let points = 100
//let r =100
//let f_radius ; let f_amp =15
//let period = 5
//let rotate = 0
let flowers = []
let num = 15

let posX, posY
let radius = 20

let offsetX = 10
let offsetY = 100

function setup() {
  let canvas =createCanvas(600, 600)
  canvas.parent('sketchHolder');
  angleMode(DEGREES)
  
  for(let i = 0; i < num; i ++){
    flowers[i] = new Flower(150 - i*10, 100, 15, 5, (i+1)*0.25)
  }
  
  posX = width*0.5
  posY = height*0.5
}

function draw() {
  background(134,1,17)
  push()
  translate(width/2, height/2)
  //noFill()
  //stroke(0)
  //beginShape()
  //for(let i =0; i < points; i++){
    //let angle = i/points * 360
    
    //f_radius = f_amp * cos(angle * period)
    
    //x[i] = (r + f_radius) * cos(angle + rotate)
    //y[i] = (r + f_radius) * sin(angle + rotate)
    //vertex(x[i],y[i])
  //}
  //endShape(CLOSE)
  
  //rotate += 1
  
  for(let i = 0; i < num; i ++){
    flowers[i].display();
  }
  pop()
  
  let noiseScale = 0.01
  posX = width*0.5 + cos(millis()*0.05)*(100 +noise(offsetX)*200)
  posY = height*0.5 + sin(millis()*0.05)*(100 +noise(offsetY)*200)
  fill(39,182,146)
  noStroke()
  circle(posX, posY, radius*2)
  
  offsetX += 0.01
  offsetY += 0.01
}