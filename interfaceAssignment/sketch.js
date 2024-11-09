let handPose
let video
let hands = []
let s
let scl = 20
let food
let gameStarted = false // 标记游戏是否开始
let previousFingerPos = null // 保存前一帧的手指位置

function preload() {
  // Load the handPose model
  handPose = ml5.handPose();
}

function setup() {
  createCanvas(640, 480)
  video = createCapture(VIDEO)
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
  
  //image(video, 0, 0, width, height)
  
  // 画出所有手部关键点
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i]
    let thumb = hand.keypoints[4] // 拇指
    let indexFinger = hand.keypoints[8] // 食指
    
    // 镜像手指的 x 坐标
    let mirroredThumbX = width - thumb.x
    let mirroredIndexX = width - indexFinger.x
    
    // 判断手势是否为🤏
    let d = dist(mirroredThumbX, thumb.y, mirroredIndexX, indexFinger.y)
    if (d < 30) { // 如果距离小于一定范围，则认为🤏
      if (!gameStarted) {
        gameStarted = true // 启动游戏
        previousFingerPos = createVector(mirroredIndexX, indexFinger.y) // 保存初始位置
        
        
        
      } else if (previousFingerPos) {
        // 手势开始后，根据食指移动方向控制蛇
        let dx = mirroredIndexX - previousFingerPos.x
        let dy = indexFinger.y - previousFingerPos.y
        if (abs(dx) > abs(dy)) { // 水平方向移动
          if (dx > 5) s.dir(1, 0) // 右
          else if (dx < -5) s.dir(-1, 0) // 左
        } else { // 垂直方向移动
          if (dy > 5) s.dir(0, 1) // 下
          else if (dy < -5) s.dir(0, -1) // 上
        }
        previousFingerPos.set(mirroredIndexX, indexFinger.y) // 更新前一帧位置
      }
    } else {
      gameStarted = false // 手指松开时暂停游戏
      }

    // 绿色小点示意拇指和食指的位置
    fill(0, 255, 0,75)
    noStroke()
    circle(mirroredThumbX, thumb.y, 10)
    circle(mirroredIndexX, indexFinger.y, 10)
  }
  
  if (gameStarted) {
    // 游戏开始时，更新蛇的位置
    if (s.eat(food)) pickLocation()
    s.death()
    s.update()
  }

  // 画出贪吃蛇和食物
  s.show()
  fill(255, 0, 100)
  rect(food.x, food.y, scl, scl)
}

// 更新手部数据
function gotHands(results) {
  hands = results
}