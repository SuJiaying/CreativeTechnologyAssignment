class Flower{
    constructor(r, points, f_amp, period, speed){
      this.x = [];
      this.y = [];
      this.r = r;
      this.points = points;
      
      this.f_radius = 0;
      this.f_amp = f_amp;
      this.period = period;
      
      this.speed = speed;
      this.rot = 0;
    }
    
    display(){
      push();
      blendMode(DIFFERENCE);
      noStroke();
      fill(255);
    beginShape()
    for(let i =0; i < this.points; i++){
      let angle = i/this.points * 360
      
      
      this.f_radius = this.f_amp * cos(angle * this.period)
      
      this.x[i] = (this.r + this.f_radius) * cos(angle + this.rot)
      this.y[i] = (this.r + this.f_radius) * sin(angle + this.rot)
      vertex(this.x[i],this.y[i])
    }
    endShape(CLOSE)
    pop()
      
    this.rot += this.speed;
    }
  }