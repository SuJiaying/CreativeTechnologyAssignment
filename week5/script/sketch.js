let numCircles = 10
let radius
let strWeight = 20
let timerID
let bkgndClr

function setup() {
  createCanvas(600, 600);
  colorMode(HSB, TWO_PI, 1,1)
  radius = width*0.1
  strokeCap(SQUARE)
  bkgndClr = color(0)
  timerID = setInterval(()=>{
    bkgndClr = color(random(TWO_PI),random(1),random(1))
  },2000)
  

}

function draw() {
  background(bkgndClr);
  strokeWeight(strWeight)
  stroke(0,1,1)
  noFill()
  translate(width*0.5, height*0.5)
  
  for(let i = 0; i< numCircles;i ++){
    
    push()
    rotate(sin(millis()*0.001*(i*0.5+1)) )
    let diameter = (i*strWeight*2)+radius*2
    stroke(TWO_PI/numCircles*i,1,1)
    arc(0, 0, diameter, diameter, HALF_PI+QUARTER_PI, PI*2.25)
    pop()
    
  }
  
 
}