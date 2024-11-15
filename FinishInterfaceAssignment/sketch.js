let handPose
let video
let hands = []
let s
let scl = 20
let food
let gameStarted = false // 标记游戏是否开始
let previousFingerPos = null // 保存前一帧的手指位置

let direct = 0
let inverted = 0

let rectW = 80
let rectH = 40

function preload() {
  // Load the handPose model
  handPose = ml5.handPose();
}

function setup() {
  createCanvas(500, 500)
  video = createCapture(VIDEO,{ flipped:true })
  video.size(640, 480)
  video.hide()
  handPose.detectStart(video, gotHands)
  
  s = new Snake() // 初始化贪吃蛇
  frameRate(10) // 设置帧率
  pickLocation() // 初始化食物位置
  
}

// 随机生成食物位置
function pickLocation() {
  let cols = floor(width / scl)
  let rows = floor(height / scl)
  food = createVector(floor(random(cols)), floor(random(rows)))
  food.mult(scl)
}

function draw() {
  background(220);
  
  stroke(255)
  line(0,0,width,height)
  line(width,0,0,height)
  
  //image(video, 0, 0, width, height)
  
  // 画出所有手部关键点
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i]
    let thumb = hand.keypoints[4] // 拇指
    let indexFinger = hand.keypoints[8] // 食指
    
    // 镜像手指的 x 坐标
    //let mirroredThumbX = width - thumb.x
    //let mirroredIndexX = width - indexFinger.x
    
    direct = indexFinger.x - indexFinger.y
  inverted = indexFinger.x*-1 - indexFinger.y
    
    // 判断手势是否为🤏
    let d = dist(thumb.x, thumb.y, indexFinger.x, indexFinger.y)
    if (d < 30) { // 如果距离小于一定范围，则认为🤏
      if (!gameStarted) {
        gameStarted = true // 启动游戏
        previousFingerPos = createVector(indexFinger.x, indexFinger.y) // 保存初始位置
        
        
        
      } else {
        if(direct < 0 && inverted > -width){
    s.dir(1, 0)
    noStroke()
    fill(100, 210,210,75)
    rect(width*0.75 - rectW, (height/2 - rectH/2) , rectW , rectH)
    triangle(width*0.75,height/2-rectH,width*0.75,height/2+rectH, width*0.75+rectH, height/2)
  }
  if(direct > 0 && inverted > -width){
    s.dir(0, -1)
    noStroke()
    fill(100, 210,210,75)
    rect((width/2 - rectH/2) , height/4 , rectH , rectW)
    triangle(width/2-rectH,height/4,width/2+rectH,height/4, width/2, height/4-rectH)
  }
  if(direct < 0 && inverted < -width){
    s.dir(0, 1)
    noStroke()
    fill(100, 210,210,75)
    triangle(width/2-rectH,height*0.75,width/2+rectH,height*0.75, width/2, height*0.75+rectH)
    rect((width/2 - rectH/2) , (height*0.75 - rectW) , rectH , rectW)
  }
  if(direct > 0 && inverted < -width){
    s.dir(-1,0)
    noStroke()
    fill(100, 210,210,75)
    triangle(width/4,height/2-rectH,width/4,height/2+rectH, width/4-rectH, height/2)
    rect(width/4 , (height/2 - rectH/2) , rectW , rectH)
  }
      }
    } else {
      gameStarted = false // 手指松开时暂停游戏
      }

    // 绿色小点示意拇指和食指的位置
    fill(0, 255, 0,75)
    noStroke()
    circle(width-thumb.x, thumb.y, 10)
    circle(width-indexFinger.x, indexFinger.y, 10)
  }
  
  if (gameStarted) {
    // 游戏开始时，更新蛇的位置
    if (s.eat(food)) pickLocation()
    s.death()
    s.update()
  }

  // 画出贪吃蛇和食物
  s.show()
  stroke(220)
  fill(255, 0, 100)
  rect(food.x, food.y, scl, scl)
}

// 更新手部数据
function gotHands(results) {
  hands = results
}